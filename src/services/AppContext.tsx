import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Contact, Lead, Client, Task, Conversation, Message, Campaign, NotificationItem, Profile 
} from '../types';
import { 
  MOCK_PROFILE, INITIAL_CONTACTS, INITIAL_LEADS, INITIAL_CLIENTS, INITIAL_TASKS, 
  INITIAL_CONVERSATIONS, INITIAL_MESSAGES, INITIAL_CAMPAIGNS, INITIAL_NOTIFICATIONS 
} from '../services/mockData';
import { supabase, isSupabaseConfigured } from './supabaseClient';

interface AppContextType {
  profile: Profile;
  contacts: Contact[];
  leads: Lead[];
  clients: Client[];
  tasks: Task[];
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  selectedConversationId: string | null;
  campaigns: Campaign[];
  notifications: NotificationItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCloudConnected: boolean;
  
  // Actions
  addContact: (contact: Omit<Contact, 'id' | 'created_at'>) => Promise<void>;
  updateContact: (id: string, contact: Partial<Contact>) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;

  addLead: (lead: Omit<Lead, 'id' | 'created_at'>) => Promise<void>;
  updateLeadStatus: (id: string, stage: Lead['stage']) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;

  addClient: (client: Omit<Client, 'id' | 'created_at'>) => Promise<void>;
  updateClient: (id: string, client: Partial<Client>) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;

  addTask: (task: Omit<Task, 'id' | 'created_at'>) => Promise<void>;
  toggleTaskComplete: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;

  setSelectedConversationId: (id: string | null) => void;
  addMessageToConversation: (conversationId: string, message: Omit<Message, 'id' | 'conversation_id' | 'timestamp'>) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
  clearConversation: (conversationId: string) => Promise<void>;
  deleteConversation: (conversationId: string) => Promise<void>;

  addCampaign: (campaign: Omit<Campaign, 'id'>) => Promise<void>;
  markNotificationRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [profile, setProfile] = useState<Profile>(MOCK_PROFILE);
  const [isCloudConnected, setIsCloudConnected] = useState<boolean>(isSupabaseConfigured);
  
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [messages, setMessages] = useState<Record<string, Message[]>>(INITIAL_MESSAGES);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>('conv_1');
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: prof } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (prof) {
          setProfile(prof);
          setIsCloudConnected(true);
        }
      }
    };

    checkSession();
  }, []);

  const addContact = async (data: Omit<Contact, 'id' | 'created_at'>) => {
    const newContact: Contact = { ...data, id: `cnt_${Date.now()}`, created_at: new Date().toISOString() };
    setContacts([newContact, ...contacts]);
  };

  const updateContact = async (id: string, data: Partial<Contact>) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, ...data } : c));
  };

  const deleteContact = async (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const addLead = async (data: Omit<Lead, 'id' | 'created_at'>) => {
    const newLead: Lead = { ...data, id: `led_${Date.now()}`, created_at: new Date().toISOString() };
    setLeads([newLead, ...leads]);
  };

  const updateLeadStatus = async (id: string, stage: Lead['stage']) => {
    setLeads(leads.map(l => l.id === id ? { ...l, stage } : l));
  };

  const deleteLead = async (id: string) => {
    setLeads(leads.filter(l => l.id !== id));
  };

  const addClient = async (data: Omit<Client, 'id' | 'created_at'>) => {
    const newClient: Client = { ...data, id: `clt_${Date.now()}`, created_at: new Date().toISOString() };
    setClients([newClient, ...clients]);
  };

  const updateClient = async (id: string, data: Partial<Client>) => {
    setClients(clients.map(c => c.id === id ? { ...c, ...data } : c));
  };

  const deleteClient = async (id: string) => {
    setClients(clients.filter(c => c.id !== id));
  };

  const addTask = async (data: Omit<Task, 'id' | 'created_at'>) => {
    const newTask: Task = { ...data, id: `tsk_${Date.now()}`, created_at: new Date().toISOString() };
    setTasks([newTask, ...tasks]);
  };

  const toggleTaskComplete = async (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'Completed' ? 'Todo' : 'Completed' } : t));
  };

  const deleteTask = async (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const addMessageToConversation = async (conversationId: string, message: Omit<Message, 'id' | 'conversation_id' | 'timestamp'>) => {
    const newMsg: Message = {
      ...message,
      id: `msg_${Date.now()}`,
      conversation_id: conversationId,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => ({ ...prev, [conversationId]: [...(prev[conversationId] || []), newMsg] }));
  };

  const deleteMessage = async (messageId: string) => {
    if (!selectedConversationId) return;
    setMessages(prev => ({ ...prev, [selectedConversationId]: (prev[selectedConversationId] || []).filter(m => m.id !== messageId) }));
  };

  const clearConversation = async (conversationId: string) => {
    setMessages(prev => ({ ...prev, [conversationId]: [] }));
  };

  const deleteConversation = async (conversationId: string) => {
    setConversations(conversations.filter(c => c.id !== conversationId));
  };

  const addCampaign = async (data: Omit<Campaign, 'id'>) => {
    const newCamp: Campaign = { ...data, id: `cmp_${Date.now()}` };
    setCampaigns([newCamp, ...campaigns]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <AppContext.Provider value={{
      profile, contacts, leads, clients, tasks, conversations, messages, selectedConversationId, campaigns, notifications, activeTab, setActiveTab, isCloudConnected,
      addContact, updateContact, deleteContact, addLead, updateLeadStatus, deleteLead, addClient, updateClient, deleteClient, addTask, toggleTaskComplete, deleteTask,
      setSelectedConversationId, addMessageToConversation, deleteMessage, clearConversation, deleteConversation, addCampaign, markNotificationRead
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
