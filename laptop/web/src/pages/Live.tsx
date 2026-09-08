import React from 'react';
import {
  Radio,
  Camera,
  Mic,
  Cpu,
  Layers,
  Sparkles,
  Smartphone,
  Play,
  Square,
  Clock
} from 'lucide-react';
import { useVyra } from '../context/VyraContext';

export const Live: React.FC = () => {
  const { liveStream, activeSessionId, toggleSession, telemetry } = useVyra();

  return (
    <div className="space-y-6 pb-12">
      {/* Top Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Live Session Stream
            </h1>
            <span
              className={`text-xs font-mono font-semibold px-2 py-0.5 rounded-full border ${
                activeSessionId
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                  : 'bg-slate-700/30 text-slate-400 border-slate-600'
              }`}
            >
              {activeSessionId ? '● STREAM ACTIVE' : 'PAUSED'}
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Real-time telemetry and extraction packet stream from the iQOO 15 on-device AI engine.
          </p>
        </div>

        <button
          onClick={toggleSession}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all self-start ${
            activeSessionId
              ? 'bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-black border border-rose-500/40'
              : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-sm'
          }`}
        >
          {activeSessionId ? (
            <>
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Pause Live Stream</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Resume Live Stream</span>
            </>
          )}
        </button>
      </div>

      {/* Hardware Telemetry Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-3 rounded-xl bg-[#131926] border border-[#222E42]">
          <span className="text-slate-400 block text-[10px]">DEVICE MODEL</span>
          <span className="font-bold text-white text-sm">{telemetry.deviceModel}</span>
        </div>
        <div className="p-3 rounded-xl bg-[#131926] border border-[#222E42]">
          <span className="text-slate-400 block text-[10px]">NPU ACCELERATOR</span>
          <span className="font-bold text-cyan-400 text-sm">{telemetry.qnnProvider}</span>
        </div>
        <div className="p-3 rounded-xl bg-[#131926] border border-[#222E42]">
          <span className="text-slate-400 block text-[10px]">INFERENCE LATENCY</span>
          <span className="font-bold text-emerald-400 text-sm">{telemetry.latencyMs}ms</span>
        </div>
        <div className="p-3 rounded-xl bg-[#131926] border border-[#222E42]">
          <span className="text-slate-400 block text-[10px]">RAM FOOTPRINT</span>
          <span className="font-bold text-slate-200 text-sm">
            {(telemetry.totalRamGB - telemetry.ramFreeGB).toFixed(1)} GB used
          </span>
        </div>
      </div>

      {/* Main Stream Console */}
      <div className="rounded-2xl bg-[#0D111A] border border-[#232F47] overflow-hidden shadow-2xl">
        <div className="bg-[#121824] px-4 py-3 border-b border-[#232F47] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 pulse-dot"></span>
            <span className="text-xs font-mono font-bold text-slate-200">
              PACKET CONSOLE (WebSocket: 192.168.1.104:8080)
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {liveStream.length} packets received
          </span>
        </div>

        <div className="p-4 space-y-3 font-mono text-xs max-h-[500px] overflow-y-auto">
          {liveStream.map(msg => {
            const getMsgBadge = () => {
              switch (msg.type) {
                case 'OCR':
                  return {
                    label: 'OCR.RESULT',
                    color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                  };
                case 'CAPTION':
                  return {
                    label: 'CAPTION.UPDATE',
                    color: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                  };
                case 'SUMMARY':
                  return {
                    label: 'CONTEXT.CREATED',
                    color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  };
                default:
                  return {
                    label: 'DEVICE.STATUS',
                    color: 'bg-slate-700/30 text-slate-300 border-slate-600'
                  };
              }
            };

            const badge = getMsgBadge();

            return (
              <div
                key={msg.id}
                className="p-3 rounded-xl bg-[#111726] border border-[#1E293D] flex items-start space-x-3 transition-all hover:border-cyan-500/30"
              >
                <div className="flex items-center space-x-2 shrink-0 pt-0.5">
                  <span className="text-[10px] text-slate-500">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${badge.color}`}
                  >
                    {badge.label}
                  </span>
                </div>
                <div className="flex-1 text-slate-200 font-sans text-xs">
                  {msg.text}
                </div>
                {msg.confidence && (
                  <span className="text-[10px] text-cyan-400 shrink-0 font-mono">
                    {Math.round(msg.confidence * 100)}%
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
