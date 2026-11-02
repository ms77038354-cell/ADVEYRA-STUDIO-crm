import React, { useState } from 'react';
import { useApp } from '../services/AppContext';
import { Building2, Users, DollarSign, Calendar, CheckCircle, Mail, Phone, ExternalLink } from 'lucide-react';

export default function ClientsView() {
  const { clients } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.package_details.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Active Client Management</h2>
          <p className="text-xs text-slate-400 mt-0.5">Monitor active agency accounts, service packages, contracts, and monthly revenue.</p>
        </div>
        <button 
          onClick={() => alert('Convert a lead or create client directly from pipeline.')}
          className="flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-violet-500/20"
        >
          <span>Add New Client</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map(client => (
          <div key={client.id} className="bg-[#1e293b]/60 border border-slate-700/60 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-violet-500/40 transition-all">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 font-bold text-base">
                    {client.company.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{client.company}</h3>
                    <p className="text-xs text-slate-400">{client.name}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  client.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-slate-700 text-slate-300'
                }`}>
                  {client.status}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Package / Service</span>
                  <span className="font-semibold text-violet-300 bg-violet-950/40 px-2 py-0.5 rounded border border-violet-800/40">{client.package_details}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Account Manager</span>
                  <span className="font-semibold text-slate-200">{client.account_manager_name}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Renewal Date</span>
                  <span className="text-slate-300">{client.contract_end}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Mail size={14} className="hover:text-white cursor-pointer" />
                <Phone size={14} className="hover:text-white cursor-pointer" />
              </div>
              <button 
                onClick={() => alert(`Viewing client portal & reports for ${client.company}`)}
                className="text-xs text-violet-400 hover:text-violet-300 font-semibold flex items-center space-x-1"
              >
                <span>View Portal</span>
                <ExternalLink size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
