import React from 'react';
import {
  Search,
  Cpu,
  Battery,
  Thermometer,
  Zap,
  Smartphone,
  SlidersHorizontal,
  RefreshCw
} from 'lucide-react';
import { useVyra } from '../context/VyraContext';

interface HeaderProps {
  onOpenSimulator: () => void;
  onSearchClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSimulator, onSearchClick }) => {
  const { telemetry, toggleNpuProvider, searchQuery, setSearchQuery, runSearch } = useVyra();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearchClick();
      runSearch();
    }
  };

  return (
    <header className="h-16 border-b border-[#1E2738] bg-[#0A0D14]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Search Input */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask VYRA anything across your accumulated context (e.g. 'Project Alpha deadlines')..."
            className="w-full pl-10 pr-24 py-2 rounded-xl bg-[#131926] border border-[#232D42] text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all font-medium"
          />
          <button
            onClick={() => {
              onSearchClick();
              runSearch();
            }}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-black text-xs font-semibold font-mono transition-all"
          >
            Ask ↵
          </button>
        </div>
      </div>

      {/* Hardware Telemetry Bar */}
      <div className="flex items-center space-x-3 ml-6">
        {/* NPU Mode Toggle Badge */}
        <button
          onClick={toggleNpuProvider}
          title="Click to toggle between Qualcomm QNN HTP (Hexagon NPU) and CPU Fallback mode"
          className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#131826] border border-[#253147] hover:border-cyan-500/40 text-xs font-mono transition-all group"
        >
          <Cpu className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-45 transition-transform" />
          <span className="text-slate-400">NPU:</span>
          <span
            className={`font-bold ${
              telemetry.qnnProvider === 'HTP' ? 'text-cyan-300' : 'text-amber-400'
            }`}
          >
            {telemetry.qnnProvider}
          </span>
          <span className="text-[10px] text-slate-400 font-normal">({telemetry.latencyMs}ms)</span>
        </button>

        {/* Battery & Thermal */}
        <div className="hidden lg:flex items-center space-x-3 px-3 py-1.5 rounded-xl bg-[#131826] border border-[#232D42] text-xs font-mono text-slate-300">
          <div className="flex items-center space-x-1">
            <Battery className="w-3.5 h-3.5 text-emerald-400" />
            <span>{telemetry.batteryPct}%</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center space-x-1">
            <Thermometer className="w-3.5 h-3.5 text-amber-400" />
            <span>{telemetry.temperatureC}°C</span>
          </div>
        </div>

        {/* Simulator Launcher */}
        <button
          onClick={onOpenSimulator}
          className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 border border-cyan-500/40 text-cyan-300 font-medium text-xs shadow-sm transition-all"
        >
          <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold">Simulate iQOO</span>
        </button>
      </div>
    </header>
  );
};
