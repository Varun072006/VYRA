import React from 'react';
import {
  X,
  Camera,
  Mic,
  FileText,
  Brain,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Smartphone
} from 'lucide-react';
import { useVyra } from '../context/VyraContext';

interface SimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: string) => void;
}

export const SimulatorModal: React.FC<SimulatorModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab
}) => {
  const {
    triggerSimulatedDocumentScan,
    triggerSimulatedMeetingVoice,
    triggerSimulatedQuickNote,
    toggleNpuProvider,
    telemetry,
    runSearch,
    setSearchQuery
  } = useVyra();

  if (!isOpen) return null;

  const runGoldenDemoScene = (sceneNum: number) => {
    switch (sceneNum) {
      case 1:
        // Scene 1: Document Scan
        triggerSimulatedDocumentScan();
        onNavigateTab('inbox');
        onClose();
        break;
      case 2:
        // Scene 2: Meeting Voice
        triggerSimulatedMeetingVoice();
        onNavigateTab('inbox');
        onClose();
        break;
      case 3:
        // Scene 3: Cross-Context Q&A
        setSearchQuery('What do I need to finish for Project Alpha?');
        onNavigateTab('memory');
        runSearch('What do I need to finish for Project Alpha?');
        onClose();
        break;
      case 4:
        // Scene 4: Open Workspace
        onNavigateTab('dashboard');
        onClose();
        break;
      case 5:
        // Scene 5: Toggle NPU
        toggleNpuProvider();
        onNavigateTab('settings');
        onClose();
        break;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#111624] border border-[#26334A] rounded-2xl max-w-xl w-full p-6 shadow-2xl relative overflow-hidden">
        {/* Glow Header */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500" />

        <div className="flex items-center justify-between pb-4 border-b border-[#202B3E]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <span>iQOO 15 Hardware Simulator</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
                  LIVE
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Trigger real-time capture events without physical hardware attached
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Script Scenario Triggers */}
        <div className="py-4 space-y-3">
          <div className="text-[11px] font-mono text-cyan-400 font-semibold uppercase tracking-wider">
            Winning Demo Script (Step-by-Step)
          </div>

          <button
            onClick={() => runGoldenDemoScene(1)}
            className="w-full text-left p-3.5 rounded-xl bg-[#151C2C] hover:bg-[#1A2338] border border-[#243048] hover:border-cyan-500/50 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center shrink-0">
                <Camera className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                  <span className="text-cyan-400 font-mono">Scene 1:</span>
                  <span>Point Camera at Document (PaddleOCR)</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Detects: Project Alpha Brief · Deadline Sep 18 · Action: Submit revised design
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
          </button>

          <button
            onClick={() => runGoldenDemoScene(2)}
            className="w-full text-left p-3.5 rounded-xl bg-[#151C2C] hover:bg-[#1A2338] border border-[#243048] hover:border-purple-500/50 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                <Mic className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                  <span className="text-purple-400 font-mono">Scene 2:</span>
                  <span>Meeting Voice Stream (whisper.cpp)</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Spoken: "Move launch to Friday, Ravi update dashboard" → Extracted & linked
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
          </button>

          <button
            onClick={() => runGoldenDemoScene(3)}
            className="w-full text-left p-3.5 rounded-xl bg-[#151C2C] hover:bg-[#1A2338] border border-[#243048] hover:border-blue-500/50 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                <Brain className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                  <span className="text-blue-400 font-mono">Scene 3:</span>
                  <span>Cross-Context Q&A (The Killer Feature)</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Queries both Document + Meeting memories to synthesize single coherent answer
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
          </button>

          <button
            onClick={() => runGoldenDemoScene(5)}
            className="w-full text-left p-3.5 rounded-xl bg-[#151C2C] hover:bg-[#1A2338] border border-[#243048] hover:border-indigo-500/50 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0">
                <Cpu className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                  <span className="text-indigo-400 font-mono">Scene 4:</span>
                  <span>Toggle NPU / QNN HTP vs CPU Fallback</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Current: <span className="font-semibold text-cyan-300">{telemetry.qnnProvider}</span> ({telemetry.latencyMs}ms)
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
          </button>
        </div>

        {/* Footer controls */}
        <div className="pt-4 border-t border-[#202B3E] flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono">Local WebSocket: ws://127.0.0.1:8080</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#222E45] hover:bg-[#2C3B58] text-slate-200 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
