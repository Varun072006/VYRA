import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '..', 'vyra_local.sqlite');

export const db = new DatabaseSync(dbPath);

// Initialize Tables
export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS memories (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      source_type TEXT NOT NULL,
      raw_source_ref TEXT,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      entities TEXT,
      decisions TEXT,
      user_saved INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      due TEXT,
      owner TEXT,
      source_memory_id TEXT,
      status TEXT DEFAULT 'PENDING',
      priority TEXT DEFAULT 'MEDIUM'
    );

    CREATE TABLE IF NOT EXISTS contexts (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      confidence REAL NOT NULL,
      source_type TEXT NOT NULL,
      date TEXT,
      action TEXT,
      owner TEXT,
      timestamp INTEGER NOT NULL,
      saved INTEGER DEFAULT 0
    );
  `);
  console.log('[VYRA DB] SQLite store initialized at:', dbPath);
}

export function insertMemory(memory) {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO memories (id, title, summary, source_type, raw_source_ref, created_at, updated_at, entities, decisions, user_saved)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    memory.id,
    memory.title,
    memory.summary,
    memory.sourceType,
    memory.rawSourceRef || null,
    memory.createdAt || Date.now(),
    memory.updatedAt || Date.now(),
    JSON.stringify(memory.entities || []),
    JSON.stringify(memory.decisions || []),
    memory.userSaved ? 1 : 0
  );
}

export function getMemories() {
  const query = db.prepare('SELECT * FROM memories ORDER BY created_at DESC');
  return query.all().map(row => ({
    ...row,
    sourceType: row.source_type,
    rawSourceRef: row.raw_source_ref,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    userSaved: Boolean(row.user_saved),
    entities: JSON.parse(row.entities || '[]'),
    decisions: JSON.parse(row.decisions || '[]')
  }));
}

export function insertTask(task) {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO tasks (id, title, due, owner, source_memory_id, status, priority)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    task.id,
    task.title,
    task.due || null,
    task.owner || null,
    task.sourceMemoryId || null,
    task.status || 'PENDING',
    task.priority || 'MEDIUM'
  );
}

export function getTasks() {
  const query = db.prepare('SELECT * FROM tasks ORDER BY id DESC');
  return query.all();
}
