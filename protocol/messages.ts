export type MessageType =
  | 'session.start'
  | 'session.end'
  | 'device.status'
  | 'ocr.result'
  | 'caption.update'
  | 'summary.update'
  | 'context.created'
  | 'context.updated'
  | 'memory.save'
  | 'memory.delete'
  | 'task.created'
  | 'deadline.created'
  | 'note.created'
  | 'query.ask'
  | 'query.response';

export type ContextType =
  | 'FACT'
  | 'TASK'
  | 'DEADLINE'
  | 'DECISION'
  | 'PERSON'
  | 'LOCATION'
  | 'WARNING';

export type SourceType = 'CAMERA' | 'VOICE' | 'NOTE' | 'MEETING';

export interface VyraMessage<T = any> {
  type: MessageType;
  sessionId: string;
  timestamp: number;
  payload: T;
}

export interface DeviceStatusPayload {
  npu: 'ACTIVE' | 'IDLE' | 'OFFLINE';
  qnn: 'HTP' | 'CPU_FALLBACK' | 'DISABLED';
  ramFreeGB: number;
  batteryPct: number;
  thermalState: 'NOMINAL' | 'FAIR' | 'SERIOUS' | 'CRITICAL';
  deviceModel: string;
  npuOpsPerSec?: string;
  temperatureC?: number;
}

export interface ContextPayload {
  id: string;
  type: ContextType;
  title: string;
  content: string;
  confidence: number;
  sourceType: SourceType;
  date?: string;
  action?: string;
  owner?: string;
  relatedEntities?: string[];
  sourceMemoryId?: string;
}

export interface TaskPayload {
  id: string;
  title: string;
  due?: string;
  owner?: string;
  sourceMemoryId?: string;
  status: 'PENDING' | 'DONE' | 'CANCELLED';
  priority?: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface DeadlinePayload {
  id: string;
  title: string;
  date: string;
  action: string;
  sourceMemoryId?: string;
  daysRemaining?: number;
}

export interface MemoryPayload {
  id: string;
  title: string;
  summary: string;
  sourceType: SourceType;
  rawSourceRef?: string;
  createdAt: number;
  updatedAt: number;
  entities: string[];
  tasks: TaskPayload[];
  deadlines: DeadlinePayload[];
  decisions: string[];
  userSaved: boolean;
  embedding?: number[];
  tags?: string[];
}

export interface NotePayload {
  id: string;
  title: string;
  content: string;
  sourceType: SourceType;
  createdAt: number;
  tasks?: TaskPayload[];
  linkedMemoryId?: string;
}

export interface QueryAskPayload {
  queryId: string;
  question: string;
  targetSources?: SourceType[];
}

export interface QueryResponsePayload {
  queryId: string;
  question: string;
  answer: string;
  sources: {
    memoryId: string;
    title: string;
    sourceType: SourceType;
    snippet: string;
    timestamp: number;
  }[];
  relatedProjects: string[];
  confidenceScore: number;
  executedOnNpu: boolean;
}
