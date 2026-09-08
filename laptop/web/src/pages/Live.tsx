import React, { useState } from 'react';
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
  Clock,
  Activity,
  Zap
} from 'lucide-react';
import { useVyra } from '../context/VyraContext';

export const Live: React.FC = () => {
  const {
    liveStream,
    activeSessionId,
    toggleSession,
    telemetry,
    triggerSimulatedDocumentScan,
    triggerSimulatedMeetingVoice
  } = useVyra();

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      {/* Top Title & Controls */}
      <div className="rounded-3xl bg-gradient-to-r from-[#101726] via-[#0E1524] to-[#0A0E18] border border-[#23314B] p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Live Sensor & NPU Console
              </h1>
              <span
                className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                  activeSessionId
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : 'bg-slate-700/30 text-slate-400 border-slate-600'
                }`}
              >
                {activeSessionId ? '● STREAM ACTIVE (4ms)' : 'PAUSED'}
              </span>
            </div>
            <p className="text-sm text-slate-300 mt-1">
              Direct telemetry from the iQOO 15 (Snapdragon 8 Elite). Real-time CameraX OCR frames, whisper.cpp VAD audio streams, and context packets.
            </p>
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <button
              onClick={toggleSession}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all shadow-md ${
                activeSessionId
                  ? 'bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-black border border-rose-500/40'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-black'
              }`}
            >
              {activeSessionId ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Pause Stream</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Resume Stream</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Visual Live Stream Monitors: Audio Waveform + Camera Viewfinder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: CameraX Live OCR Viewfinder */}
        <div className="rounded-2xl bg-[#0D121E] border border-[#232F47] p-5 space-y-3 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-[#1E293D]">
            <div className="flex items-center space-x-2">
              <Camera className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold text-white uppercase">
                CameraX · Frame Stabilization (PaddleOCR)
              </span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
              42 ms / Frame
            </span>
          </div>

          <div className="h-44 rounded-xl bg-[#080B13] border border-[#1A2338] relative flex flex-col items-center justify-center p-4 overflow-hidden group">
            {/* Viewfinder target lines */}
            <div className="absolute inset-4 border border-dashed border-cyan-500/40 rounded-lg pointer-events-none" />
            <div className="absolute top-6 left-6 text-[10px] font-mono text-cyan-400">
              ● RECOGNIZING: PROJECT ALPHA
            </div>
            <div className="text-center space-y-1 z-10">
              <div className="text-xs font-bold text-white bg-slate-900/80 px-3 py-1.5 rounded-md border border-cyan-500/30">
                “Deadline: September 18, 2026”
              </div>
              <div className="text-[10px] font-mono text-emerald-400">Confidence: 98.2% · Optical Pass</div>
            </div>

            <button
              onClick={triggerSimulatedDocumentScan}
              className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-all shadow-sm flex items-center space-x-1"
            >
              <Zap className="w-3 h-3" />
              <span>Simulate OCR Scan</span>
            </button>
          </div>
        </div>

        {/* Right: whisper.cpp VAD Audio Waveform */}
        <div className="rounded-2xl bg-[#0D121E] border border-[#232F47] p-5 space-y-3 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-[#1E293D]">
            <div className="flex items-center space-x-2">
              <Mic className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-mono font-bold text-white uppercase">
                whisper.cpp · 16kHz PCM VAD Monitor
              </span>
            </div>
            <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
              165 ms / Chunk
            </span>
          </div>

          <div className="h-44 rounded-xl bg-[#080B13] border border-[#1A2338] relative flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Simulated Animated Waveform Bars */}
            <div className="flex items-center justify-center space-x-1.5 h-12 mb-2">
              <div className="w-1.5 bg-purple-500 rounded-full wave-bar-1" />
              <div className="w-1.5 bg-purple-400 rounded-full wave-bar-2" />
              <div className="w-1.5 bg-cyan-400 rounded-full wave-bar-3" />
              <div className="w-1.5 bg-cyan-300 rounded-full wave-bar-4" />
              <div className="w-1.5 bg-blue-500 rounded-full wave-bar-5" />
              <div className="w-1.5 bg-purple-400 rounded-full wave-bar-2" />
              <div className="w-1.5 bg-purple-500 rounded-full wave-bar-1" />
              <div className="w-1.5 bg-cyan-400 rounded-full wave-bar-3" />
            </div>

            <div className="text-center space-y-0.5 z-10">
              <div className="text-xs font-medium text-slate-200">
                “...let's move the launch to Friday and have Ravi update the dashboard...”
              </div>
              <div className="text-[10px] font-mono text-purple-400">Energy VAD: SPEECH DETECTED</div>
            </div>

            <button
              onClick={triggerSimulatedMeetingVoice}
              className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-purple-500 hover:bg-purple-400 text-black text-xs font-bold transition-all shadow-sm flex items-center space-x-1"
            >
              <Zap className="w-3 h-3" />
              <span>Simulate Voice Chunk</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Stream Console */}
      <div className="rounded-3xl bg-[#0D111A] border border-[#232F47] overflow-hidden shadow-2xl">
        <div className="bg-[#121824] px-6 py-4 border-b border-[#232F47] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 pulse-dot"></span>
            <span className="text-xs font-mono font-bold text-slate-200 tracking-wide">
              REAL-TIME PROTOCOL PACKET LOG (WebSocket: ws://127.0.0.1:8080)
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {liveStream.length} packets logged · 0 drops
          </span>
        </div>

        <div className="p-5 space-y-3 font-mono text-xs max-h-[480px] overflow-y-auto">
          {liveStream.map(msg => {
            const getMsgBadge = () => {
              switch (msg.type) {
                case 'OCR':
                  return {
                    label: 'OCR.RESULT',
                    color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  };
                case 'CAPTION':
                  return {
                    label: 'CAPTION.UPDATE',
                    color: 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                  };
                case 'SUMMARY':
                  return {
                    label: 'CONTEXT.CREATED',
                    color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
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
                className="p-3.5 rounded-xl bg-[#111726] border border-[#1E293D] flex items-start space-x-3 transition-all hover:border-cyan-500/40"
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
                <div className="flex-1 text-slate-200 font-sans text-xs leading-relaxed">
                  {msg.text}
                </div>
                {msg.confidence && (
                  <span className="text-[10px] text-cyan-400 shrink-0 font-mono font-bold">
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
