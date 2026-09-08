package com.vyra

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.*
import com.vyra.ai.QnnExecutionProvider
import com.vyra.bridge.PhoneLaptopBridge
import com.vyra.ui.screens.*

class MainActivity : ComponentActivity() {
    private val bridge = PhoneLaptopBridge()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Initialize Qualcomm Hexagon NPU with CPU fallback enabled
        QnnExecutionProvider.initialize(allowCpuFallback = true)

        setContent {
            var currentScreen by remember { mutableStateOf("home") }

            when (currentScreen) {
                "home" -> HomeScreen(
                    onNavigateLens = { currentScreen = "lens" },
                    onNavigateVoice = { currentScreen = "lens" },
                    onNavigateMemory = { currentScreen = "home" },
                    onNavigateSettings = { currentScreen = "home" }
                )
                "lens" -> LensScreen(
                    onBack = { currentScreen = "home" },
                    onCaptured = { currentScreen = "result" }
                )
                "result" -> ResultScreen(
                    onBack = { currentScreen = "lens" },
                    onSave = { /* Saved to Room DB */ },
                    onSendToPc = {
                        bridge.connect(
                            onConnected = { bridge.sendStatus() },
                            onError = { /* fallback */ }
                        )
                    }
                )
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        bridge.disconnect()
    }
}
