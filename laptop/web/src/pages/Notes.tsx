import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Calendar,
  CheckSquare,
  Link,
  Camera,
  Mic,
  Tag,
  Clock,
  Sparkles
} from 'lucide-react';
import { useVyra } from '../context/VyraContext';
import { NoteItem } from '../types';

export const Notes: React.FC = () => {
  const { notes, addNote, memories } = useVyra();
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(notes[0] || null);

  // New Note Modal / inline form
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addNote(newTitle, newContent, 'Manual Workspace Note');
    setNewTitle('');
    setNewContent('');
    setIsCreating(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              VYRA Notes
            </h1>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
              MEM.AI ARCHITECTURE
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Dynamic knowledge notes auto-generated from phone captures, voice recordings, and manual synthesis.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center space-x-2 shadow-sm transition-all self-start"
        >
          <Plus className="w-4 h-4" />
          <span>New Note</span>
        </button>
      </div>

      {/* New Note Creator Drawer / Form */}
      {isCreating && (
        <form
          onSubmit={handleCreateNote}
          className="p-5 rounded-2xl bg-[#131926] border border-cyan-500/40 space-y-3 animate-fadeIn"
        >
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Create Connected Note</span>
          </h3>

          <input
            type="text"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            placeholder="Note title (e.g. 'Project Alpha Client Feedback')"
            className="w-full px-3.5 py-2 rounded-xl bg-[#0E1320] border border-[#232D42] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            autoFocus
          />

          <textarea
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
            placeholder="Note content, extracted tasks, or context bullets..."
            rows={4}
            className="w-full px-3.5 py-2 rounded-xl bg-[#0E1320] border border-[#232D42] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />

          <div className="flex items-center justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-cyan-500 text-black font-semibold text-xs"
            >
              Save Note
            </button>
          </div>
        </form>
      )}

      {/* Two Column Layout: Notes List + Active Note Detail */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[500px]">
        {/* Left Col: Note List */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold px-1">
            All Notes ({notes.length})
          </div>

          <div className="space-y-2">
            {notes.map(n => {
              const isSelected = selectedNote?.id === n.id;
              return (
                <div
                  key={n.id}
                  onClick={() => setSelectedNote(n)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#182133] border-cyan-500/50 shadow-md'
                      : 'bg-[#121724] border-[#222E42] hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <h4 className="text-sm font-bold text-white">{n.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                    {n.content}
                  </p>
                  <div className="flex items-center justify-between mt-3 text-[10px] font-mono text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                    </span>
                    {n.sourceLabel && (
                      <span className="px-1.5 py-0.5 rounded bg-[#1C2538] text-cyan-300 border border-[#283752]">
                        {n.sourceLabel}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Cols: Active Note Workspace (Mem.ai Style) */}
        <div className="md:col-span-2 rounded-2xl bg-[#121724] border border-[#222E42] p-6 space-y-6 flex flex-col justify-between shadow-xl">
          {selectedNote ? (
            <div className="space-y-6">
              {/* Note Header */}
              <div className="space-y-2 border-b border-[#1E2738] pb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {selectedNote.sourceLabel || 'Context Note'}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Created {new Date(selectedNote.createdAt).toLocaleString()}
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-white">{selectedNote.title}</h2>
              </div>

              {/* Note Body */}
              <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed space-y-4">
                <p className="whitespace-pre-line">{selectedNote.content}</p>
              </div>

              {/* Tasks Checklist if present */}
              {selectedNote.tasks && selectedNote.tasks.length > 0 && (
                <div className="p-4 rounded-xl bg-[#0D121D] border border-[#202B3E] space-y-2.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center space-x-1.5">
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>Extracted Action Items</span>
                  </h4>
                  <div className="space-y-2">
                    {selectedNote.tasks.map((taskText, idx) => (
                      <label
                        key={idx}
                        className="flex items-center space-x-3 text-xs text-slate-200 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          className="rounded bg-[#1A2234] border-slate-700 text-cyan-500 focus:ring-0 focus:ring-offset-0"
                        />
                        <span className="group-hover:text-cyan-300 transition-colors">
                          {taskText}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Connected Memories & Sources */}
              <div className="p-4 rounded-xl bg-[#0D121D] border border-[#202B3E] space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center space-x-1.5">
                  <Link className="w-3.5 h-3.5" />
                  <span>Linked Multi-Context Sources</span>
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  <div className="flex items-center space-x-1.5 text-xs px-2.5 py-1 rounded-lg bg-[#161D2E] text-cyan-300 border border-cyan-500/30">
                    <Camera className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Camera: Project Alpha Spec</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs px-2.5 py-1 rounded-lg bg-[#161D2E] text-purple-300 border border-purple-500/30">
                    <Mic className="w-3.5 h-3.5 text-purple-400" />
                    <span>Voice: Strategy Sync Meeting</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500 py-12">
              Select a note on the left to view its connected context.
            </div>
          )}

          <div className="text-xs text-slate-500 font-mono border-t border-[#1E2738] pt-3 flex items-center justify-between">
            <span>Encrypted Room & SQLite Local Store</span>
            <span>Zero Cloud Telemetry</span>
          </div>
        </div>
      </div>
    </div>
  );
};
