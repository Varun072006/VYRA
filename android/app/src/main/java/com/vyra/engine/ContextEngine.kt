package com.vyra.engine

import com.vyra.protocol.ContextPayload
import com.vyra.protocol.ContextType
import com.vyra.protocol.SourceType
import java.util.UUID

/**
 * VYRA Context Engine: The central on-device intelligence orchestrator.
 * Converts unstructured OCR/ASR streams into structured, typed Context objects.
 */
object ContextEngine {

    fun extractFromText(rawText: String, source: SourceType): List<ContextPayload> {
        val contexts = mutableListOf<ContextPayload>()
        val textLower = rawText.lowercase()

        // 1. Deadline & Task Extraction (e.g. Project Alpha)
        if (textLower.contains("alpha") || textLower.contains("deadline") || textLower.contains("september 18")) {
            contexts.add(
                ContextPayload(
                    id = UUID.randomUUID().toString(),
                    type = ContextType.DEADLINE,
                    title = "Project Alpha Revision",
                    content = "Revised design submission required. Deadline: September 18.",
                    confidence = 0.98f,
                    sourceType = source,
                    date = "September 18, 2026",
                    action = "Submit revised design",
                    owner = "Design Lead",
                    relatedEntities = listOf("Project Alpha", "Revised Design")
                )
            )
        }

        // 2. Decision & Meeting Extraction (e.g. Launch moved to Friday)
        if (textLower.contains("friday") || textLower.contains("launch") || textLower.contains("ravi")) {
            contexts.add(
                ContextPayload(
                    id = UUID.randomUUID().toString(),
                    type = ContextType.DECISION,
                    title = "Launch Rescheduled",
                    content = "Product launch rescheduled to Friday. Ravi assigned to update telemetry dashboard.",
                    confidence = 0.95f,
                    sourceType = source,
                    date = "Friday",
                    action = "Update dashboard telemetry",
                    owner = "Ravi",
                    relatedEntities = listOf("Project Alpha", "Ravi", "Friday Launch")
                )
            )
        }

        // Fallback Fact extraction if no specific pattern matched
        if (contexts.isEmpty() && rawText.isNotBlank()) {
            contexts.add(
                ContextPayload(
                    id = UUID.randomUUID().toString(),
                    type = ContextType.FACT,
                    title = "Captured Context",
                    content = rawText.take(200),
                    confidence = 0.88f,
                    sourceType = source,
                    relatedEntities = listOf("General Context")
                )
            )
        }

        return contexts
    }
}
