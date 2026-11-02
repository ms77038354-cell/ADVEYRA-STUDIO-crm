import React, { useState } from 'react';
import { 
  LayoutDashboard, MessageSquare, Users, TrendingUp, Briefcase, 
  CheckSquare, Megaphone, Cpu, ShieldCheck, BarChart3, Bell, 
  Settings, LogOut, Search, ChevronRight, Plus, ExternalLink
} from 'lucide-react';
import { useApp } from './services/AppContext';

import DashboardView from './pages/DashboardView';
import InboxView from './pages/InboxView';
import ContactsView from './pages/ContactsView';
import LeadsView from './pages/LeadsView';
import ClientsView from './pages/ClientsView';
import TasksView from './pages/TasksView';
import CampaignsView from './pages/CampaignsView';
import TeamView from './pages/TeamView';
import MetaIntegrationView from './pages/MetaIntegrationView';
import ReportsView from './pages/ReportsView';
import SettingsView from './pages/SettingsView';

export default function App() {
  const { activeTab, setActiveTab, profile, notifications, markNotificationRead } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'inbox': return <InboxView />;
      case 'contacts': return <ContactsView />;
      case 'leads': return <LeadsView />;
      case 'clients': return <ClientsView />;
      case 'tasks': return <TasksView />;
      case 'campaigns': return <CampaignsView />;
      case 'team': return <TeamView />;
      case 'meta': return <MetaIntegrationView />;
      case 'reports': return <ReportsView />;
      case 'settings': return <SettingsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0b0f19] text-slate-100 overflow-hidden font-sans">
      
      {/* 1. DARK NAVY SIDEBAR */}
      <aside className="w-64 bg-[#0f172a] border-r border-slate-800/80 flex flex-col z-20 shadow-xl">
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800/80 bg-[#0b0f19]/50">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <span className="font-black text-white text-lg tracking-wider">A</span>
            </div>
            <div>
              <h1 className="font-bold tracking-wider text-white text-base">ADVEYRA</h1>
              <p className="text-[10px] uppercase tracking-widest text-violet-400 font-semibold">Agency CRM</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Core Suite</div>
          
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" tab="dashboard" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem icon={<MessageSquare size={18} />} label="Unified Inbox" tab="inbox" activeTab={activeTab} setActiveTab={setActiveTab} badge="3" />
          <NavItem icon={<Users size={18} />} label="Contacts" tab="contacts" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem icon={<TrendingUp size={18} />} label="Leads Pipeline" tab="leads" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem icon={<Briefcase size={18} />} label="Clients" tab="clients" activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="pt-4 pb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Operations</div>
          <NavItem icon={<CheckSquare size={18} />} label="Tasks & Projects" tab="tasks" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem icon={<Megaphone size={18} />} label="Campaigns" tab="campaigns" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem icon={<Cpu size={18} />} label="Meta Integration" tab="meta" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem icon={<ShieldCheck size={18} />} label="Team & Roles" tab="team" activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="pt-4 pb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Analytics</div>
          <NavItem icon={<BarChart3 size={18} />} label="Reports & Revenue" tab="reports" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem icon={<Settings size={18} />} label="Settings" tab="settings" activeTab={activeTab} setActiveTab={setActiveTab} />
        </nav>

        {/* User Footer Profile */}
        <div className="p-4 border-t border-slate-800 bg-[#0b0f19]/30 flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="h-9 w-9 rounded-full bg-violet-600/30 border border-violet-500/50 flex items-center justify-center text-violet-300 font-bold text-sm">
              {profile.full_name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">{profile.full_name}</p>
              <p className="text-[10px] text-violet-400 font-medium truncate">{profile.role}</p>
            </div>
          </div>
          <button 
            onClick={() => alert('Session active. Secure logout ready.')} 
            className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800/50 transition-colors"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0f172a]">
        
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800/80 bg-[#0f172a]/80 backdrop-blur-md px-8 flex items-center justify-between z-10">
          <div className="flex items-center space-x-4 w-96">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text"
                placeholder="Search leads, contacts, campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1e293b]/70 border border-slate-700/60 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-violet-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications Dropdown Toggle */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl bg-[#1e293b]/60 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-[#1e293b] transition-all"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-violet-600 rounded-full text-[10px] font-bold flex items-center justify-center text-white border-2 border-[#0f172a]">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Popup */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-[#1e293b] border border-slate-700 rounded-2xl shadow-2xl py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 pb-2 border-b border-slate-700 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Notifications</span>
                    <span className="text-[10px] text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full font-semibold">{unreadCount} New</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-700/50">
                    {notifications.map(n => (
                      <div 
                        key={n.id} 
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-3 hover:bg-slate-800/50 cursor-pointer transition-colors ${!n.read ? 'bg-violet-950/20' : ''}`}
                      >
                        <div className="flex items-start justify-between">
                          <p className="text-xs font-semibold text-slate-200">{n.title}</p>
                          <span className="text-[10px] text-slate-400">{n.created_at}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Button */}
            <button 
              onClick={() => setActiveTab('leads')}
              className="flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-violet-500/20 transition-all"
            >
              <Plus size={16} />
              <span>New Lead</span>
            </button>
          </div>
        </header>

        {/* Scrollable Workspace Body */}
        <main className="flex-1 overflow-y-auto bg-[#0b0f19] p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

    </div>
  );
}

function NavItem({ icon, label, tab, activeTab, setActiveTab, badge }: {
  icon: React.ReactNode;
  label: string;
  tab: string;
  activeTab: string;
  setActiveTab: (t: string) => void;
  badge?: string;
}) {
  const isActive = activeTab === tab;
  return (
    <button
      onClick={() => setActiveTab(tab)}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
        isActive 
          ? 'bg-gradient-to-r from-violet-600/20 to-indigo-600/10 text-violet-300 border border-violet-500/30 shadow-sm' 
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
      }`}
    >
      <div className="flex items-center space-x-3">
        <span className={isActive ? 'text-violet-400' : 'text-slate-400'}>{icon}</span>
        <span>{label}</span>
      </div>
      {badge && (
        <span className="bg-violet-600/30 border border-violet-500/40 text-violet-300 text-[10px] px-2 py-0.5 rounded-full font-bold">
          {badge}
        </span>
      )}
    </button>
  );
}
