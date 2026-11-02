import React, { useState } from 'react';
import { 
  MessageSquare, Send, Phone, Mail, Sparkles, User, Search, Paperclip, CheckCheck, Bot
} from 'lucide-react';
import { useApp } from '../services/AppContext';

export default function InboxView() {
  const { conversations, selectedConversationId, setSelectedConversationId, addMessageToConversation, messages } = useApp();
  const [inputText, setInputText] = useState('');
  const [filterChannel, setFilterChannel] = useState<'All' | 'WhatsApp' | 'Instagram' | 'Messenger'>('All');

  const activeConv = conversations.find(c => c.id === selectedConversationId) || conversations[0];
  const activeMessages = activeConv ? (messages[activeConv.id] || []) : [];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;
    await addMessageToConversation(activeConv.id, {
      sender_type: 'agent',
      sender_name: 'Agent',
      content: inputText
    });
    setInputText('');
  };

  const filteredConversations = filterChannel === 'All' 
    ? conversations 
    : conversations.filter(c => c.channel === filterChannel);

  return (
    <div className="h-[calc(100vh-9rem)] bg-[#1e293b]/60 border border-slate-800 rounded-3xl shadow-xl backdrop-blur-md flex overflow-hidden animate-in fade-in duration-300">
      
      {/* 1. Conversations Sidebar */}
      <div className="w-80 border-r border-slate-800 flex flex-col bg-[#0f172a]/50">
        <div className="p-4 border-b border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center space-x-2">
              <MessageSquare size={16} className="text-violet-400" />
              <span>Unified Inbox</span>
            </h2>
            <span className="text-[10px] bg-violet-500/10 text-violet-400 font-semibold px-2 py-0.5 rounded-full border border-violet-500/20">
              {conversations.length} Active
            </span>
          </div>
          
          <div className="flex space-x-1 bg-[#1e293b] p-1 rounded-xl border border-slate-700/60 text-xs">
            {(['All', 'WhatsApp', 'Instagram', 'Messenger'] as const).map(ch => (
              <button
                key={ch}
                onClick={() => setFilterChannel(ch)}
                className={`flex-1 py-1 rounded-lg font-medium transition-all ${
                  filterChannel === ch ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {ch}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/50">
          {filteredConversations.map(conv => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversationId(conv.id)}
              className={`p-4 cursor-pointer transition-colors flex items-start space-x-3 ${
                activeConv?.id === conv.id ? 'bg-violet-600/15 border-l-4 border-violet-500' : 'hover:bg-slate-800/40'
              }`}
            >
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-violet-300 font-bold text-sm">
                  {conv.contact_name.charAt(0)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-white truncate">{conv.contact_name}</p>
                  <span className="text-[10px] text-slate-400">{conv.updated_at}</span>
                </div>
                <p className="text-xs text-slate-400 truncate mt-0.5">{conv.last_message}</p>
                <div className="flex items-center space-x-2 mt-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-violet-400 font-semibold">{conv.channel}</span>
                  {conv.unread_count > 0 && (
                    <span className="h-4 w-4 bg-violet-600 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                      {conv.unread_count}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Active Chat Area */}
      {activeConv ? (
        <div className="flex-1 flex flex-col bg-[#0b0f19]">
          <div className="h-16 px-6 border-b border-slate-800 bg-[#1e293b]/40 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 rounded-full bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-violet-300 font-bold text-sm">
                {activeConv.contact_name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">{activeConv.contact_name}</h3>
                <p className="text-[10px] text-slate-400">Channel: <span className="text-violet-400 font-semibold">{activeConv.channel}</span></p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {activeMessages.map(msg => {
              const isAgent = msg.sender_type === 'agent';
              return (
                <div key={msg.id} className={`flex ${isAgent ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md rounded-2xl px-4 py-3 shadow-md ${
                    isAgent 
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-tr-sm' 
                      : 'bg-[#1e293b] border border-slate-700/60 text-slate-100 rounded-tl-sm'
                  }`}>
                    <p className="text-xs leading-relaxed">{msg.content}</p>
                    <div className={`flex items-center justify-end space-x-1 mt-1 text-[10px] ${isAgent ? 'text-violet-200' : 'text-slate-400'}`}>
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-[#1e293b]/40 flex items-center space-x-3">
            <input 
              type="text"
              placeholder={`Reply to ${activeConv.contact_name}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-[#0f172a] border border-slate-700/60 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-violet-500"
            />
            <button 
              type="submit"
              className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-lg shadow-violet-500/25 flex items-center space-x-2 transition-all"
            >
              <span>Send</span>
              <Send size={14} />
            </button>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
          Select a conversation from the sidebar
        </div>
      )}
    </div>
  );
}
