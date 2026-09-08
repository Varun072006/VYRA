import { WebSocket } from 'ws';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scenariosPath = path.join(__dirname, 'scenarios.json');
const rawScenarios = JSON.parse(fs.readFileSync(scenariosPath, 'utf8'));

const WS_URL = process.env.VYRA_WS_URL || 'ws://localhost:8080';
const mode = process.argv[2] || 'all';

console.log(`[iQOO 15 Simulator] Connecting to ${WS_URL} (Mode: ${mode})...`);

const ws = new WebSocket(WS_URL);

ws.on('open', async () => {
  console.log('[iQOO 15 Simulator] Connected to VYRA Laptop Workspace!');

  // Send initial device qualification status
  sendEnvelope('device.status', {
    npu: 'ACTIVE',
    qnn: 'HTP',
    ramFreeGB: 11.8,
    batteryPct: 94,
    thermalState: 'NOMINAL',
    deviceModel: 'iQOO 15 (India Edition — 16GB)',
    temperatureC: 33.8,
    npuOpsPerSec: '73 TOPS'
  });

  if (mode === 'doc' || mode === 'all') {
    await playScenario('documentScan');
  }

  if (mode === 'voice' || mode === 'all') {
    await playScenario('meetingAudio');
  }

  console.log('[iQOO 15 Simulator] Simulation finished.');
  setTimeout(() => ws.close(), 1000);
});

ws.on('error', err => {
  console.warn(`[iQOO 15 Simulator] Note: Could not connect to ${WS_URL} (${err.message}). Is the server running?`);
});

function sendEnvelope(type, payload) {
  const envelope = {
    type,
    sessionId: 'sim-session-001',
    timestamp: Date.now(),
    payload
  };
  ws.send(JSON.stringify(envelope));
  console.log(` -> Sent [${type}]`);
}

async function playScenario(scenarioKey) {
  const scenario = rawScenarios.scenarios[scenarioKey];
  if (!scenario) return;

  console.log(`\n--- Running Scenario: ${scenario.name} ---`);
  for (const step of scenario.steps) {
    await sleep(step.delayMs || 500);
    sendEnvelope(step.type, step.payload);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
