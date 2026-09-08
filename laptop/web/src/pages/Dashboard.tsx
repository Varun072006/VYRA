import React from 'react';
import {
  Calendar,
  CheckSquare,
  Brain,
  Zap,
  ArrowUpRight,
  Clock,
  Camera,
  Mic,
  FileText,
  Smartphone,
  Cpu,
  BookmarkPlus,
  Send,
  AlertCircle
} from 'lucide-react';
import { useVyra } from '../context/VyraContext';
import { ContextCard } from '../components/ContextCard';

interface DashboardProps {
  onNavigateTab: (tab: string) => void;
  onOpenSimulator: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigateTab, onOpenSimulator }) => {
  const {
    memories,
    inboxContexts,
    tasks,
    deadlines,
    telemetry,
    saveContextToMemory,
    dismissContext
  } = useVyra();

  const pendingTasks = tasks.filter(t => t.status === 'PENDING');
  const heroMemory = memories.find(m => m.title.includes('Project Alpha')) || memories[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner / Hero Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              VYRA Workspace
            </h1>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              iQOO 15 PAIRED
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Real-time on-device contextual intelligence stream from your Snapdragon 8 Elite NPU.
          </p>
        </div>

        {/* Quick Capture / Simulation triggers */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenSimulator}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-black font-bold text-xs flex items-center space-x-2 shadow-glow-cyan hover:opacity-95 transition-all"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Simulate Capture Flow</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigateTab('tasks')}
          className="p-4 rounded-2xl bg-[#131826] border border-[#222E42] hover:border-cyan-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider font-mono">
              Pending Tasks
            </span>
            <CheckSquare className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-white font-mono">
              {pendingTasks.length}
            </span>
            <span className="text-xs text-cyan-400">active items</span>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('tasks')}
          className="p-4 rounded-2xl bg-[#131826] border border-[#222E42] hover:border-amber-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider font-mono">
              Deadlines
            </span>
            <Calendar className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-white font-mono">
              {deadlines.length}
            </span>
            <span className="text-xs text-amber-300">approaching</span>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('memory')}
          className="p-4 rounded-2xl bg-[#131826] border border-[#222E42] hover:border-purple-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider font-mono">
              Saved Memories
            </span>
            <Brain className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-white font-mono">
              {memories.length}
            </span>
            <span className="text-xs text-purple-300">indexed locally</span>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('settings')}
          className="p-4 rounded-2xl bg-[#131826] border border-[#222E42] hover:border-indigo-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider font-mono">
              NPU Latency
            </span>
            <Cpu className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-white font-mono">
              {telemetry.latencyMs}ms
            </span>
            <span className="text-xs text-emerald-400 font-mono">Hexagon HTP</span>
          </div>
        </div>
      </div>

      {/* Hero Feature Showcase Card: "Project Alpha" */}
      {heroMemory && (
        <div className="rounded-2xl bg-gradient-to-br from-[#161F33] via-[#121828] to-[#0E1322] border border-cyan-500/30 p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                  CRITICAL CONTEXT
                </span>
                <span className="text-xs text-slate-400">Captured via iQOO 15 Lens</span>
              </div>

              <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
                <span>{heroMemory.title}</span>
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                {heroMemory.summary}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {heroMemory.deadlines.map(dl => (
                  <div
                    key={dl.id}
                    className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30"
                  >
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Deadline: {dl.date}</span>
                  </div>
                ))}

                {heroMemory.tasks.map(t => (
                  <div
                    key={t.id}
                    className="flex items-center space-x-1.5 text-xs font-medium px-3 py-1 rounded-lg bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                  >
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>Action: {t.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
              <button
                onClick={() => onNavigateTab('memory')}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-sm"
              >
                <Brain className="w-4 h-4" />
                <span>Ask Cross-Context Q&A</span>
              </button>

              <button
                onClick={() => onNavigateTab('notes')}
                className="px-4 py-2 rounded-xl bg-[#1F293D] hover:bg-[#28354E] text-slate-200 font-semibold text-xs border border-[#2D3C57] transition-colors flex items-center justify-center space-x-1.5"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Open Note View</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid: Fresh Inbound Contexts (Inbox Preview) & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Inbound Context Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <span>Fresh Contexts from Phone</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                {inboxContexts.length}
              </span>
            </h3>
            <button
              onClick={() => onNavigateTab('inbox')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center space-x-1"
            >
              <span>View All Inbox</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {inboxContexts.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#131826] border border-dashed border-[#232E42] text-center text-slate-400 text-sm">
              No new pending items. Point your iQOO 15 at a document or record a voice memo to extract context.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {inboxContexts.slice(0, 2).map(ctx => (
                <ContextCard
                  key={ctx.id}
                  context={ctx}
                  onSave={saveContextToMemory}
                  onDismiss={dismissContext}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right 1 Col: Live Session Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot"></span>
              <span>Live Phone Continuity</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Snapdragon NPU</span>
          </div>

          <div className="rounded-2xl bg-[#131826] border border-[#232E42] p-4 space-y-3">
            <div className="text-xs font-semibold text-slate-300 flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="flex items-center space-x-1.5">
                <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                <span>OriginOS 6 Connection</span>
              </span>
              <span className="text-emerald-400 font-mono text-[10px]">CONNECTED</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              When documents or voice audio are captured on your iQOO 15, structured context cards sync automatically to this workspace.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigateTab('live')}
                className="w-full py-2 rounded-xl bg-[#1A2234] hover:bg-[#222C42] border border-[#273550] text-cyan-300 font-semibold text-xs transition-colors flex items-center justify-center space-x-2"
              >
                <span>Open Live Stream Monitor</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
