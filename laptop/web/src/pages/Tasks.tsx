import React, { useState } from 'react';
import {
  CheckSquare,
  Calendar,
  Clock,
  Plus,
  CheckCircle2,
  Circle,
  AlertTriangle,
  User,
  ExternalLink
} from 'lucide-react';
import { useVyra } from '../context/VyraContext';

export const Tasks: React.FC = () => {
  const { tasks, deadlines, toggleTaskStatus, addTask } = useVyra();
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'DONE'>('ALL');
  const [newTitle, setNewTitle] = useState('');
  const [newDue, setNewDue] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addTask(newTitle, newDue, newOwner);
    setNewTitle('');
    setNewDue('');
    setNewOwner('');
    setIsAdding(false);
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'PENDING') return t.status === 'PENDING';
    if (filter === 'DONE') return t.status === 'DONE';
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Tasks & Deadlines
            </h1>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              CONTEXT EXTRACTED
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Action items and critical milestones extracted automatically by the on-device Context Engine.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center space-x-2 transition-all self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Add Task Drawer */}
      {isAdding && (
        <form
          onSubmit={handleAddTask}
          className="p-5 rounded-2xl bg-[#131926] border border-cyan-500/40 space-y-3 animate-fadeIn"
        >
          <h3 className="text-sm font-bold text-white">Create New Action Item</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="Task description (e.g. 'Review OLED specification')"
              className="sm:col-span-2 px-3.5 py-2 rounded-xl bg-[#0E1320] border border-[#232D42] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              autoFocus
            />
            <input
              type="text"
              value={newDue}
              onChange={e => setNewDue(e.target.value)}
              placeholder="Due date (e.g. 'Sep 18')"
              className="px-3.5 py-2 rounded-xl bg-[#0E1320] border border-[#232D42] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-cyan-500 text-black font-semibold text-xs"
            >
              Save Action
            </button>
          </div>
        </form>
      )}

      {/* Section 1: Deadlines Radar */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Upcoming Deadlines ({deadlines.length})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {deadlines.map(dl => (
            <div
              key={dl.id}
              className="p-4 rounded-xl bg-[#141B2B] border border-[#232F47] flex items-center justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-white">{dl.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    {dl.date}
                  </span>
                </div>
                <p className="text-xs text-slate-300">Action: {dl.action}</p>
              </div>

              <div className="text-right font-mono">
                <span className="text-lg font-extrabold text-amber-400">
                  {dl.daysRemaining}
                </span>
                <span className="text-[10px] text-slate-400 block uppercase">days left</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Tasks List */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center space-x-2">
            <CheckSquare className="w-4 h-4" />
            <span>Extracted Action Items ({tasks.length})</span>
          </h3>

          <div className="flex items-center space-x-1 p-1 rounded-lg bg-[#131826] border border-[#232D42] text-xs">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                filter === 'ALL' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('PENDING')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                filter === 'PENDING' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('DONE')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                filter === 'DONE' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              Done
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {filteredTasks.map(task => {
            const isDone = task.status === 'DONE';
            return (
              <div
                key={task.id}
                onClick={() => toggleTaskStatus(task.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isDone
                    ? 'bg-[#0E1320] border-[#1C2538] text-slate-500'
                    : 'bg-[#131926] border-[#222E42] hover:border-cyan-500/40 text-slate-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 shrink-0" />
                  )}
                  <div>
                    <p
                      className={`text-sm font-semibold transition-all ${
                        isDone ? 'line-through text-slate-500' : 'text-white'
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center space-x-3 text-[11px] text-slate-400 font-mono mt-0.5">
                      {task.due && <span>Due: {task.due}</span>}
                      {task.owner && (
                        <span className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{task.owner}</span>
                        </span>
                      )}
                      {task.sourceTitle && (
                        <span className="text-cyan-400">from {task.sourceTitle}</span>
                      )}
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                    task.priority === 'HIGH'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-[#1A2234] text-slate-400 border border-[#28354E]'
                  }`}
                >
                  {task.priority || 'NORMAL'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
