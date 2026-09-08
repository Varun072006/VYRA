import React, { useState } from 'react';
import {
  Brain,
  Search,
  Sparkles,
  Camera,
  Mic,
  FileText,
  Clock,
  Layers,
  CheckCircle,
  Tag,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { useVyra } from '../context/VyraContext';
import { SourceType } from '../types';

export const Memory: React.FC = () => {
  const {
    memories,
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    runSearch,
    telemetry
  } = useVyra();

  const [inputVal, setInputVal] = useState(
    searchQuery || 'What do I need to finish for Project Alpha?'
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setSearchQuery(inputVal);
    runSearch(inputVal);
  };

  const sampleQueries = [
    'What do I need to finish for Project Alpha?',
    'What did we decide in the strategy meeting?',
    'What deadlines do I have this month?',
    'OLED display vendor pricing and batch size?'
  ];

  const getSourceIcon = (type: SourceType) => {
    switch (type) {
      case 'CAMERA':
        return <Camera className="w-4 h-4 text-cyan-400" />;
      case 'MEETING':
      case 'VOICE':
        return <Mic className="w-4 h-4 text-purple-400" />;
      case 'NOTE':
        return <FileText className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Title */}
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Memory & Cross-Context Q&A
          </h1>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            TIER 1 KILLER FEATURE
          </span>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          Ask questions across your accumulated memories. VYRA searches multi-source contexts (documents, meetings, notes) and synthesizes a single, verified answer.
        </p>
      </div>

      {/* Hero Search Box */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative rounded-2xl bg-[#131926] border border-[#26344D] p-2 shadow-2xl focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all">
          <div className="flex items-center px-3 space-x-3">
            <Search className="w-5 h-5 text-cyan-400 shrink-0" />
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="Ask anything (e.g. 'What did we decide about Project Alpha?')..."
              className="w-full py-3 bg-transparent text-white placeholder-slate-500 text-base focus:outline-none font-medium"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-sm shadow-glow-cyan transition-all flex items-center space-x-2 shrink-0 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>{isSearching ? 'Thinking...' : 'Synthesize'}</span>
            </button>
          </div>
        </div>

        {/* Quick sample chips */}
        <div className="flex items-center space-x-2 pt-3 overflow-x-auto text-xs">
          <span className="text-slate-500 font-mono shrink-0">Try asking:</span>
          {sampleQueries.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setInputVal(q);
                setSearchQuery(q);
                runSearch(q);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#141B2A] hover:bg-[#1A2338] text-slate-300 hover:text-cyan-300 border border-[#243048] whitespace-nowrap transition-colors"
            >
              "{q}"
            </button>
          ))}
        </div>
      </form>

      {/* Synthesis Result Card (Hero Spec) */}
      {searchResults ? (
        <div className="rounded-2xl bg-gradient-to-b from-[#141C2E] to-[#101524] border border-cyan-500/40 p-6 shadow-2xl space-y-6 relative overflow-hidden animate-fadeIn">
          {/* Top execution badge */}
          <div className="flex items-center justify-between border-b border-[#212E47] pb-4">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Brain className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-xs font-mono font-bold uppercase text-cyan-300 tracking-wider">
                Cross-Context Answer
              </span>
            </div>

            <div className="flex items-center space-x-3 text-xs font-mono">
              <span className="flex items-center space-x-1.5 text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                <span>NPU Acceleration:</span>
                <span className="text-cyan-300 font-bold">
                  {searchResults.executedOnNpu ? 'Hexagon HTP' : 'CPU'}
                </span>
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {Math.round(searchResults.confidence * 100)}% Match
              </span>
            </div>
          </div>

          {/* Synthesized Answer */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              Synthesized Knowledge
            </div>
            <p className="text-base text-white font-medium leading-relaxed bg-[#0C111C]/60 p-4 rounded-xl border border-[#1E283D]">
              {searchResults.answer}
            </p>
          </div>

          {/* Sources Section (The Trust Anchor) */}
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center space-x-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Multi-Source Context Citations ({searchResults.sources.length})</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {searchResults.sources.map((src, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#0D121F] border border-[#202C42] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getSourceIcon(src.sourceType)}
                      <span className="text-xs font-bold text-slate-100">{src.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{src.date}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{src.snippet}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Entities */}
          {searchResults.relatedEntities && searchResults.relatedEntities.length > 0 && (
            <div className="pt-2 border-t border-[#202C42] flex items-center space-x-2">
              <span className="text-xs font-mono text-slate-400">Related Nodes:</span>
              <div className="flex flex-wrap gap-1.5">
                {searchResults.relatedEntities.map((entity, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-0.5 rounded-full bg-[#182338] text-cyan-300 border border-cyan-500/20 font-medium"
                  >
                    #{entity}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Empty State / Memory Explorer */
        <div className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold px-1">
            Accumulated Memories in Local Store ({memories.length})
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {memories.map(mem => (
              <div
                key={mem.id}
                className="p-5 rounded-2xl bg-[#131926] border border-[#222E42] hover:border-cyan-500/40 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getSourceIcon(mem.sourceType)}
                    <span className="text-xs font-mono text-slate-400 capitalize">
                      {mem.sourceType.toLowerCase()}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    {new Date(mem.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white">{mem.title}</h3>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {mem.summary}
                </p>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-cyan-400">
                    {mem.tasks.length} actions · {mem.deadlines.length} deadlines
                  </span>
                  <button
                    onClick={() => {
                      setInputVal(`What did we decide about ${mem.title}?`);
                      setSearchQuery(`What did we decide about ${mem.title}?`);
                      runSearch(`What did we decide about ${mem.title}?`);
                    }}
                    className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center space-x-1"
                  >
                    <span>Query</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
