import { 
  Contact, Lead, Client, Task, Conversation, Message, Campaign, NotificationItem, Profile 
} from '../types';

export const MOCK_PROFILE: Profile = {
  id: 'usr_101',
  full_name: 'Alex Vance (Super Admin)',
  email: 'alex@adveyra.agency',
  role: 'Super Admin',
  department: 'Executive',
  is_active: true,
  created_at: '2024-01-15'
};

export const INITIAL_CONTACTS: Contact[] = [
  {
    id: 'cnt_1',
    name: 'Sarah Jenkins',
    email: 'sarah@apexfit.io',
    phone: '+1 (555) 234-5678',
    company: 'Apex Fitness Club',
    location: 'Austin, TX',
    source: 'Meta Lead Ad',
    owner_id: 'usr_101',
    tags: ['High Value', 'Fitness', 'Q2 Campaign'],
    notes: 'Interested in scaling digital ads across Texas.',
    created_at: '2025-05-10'
  },
  {
    id: 'cnt_2',
    name: 'Marcus Thorne',
    email: 'm.thorne@novareal.com',
    phone: '+1 (555) 987-6543',
    company: 'Nova Realty Group',
    location: 'Miami, FL',
    source: 'Instagram DM',
    owner_id: 'usr_102',
    tags: ['Real Estate', 'Urgent'],
    notes: 'Looking for local lead generation setup.',
    created_at: '2025-05-12'
  },
  {
    id: 'cnt_3',
    name: 'Elena Rostova',
    email: 'elena@luxeinteriors.design',
    phone: '+1 (555) 456-7890',
    company: 'Luxe Interiors',
    location: 'New York, NY',
    source: 'WhatsApp',
    owner_id: 'usr_101',
    tags: ['Design', 'VIP'],
    notes: 'Requested proposal for luxury brand rebranding.',
    created_at: '2025-05-14'
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'led_1',
    title: 'Apex Fitness Q3 Ad Scale',
    contact_id: 'cnt_1',
    contact_name: 'Sarah Jenkins',
    company: 'Apex Fitness Club',
    value: 12500,
    stage: 'Proposal',
    priority: 'High',
    owner_id: 'usr_101',
    owner_name: 'Alex Vance',
    source: 'Meta Lead Ad',
    expected_close_date: '2025-06-15',
    created_at: '2025-05-10'
  },
  {
    id: 'led_2',
    title: 'Nova Realty Lead Gen Funnel',
    contact_id: 'cnt_2',
    contact_name: 'Marcus Thorne',
    company: 'Nova Realty Group',
    value: 8000,
    stage: 'Qualified',
    priority: 'Medium',
    owner_id: 'usr_102',
    owner_name: 'Jessica Taylor',
    source: 'Instagram DM',
    expected_close_date: '2025-06-20',
    created_at: '2025-05-12'
  },
  {
    id: 'led_3',
    title: 'Luxe Interiors Brand Revamp',
    contact_id: 'cnt_3',
    contact_name: 'Elena Rostova',
    company: 'Luxe Interiors',
    value: 15000,
    stage: 'Negotiation',
    priority: 'Urgent',
    owner_id: 'usr_101',
    owner_name: 'Alex Vance',
    source: 'WhatsApp',
    expected_close_date: '2025-06-01',
    created_at: '2025-05-14'
  },
  {
    id: 'led_4',
    title: 'Techflow SaaS Performance',
    contact_id: 'cnt_4',
    contact_name: 'David Chen',
    company: 'Techflow AI',
    value: 24000,
    stage: 'Converted',
    priority: 'High',
    owner_id: 'usr_103',
    owner_name: 'Michael Scott',
    source: 'Google Ads',
    expected_close_date: '2025-05-18',
    created_at: '2025-05-01'
  }
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'clt_1',
    name: 'David Chen',
    company: 'Techflow AI',
    email: 'david@techflow.ai',
    phone: '+1 (555) 321-9876',
    account_manager_id: 'usr_103',
    account_manager_name: 'Michael Scott',
    services_purchased: ['Meta Ads Management', 'Google Ads', 'Email Automation'],
    package_details: 'Enterprise Growth Suite ($4,000/mo)',
    contract_start: '2025-05-01',
    contract_end: '2026-05-01',
    payment_status: 'Paid',
    status: 'Active',
    created_at: '2025-05-01'
  },
  {
    id: 'clt_2',
    name: 'Samantha Reed',
    company: 'Vanguard Logistics',
    email: 'samantha@vanguard.co',
    phone: '+1 (555) 654-3210',
    account_manager_id: 'usr_101',
    account_manager_name: 'Alex Vance',
    services_purchased: ['LinkedIn Lead Gen', 'CRM Setup'],
    package_details: 'B2B Professional ($2,500/mo)',
    contract_start: '2024-11-15',
    contract_end: '2025-11-15',
    payment_status: 'Paid',
    status: 'Active',
    created_at: '2024-11-15'
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'tsk_1',
    title: 'Review Meta Ad Creatives for Apex Fitness',
    description: 'Check video aspect ratios and hook copy for Q3 campaign.',
    priority: 'High',
    status: 'In Progress',
    due_date: '2025-05-25',
    assigned_to: 'usr_101',
    assigned_name: 'Alex Vance',
    project_name: 'Apex Fitness Scale'
  },
  {
    id: 'tsk_2',
    title: 'Send Custom Proposal to Luxe Interiors',
    description: 'Include 3 tiers of branding and social media management.',
    priority: 'High',
    status: 'Todo',
    due_date: '2025-05-22',
    assigned_to: 'usr_101',
    assigned_name: 'Alex Vance',
    project_name: 'Luxe Interiors Revamp'
  },
  {
    id: 'tsk_3',
    title: 'Setup WhatsApp Webhook for Nova Realty',
    description: 'Verify Meta Cloud API endpoint and test incoming messages.',
    priority: 'Medium',
    status: 'Review',
    due_date: '2025-05-24',
    assigned_to: 'usr_102',
    assigned_name: 'Jessica Taylor',
    project_name: 'Nova Lead Gen'
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_1',
    channel: 'WhatsApp',
    contact_name: 'Elena Rostova',
    contact_phone: '+1 (555) 456-7890',
    last_message: 'Can we schedule the strategy call for Tuesday at 3pm?',
    unread_count: 2,
    status: 'Open',
    assigned_to: 'Alex Vance',
    updated_at: '10:42 AM'
  },
  {
    id: 'conv_2',
    channel: 'Instagram',
    contact_name: 'Marcus Thorne',
    contact_phone: '+1 (555) 987-6543',
    last_message: 'Thanks for the quick response! Sending our brand assets now.',
    unread_count: 0,
    status: 'Pending',
    assigned_to: 'Jessica Taylor',
    updated_at: 'Yesterday'
  },
  {
    id: 'conv_3',
    channel: 'Messenger',
    contact_name: 'Sarah Jenkins',
    contact_phone: '+1 (555) 234-5678',
    last_message: 'Do you also handle TikTok ad management?',
    unread_count: 0,
    status: 'Resolved',
    assigned_to: 'Alex Vance',
    updated_at: 'May 18'
  }
];

