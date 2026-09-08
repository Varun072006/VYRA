import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ContextItem,
  MemoryItem,
  TaskItem,
  DeadlineItem,
  NoteItem,
  DeviceTelemetry,
  LiveStreamMessage,
  SourceType
} from '../types';

interface VyraContextType {
  // State
  memories: MemoryItem[];
  inboxContexts: ContextItem[];
  tasks: TaskItem[];
  deadlines: DeadlineItem[];
  notes: NoteItem[];
  telemetry: DeviceTelemetry;
  liveStream: LiveStreamMessage[];
  activeSessionId: string | null;
  searchQuery: string;
  searchResults: {
    answer: string;
    sources: { title: string; sourceType: SourceType; snippet: string; date: string }[];
    relatedEntities: string[];
    confidence: number;
    executedOnNpu: boolean;
  } | null;
  isSearching: boolean;

  // Actions
  setSearchQuery: (q: string) => void;
  runSearch: (queryText?: string) => void;
  saveContextToMemory: (contextId: string) => void;
  dismissContext: (contextId: string) => void;
  toggleTaskStatus: (taskId: string) => void;
  addTask: (title: string, due?: string, owner?: string, priority?: 'HIGH' | 'MEDIUM' | 'LOW') => void;
  addNote: (title: string, content: string, sourceLabel?: string) => void;
  deleteMemory: (memoryId: string) => void;
  purgeAllData: () => void;
  
  // Simulator Triggers
  triggerSimulatedDocumentScan: () => void;
  triggerSimulatedMeetingVoice: () => void;
  triggerSimulatedQuickNote: () => void;
  toggleNpuProvider: () => void;
  toggleSession: () => void;
}

const initialMemories: MemoryItem[] = [
  {
    id: 'mem-001',
    title: 'Project Alpha',
    summary: 'Revised design required. Submission deadline set for September 18 with team sign-off.',
    sourceType: 'CAMERA',
    rawSourceRef: 'cam_frame_8492.jpg',
    createdAt: Date.now() - 172800000, // 2 days ago
    updatedAt: Date.now() - 172800000,
    entities: ['Project Alpha', 'Revised Design', 'Design Team'],
    tasks: [
      {
        id: 'task-001',
        title: 'Submit revised design for Project Alpha',
        due: 'Sep 18',
        owner: 'Design Lead',
        sourceMemoryId: 'mem-001',
        status: 'PENDING',
        priority: 'HIGH',
        sourceTitle: 'Project Alpha Document'
      }
    ],
    deadlines: [
      {
        id: 'dl-001',
        title: 'Project Alpha Final Submission',
        date: 'September 18, 2026',
        action: 'Submit revised design',
        sourceMemoryId: 'mem-001',
        sourceType: 'CAMERA',
        daysRemaining: 10
      }
    ],
    decisions: ['Revised design required prior to client demo'],
    userSaved: true,
    tags: ['Work', 'Q3 Deliverable', 'Design']
  },
  {
    id: 'mem-002',
    title: 'Client Strategy & Launch Sync',
    summary: 'The launch was moved to Friday. Revised design must be completed first. Ravi will update the dashboard telemetry.',
    sourceType: 'MEETING',
    rawSourceRef: 'audio_chunk_104.pcm',
    createdAt: Date.now() - 86400000, // 1 day ago
    updatedAt: Date.now() - 86400000,
    entities: ['Project Alpha', 'Ravi', 'Friday Launch', 'Dashboard'],
    tasks: [
      {
        id: 'task-002',
        title: 'Ravi to update dashboard telemetry & metrics',
        due: 'Friday',
        owner: 'Ravi',
        sourceMemoryId: 'mem-002',
        status: 'PENDING',
        priority: 'HIGH',
        sourceTitle: 'Client Strategy Meeting'
      }
    ],
    deadlines: [
      {
        id: 'dl-002',
        title: 'Product Launch Deadline',
        date: 'Friday, Sep 12, 2026',
        action: 'Execute production roll-out',
        sourceMemoryId: 'mem-002',
        sourceType: 'MEETING',
        daysRemaining: 4
      }
    ],
    decisions: [
      'Launch pushed to Friday to accommodate QA',
      'Dashboard metrics review scheduled for Thursday 4 PM'
    ],
    userSaved: true,
    tags: ['Meeting', 'Product', 'Launch']
  },
  {
    id: 'mem-003',
    title: 'Component Supply Contract',
    summary: 'OLED Display Panel Quotation: 5,000 units minimum batch at $42/unit with 120Hz LTPO certification.',
    sourceType: 'CAMERA',
    rawSourceRef: 'cam_frame_8411.jpg',
    createdAt: Date.now() - 259200000,
    updatedAt: Date.now() - 259200000,
    entities: ['OLED LTPO', 'Batch 5K', 'Procurement'],
    tasks: [
      {
        id: 'task-003',
        title: 'Approve vendor purchase order for display panels',
        due: 'Sep 25',
        owner: 'Procurement',
        sourceMemoryId: 'mem-003',
        status: 'PENDING',
        priority: 'MEDIUM',
        sourceTitle: 'Component Supply Contract'
      }
    ],
    deadlines: [],
    decisions: ['Proceed with vendor A for display components'],
    userSaved: true,
    tags: ['Hardware', 'Procurement']
  }
];

