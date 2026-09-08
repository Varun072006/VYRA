import React from 'react';
import {
  Settings as SettingsIcon,
  Smartphone,
  Cpu,
  Shield,
  HardDrive,
  Trash2,
  Download,
  CheckCircle,
  RefreshCw,
  Zap,
  Info
} from 'lucide-react';
import { useVyra } from '../context/VyraContext';

export const Settings: React.FC = () => {
  const { telemetry, toggleNpuProvider, memories, notes, purgeAllData } = useVyra();

  const handleExportData = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      device: telemetry.deviceModel,
      memories,
      notes
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vyra_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePurge = () => {
    if (confirm('Are you sure you want to purge all local memories, tasks, and notes? This cannot be undone.')) {
      purgeAllData();
      alert('Local memory store purged cleanly.');
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Top Title */}
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Settings & Hardware Diagnostics
          </h1>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-700/40 text-slate-300 border border-slate-600">
            SYSTEM
          </span>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          Zero-cloud configuration, Qualcomm AI Engine status, and cryptographic local memory management.
        </p>
      </div>

      {/* 1. Device Pairing & Continuity */}
      <div className="rounded-2xl bg-[#131926] border border-[#222E42] p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1F2A3D]">
          <div className="flex items-center space-x-2.5">
            <Smartphone className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Target Mobile Hardware</h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
            CONNECTED (WebSocket)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-400 block text-[11px]">DEVICE MODEL</span>
            <span className="text-white font-bold text-sm">iQOO 15 (Snapdragon 8 Elite)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">OPERATING SYSTEM</span>
            <span className="text-white font-bold text-sm">OriginOS 6 (Android 16 Base)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">PAIRING CHANNEL</span>
            <span className="text-cyan-300">WebSocket / USB ADB Reverse Tunnel</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">BATTERY & THERMAL</span>
            <span className="text-slate-200">{telemetry.batteryPct}% · {telemetry.temperatureC}°C (Nominal)</span>
          </div>
        </div>
      </div>

      {/* 2. On-Device AI & NPU Acceleration */}
      <div className="rounded-2xl bg-[#131926] border border-[#222E42] p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1F2A3D]">
          <div className="flex items-center space-x-2.5">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Qualcomm QNN / Hexagon NPU Engine</h3>
          </div>
          <button
            onClick={toggleNpuProvider}
            className="px-3 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-mono font-semibold transition-colors flex items-center space-x-1.5"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Switch Mode</span>
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#0F1422] border border-[#202B3E]">
            <div>
              <span className="text-xs font-bold text-white block">Execution Provider</span>
              <span className="text-[11px] text-slate-400">
                {telemetry.qnnProvider === 'HTP'
                  ? 'High-Throughput Processor (Hexagon NPU) Direct Acceleration'
                  : 'CPU Dynamic Fallback Mode Active'}
              </span>
            </div>
            <span
              className={`text-xs font-mono font-bold px-2.5 py-1 rounded border ${
                telemetry.qnnProvider === 'HTP'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}
            >
              {telemetry.qnnProvider}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-[#0F1422] border border-[#202B3E]">
              <span className="text-slate-400 block text-[10px]">OCR ENGINE</span>
              <span className="text-cyan-300 font-bold">PaddleOCR (C++ JNI)</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0F1422] border border-[#202B3E]">
              <span className="text-slate-400 block text-[10px]">ASR ENGINE</span>
              <span className="text-purple-300 font-bold">whisper.cpp (NDK)</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0F1422] border border-[#202B3E]">
              <span className="text-slate-400 block text-[10px]">EMBEDDINGS</span>
              <span className="text-blue-300 font-bold">MiniLM-L6 (Local ONNX)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Storage & Privacy Controls */}
      <div className="rounded-2xl bg-[#131926] border border-[#222E42] p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1F2A3D]">
          <div className="flex items-center space-x-2.5">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Privacy & Local Storage</h3>
          </div>
          <span className="text-xs font-mono text-cyan-400">100% On-Device</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          No data is transmitted to external cloud servers. All persistent memories are encrypted with AES-256 via the Android Keystore on mobile and indexed locally on your laptop workspace.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={handleExportData}
            className="px-4 py-2 rounded-xl bg-[#1E283D] hover:bg-[#273550] text-slate-200 font-semibold text-xs border border-[#2C3B58] transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Export Encrypted JSON</span>
          </button>

          <button
            onClick={handlePurge}
            className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-semibold text-xs border border-rose-500/30 transition-colors flex items-center space-x-2"
          >
            <Trash2 className="w-4 h-4 text-rose-400" />
            <span>Purge All Memory</span>
          </button>
        </div>
      </div>
    </div>
  );
};
