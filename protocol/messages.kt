package com.vyra.protocol

import kotlinx.serialization.Serializable

@Serializable
enum class MessageType {
    SESSION_START,
    SESSION_END,
    DEVICE_STATUS,
    OCR_RESULT,
    CAPTION_UPDATE,
    SUMMARY_UPDATE,
    CONTEXT_CREATED,
    CONTEXT_UPDATED,
    MEMORY_SAVE,
    MEMORY_DELETE,
    TASK_CREATED,
    DEADLINE_CREATED,
    NOTE_CREATED,
    QUERY_ASK,
    QUERY_RESPONSE
}

@Serializable
enum class ContextType {
    FACT, TASK, DEADLINE, DECISION, PERSON, LOCATION, WARNING
}

@Serializable
enum class SourceType {
    CAMERA, VOICE, NOTE, MEETING
}

@Serializable
data class VyraEnvelope<T>(
    val type: String,
    val sessionId: String,
    val timestamp: Long,
    val payload: T
)

@Serializable
data class DeviceStatusPayload(
    val npu: String,
    val qnn: String,
    val ramFreeGB: Double,
    val batteryPct: Int,
    val thermalState: String,
    val deviceModel: String,
    val temperatureC: Double? = null
)

@Serializable
data class ContextPayload(
    val id: String,
    val type: ContextType,
    val title: String,
    val content: String,
    val confidence: Float,
    val sourceType: SourceType,
    val date: String? = null,
    val action: String? = null,
    val owner: String? = null,
    val relatedEntities: List<String> = emptyList()
)

@Serializable
data class MemoryPayload(
    val id: String,
    val title: String,
    val summary: String,
    val sourceType: SourceType,
    val rawSourceRef: String? = null,
    val createdAt: Long,
    val updatedAt: Long,
    val entities: List<String> = emptyList(),
    val decisions: List<String> = emptyList(),
    val userSaved: Boolean = true
)
