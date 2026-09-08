export type SourceType = 'CAMERA' | 'VOICE' | 'NOTE' | 'MEETING';

export type ContextType =
  | 'FACT'
  | 'TASK'
  | 'DEADLINE'
  | 'DECISION'
  | 'PERSON'
  | 'LOCATION'
  | 'WARNING';

export interface ContextItem {
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
  timestamp: number;
  saved?: boolean;
}

export interface TaskItem {
  id: string;
  title: string;
  due?: string;
  owner?: string;
  sourceMemoryId?: string;
  status: 'PENDING' | 'DONE';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  sourceTitle?: string;
}

export interface DeadlineItem {
  id: string;
  title: string;
  date: string;
  action: string;
  sourceMemoryId?: string;
  sourceType: SourceType;
  daysRemaining: number;
}

export interface MemoryItem {
  id: string;
  title: string;
  summary: string;
  sourceType: SourceType;
  rawSourceRef?: string;
  createdAt: number;
  updatedAt: number;
  entities: string[];
  tasks: TaskItem[];
  deadlines: DeadlineItem[];
  decisions: string[];
  userSaved: boolean;
  tags: string[];
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  sourceType: SourceType;
  createdAt: number;
  tasks: string[];
  linkedMemoryId?: string;
  sourceLabel?: string;
}

export interface DeviceTelemetry {
  connected: boolean;
  deviceModel: string;
  npuStatus: 'ACTIVE' | 'IDLE' | 'OFFLINE';
  qnnProvider: 'HTP' | 'CPU_FALLBACK' | 'DISABLED';
  ramFreeGB: number;
  totalRamGB: number;
  batteryPct: number;
  thermalState: 'NOMINAL' | 'FAIR' | 'SERIOUS' | 'CRITICAL';
  temperatureC: number;
  latencyMs: number;
}

export interface LiveStreamMessage {
  id: string;
  timestamp: number;
  type: 'CAPTION' | 'OCR' | 'SUMMARY' | 'SYSTEM';
  text: string;
  confidence?: number;
}
