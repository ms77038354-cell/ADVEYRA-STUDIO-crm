import React, { useState } from 'react';
import { useApp } from '../services/AppContext';
import { CheckSquare, Plus, Calendar, Clock, AlertCircle, User, CheckCircle2 } from 'lucide-react';

export default function TasksView() {
  const { tasks, addTask, toggleTaskComplete } = useApp();
  const [filterPriority, setFilterPriority] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('Sarah Jenkins');
  const [newTaskPriority, setNewTaskPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [newTaskDue, setNewTaskDue] = useState('2025-04-10');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTask({
      title: newTaskTitle,
      assignee: newTaskAssignee,
      priority: newTaskPriority,
      dueDate: newTaskDue
    });
    setNewTaskTitle('');
    setShowModal(false);
  };

  const filteredTasks = tasks.filter(t => filterPriority === 'All' || t.priority === filterPriority);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Agency Tasks & Projects</h2>
          <p className="text-xs text-slate-400 mt-0.5">Assign deliverables, track deadlines, and manage internal team workload.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-violet-500/20"
        >
          <Plus size={16} />
          <span>New Task</span>
        </button>
      </div>

      <div className="flex items-center space-x-2 bg-[#1e293b]/60 border border-slate-700/60 p-4 rounded-2xl">
        <span className="text-xs font-semibold text-slate-400 mr-2">Priority:</span>
        {['All', 'High', 'Medium', 'Low'].map(p => (
          <button 
            key={p} 
            onClick={() => setFilterPriority(p)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterPriority === p ? 'bg-violet-600 text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="bg-[#1e293b]/50 border border-slate-700/60 rounded-2xl overflow-hidden shadow-xl">
        <div className="divide-y divide-slate-700/50">
          {filteredTasks.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">No tasks found.</div>
          ) : (
            filteredTasks.map(task => (
              <div key={task.id} className="p-4 flex items-center justify-between hover:bg-slate-800/40 transition-colors">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => toggleTaskComplete(task.id)}
                    className={`h-5 w-5 rounded-lg border flex items-center justify-center transition-all ${
                      task.completed ? 'bg-violet-600 border-violet-600 text-white' : 'border-slate-600 hover:border-violet-500'
                    }`}
                  >
                    {task.completed && <CheckCircle2 size={14} />}
                  </button>
                  <div>
                    <h4 className={`text-xs font-semibold ${task.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                      {task.title}
                    </h4>
                    <div className="flex items-center space-x-3 mt-1 text-[10px] text-slate-400">
                      <span className="flex items-center space-x-1"><User size={12} /><span>{task.assignee}</span></span>
                      <span className="flex items-center space-x-1"><Calendar size={12} /><span>{task.dueDate}</span></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                    task.priority === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/30' :
                    task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                    'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-6">
            <h3 className="text-base font-bold text-white">Create New Task</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Task Title *</label>
                <input 
                  type="text" 
                  required 
                  value={newTaskTitle} 
                  onChange={e => setNewTaskTitle(e.target.value)}
                  placeholder="Design Facebook Ad Creative" 
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Assignee</label>
                  <select 
                    value={newTaskAssignee}
                    onChange={e => setNewTaskAssignee(e.target.value)}
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                  >
                    <option value="Sarah Jenkins">Sarah Jenkins</option>
                    <option value="Alex Morgan">Alex Morgan</option>
                    <option value="David Miller">David Miller</option>
                    <option value="Emma Watson">Emma Watson</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
                  <select 
                    value={newTaskPriority}
                    onChange={e => setNewTaskPriority(e.target.value as any)}
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Due Date</label>
                <input 
                  type="date" 
                  value={newTaskDue}
                  onChange={e => setNewTaskDue(e.target.value)}
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/20"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
