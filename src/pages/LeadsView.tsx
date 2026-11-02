import React, { useState } from 'react';
import { useApp } from '../services/AppContext';
import { 
  Plus, Search, Filter, Phone, Mail, Building2, MapPin, Tag, 
  Trash2, Edit, CheckCircle2, UserCheck, ArrowRight, Download, Upload
} from 'lucide-react';

export default function LeadsView() {
  const { leads, addLead, updateLeadStatus } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);

  const [newLead, setNewLead] = useState({
    title: '',
    contact_id: 'cnt_1', // Defaulting for demo
    company: '',
    email: '',
    phone: '',
    value: 5000,
    source: 'Meta Ads',
    stage: 'New' as const,
    priority: 'Medium' as const
  });

  const stages = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Converted', 'Lost'];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.title) return;
    addLead(newLead);
    setShowNewModal(false);
    setNewLead({ title: '', contact_id: 'cnt_1', company: '', email: '', phone: '', value: 5000, source: 'Meta Ads', stage: 'New', priority: 'Medium' });
  };

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (l.company || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || l.stage === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Leads & Sales Pipeline</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage deals, track pipeline stages, and convert prospects into active clients.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowNewModal(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-violet-500/20 transition-all"
          >
            <Plus size={16} />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1e293b]/60 border border-slate-700/60 p-4 rounded-2xl">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
          <span className="text-xs font-semibold text-slate-400 mr-2">Stage:</span>
          {['All', ...stages].map(stage => (
            <button
              key={stage}
              onClick={() => setFilterStatus(stage)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                filterStatus === stage 
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-500/30' 
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {stage}
            </button>
          ))}
        </div>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input 
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0f172a] border border-slate-700 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>

      {/* Leads Table / Kanban View */}
      <div className="bg-[#1e293b]/50 border border-slate-700/60 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/60 bg-[#1e293b]/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Lead Title</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Deal Value</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Stage</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 text-xs text-slate-300">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No leads found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      <div>{lead.title}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{lead.contact_name}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{lead.company}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-400">${lead.value.toLocaleString()}</td>
                    <td className="py-3.5 px-4">
                      <span className="bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded-md text-[10px] font-semibold">
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                        lead.priority === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/30' :
                        lead.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                        'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                      }`}>
                        {lead.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <select 
                        value={lead.stage}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                        className="bg-[#0f172a] border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                      >
                        {stages.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button 
                        onClick={() => alert(`Opening lead details for ${lead.title}`)}
                        className="p-1.5 bg-slate-800 hover:bg-violet-600 text-slate-300 hover:text-white rounded-lg transition-colors"
                        title="View Details"
                      >
                        <ArrowRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Lead Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <h3 className="text-base font-bold text-white">Create New Lead</h3>
              <button onClick={() => setShowNewModal(false)} className="text-slate-400 hover:text-white text-sm">✕</button>
            </div>
            
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Lead Title *</label>
                  <input 
                    type="text" 
                    required 
                    value={newLead.title} 
                    onChange={e => setNewLead({...newLead, title: e.target.value})}
                    placeholder="Project Name" 
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company</label>
                  <input 
                    type="text" 
                    value={newLead.company} 
                    onChange={e => setNewLead({...newLead, company: e.target.value})}
                    placeholder="Acme Corp" 
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Deal Value ($)</label>
                  <input 
                    type="number" 
                    value={newLead.value} 
                    onChange={e => setNewLead({...newLead, value: Number(e.target.value)})}
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Source</label>
                  <select 
                    value={newLead.source} 
                    onChange={e => setNewLead({...newLead, source: e.target.value})}
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                  >
                    <option value="Meta Ads">Meta Ads</option>
                    <option value="Google Ads">Google Ads</option>
                    <option value="Direct Outreach">Direct Outreach</option>
                    <option value="Referral">Referral</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
                  <select 
                    value={newLead.priority} 
                    onChange={e => setNewLead({...newLead, priority: e.target.value as any})}
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-700">
                <button 
                  type="button" 
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-indigo-500 transition-all"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
