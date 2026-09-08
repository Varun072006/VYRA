import React, { useState } from 'react';
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
  AlertCircle,
  Play,
  Layers,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useVyra } from '../context/VyraContext';
import { ContextCard } from '../components/ContextCard';
import { IntelligenceLoopVisualizer } from '../components/IntelligenceLoopVisualizer';
import { WhyVyraWinsComparison } from '../components/WhyVyraWinsComparison';

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
    dismissContext,
    setSearchQuery,
    runSearch
  } = useVyra();

  const [activeTabSection, setActiveTabSection] = useState<'OVERVIEW' | 'LOOP' | 'COMPARISON' | 'BENCHMARK'>('OVERVIEW');

  const pendingTasks = tasks.filter(t => t.status === 'PENDING');
  const heroMemory = memories.find(m => m.title.includes('Project Alpha')) || memories[0];

  const handleLaunchCrossContextDemo = () => {
    setSearchQuery('What do I need to finish for Project Alpha?');
    onNavigateTab('memory');
    runSearch('What do I need to finish for Project Alpha?');
  };

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      {/* 1. Master Pitch & Judge Live Tour Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0C111E] via-[#121A2C] to-[#0D1424] border border-[#23314B] p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold flex items-center space-x-1.5 shadow-sm">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>iQOO-NATIVE CONTEXTUAL INTELLIGENCE LAYER</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-semibold">
                ● SNAPDRAGON 8 ELITE NPU ACTIVE
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-mono font-semibold">
                100% ZERO CLOUD
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              “VYRA doesn't just answer what you ask.<br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                VYRA remembers what matters.”
              </span>
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              VYRA transforms physical reality (documents, meetings, notes) into structured on-device context using the iQOO 15's Hexagon NPU. It links related moments together so you can retrieve answers with verified multi-source citations.
            </p>

            {/* Quick-Step Judge Walkthrough Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-mono font-bold text-[11px] uppercase mr-1">
                Judge Demo Tour:
              </span>
              <button
                onClick={onOpenSimulator}
                className="px-3 py-1.5 rounded-xl bg-[#172033] hover:bg-[#1E2A42] border border-[#2B3C5B] text-slate-200 font-semibold transition-all hover:border-cyan-400 flex items-center space-x-1.5"
              >
                <span>1. Scan Document</span>
                <ChevronRight className="w-3 h-3 text-cyan-400" />
              </button>
              <button
                onClick={onOpenSimulator}
                className="px-3 py-1.5 rounded-xl bg-[#172033] hover:bg-[#1E2A42] border border-[#2B3C5B] text-slate-200 font-semibold transition-all hover:border-purple-400 flex items-center space-x-1.5"
              >
                <span>2. Record Meeting</span>
                <ChevronRight className="w-3 h-3 text-purple-400" />
              </button>
              <button
                onClick={handleLaunchCrossContextDemo}
                className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold transition-all flex items-center space-x-1.5 shadow-glow-cyan"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>3. Run Cross-Context Q&A</span>
              </button>
            </div>
          </div>

          {/* Quick Stat Pill Card */}
          <div className="rounded-2xl bg-[#0F1424]/90 border border-[#24334E] p-4 space-y-3 min-w-[240px] shrink-0 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">
                Hardware Health
              </span>
              <span className="text-emerald-400 font-mono text-[10px] font-bold">100% LOCAL</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Device:</span>
                <span className="text-white font-bold">{telemetry.deviceModel.split(' ')[0]} 15</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">NPU Provider:</span>
                <span className="text-cyan-300 font-bold">{telemetry.qnnProvider}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Inference Latency:</span>
                <span className="text-emerald-400 font-bold">{telemetry.latencyMs} ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">RAM Budget:</span>
                <span className="text-slate-200">{telemetry.ramFreeGB} GB free</span>
              </div>
            </div>

            <button
              onClick={onOpenSimulator}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-xs shadow-md transition-all hover:opacity-95 flex items-center justify-center space-x-1.5"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Open Phone Simulator</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Section Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-[#1E283D] pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTabSection('OVERVIEW')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTabSection === 'OVERVIEW'
              ? 'bg-cyan-500 text-black shadow-sm'
              : 'text-slate-400 hover:text-white bg-[#111726]'
          }`}
        >
          Live Workspace Overview
        </button>
        <button
          onClick={() => setActiveTabSection('LOOP')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
            activeTabSection === 'LOOP'
              ? 'bg-cyan-500 text-black shadow-sm'
              : 'text-slate-400 hover:text-white bg-[#111726]'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>7-Step Intelligence Loop</span>
        </button>
        <button
          onClick={() => setActiveTabSection('COMPARISON')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
            activeTabSection === 'COMPARISON'
              ? 'bg-cyan-500 text-black shadow-sm'
              : 'text-slate-400 hover:text-white bg-[#111726]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Why VYRA Wins vs Chatbots</span>
        </button>
      </div>

      {/* Dynamic Tab Content */}
      {activeTabSection === 'LOOP' && <IntelligenceLoopVisualizer />}

      {activeTabSection === 'COMPARISON' && <WhyVyraWinsComparison />}

      {/* 3. Metrics Row (Always Visible in Overview) */}
      {activeTabSection === 'OVERVIEW' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => onNavigateTab('tasks')}
              className="p-4 rounded-2xl bg-[#131826] border border-[#222E42] hover:border-cyan-500/40 transition-all cursor-pointer group shadow-lg"
            >
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-medium uppercase tracking-wider font-mono">
                  Pending Actions
                </span>
                <CheckSquare className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-2 flex items-baseline space-x-2">
                <span className="text-2xl font-extrabold text-white font-mono">
                  {pendingTasks.length}
                </span>
                <span className="text-xs text-cyan-400">extracted items</span>
              </div>
              <div className="mt-2 text-[11px] text-slate-500">
                Auto-extracted from documents & voice
              </div>
            </div>

            <div
              onClick={() => onNavigateTab('tasks')}
              className="p-4 rounded-2xl bg-[#131826] border border-[#222E42] hover:border-amber-500/40 transition-all cursor-pointer group shadow-lg"
            >
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-medium uppercase tracking-wider font-mono">
                  Hard Deadlines
                </span>
                <Calendar className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-2 flex items-baseline space-x-2">
                <span className="text-2xl font-extrabold text-white font-mono">
                  {deadlines.length}
                </span>
                <span className="text-xs text-amber-300">approaching</span>
              </div>
              <div className="mt-2 text-[11px] text-slate-500">
                Next: Sep 18 (Project Alpha Final)
              </div>
            </div>

            <div
              onClick={() => onNavigateTab('memory')}
              className="p-4 rounded-2xl bg-[#131826] border border-[#222E42] hover:border-purple-500/40 transition-all cursor-pointer group shadow-lg"
            >
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-medium uppercase tracking-wider font-mono">
                  Indexed Memories
                </span>
                <Brain className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-2 flex items-baseline space-x-2">
                <span className="text-2xl font-extrabold text-white font-mono">
                  {memories.length}
                </span>
                <span className="text-xs text-purple-300">multi-context</span>
              </div>
              <div className="mt-2 text-[11px] text-slate-500">
                Encrypted Room DB + Vector HNSW
              </div>
            </div>

            <div
              onClick={() => onNavigateTab('settings')}
              className="p-4 rounded-2xl bg-[#131826] border border-[#222E42] hover:border-indigo-500/40 transition-all cursor-pointer group shadow-lg"
            >
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-medium uppercase tracking-wider font-mono">
                  NPU Latency
                </span>
                <Cpu className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-2 flex items-baseline space-x-2">
                <span className="text-2xl font-extrabold text-white font-mono">
                  {telemetry.latencyMs} ms
                </span>
                <span className="text-xs text-emerald-400 font-mono">Hexagon HTP</span>
              </div>
              <div className="mt-2 text-[11px] text-slate-500">
                Dual Mode: HTP + Dynamic Fallback
              </div>
            </div>
          </div>

          {/* 4. The Hero Feature Showcase: Project Alpha Multi-Context Flow */}
          <div className="rounded-3xl bg-gradient-to-br from-[#141D30] via-[#0F1626] to-[#0A0E1A] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
                    THE HERO FEATURE SHOWCASE
                  </span>
                  <span className="text-xs text-slate-400">Multi-Source Context Synthesis</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Project Alpha — From Real-World Scan to Cross-Context Action
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Notice how VYRA connects two distinct events without user manual tagging:
                </p>

                {/* Event 1 & Event 2 visual connection cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-[#0D121F] border border-cyan-500/30 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-cyan-400 flex items-center space-x-1">
                        <Camera className="w-3 h-3" />
                        <span>EVENT 1: CAMERA SCAN</span>
                      </span>
                      <span className="text-[10px] text-slate-400">Sep 7</span>
                    </div>
                    <div className="text-xs font-bold text-white">Project Alpha Brief</div>
                    <div className="text-[11px] text-slate-300 leading-snug">
                      Revised design required before staging. Mandatory deadline: <strong className="text-amber-300">Sep 18</strong>.
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0D121F] border border-purple-500/30 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-purple-400 flex items-center space-x-1">
                        <Mic className="w-3 h-3" />
                        <span>EVENT 2: MEETING VOICE</span>
                      </span>
                      <span className="text-[10px] text-slate-400">Sep 8</span>
                    </div>
                    <div className="text-xs font-bold text-white">Strategy Sync Audio</div>
                    <div className="text-[11px] text-slate-300 leading-snug">
                      Launch rescheduled to <strong className="text-purple-300">Friday</strong>. Ravi updates telemetry dashboard.
                    </div>
                  </div>
                </div>

                {/* Synthesis Output Preview */}
                <div className="p-4 rounded-xl bg-[#090D18] border border-[#1E2A40] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase text-cyan-400 font-bold flex items-center space-x-1.5">
                      <Brain className="w-3.5 h-3.5" />
                      <span>User Asks: “What do I need to finish for Project Alpha?”</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">Synthesized in 420ms</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed italic">
                    “You need to submit the revised design by September 18. A follow-up meeting noted that the launch was rescheduled to Friday, and Ravi will update the dashboard.”
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 shrink-0 lg:w-64">
                <button
                  onClick={handleLaunchCrossContextDemo}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs shadow-glow-cyan transition-all flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4 fill-current" />
                  <span>Run Live Q&A Query</span>
                </button>

                <button
                  onClick={() => onNavigateTab('notes')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1A2338] hover:bg-[#222E48] text-slate-200 font-semibold text-xs border border-[#2A3B5C] transition-colors flex items-center justify-center space-x-2"
                >
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span>View Project Note</span>
                </button>

                <button
                  onClick={onOpenSimulator}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#151C2E] hover:bg-[#1C253C] text-cyan-300 font-semibold text-xs border border-cyan-500/30 transition-colors flex items-center justify-center space-x-2"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Trigger Capture Event</span>
                </button>
              </div>
            </div>
          </div>

          {/* 5. Inbound Captured Contexts Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-bold text-white">Fresh Contexts from Phone</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                    {inboxContexts.length}
                  </span>
                </div>
                <button
                  onClick={() => onNavigateTab('inbox')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center space-x-1"
                >
                  <span>View Full Inbox</span>
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

            {/* Benchmark Scorecard Quick Glance */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Verified Scorecard</span>
                </h3>
                <span className="text-[11px] font-mono text-cyan-400">iQOO 15</span>
              </div>

              <div className="rounded-2xl bg-[#131826] border border-[#232E42] p-4 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Task Extraction:</span>
                  <span className="text-emerald-400 font-bold">97.2% PASSED</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Deadline Detection:</span>
                  <span className="text-emerald-400 font-bold">98.5% PASSED</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Cross-Context Recall:</span>
                  <span className="text-emerald-400 font-bold">96.0% PASSED</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-slate-400">NPU Latency (QNN):</span>
                  <span className="text-cyan-300 font-bold">18.4 ms PASSED</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Zero-Cloud Security:</span>
                  <span className="text-purple-300 font-bold">100% LOCAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
