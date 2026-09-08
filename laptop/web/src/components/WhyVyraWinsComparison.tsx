import React from 'react';
import { Check, X, ShieldAlert, Zap, Cpu, Sparkles } from 'lucide-react';

export const WhyVyraWinsComparison: React.FC = () => {
  const comparisons = [
    {
      dimension: 'Interaction Model',
      normal: 'Question ↓ Answer (Stateless Chatbot)',
      vyra: 'Context ↓ Understanding ↓ Memory ↓ Relationship ↓ Synthesis ↓ Action',
      vyraAdvantage: 'Persistent accumulated context'
    },
    {
      dimension: 'World Capture',
      normal: 'Manual typing into a prompt input box',
      vyra: 'Multimodal: CameraX OCR + whisper.cpp Voice + User Notes',
      vyraAdvantage: 'Captures physical reality around you'
    },
    {
      dimension: 'Hardware Acceleration',
      normal: 'Runs in remote cloud datacenter over HTTP',
      vyra: 'Snapdragon 8 Elite Hexagon NPU via QNN HTP (18ms latency)',
      vyraAdvantage: 'Hardware-native Qualcomm execution'
    },
    {
      dimension: 'Privacy & Security',
      normal: 'Conversation history stored on commercial cloud servers',
      vyra: '100% Zero-Cloud. SQLCipher AES-256 in Android Keystore',
      vyraAdvantage: 'Complete personal privacy sovereignty'
    },
    {
      dimension: 'Multi-Source Trust',
      normal: 'Fabricates plausibly sounding answers without sources',
      vyra: 'Cross-Context Q&A surfaces exact cited document & meeting cards',
      vyraAdvantage: 'Zero hallucination trust anchor'
    },
    {
      dimension: 'PC Continuity',
      normal: 'Separate web browser tab requiring manual copy-paste',
      vyra: 'OriginOS Office Kit + real-time WebSocket Workspace handoff',
      vyraAdvantage: 'Phone captures, laptop workspace organizes'
    }
  ];

  return (
    <div className="rounded-3xl bg-[#0D121F] border border-[#222E45] p-6 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#1E283D] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              STRATEGIC EVALUATION
            </span>
            <span className="text-xs text-slate-400">Why Judges Select VYRA</span>
          </div>
          <h3 className="text-xl font-extrabold text-white mt-1">
            Normal AI Assistants vs. VYRA Context Engine
          </h3>
        </div>

        <div className="text-xs font-mono text-cyan-400 bg-[#12192A] px-3 py-1.5 rounded-xl border border-cyan-500/30 self-start">
          “VYRA doesn't just answer. VYRA remembers.”
        </div>
      </div>

      {/* Comparison Table / Matrix */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#1E283D] text-[11px] font-mono text-slate-400">
              <th className="pb-3 pr-4 font-semibold uppercase">Dimension</th>
              <th className="pb-3 px-4 font-semibold uppercase text-slate-500">Normal Chatbot App</th>
              <th className="pb-3 px-4 font-semibold uppercase text-cyan-300">
                VYRA (iQOO-Native)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#182136]">
            {comparisons.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#121828]/60 transition-colors">
                <td className="py-3.5 pr-4 font-bold text-white whitespace-nowrap">
                  {row.dimension}
                </td>
                <td className="py-3.5 px-4 text-slate-400 leading-relaxed">
                  <div className="flex items-center space-x-2">
                    <X className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>{row.normal}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-slate-200 font-medium leading-relaxed bg-cyan-950/10">
                  <div className="flex items-start space-x-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-semibold">{row.vyra}</span>
                      <span className="block text-[10px] text-cyan-400 font-mono mt-0.5">
                        ★ {row.vyraAdvantage}
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
