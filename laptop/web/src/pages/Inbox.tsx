import React, { useState } from 'react';
import {
  Inbox as InboxIcon,
  Filter,
  Camera,
  Mic,
  FileText,
  BookmarkPlus,
  Trash2,
  Sparkles,
  Zap
} from 'lucide-react';
import { useVyra } from '../context/VyraContext';
import { ContextCard } from '../components/ContextCard';
import { SourceType } from '../types';

interface InboxProps {
  onOpenSimulator: () => void;
}

export const Inbox: React.FC<InboxProps> = ({ onOpenSimulator }) => {
  const { inboxContexts, saveContextToMemory, dismissContext } = useVyra();
  const [filterSource, setFilterSource] = useState<string>('ALL');

  const filtered = inboxContexts.filter(ctx => {
    if (filterSource === 'ALL') return true;
    return ctx.sourceType === filterSource;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Title & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Inbox
            </h1>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              {inboxContexts.length} PENDING
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Raw contexts recently captured by your iQOO 15 (Lens, Voice, or Notes). Choose what to remember.
          </p>
        </div>

        {/* Source Type Filter Bar */}
        <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-[#131826] border border-[#232D42] self-start">
          <button
            onClick={() => setFilterSource('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterSource === 'ALL'
                ? 'bg-cyan-500 text-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({inboxContexts.length})
          </button>
          <button
            onClick={() => setFilterSource('CAMERA')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterSource === 'CAMERA'
                ? 'bg-cyan-500 text-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Lens</span>
          </button>
          <button
            onClick={() => setFilterSource('MEETING')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterSource === 'MEETING'
                ? 'bg-cyan-500 text-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Voice</span>
          </button>
          <button
            onClick={() => setFilterSource('NOTE')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterSource === 'NOTE'
                ? 'bg-cyan-500 text-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Notes</span>
          </button>
        </div>
      </div>

      {/* Grid of Context Cards */}
      {filtered.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#131826] border border-dashed border-[#232E42] text-center space-y-3">
          <InboxIcon className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">Inbox Zero</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            All captured contexts have been filed into persistent memory or dismissed. Use the simulator to capture fresh content!
          </p>
          <button
            onClick={onOpenSimulator}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-black font-semibold text-xs border border-cyan-500/30 transition-all inline-flex items-center space-x-2"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Simulate Incoming Capture</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(context => (
            <ContextCard
              key={context.id}
              context={context}
              onSave={saveContextToMemory}
              onDismiss={dismissContext}
            />
          ))}
        </div>
      )}
    </div>
  );
};
