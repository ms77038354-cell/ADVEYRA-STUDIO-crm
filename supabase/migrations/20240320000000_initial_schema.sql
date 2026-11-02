-- ==============================================================================
-- ADVEYRA CRM — PRODUCTION DATABASE MIGRATION SCRIPT (PostgreSQL / Supabase)
-- ==============================================================================
-- Safe, idempotent migration script for multi-tenant agency CRM.
-- Run this in your Supabase SQL Editor. Never drops existing tables.
-- ==============================================================================

-- 1. Organizations (Multi-tenant isolation)
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    subdomain TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Profiles (Users & Roles: Super Admin, Admin, Manager, Sales Employee, Support)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT CHECK (role IN ('Super Admin', 'Admin', 'Manager', 'Sales Employee', 'Customer Support')) DEFAULT 'Sales Employee',
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Contacts
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    company TEXT,
    tags TEXT[] DEFAULT '{}',
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Leads (Sales Pipeline)
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    company TEXT,
    value NUMERIC(12,2) DEFAULT 0.00,
    stage TEXT CHECK (stage IN ('New Lead', 'Contacted', 'Proposal Sent', 'Negotiation', 'Won', 'Lost')) DEFAULT 'New Lead',
    assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Clients
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    company TEXT,
    email TEXT,
    phone TEXT,
    status TEXT CHECK (status IN ('Active', 'Onboarding', 'At Risk', 'Inactive')) DEFAULT 'Active',
    spend NUMERIC(12,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Tasks
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATE,
    priority TEXT CHECK (priority IN ('High', 'Medium', 'Low')) DEFAULT 'Medium',
    status TEXT CHECK (status IN ('To Do', 'In Progress', 'Completed')) DEFAULT 'To Do',
    assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Conversations (Omnichannel Inbox)
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    customer_name TEXT NOT NULL,
    channel TEXT CHECK (channel IN ('whatsapp', 'email', 'instagram', 'live_chat')) DEFAULT 'whatsapp',
    last_message TEXT,
    unread_count INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Messages
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    sender_type TEXT CHECK (sender_type IN ('agent', 'customer', 'system')) DEFAULT 'customer',
    sender_name TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Campaigns
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    channel TEXT CHECK (channel IN ('WhatsApp Broadcast', 'Email Blast', 'SMS Campaign')) DEFAULT 'WhatsApp Broadcast',
    status TEXT CHECK (status IN ('Active', 'Scheduled', 'Draft', 'Completed')) DEFAULT 'Draft',
    reach INTEGER DEFAULT 0,
    engagement NUMERIC(5,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Helper policy function: user belongs to organization
CREATE POLICY "Users can access own organization data" ON contacts
    FOR ALL USING (organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Users can access leads in own org" ON leads
    FOR ALL USING (organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Users can access clients in own org" ON clients
    FOR ALL USING (organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Users can access tasks in own org" ON tasks
    FOR ALL USING (organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Users can access conversations in own org" ON conversations
    FOR ALL USING (organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Users can access campaigns in own org" ON campaigns
    FOR ALL USING (organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Profiles viewable by org members" ON profiles
    FOR ALL USING (organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid()));