const initialInbox: ContextItem[] = [
  {
    id: 'ctx-001',
    type: 'DEADLINE',
    title: 'Project Alpha Review',
    content: 'Review meeting confirmed for Friday morning with stakeholder group.',
    confidence: 0.96,
    sourceType: 'MEETING',
    date: 'Friday, 10:00 AM',
    action: 'Attend Alpha review',
    owner: 'All',
    relatedEntities: ['Project Alpha', 'Friday Review'],
    timestamp: Date.now() - 3600000,
    saved: false
  },
  {
    id: 'ctx-002',
    type: 'FACT',
    title: 'OriginOS 6 Office Kit Spec',
    content: 'Native handoff supports instant clipboard relay and low-latency Wi-Fi 7 screen cast.',
    confidence: 0.94,
    sourceType: 'CAMERA',
    relatedEntities: ['OriginOS 6', 'Office Kit', 'Wi-Fi 7'],
    timestamp: Date.now() - 7200000,
    saved: false
  },
  {
    id: 'ctx-003',
    type: 'TASK',
    title: 'Send Revised Architecture Slide',
    content: 'Ensure NPU execution graph is highlighted for jury review.',
    confidence: 0.98,
    sourceType: 'NOTE',
    action: 'Send slide deck',
    owner: 'Varun',
    timestamp: Date.now() - 10800000,
    saved: false
  }
];

const initialNotes: NoteItem[] = [
  {
    id: 'note-001',
    title: 'Project Alpha Summary & Action Plan',
    content: 'Revised design must be submitted by September 18. Launch rescheduled to Friday. Ravi is updating the real-time analytics dashboard before staging verification.',
    sourceType: 'MEETING',
    createdAt: Date.now() - 86400000,
    tasks: ['Submit revised design', 'Update dashboard metrics'],
    linkedMemoryId: 'mem-001',
    sourceLabel: 'Synthesized from Camera & Meeting'
  },
  {
    id: 'note-002',
    title: 'iQOO 15 NPU Execution Benchmark Notes',
    content: 'Hexagon NPU running through QNN HTP provider achieves 280ms end-to-end token generation on 3B instruction model. CPU fallback safely enabled for unsupported operators.',
    sourceType: 'NOTE',
    createdAt: Date.now() - 172800000,
    tasks: ['Record 30-minute thermal curve'],
    sourceLabel: 'Manual Engineering Note'
  }
];

const initialTelemetry: DeviceTelemetry = {
  connected: true,
  deviceModel: 'iQOO 15 (16GB RAM)',
  npuStatus: 'ACTIVE',
  qnnProvider: 'HTP',
  ramFreeGB: 11.4,
  totalRamGB: 16.0,
  batteryPct: 88,
  thermalState: 'NOMINAL',
  temperatureC: 34.2,
  latencyMs: 18
};

const VyraContext = createContext<VyraContextType | undefined>(undefined);

