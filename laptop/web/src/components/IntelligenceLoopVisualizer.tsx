import React, { useState } from 'react';
import {
  Eye,
  Brain,
  Layers,
  Database,
  GitMerge,
  HelpCircle,
  Laptop,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  ChevronRight
} from 'lucide-react';

export const IntelligenceLoopVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 'see',
      name: '1. SEE',
      sub: 'CameraX + PaddleOCR',
      icon: Eye,
      accent: 'from-cyan-500 to-blue-500',
      badgeColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-800',
      description: 'The iQOO 15 camera stabilizes and scans documents, notes, or slides in 42ms via on-device PaddleOCR.',
      proof: 'Scans: "Project Alpha — Revised design required — Deadline: Sep 18"'
    },
    {
      id: 'understand',
      name: '2. UNDERSTAND',
      sub: 'Qualcomm Hexagon NPU',
      icon: Brain,
      accent: 'from-blue-500 to-indigo-500',
      badgeColor: 'text-blue-400 bg-blue-950/60 border-blue-800',
      description: 'Quantized on-device LLM executes via QNN HTP backend at 18ms latency with zero cloud dependency.',
      proof: 'Identifies: Hard deadline, required design modification, and engineering sign-off condition.'
    },
    {
      id: 'extract',
      name: '3. EXTRACT',
      sub: 'Context Engine',
      icon: Layers,
      accent: 'from-indigo-500 to-purple-500',
      badgeColor: 'text-indigo-400 bg-indigo-950/60 border-indigo-800',
      description: 'Converts unstructured text into typed data: FACT, TASK, DEADLINE, or DECISION, without conversational fluff.',
      proof: 'Creates: [DEADLINE: Sep 18] + [TASK: Submit revised design (Design Lead)]'
    },
    {
      id: 'remember',
      name: '4. REMEMBER',
      sub: 'SQLCipher + HNSW',
      icon: Database,
      accent: 'from-purple-500 to-pink-500',
      badgeColor: 'text-purple-400 bg-purple-950/60 border-purple-800',
      description: 'User taps SAVE. Content is stored in AES-256 encrypted Room DB and indexed into a local vector graph.',
      proof: 'No cloud storage. Cryptographic key derived inside hardware-backed Android Keystore.'
    },
    {
      id: 'connect',
      name: '5. CONNECT',
      sub: 'Multi-Source Linking',
      icon: GitMerge,
      accent: 'from-pink-500 to-rose-500',
      badgeColor: 'text-pink-400 bg-pink-950/60 border-pink-800',
      description: 'When a subsequent meeting audio snippet arrives via whisper.cpp, VYRA automatically links it to the same project node.',
      proof: 'Linked: "Launch moved to Friday, Ravi updates dashboard" → connected to Project Alpha.'
    },
    {
      id: 'ask',
      name: '6. ASK',
      sub: 'Cross-Context Q&A',
      icon: HelpCircle,
      accent: 'from-amber-500 to-orange-500',
      badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-800',
      description: 'Ask anything across weeks of accumulated context. Returns a verified answer with exact cited multi-source references.',
      proof: '"You must submit the revised design by Sep 18. A follow-up meeting noted launch moved to Friday."'
    },
    {
      id: 'act',
      name: '7. ACT',
      sub: 'Phone → Laptop Continuity',
      icon: Laptop,
      accent: 'from-emerald-500 to-teal-500',
      badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800',
      description: 'Instant WebSocket & OriginOS Office Kit relay to your VYRA Laptop Workspace. Seamless task and deadline tracking.',
      proof: 'Live synced to dashboard with one-click export and zero latency delay.'
    }
  ];

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#101626]/90 via-[#0B0F1A]/95 to-[#080B14] border border-[#23314A] p-6 shadow-2xl relative overflow-hidden space-y-6">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#1D273B] pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center space-x-1.5">
              <Zap className="w-3 h-3 fill-current" />
              <span>THE CORE INTELLIGENCE LOOP</span>
            </span>
            <span className="text-xs text-slate-400">· Interactive Architecture Walkthrough</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight mt-1.5 flex items-center space-x-2">
            <span>How VYRA Solves Context Intelligence</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Click through any of the 7 stages below to see how physical reality becomes structured, persistent memory and cross-context action.
          </p>
        </div>

        {/* Quick Win Badge */}
        <div className="p-3 rounded-2xl bg-[#131B2D] border border-cyan-500/30 flex items-center space-x-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 block uppercase">WINNING FORMULA</span>
            <span className="text-xs font-bold text-white">Not a Chatbot · Accumulated Context</span>
          </div>
        </div>
      </div>

      {/* 7-Step Navigation Pipeline Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isCurrent = activeStep === idx;

          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-2xl border text-left transition-all duration-200 relative group overflow-hidden ${
                isCurrent
                  ? 'bg-[#182338] border-cyan-400 shadow-glow-cyan'
                  : 'bg-[#101524] border-[#1E283D] hover:border-slate-700 hover:bg-[#131A2D]'
              }`}
            >
              {isCurrent && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
              )}
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isCurrent ? 'bg-cyan-500 text-black font-bold' : 'bg-[#192236] text-slate-400'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-500">0{idx + 1}</span>
              </div>
              <div className={`text-xs font-bold ${isCurrent ? 'text-cyan-300' : 'text-slate-200'}`}>
                {step.name}
              </div>
              <div className="text-[10px] text-slate-400 truncate mt-0.5">{step.sub}</div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Deep-Dive Card */}
      {steps[activeStep] && (
        <div className="p-5 rounded-2xl bg-[#0D121F] border border-[#202E47] grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <span
                className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded border ${steps[activeStep].badgeColor}`}
              >
                STAGE {activeStep + 1} OF 7 · {steps[activeStep].sub}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white">
              {steps[activeStep].name}: {steps[activeStep].description}
            </h3>

            <div className="p-3.5 rounded-xl bg-[#090D17] border border-[#1C263A] text-xs font-mono">
              <span className="text-cyan-400 block text-[10px] uppercase font-bold mb-1">
                LIVE EXECUTION PROOF ON iQOO 15:
              </span>
              <span className="text-slate-200">{steps[activeStep].proof}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#141C2E] border border-cyan-500/20 space-y-3 text-xs">
            <div className="font-bold text-white flex items-center justify-between pb-2 border-b border-slate-800">
              <span>Hardware Acceleration</span>
              <span className="text-emerald-400 font-mono text-[10px]">● SNAPDRAGON NPU</span>
            </div>
            <div className="space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Execution Unit:</span>
                <span className="font-mono text-cyan-300 font-semibold">Hexagon HTP Backend</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Privacy Scope:</span>
                <span className="font-mono text-emerald-400 font-semibold">100% Zero-Cloud</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Security:</span>
                <span className="font-mono text-slate-200">Android Keystore AES-256</span>
              </div>
            </div>

            <button
              onClick={() => setActiveStep((activeStep + 1) % steps.length)}
              className="w-full mt-2 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-black font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5"
            >
              <span>Next Stage ({steps[(activeStep + 1) % steps.length].name})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
