# VYRA System Architecture

> **VYRA** — Understand More. Do More.
> *An iQOO-native contextual intelligence layer*

## 1. High-Level Concept

VYRA runs natively on the iQOO 15 (Snapdragon 8 Elite Gen 5) and streams contextual intelligence seamlessly to the VYRA Workspace on laptop. The interaction model is:

$$\text{SEE} \longrightarrow \text{UNDERSTAND} \longrightarrow \text{EXTRACT} \longrightarrow \text{REMEMBER} \longrightarrow \text{CONNECT} \longrightarrow \text{ASK} \longrightarrow \text{ACT}$$

```
                ┌──────────────────────────────────────────────┐
                │          REAL WORLD CAPTURE LAYER            │
                │   CameraX (Lens)         Microphone (Voice)  │
                └──────────────┬────────────────────────┬──────┘
                               │                        │
                               ▼                        ▼
                       PaddleOCR (JNI)           whisper.cpp (NDK)
                               │                        │
                               └───────────┬────────────┘
                                           ▼
                ┌──────────────────────────────────────────────┐
                │            VYRA CONTEXT ENGINE               │
                │        Quantized Mobile LLM / ONNX           │
                │        HTP NPU Acceleration via QNN          │
                └──────────────────────────┬───────────────────┘
                                           ▼
                        Structured Context Objects
                   (FACT | TASK | DEADLINE | DECISION)
                                           │
                                ┌──────────┴──────────┐
                                ▼                     ▼
                       Save to Memory?           Live Stream
                                │                     │
                                ▼                     ▼
                        Room DB (Encrypted)    WebSocket Bridge
                        Local HNSW Vector Index       │
                                │                     ▼
                                │             VYRA Laptop Workspace
                                │             (React + Vite + Ktor)
                                ▼
                       Cross-Context Q&A
                  (Multi-Source Synthesis Engine)
```

## 2. Subsystem Details

### 2.1 Lens Engine (Camera → OCR → Context)
- **Capture**: Android CameraX ImageAnalysis use case with preview stabilization.
- **Preprocessing**: Grayscale conversion, adaptive thresholding, perspective correction in C++ native layer.
- **OCR Engine**: Mobile-optimized PaddleOCR light model.
- **Extraction**: Passes text blocks to on-device LLM with strict JSON schema enforcement to parse deadlines, actions, and entities.

### 2.2 Voice Engine (Mic → ASR → Context)
- **Audio Capture**: 16kHz 16-bit mono PCM stream via AudioRecord with dynamic noise suppression.
- **Voice Activity Detection (VAD)**: Energy and zero-crossing rate filter to isolate spoken speech segments.
- **ASR Engine**: whisper.cpp quantized tiny.en / base model running via NDK C++ wrapper.
- **Context Link**: Extracts tasks, decisions, and meeting owners and automatically links them to existing project memories.

### 2.3 On-Device NPU Acceleration Stack
- **Framework**: ONNX Runtime v1.18+ with Qualcomm QNN Execution Provider.
- **Hardware Target**: Snapdragon 8 Elite Gen 5 Hexagon NPU with HTP (High-Throughput Processor) backend.
- **Fallback Mechanism**: Dynamic CPU fallback if any operator is unsupported, preventing crashes while logging NPU execution metrics.

### 2.4 Persistent Memory & Semantic Retrieval
- **Persistence**: Room database encrypted with SQLCipher using keys in Android Keystore.
- **Embedding**: 384-dimensional dense vectors generated locally using MiniLM quantized ONNX model.
- **Vector Search**: Hierarchical Navigable Small World (HNSW) graph for fast cosine similarity search ($<15$ ms).
- **Cross-Context Synthesis**: Re-ranks top-K contexts from distinct source types (e.g. document + meeting) into a multi-citation synthesis prompt.

### 2.5 Phone ↔ Laptop Continuity
- **Transport**: Real-time bidirectional WebSocket over local Wi-Fi or USB ADB tunnel.
- **OriginOS Office Kit Integration**: Complements screen mirroring and task handoff when native system APIs are present.
- **State Synchronization**: Automatic delta synchronization of newly captured context cards, tasks, and notes without cloud dependency.
