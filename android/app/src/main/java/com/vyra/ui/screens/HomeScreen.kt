package com.vyra.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun HomeScreen(
    onNavigateLens: () -> Unit,
    onNavigateVoice: () -> Unit,
    onNavigateMemory: () -> Unit,
    onNavigateSettings: () -> Unit
) {
    val darkBg = Color(0xFF0A0D14)
    val cardBg = Color(0xFF131826)
    val cyanAccent = Color(0xFF00F0FF)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(darkBg)
            .padding(24.dp),
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        // Top Header
        Column(modifier = Modifier.fillMaxWidth()) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "VYRA",
                    color = Color.White,
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Black,
                    letterSpacing = 2.sp
                )
                Text(
                    text = "⚙",
                    color = Color.Gray,
                    fontSize = 20.sp,
                    modifier = Modifier.clickable { onNavigateSettings() }
                )
            }

            Spacer(modifier = Modifier.height(16.dp))

            Text(
                text = "Understand More.\nDo More.",
                color = Color.White,
                fontSize = 28.sp,
                fontWeight = FontWeight.ExtraBold,
                lineHeight = 34.sp
            )

            Spacer(modifier = Modifier.height(20.dp))

            // Ask VYRA Search Input
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(52.dp)
                    .background(cardBg, RoundedCornerShape(16.dp))
                    .clickable { onNavigateMemory() }
                    .padding(horizontal = 16.dp),
                contentAlignment = Alignment.CenterStart
            ) {
                Text(
                    text = "🔍  Ask VYRA across your memories...",
                    color = Color.Gray,
                    fontSize = 14.sp
                )
            }
        }

        // 4 Quadrant Action Tiles
        Column(
            modifier = Modifier.fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(14.dp)
            ) {
                ActionTile(
                    title = "LENS",
                    subtitle = "Camera OCR",
                    icon = "📷",
                    modifier = Modifier.weight(1f),
                    onClick = onNavigateLens
                )
                ActionTile(
                    title = "VOICE",
                    subtitle = "whisper.cpp",
                    icon = "🎙",
                    modifier = Modifier.weight(1f),
                    onClick = onNavigateVoice
                )
            }

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(14.dp)
            ) {
                ActionTile(
                    title = "MEMORY",
                    subtitle = "Q&A Search",
                    icon = "🧠",
                    modifier = Modifier.weight(1f),
                    onClick = onNavigateMemory
                )
                ActionTile(
                    title = "FOCUS",
                    subtitle = "Rule Shield",
                    icon = "🛡",
                    modifier = Modifier.weight(1f),
                    onClick = onNavigateSettings
                )
            }
        }

        // Bottom Hero Card & Hardware Indicator
        Column(
            modifier = Modifier.fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            // Recent Context Card
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(cardBg, RoundedCornerShape(16.dp))
                    .padding(16.dp)
            ) {
                Column {
                    Text(
                        text = "RECENT CONTEXT",
                        color = cyanAccent,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        fontFamily = FontFamily.Monospace
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "Project Alpha",
                        color = Color.White,
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "Deadline: Sep 18 · Revised design required",
                        color = Color.LightGray,
                        fontSize = 12.sp
                    )
                }
            }

            // Hardware NPU Active Pill
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.Center,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .size(8.dp)
                        .background(Color(0xFF10B981), RoundedCornerShape(4.dp))
                )
                Spacer(modifier = Modifier.width(6.dp))
                Text(
                    text = "LOCAL AI ● NPU ACTIVE ● SNAPDRAGON 8 ELITE",
                    color = Color.Gray,
                    fontSize = 10.sp,
                    fontFamily = FontFamily.Monospace,
                    fontWeight = FontWeight.SemiBold
                )
            }
        }
    }
}

@Composable
fun ActionTile(
    title: String,
    subtitle: String,
    icon: String,
    modifier: Modifier = Modifier,
    onClick: () -> Unit
) {
    Box(
        modifier = modifier
            .height(100.dp)
            .background(Color(0xFF131826), RoundedCornerShape(18.dp))
            .clickable { onClick() }
            .padding(16.dp),
        contentAlignment = Alignment.CenterStart
    ) {
        Column {
            Text(text = icon, fontSize = 22.sp)
            Spacer(modifier = Modifier.height(6.dp))
            Text(
                text = title,
                color = Color.White,
                fontSize = 15.sp,
                fontWeight = FontWeight.Black
            )
            Text(
                text = subtitle,
                color = Color.Gray,
                fontSize = 11.sp
            )
        }
    }
}
