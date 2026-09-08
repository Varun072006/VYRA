import React from 'react';
import {
  Calendar,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Camera,
  Mic,
  FileText,
  BookmarkPlus,
  Send,
  Trash2,
  Clock,
  Sparkles
} from 'lucide-react';
import { ContextItem } from '../types';

interface ContextCardProps {
  context: ContextItem;
  onSave?: (id: string) => void;
  onDismiss?: (id: string) => void;
  compact?: boolean;
}

export const ContextCard: React.FC<ContextCardProps> = ({
  context,
  onSave,
  onDismiss,
  compact = false
}) => {
  const getSourceIcon = () => {
    switch (context.sourceType) {
      case 'CAMERA':
        return <Camera className="w-3.5 h-3.5 text-cyan-400" />;
      case 'MEETING':
      case 'VOICE':
        return <Mic className="w-3.5 h-3.5 text-purple-400" />;
      case 'NOTE':
        return <FileText className="w-3.5 h-3.5 text-blue-400" />;
    }
  };

  const getTypeBadge = () => {
    switch (context.type) {
      case 'DEADLINE':
        return {
          label: 'DEADLINE DETECTED',
          bg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          icon: Calendar
        };
      case 'TASK':
        return {
          label: 'ACTION ITEM',
          bg: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
          icon: CheckCircle2
        };
      case 'DECISION':
        return {
          label: 'KEY DECISION',
          bg: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
          icon: Sparkles
        };
      case 'WARNING':
        return {
          label: 'WARNING',
          bg: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
          icon: AlertCircle
        };
      default:
        return {
          label: 'FACT',
          bg: 'bg-slate-700/40 text-slate-300 border-slate-600/40',
          icon: HelpCircle
        };
    }
  };

  const badge = getTypeBadge();
  const BadgeIcon = badge.icon;

  return (
    <div className="rounded-2xl bg-[#151B2B] border border-[#232D42] hover:border-cyan-500/40 p-5 shadow-lg transition-all duration-200 relative overflow-hidden group">
      {/* Subtle top indicator bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-80" />

      {/* Header with Type & Source */}
      <div className="flex items-center justify-between pb-3 border-b border-[#222B3D]">
        <div className="flex items-center space-x-2">
          <span
            className={`inline-flex items-center space-x-1.5 text-[11px] font-mono font-semibold uppercase px-2.5 py-1 rounded-md border ${badge.bg}`}
          >
            <BadgeIcon className="w-3 h-3" />
            <span>{badge.label}</span>
          </span>
          <span className="text-[11px] font-mono text-slate-400 flex items-center space-x-1 bg-[#101522] px-2 py-0.5 rounded border border-[#232D42]">
            {getSourceIcon()}
            <span className="ml-1 capitalize">{context.sourceType.toLowerCase()}</span>
          </span>
        </div>

        <div className="flex items-center space-x-2 text-[11px] font-mono text-cyan-400">
          <span className="px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
            {Math.round(context.confidence * 100)}% Conf
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="py-3.5 space-y-2">
        <h4 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
          {context.title}
        </h4>

        {context.date && (
          <div className="flex items-center space-x-2 text-sm text-amber-300 font-semibold bg-amber-950/20 px-3 py-1.5 rounded-lg border border-amber-500/20">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{context.date}</span>
          </div>
        )}

        <p className="text-sm text-slate-300 leading-relaxed">{context.content}</p>

        {context.action && (
          <div className="text-xs bg-[#0F1420] p-2.5 rounded-xl border border-[#232D42] text-slate-200 flex items-center justify-between">
            <div>
              <span className="text-cyan-400 font-mono font-medium text-[10px] block">ACTION DETECTED:</span>
              <span className="font-semibold">{context.action}</span>
            </div>
            {context.owner && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1C2436] text-slate-300 border border-[#2E3B54]">
                Owner: {context.owner}
              </span>
            )}
          </div>
        )}

        {/* Entities */}
        {context.relatedEntities && context.relatedEntities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {context.relatedEntities.map((ent, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#1A2234] text-slate-300 border border-[#27344F]"
              >
                #{ent}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Hero Action Bar: [ SAVE ] [ REMIND ] [ PC ] */}
      {!compact && (
        <div className="pt-3 border-t border-[#222B3D] flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            {onSave && (
              <button
                onClick={() => onSave(context.id)}
                className="px-3.5 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-black font-semibold text-xs border border-cyan-500/30 transition-all flex items-center space-x-1.5 shadow-sm"
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>SAVE</span>
              </button>
            )}

            <button
              onClick={() => alert(`Reminder set for: ${context.date || context.title}`)}
              className="px-3 py-1.5 rounded-lg bg-[#1D2538] hover:bg-[#253047] text-slate-300 hover:text-white font-medium text-xs border border-[#2C3852] transition-colors flex items-center space-x-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>REMIND</span>
            </button>

            <button
              onClick={() => alert('Synced instantly to VYRA Laptop Workspace via WebSocket')}
              className="px-3 py-1.5 rounded-lg bg-[#1D2538] hover:bg-[#253047] text-slate-300 hover:text-white font-medium text-xs border border-[#2C3852] transition-colors flex items-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5 text-cyan-400" />
              <span>PC</span>
            </button>
          </div>

          {onDismiss && (
            <button
              onClick={() => onDismiss(context.id)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Dismiss"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
