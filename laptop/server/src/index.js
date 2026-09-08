import http from 'node:http';
import { WebSocketServer } from 'ws';
import { initDatabase, insertMemory, getMemories, insertTask, getTasks } from './db.js';
import { semanticQuery } from './search.js';

const PORT = 8080;

// Initialize Database & Seed initial Hero items if empty
initDatabase();
const existing = getMemories();
if (existing.length === 0) {
  insertMemory({
    id: 'mem-001',
    title: 'Project Alpha Brief',
    summary: 'Revised design required. Submission deadline set for September 18 with team sign-off.',
    sourceType: 'CAMERA',
    rawSourceRef: 'cam_doc_alpha.jpg',
    entities: ['Project Alpha', 'Revised Design', 'Design Team'],
    decisions: ['Submit revised design before client milestone'],
    userSaved: true
  });

  insertMemory({
    id: 'mem-002',
    title: 'Client Review & Launch Meeting',
    summary: 'Launch was moved to Friday. Revised design must be completed first. Ravi assigned to update dashboard.',
    sourceType: 'MEETING',
    rawSourceRef: 'meeting_audio_chunk_1.pcm',
    entities: ['Project Alpha', 'Ravi', 'Friday Launch'],
    decisions: ['Reschedule launch to Friday', 'Ravi to update dashboard'],
    userSaved: true
  });

  insertTask({
    id: 'task-001',
    title: 'Submit revised design for Project Alpha',
    due: 'Sep 18',
    owner: 'Design Lead',
    sourceMemoryId: 'mem-001',
    status: 'PENDING',
    priority: 'HIGH'
  });

  console.log('[VYRA DB] Hero memories seeded successfully.');
}

// Create HTTP Server
const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-VYRA-AUTH');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/api/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        status: 'ONLINE',
        pairedDevice: 'iQOO 15',
        npu: 'Hexagon HTP / QNN Active',
        totalMemories: getMemories().length,
        version: '1.0.0-winning-build'
      })
    );
    return;
  }

  if (url.pathname === '/api/memories') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(getMemories()));
    return;
  }

  if (url.pathname === '/api/tasks') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(getTasks()));
    return;
  }

  if (url.pathname === '/api/ask') {
    const q = url.searchParams.get('q') || 'What do I need to finish for Project Alpha?';
    const result = semanticQuery(q);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

// Create WebSocket Server
const wss = new WebSocketServer({ server });

wss.on('connection', ws => {
  console.log('[VYRA WS] Client connected (iQOO 15 / Laptop Web)');

  // Send initial device status envelope
  ws.send(
    JSON.stringify({
      type: 'device.status',
      sessionId: 'session-live-01',
      timestamp: Date.now(),
      payload: {
        npu: 'ACTIVE',
        qnn: 'HTP',
        ramFreeGB: 11.6,
        batteryPct: 92,
        thermalState: 'NOMINAL',
        deviceModel: 'iQOO 15 (Snapdragon 8 Elite)'
      }
    })
  );

  ws.on('message', data => {
    try {
      const msg = JSON.parse(data.toString());
      console.log(`[VYRA WS] Received ${msg.type}`);

      // Broadcast to all other clients
      wss.clients.forEach(client => {
        if (client !== ws && client.readyState === 1) {
          client.send(JSON.stringify(msg));
        }
      });

      // Handle specific messages
      if (msg.type === 'query.ask') {
        const response = semanticQuery(msg.payload.question);
        ws.send(
          JSON.stringify({
            type: 'query.response',
            sessionId: msg.sessionId,
            timestamp: Date.now(),
            payload: response
          })
        );
      } else if (msg.type === 'memory.save') {
        insertMemory(msg.payload);
      }
    } catch (err) {
      console.error('[VYRA WS] Error parsing message:', err);
    }
  });

  ws.on('close', () => {
    console.log('[VYRA WS] Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`  VYRA Laptop Server running on port ${PORT}`);
  console.log(`  HTTP API: http://localhost:${PORT}/api/status`);
  console.log(`  WebSocket: ws://localhost:${PORT}`);
  console.log(`=========================================`);
});
