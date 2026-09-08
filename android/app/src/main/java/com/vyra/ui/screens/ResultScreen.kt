package com.vyra.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun ResultScreen(
    onBack: () -> Unit,
    onSave: () -> Unit,
    onSendToPc: () -> Unit
) {
    var saved by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF0A0D14))
            .padding(20.dp),
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        // Top Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "← VYRA RESULT",
                color = Color.White,
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.clickable { onBack() }
            )
            Text(
                text = "Extracted by NPU",
                color = Color(0xFF00F0FF),
                fontSize = 11.sp,
                fontFamily = FontFamily.Monospace
            )
        }

        // Extracted Content Card
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color(0xFF131826), RoundedCornerShape(20.dp))
                .padding(20.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            Text(
                text = "PROJECT ALPHA",
                color = Color.White,
                fontSize = 20.sp,
                fontWeight = FontWeight.Black
            )

            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Text(
                    text = "Summary",
                    color = Color.Gray,
                    fontSize = 11.sp,
                    fontFamily = FontFamily.Monospace,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = "Revised design required before staging verification.",
                    color = Color.LightGray,
                    fontSize = 14.sp
                )
            }

            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Text(
                    text = "Important",
                    color = Color(0xFFF59E0B),
                    fontSize = 11.sp,
                    fontFamily = FontFamily.Monospace,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = "• Deadline: September 18\n• Final sign-off mandatory",
                    color = Color.White,
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Medium
                )
            }

            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Text(
                    text = "ACTION ITEM",
                    color = Color(0xFF00F0FF),
                    fontSize = 11.sp,
                    fontFamily = FontFamily.Monospace,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = "Send revised design to engineering lead",
                    color = Color.White,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.SemiBold
                )
            }
        }

        // Hero Action Buttons: [ SAVE ] [ REMINDER ] [ SEND TO PC ]
        Column(
            modifier = Modifier.fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                Button(
                    onClick = {
                        saved = true
                        onSave()
                    },
                    modifier = Modifier.weight(1f),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = if (saved) Color(0xFF10B981) else Color(0xFF00F0FF)
                    ),
                    shape = RoundedCornerShape(14.dp)
                ) {
                    Text(
                        text = if (saved) "SAVED ✓" else "SAVE",
                        color = Color.Black,
                        fontWeight = FontWeight.Bold
                    )
                }

                Button(
                    onClick = { /* Remind */ },
                    modifier = Modifier.weight(1f),
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF1F293D)),
                    shape = RoundedCornerShape(14.dp)
                ) {
                    Text(
                        text = "REMINDER",
                        color = Color.White,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }

            Button(
                onClick = onSendToPc,
                modifier = Modifier.fillMaxWidth(),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF1F293D)),
                shape = RoundedCornerShape(14.dp)
            ) {
                Text(
                    text = "SEND TO PC / LAPTOP WORKSPACE",
                    color = Color(0xFF00F0FF),
                    fontWeight = FontWeight.Bold
                )
            }
        }
    }
}
