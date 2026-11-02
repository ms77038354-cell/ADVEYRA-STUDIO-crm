export type UserRole = 'Super Admin' | 'Admin' | 'Manager' | 'Sales Employee' | 'Customer Support';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  department: string;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  source: string;
  owner_id: string;
  tags: string[];
  notes?: string;
  created_at: string;
}

export type LeadStage = 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Converted' | 'Lost';

export interface Lead {
  id: string;
  title: string;
  contact_id: string;
  contact_name?: string;
  company?: string;
  value: number;
  stage: LeadStage;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  owner_id: string;
  owner_name?: string;
  source: string;
  expected_close_date?: string;
  created_at: string;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  account_manager_id: string;
  account_manager_name?: string;
  services_purchased: string[];
  package_details: string;
  contract_start: string;
  contract_end: string;
  payment_status: 'Paid' | 'Pending' | 'Overdue';
  status: 'Active' | 'Inactive';
  created_at: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Todo' | 'In Progress' | 'Review' | 'Completed';
  due_date: string;
  assigned_to: string;
  assigned_name?: string;
  project_name?: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  channel: 'WhatsApp' | 'Messenger' | 'Instagram';
  contact_name: string;
  contact_phone?: string;
  last_message: string;
  unread_count: number;
  status: 'Open' | 'Pending' | 'Resolved';
  assigned_to?: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_type: 'customer' | 'agent' | 'system';
  sender_name: string;
  content: string;
  media_url?: string;
  timestamp: string;
}

export interface Campaign {
  id: string;
  name: string;
  client_name: string;
  platform: 'Meta Ads' | 'Google Ads' | 'Instagram' | 'LinkedIn';
  objective: string;
  budget: number;
  spend: number;
  status: 'Active' | 'Paused' | 'Completed';
  start_date: string;
  end_date: string;
  leads_generated: number;
  clicks: number;
  impressions: number;
  ctr: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'lead' | 'message' | 'task' | 'campaign' | 'system';
  read: boolean;
  created_at: string;
}
