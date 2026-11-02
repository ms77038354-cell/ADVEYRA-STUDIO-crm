import React, { useState } from 'react';
import { Users, Plus, Search, Mail, Phone, Building, Tag, MoreHorizontal } from 'lucide-react';
import { useApp } from '../services/AppContext';

export default function ContactsView() {
  const { contacts, addContact } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [tag, setTag] = useState('VIP Client');

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    addContact({
      id: 'c-' + Date.now(),
      name,
      email,
      phone: phone || '+91 98765 43210',
      company: company || 'Independent',
      tag,
      created_at: new Date().toISOString().split('T')[0]
    });
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setShowNewModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center space-x-2">
            <Users size={20} className="text-violet-400" />
            <span>Contacts Directory</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage all agency leads, clients, and partner contacts in one place.</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1e293b]/70 border border-slate-700/60 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-violet-500"
            />
          </div>
          <button 
            onClick={() => setShowNewModal(true)}
            className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-violet-500/20 flex items-center space-x-2 transition-all"
          >
            <Plus size={16} />
            <span>Add Contact</span>
          </button>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-[#1e293b]/60 border border-slate-800 rounded-3xl shadow-xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0f172a]/70 text-slate-400 uppercase font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Contact Name</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Email Address</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Tag</th>
                <th className="px-6 py-4">Added</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredContacts.map(c => (
                <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-violet-300 font-bold text-xs">
                        {c.name.charAt(0)}
                      </div>
                      <span className="font-bold text-white">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300 font-medium">{c.company}</td>
                  <td className="px-6 py-4 text-slate-300 flex items-center space-x-1.5 pt-5">
                    <Mail size={12} className="text-violet-400" />
                    <span>{c.email}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    <span className="flex items-center space-x-1.5">
                      <Phone size={12} className="text-emerald-400" />
                      <span>{c.phone}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-violet-500/10 text-violet-300 border border-violet-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold">
                      {c.tag}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{c.created_at}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Contact Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1e293b] border border-slate-700 rounded-3xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-white mb-4">Add New Contact</h3>
            <form onSubmit={handleCreateContact} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. priya@company.com"
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                <input 
                  type="text" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Company</label>
                <input 
                  type="text" 
                  value={company} 
                  onChange={e => setCompany(e.target.value)}
                  placeholder="e.g. Apex Tech"
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tag / Category</label>
                <select 
                  value={tag} 
                  onChange={e => setTag(e.target.value)}
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="VIP Client">VIP Client</option>
                  <option value="Hot Lead">Hot Lead</option>
                  <option value="Partner">Partner</option>
                  <option value="Agency Vendor">Agency Vendor</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-500/20"
                >
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
