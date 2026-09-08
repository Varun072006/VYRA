import React from 'react';
import {
  LayoutDashboard,
  Inbox,
  FileText,
  Brain,
  CheckSquare,
  Radio,
  Settings,
  Smartphone,
  Cpu,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { useVyra } from '../context/VyraContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSimulator: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onOpenSimulator }) => {
  const { inboxContexts, tasks, telemetry } = useVyra();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inbox', label: 'Inbox', icon: Inbox, badge: inboxContexts.length },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'memory', label: 'Memory Q&A', icon: Brain, highlight: true },
    { id: 'tasks', label: 'Tasks & Deadlines', icon: CheckSquare, badge: tasks.filter(t => t.status === 'PENDING').length },
    { id: 'live', label: 'Live Session', icon: Radio, pulse: true },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-[#0D111C]/90 border-r border-[#1E2738] flex flex-col h-screen select-none shrink-0 backdrop-blur-xl">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#1E2738]/80 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-glow-cyan">
            <Zap className="w-5 h-5 text-black font-extrabold fill-current" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold tracking-wider text-lg bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                VYRA
              </span>
              <span className="text-[10px] font-mono font-semibold uppercase px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                iQOO 15
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Context Intelligence</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-3 pt-2 pb-1 text-[10px] font-mono uppercase tracking-wider text-slate-400">
          Core Workspace
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/15 to-blue-600/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-300'
                  }`}
                />
                <span className={item.highlight && !isActive ? 'text-cyan-200 font-semibold' : ''}>
                  {item.label}
                </span>
              </div>

              <div className="flex items-center space-x-1.5">
                {item.pulse && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot shadow-sm shadow-emerald-500"></span>
                )}
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-mono font-bold ${
                      isActive ? 'bg-cyan-500 text-black' : 'bg-[#1F293D] text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}

        {/* Demo Controller Shortcut */}
        <div className="pt-4 px-1">
          <button
            onClick={onOpenSimulator}
            className="w-full px-3.5 py-3 rounded-xl bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 border border-indigo-500/30 text-indigo-200 hover:text-white hover:border-indigo-400/50 flex items-center space-x-3 transition-all group shadow-sm"
          >
            <Smartphone className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="text-xs font-bold text-white flex items-center space-x-1">
                <span>Phone Simulator</span>
                <span className="text-[9px] px-1 py-0.2 bg-indigo-500/30 text-indigo-300 rounded">LIVE</span>
              </div>
              <div className="text-[10px] text-indigo-300/70">Trigger iQOO 15 actions</div>
            </div>
          </button>
        </div>
      </nav>

      {/* Device & NPU Hardware Footer */}
      <div className="p-3 border-t border-[#1E2738]/80 bg-[#090C14]/90 space-y-2">
        <div className="p-2.5 rounded-xl bg-[#121724] border border-[#232D42] text-xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold text-slate-200">iQOO 15</span>
            </div>
            <span className="inline-flex items-center text-[10px] text-emerald-400 font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 pulse-dot"></span>
              ONLINE
            </span>
          </div>

          <div className="pt-1.5 space-y-1 text-[11px] text-slate-400 font-mono">
            <div className="flex justify-between items-center">
              <span className="flex items-center space-x-1">
                <Cpu className="w-3 h-3 text-indigo-400" />
                <span>NPU / QNN:</span>
              </span>
              <span className="text-cyan-300 font-semibold">{telemetry.qnnProvider}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Snapdragon:</span>
              <span className="text-slate-200">8 Elite Gen 5</span>
            </div>

            <div className="flex justify-between items-center">
              <span>RAM Budget:</span>
              <span className="text-slate-300">
                {telemetry.ramFreeGB}GB / {telemetry.totalRamGB}GB free
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span className="flex items-center space-x-1">
            <ShieldCheck className="w-3 h-3 text-cyan-400" />
            <span>Zero Cloud · Local Only</span>
          </span>
          <span className="font-mono text-cyan-400">{telemetry.latencyMs}ms</span>
        </div>
      </div>
    </aside>
  );
};
