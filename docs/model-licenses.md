# VYRA Open Source Model Licenses & Attribution

All models utilized within VYRA operate locally under permissive open-source licenses permitting on-device modification and distribution:

1. **PaddleOCR**
   - Source: Baidu PaddlePaddle / PaddleOCR
   - License: Apache License 2.0
   - Role: Lightweight on-device text detection and recognition for mobile camera frames.

2. **whisper.cpp**
   - Source: Georgi Gerganov / OpenAI Whisper model weights
   - License: MIT License
   - Role: High-performance C++ inference for on-device automatic speech recognition.

3. **Sentence Transformers (all-MiniLM-L6-v2 ONNX)**
   - Source: Hugging Face / Sentence-Transformers
   - License: Apache License 2.0
   - Role: Fast local 384-dimensional dense semantic embeddings for memory vector search.

4. **Quantized Mobile Instruction LLM (Llama 3.2 1B / 3B Instruct / Qwen2.5 1.5B)**
   - License: Meta Llama 3.2 Community License / Apache 2.0
   - Role: Structured context extraction, deadline extraction, and cross-context Q&A synthesis.

5. **ONNX Runtime & QNN Execution Provider**
   - Source: Microsoft & Qualcomm Technologies, Inc.
   - License: MIT License / Qualcomm AI Engine Direct SDK terms
   - Role: Hardware acceleration layer targeting the Qualcomm Hexagon NPU.
