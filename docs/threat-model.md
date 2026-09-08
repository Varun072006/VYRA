# VYRA Threat Model & Security Controls

## 1. Attack Surface Analysis

| Threat Actor | Threat Vector | Target Asset | Severity | Mitigation & Defense-in-Depth |
|---|---|---|---|---|
| Malicious Local App | IPC / ContentProvider sniffing | Unencrypted Room DB | High | SQLCipher 256-bit AES encryption; Android Keystore isolation; strictly exported=false on internal components |
| Rogue Wi-Fi Device | Network eavesdropping / packet injection | Phone ↔ Laptop WebSocket | High | Local pairing handshake with ephemeral secret token; TLS 1.3 over WPA3 LAN or direct USB ADB reverse tunnel (`adb reverse tcp:8080 tcp:8080`) |
| Physical Device Access | Direct flash extraction / backup abuse | Persistent Memory & Tasks | Medium | Hardware-backed keystore with user lock credential requirement; `android:allowBackup="false"` |
| Malicious Model Injection | Tampered ONNX model weights | NPU Execution / Host process | Critical | Cryptographic SHA-256 integrity verification upon model loading before passing buffer to QNN execution provider |
| Covert Audio/Video Capture | Background privilege escalation | Camera & Microphone | High | Android 16 foreground service enforcement with persistent sticky notification and system mic/camera indicators |

## 2. Secure Local Protocol Handshake

When connecting the iQOO 15 to the VYRA Laptop Workspace:
1. Laptop generates a cryptographically random session PIN / token (6-digit or QR payload).
2. Phone scans or inputs the pairing token.
3. Subsequent WebSocket traffic requires the token header `X-VYRA-AUTH`.
4. Socket binds exclusively to `127.0.0.1` or authorized local subnet IP; external internet routing is rejected.
