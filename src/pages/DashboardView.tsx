import React, { useState } from 'react';
import { 
  TrendingUp, Users, DollarSign, CheckCircle2, Clock, 
  ArrowUpRight, ArrowDownRight, Megaphone, Plus, Sparkles, Filter
} from 'lucide-react';
import { useApp } from '../services/AppContext';

export default function DashboardView() {
  const { leads, clients, tasks, setActiveTab } = useApp();
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');

  const totalRevenue = clients.reduce((acc, c) => acc + c.total_value, 0);
  const activeLeadsCount = leads.filter(l => l.status !== 'Closed Won' && l.status !== 'Closed Lost').length;
  const completedTasksCount = tasks.filter(t => t.status === 'Completed').length;
  const conversionRate = leads.length > 0 ? ((leads.filter(l => l.status === 'Closed Won').length / leads.length) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-900/40 via-indigo-900/30 to-[#1e293b]/50 border border-violet-500/20 rounded-3xl p-8 shadow-xl">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-violet-500/10 border border-violet-500/30 px-3 py-1 rounded-full text-xs font-semibold text-violet-300 mb-3">
              <Sparkles size={14} className="text-violet-400" />
              <span>ADVEYRA AI Agent & CRM Engine Active</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, Executive 👋
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-xl">
              Your agency pipeline is performing strongly. You have <span className="text-violet-400 font-bold">{activeLeadsCount} active leads</span> and ₹{totalRevenue.toLocaleString()} in total client value.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setActiveTab('leads')}
              className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-500/25 transition-all flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add New Lead</span>
            </button>
            <button 
              onClick={() => setActiveTab('campaigns')}
              className="px-5 py-2.5 rounded-xl bg-[#1e293b] hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all flex items-center space-x-2"
            >
              <Megaphone size={16} className="text-violet-400" />
              <span>View Campaigns</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard 
          title="Total Pipeline Value"
          value={`₹${totalRevenue.toLocaleString()}`}
          change="+18.4%"
          isPositive={true}
          icon={<DollarSign size={20} className="text-violet-400" />}
          gradient="from-violet-500/10 to-indigo-500/5"
        />
        <MetricCard 
          title="Active Leads"
          value={activeLeadsCount.toString()}
          change="+12 active"
          isPositive={true}
          icon={<Users size={20} className="text-blue-400" />}
          gradient="from-blue-500/10 to-cyan-500/5"
        />
        <MetricCard 
          title="Conversion Rate"
          value={`${conversionRate}%`}
          change="+4.2%"
          isPositive={true}
          icon={<TrendingUp size={20} className="text-emerald-400" />}
          gradient="from-emerald-500/10 to-teal-500/5"
        />
        <MetricCard 
          title="Tasks Completed"
          value={`${completedTasksCount} / ${tasks.length}`}
          change="On track"
          isPositive={true}
          icon={<CheckCircle2 size={20} className="text-amber-400" />}
          gradient="from-amber-500/10 to-orange-500/5"
        />
      </div>

      {/* Main Content Split: Pipeline Summary & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Lead Stage Overview */}
        <div className="lg:col-span-2 bg-[#1e293b]/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-white">Lead Pipeline Breakdown</h2>
              <p className="text-xs text-slate-400">Distribution of leads across conversion stages</p>
            </div>
            <button 
              onClick={() => setActiveTab('leads')}
              className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center space-x-1"
            >
              <span>View Kanban</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="space-y-4">
            {[
              { stage: 'New Inquiry', count: leads.filter(l => l.status === 'New Inquiry').length, color: 'bg-blue-500', width: '75%' },
              { stage: 'Contacted', count: leads.filter(l => l.status === 'Contacted').length, color: 'bg-indigo-500', width: '60%' },
              { stage: 'Meeting Scheduled', count: leads.filter(l => l.status === 'Meeting Scheduled').length, color: 'bg-violet-500', width: '45%' },
              { stage: 'Proposal Sent', count: leads.filter(l => l.status === 'Proposal Sent').length, color: 'bg-amber-500', width: '30%' },
              { stage: 'Closed Won', count: leads.filter(l => l.status === 'Closed Won').length, color: 'bg-emerald-500', width: '50%' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300">{item.stage}</span>
                  <span className="font-bold text-slate-200">{item.count} Leads</span>
                </div>
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: item.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Quick Tasks & Reminders */}
        <div className="bg-[#1e293b]/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-white">Priority Tasks</h2>
              <button 
                onClick={() => setActiveTab('tasks')}
                className="text-xs font-semibold text-violet-400 hover:text-violet-300"
              >
                Manage All
              </button>
            </div>

            <div className="space-y-3">
              {tasks.slice(0, 4).map(task => (
                <div key={task.id} className="p-3 rounded-2xl bg-[#0f172a]/70 border border-slate-700/50 flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-200">{task.title}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        task.priority === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}>
                        {task.priority}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center space-x-1">
                        <Clock size={10} />
                        <span>{task.due_date}</span>
                      </span>
                    </div>
                  </div>
                  <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                    task.status === 'Completed' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-600'
                  }`}>
                    {task.status === 'Completed' && <CheckCircle2 size={10} />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>ADVEYRA AI Assistant</span>
              <span className="text-emerald-400 font-semibold">● Online</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

function MetricCard({ title, value, change, isPositive, icon, gradient }: {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  gradient: string;
}) {
  return (
    <div className={`bg-gradient-to-br ${gradient} bg-[#1e293b]/70 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</span>
        <div className="h-10 w-10 rounded-2xl bg-[#0f172a] border border-slate-700/60 flex items-center justify-center shadow-md">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl font-extrabold text-white">{value}</h3>
        <span className={`inline-flex items-center space-x-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
          isPositive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
        }`}>
          {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          <span>{change}</span>
        </span>
      </div>
    </div>
  );
}