export const VyraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [memories, setMemories] = useState<MemoryItem[]>(() => {
    const saved = localStorage.getItem('vyra_memories');
    return saved ? JSON.parse(saved) : initialMemories;
  });

  const [inboxContexts, setInboxContexts] = useState<ContextItem[]>(() => {
    const saved = localStorage.getItem('vyra_inbox');
    return saved ? JSON.parse(saved) : initialInbox;
  });

  const [notes, setNotes] = useState<NoteItem[]>(() => {
    const saved = localStorage.getItem('vyra_notes');
    return saved ? JSON.parse(saved) : initialNotes;
  });

  const [telemetry, setTelemetry] = useState<DeviceTelemetry>(initialTelemetry);
  const [activeSessionId, setActiveSessionId] = useState<string | null>('session-live-01');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<VyraContextType['searchResults']>(null);

  const [liveStream, setLiveStream] = useState<LiveStreamMessage[]>([
    {
      id: 'msg-1',
      timestamp: Date.now() - 120000,
      type: 'SYSTEM',
      text: 'iQOO 15 paired via local WebSocket (192.168.1.104). NPU HTP provider initialized.'
    },
    {
      id: 'msg-2',
      timestamp: Date.now() - 60000,
      type: 'OCR',
      text: 'Detected Document: "Project Alpha Engineering Brief — Final Revision Due Sep 18"',
      confidence: 0.97
    },
    {
      id: 'msg-3',
      timestamp: Date.now() - 30000,
      type: 'CAPTION',
      text: '"...the client wants the revised design submitted before Friday morning..."',
      confidence: 0.94
    },
    {
      id: 'msg-4',
      timestamp: Date.now() - 10000,
      type: 'SUMMARY',
      text: 'Live Context: Project Alpha deadline detected. Auto-linking to active workspace.'
    }
  ]);

  // Derived tasks & deadlines
  const tasks: TaskItem[] = memories.flatMap(m => m.tasks);
  const deadlines: DeadlineItem[] = memories.flatMap(m => m.deadlines);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('vyra_memories', JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    localStorage.setItem('vyra_inbox', JSON.stringify(inboxContexts));
  }, [inboxContexts]);

  useEffect(() => {
    localStorage.setItem('vyra_notes', JSON.stringify(notes));
  }, [notes]);

  // Actions
  const saveContextToMemory = (contextId: string) => {
    const ctx = inboxContexts.find(c => c.id === contextId);
    if (!ctx) return;

    const newMem: MemoryItem = {
      id: `mem-${Date.now()}`,
      title: ctx.title,
      summary: ctx.content,
      sourceType: ctx.sourceType,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      entities: ctx.relatedEntities || [ctx.title],
      tasks: ctx.action
        ? [
            {
              id: `task-${Date.now()}`,
              title: ctx.action,
              due: ctx.date,
              owner: ctx.owner,
              sourceMemoryId: `mem-${Date.now()}`,
              status: 'PENDING',
              priority: 'HIGH',
              sourceTitle: ctx.title
            }
          ]
        : [],
      deadlines: ctx.date
        ? [
            {
              id: `dl-${Date.now()}`,
              title: `${ctx.title} Deadline`,
              date: ctx.date,
              action: ctx.action || 'Fulfill action item',
              sourceMemoryId: `mem-${Date.now()}`,
              sourceType: ctx.sourceType,
              daysRemaining: 7
            }
          ]
        : [],
      decisions: ctx.type === 'DECISION' ? [ctx.content] : [],
      userSaved: true,
      tags: ['Saved Context', ctx.sourceType]
    };

    setMemories(prev => [newMem, ...prev]);
    setInboxContexts(prev => prev.filter(c => c.id !== contextId));

    // Also add to live stream
    setLiveStream(prev => [
      {
        id: `msg-${Date.now()}`,
        timestamp: Date.now(),
        type: 'SYSTEM',
        text: `Saved "${ctx.title}" to persistent memory with encrypted vector embedding.`
      },
      ...prev
    ]);
  };

  const dismissContext = (contextId: string) => {
    setInboxContexts(prev => prev.filter(c => c.id !== contextId));
  };

  const toggleTaskStatus = (taskId: string) => {
    setMemories(prev =>
      prev.map(m => ({
        ...m,
        tasks: m.tasks.map(t =>
          t.id === taskId ? { ...t, status: t.status === 'PENDING' ? 'DONE' : 'PENDING' } : t
        )
      }))
    );
  };

  const addTask = (title: string, due?: string, owner?: string, priority: 'HIGH' | 'MEDIUM' | 'LOW' = 'MEDIUM') => {
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title,
      due: due || 'Upcoming',
      owner: owner || 'Me',
      status: 'PENDING',
      priority,
      sourceTitle: 'Direct Entry'
    };

    // Add to first memory or create a standalone container
    setMemories(prev => {
      if (prev.length === 0) {
        return [
          {
            id: `mem-${Date.now()}`,
            title: 'General Workspace Tasks',
            summary: 'Active tasks collection',
            sourceType: 'NOTE',
            createdAt: Date.now(),
            updatedAt: Date.now(),
            entities: ['Workspace'],
            tasks: [newTask],
            deadlines: [],
            decisions: [],
            userSaved: true,
            tags: ['Tasks']
          }
        ];
      }
      return prev.map((m, idx) => (idx === 0 ? { ...m, tasks: [newTask, ...m.tasks] } : m));
    });
  };

  const addNote = (title: string, content: string, sourceLabel = 'Quick Workspace Note') => {
    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      title,
      content,
      sourceType: 'NOTE',
      createdAt: Date.now(),
      tasks: [],
      sourceLabel
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const deleteMemory = (memoryId: string) => {
    setMemories(prev => prev.filter(m => m.id !== memoryId));
  };

  const purgeAllData = () => {
    setMemories([]);
    setInboxContexts([]);
    setNotes([]);
    setLiveStream([]);
    localStorage.removeItem('vyra_memories');
    localStorage.removeItem('vyra_inbox');
    localStorage.removeItem('vyra_notes');
  };

  // Cross-Context Q&A Search Engine
  const runSearch = (queryText?: string) => {
    const q = (queryText || searchQuery).trim();
    if (!q) return;

    setIsSearching(true);

    setTimeout(() => {
      // Intelligent mock synthesis matching user queries
      const lower = q.toLowerCase();

      if (lower.includes('project alpha') || lower.includes('finish') || lower.includes('decide') || lower.includes('deadline')) {
        setSearchResults({
          answer:
            'For Project Alpha, you must submit the revised design by September 18. During the follow-up strategy sync, the launch was moved to Friday, and Ravi was assigned to update the telemetry dashboard before staging verification.',
          sources: [
            {
              title: 'Project Alpha Brief (Sep 7)',
              sourceType: 'CAMERA',
              snippet: 'Revised design required. Deadline: September 18. Submit revised design to team lead.',
              date: 'Sep 7, 2026'
            },
            {
              title: 'Client Strategy & Launch Sync (Sep 8)',
              sourceType: 'MEETING',
              snippet: 'Launch moved to Friday. Revised design must be completed first. Ravi to update dashboard.',
              date: 'Sep 8, 2026'
            }
          ],
          relatedEntities: ['Project Alpha', 'Revised Design', 'Ravi', 'Friday Launch'],
          confidence: 0.98,
          executedOnNpu: telemetry.qnnProvider === 'HTP'
        });
      } else if (lower.includes('display') || lower.includes('vendor') || lower.includes('hardware') || lower.includes('oled')) {
        setSearchResults({
          answer:
            'The Component Supply Contract confirms an order of 5,000 OLED display panels at $42/unit with LTPO 120Hz certification. Purchase order approval is due by September 25.',
          sources: [
            {
              title: 'Component Supply Contract',
              sourceType: 'CAMERA',
              snippet: '5,000 units minimum batch at $42/unit. 120Hz LTPO specifications verified.',
              date: 'Sep 5, 2026'
            }
          ],
          relatedEntities: ['OLED LTPO', 'Procurement', 'Batch 5K'],
          confidence: 0.95,
          executedOnNpu: telemetry.qnnProvider === 'HTP'
        });
      } else {
        setSearchResults({
          answer: `VYRA searched across ${memories.length} memories and found 2 relevant contexts matching "${q}". Key extracted facts have been prioritized based on semantic vector similarity.`,
          sources: memories.slice(0, 2).map(m => ({
            title: m.title,
            sourceType: m.sourceType,
            snippet: m.summary,
            date: new Date(m.createdAt).toLocaleDateString()
          })),
          relatedEntities: memories.flatMap(m => m.entities).slice(0, 4),
          confidence: 0.91,
          executedOnNpu: telemetry.qnnProvider === 'HTP'
        });
      }

      setIsSearching(false);
    }, 450);
  };

  // Simulator Triggers
  const triggerSimulatedDocumentScan = () => {
    const newContext: ContextItem = {
      id: `ctx-${Date.now()}`,
      type: 'DEADLINE',
      title: 'Project Alpha Design Revision',
      content: 'Hardware spec document scanned via iQOO 15 Camera. Identified mandatory deadline: September 18.',
      confidence: 0.98,
      sourceType: 'CAMERA',
      date: 'September 18, 2026',
      action: 'Submit revised design',
      owner: 'Design Team',
      relatedEntities: ['Project Alpha', 'Design Revision'],
      timestamp: Date.now(),
      saved: false
    };

    setInboxContexts(prev => [newContext, ...prev]);

    setLiveStream(prev => [
      {
        id: `msg-${Date.now()}`,
        timestamp: Date.now(),
        type: 'OCR',
        text: 'CameraX → PaddleOCR: "Project Alpha — Revised design required — Deadline: Sep 18"',
        confidence: 0.98
      },
      {
        id: `msg-${Date.now() + 1}`,
        timestamp: Date.now() + 10,
        type: 'SUMMARY',
        text: 'NPU extracted context card: Deadline Sep 18 (Submit revised design)'
      },
      ...prev
    ]);
  };

  const triggerSimulatedMeetingVoice = () => {
    const newContext: ContextItem = {
      id: `ctx-${Date.now()}`,
      type: 'DECISION',
      title: 'Client Review Sync',
      content: 'Speech captured via whisper.cpp. "Let\'s move the launch to Friday and have Ravi update the dashboard."',
      confidence: 0.95,
      sourceType: 'MEETING',
      date: 'Friday',
      action: 'Update telemetry dashboard',
      owner: 'Ravi',
      relatedEntities: ['Project Alpha', 'Ravi', 'Friday Launch'],
      timestamp: Date.now(),
      saved: false
    };

    setInboxContexts(prev => [newContext, ...prev]);

    setLiveStream(prev => [
      {
        id: `msg-${Date.now()}`,
        timestamp: Date.now(),
        type: 'CAPTION',
        text: 'whisper.cpp (NDK): "We need the revised design before Friday. Ravi update the dashboard."',
        confidence: 0.95
      },
      {
        id: `msg-${Date.now() + 1}`,
        timestamp: Date.now() + 10,
        type: 'SUMMARY',
        text: 'Linked context to existing "Project Alpha" memory graph.'
      },
      ...prev
    ]);
  };

  const triggerSimulatedQuickNote = () => {
    const newContext: ContextItem = {
      id: `ctx-${Date.now()}`,
      type: 'TASK',
      title: 'Packaging & Thermal Test Run',
      content: 'Execute 30-minute continuous QNN stress test before final stage demo.',
      confidence: 0.99,
      sourceType: 'NOTE',
      date: 'Tomorrow 2 PM',
      action: 'Run 30m thermal test',
      owner: 'Varun',
      relatedEntities: ['QNN HTP', 'Thermal Test'],
      timestamp: Date.now(),
      saved: false
    };

    setInboxContexts(prev => [newContext, ...prev]);
  };

  const toggleNpuProvider = () => {
    setTelemetry(prev => ({
      ...prev,
      qnnProvider: prev.qnnProvider === 'HTP' ? 'CPU_FALLBACK' : 'HTP',
      npuStatus: prev.qnnProvider === 'HTP' ? 'IDLE' : 'ACTIVE',
      latencyMs: prev.qnnProvider === 'HTP' ? 145 : 18
    }));
  };

  const toggleSession = () => {
    setActiveSessionId(prev => (prev ? null : `session-${Date.now()}`));
  };

  return (
    <VyraContext.Provider
      value={{
        memories,
        inboxContexts,
        tasks,
        deadlines,
        notes,
        telemetry,
        liveStream,
        activeSessionId,
        searchQuery,
        searchResults,
        isSearching,
        setSearchQuery,
        runSearch,
        saveContextToMemory,
        dismissContext,
        toggleTaskStatus,
        addTask,
        addNote,
        deleteMemory,
        purgeAllData,
        triggerSimulatedDocumentScan,
        triggerSimulatedMeetingVoice,
        triggerSimulatedQuickNote,
        toggleNpuProvider,
        toggleSession
      }}
    >
      {children}
    </VyraContext.Provider>
  );
};

export const useVyra = () => {
  const context = useContext(VyraContext);
  if (!context) {
    throw new Error('useVyra must be used within a VyraProvider');
  }
  return context;
};
