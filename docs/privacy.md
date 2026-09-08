# VYRA Privacy & Data Governance Architecture

## 1. Core Privacy Pillars

1. **Zero Cloud Requirement**: The entire intelligence loop (Capture, OCR, ASR, LLM, Vector Embeddings, Semantic Storage, Synthesis) executes entirely locally on the user's phone (iQOO 15) and local laptop workspace.
2. **Explicit User Persistence**: Information gathered via CameraX or Microphone exists strictly in volatile RAM as transient session context until the user explicitly taps `[ SAVE TO MEMORY ]`. Unsaved context is pruned when the session closes.
3. **Ephemerality of Raw Media**: Raw camera frames and PCM audio buffers are discarded immediately after OCR and ASR token generation. VYRA retains structured metadata, not raw audiovisual recordings.
4. **Android 16 Transparency**: Strict compliance with Android 16 foreground service guidelines (`FOREGROUND_SERVICE_TYPE_CAMERA` and `FOREGROUND_SERVICE_TYPE_MICROPHONE`). No silent background listening or recording occurs.

## 2. Cryptographic Storage
- **Mobile Store**: Android Room database secured via SQLCipher with 256-bit AES-GCM encryption.
- **Key Derivation**: Master keys generated within hardware-backed Android Keystore (`KeyGenParameterSpec` with `PURPOSE_ENCRYPT | PURPOSE_DECRYPT` and StrongBox backing where available).
- **Laptop Store**: Encrypted SQLite with local-only localhost binding.

## 3. Data Deletion & User Sovereignty
- **Instant Data Purge**: Single-tap "Purge Memory" removes all stored memories, tasks, notes, and local vector embeddings.
- **Selective Retention**: Users can delete individual memories or context fragments at any time from both phone and laptop.
- **Zero Telemetry**: No user context or captured queries are ever sent to external cloud telemetry servers.