export const INITIAL_MESSAGES: Record<string, Message[]> = {
  conv_1: [
    {
      id: 'msg_1',
      conversation_id: 'conv_1',
      sender_type: 'customer',
      sender_name: 'Elena Rostova',
      content: 'Hello ADVEYRA team! We are looking for agency support.',
      timestamp: '10:30 AM'
    },
    {
      id: 'msg_2',
      conversation_id: 'conv_1',
      sender_type: 'agent',
      sender_name: 'Alex Vance',
      content: 'Hi Elena! Glad to connect. What specific services are you exploring for Luxe Interiors?',
      timestamp: '10:35 AM'
    },
    {
      id: 'msg_3',
      conversation_id: 'conv_1',
      sender_type: 'customer',
      sender_name: 'Elena Rostova',
      content: 'Can we schedule the strategy call for Tuesday at 3pm?',
      timestamp: '10:42 AM'
    }
  ]
};

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'cmp_1',
    name: 'Apex Fitness Summer Lead Gen',
    client_name: 'Apex Fitness Club',
    platform: 'Meta Ads',
    objective: 'Lead Generation',
    budget: 5000,
    spend: 2150,
    status: 'Active',
    start_date: '2025-05-01',
    end_date: '2025-05-31',
    leads_generated: 142,
    clicks: 3420,
    impressions: 48500,
    ctr: 7.05
  },
  {
    id: 'cmp_2',
    name: 'Techflow AI B2B Acquisition',
    client_name: 'Techflow AI',
    platform: 'Google Ads',
    objective: 'Conversions',
    budget: 10000,
    spend: 7800,
    status: 'Active',
    start_date: '2025-05-01',
    end_date: '2025-05-31',
    leads_generated: 89,
    clicks: 5120,
    impressions: 92000,
    ctr: 5.56
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'not_1',
    title: 'New Lead Assigned',
    message: 'Apex Fitness Q3 Ad Scale was assigned to you.',
    type: 'lead',
    read: false,
    created_at: '10 mins ago'
  },
  {
    id: 'not_2',
    title: 'New WhatsApp Message',
    message: 'Elena Rostova sent 2 new messages.',
    type: 'message',
    read: false,
    created_at: '25 mins ago'
  },
  {
    id: 'not_3',
    title: 'Task Overdue Alert',
    message: 'Review Meta Ad Creatives is due today.',
    type: 'task',
    read: true,
    created_at: '2 hours ago'
  }
];
