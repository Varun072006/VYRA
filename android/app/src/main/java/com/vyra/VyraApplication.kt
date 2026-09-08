package com.vyra

import android.app.Application
import android.util.Log

class VyraApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        Log.i("VYRA", "Vyra Application Initialized on iQOO 15 (Android 16)")
    }
}
