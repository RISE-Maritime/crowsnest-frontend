import { Paper } from "@mui/material"
import React from "react"

export default function TelemetryCard({ telemetryName, value, received_at, enclosed_at }) {
  const localReceivedAt = received_at ? received_at.toLocaleTimeString("sv-SE") : "-"
  const localEnclosedAt = enclosed_at ? enclosed_at.toLocaleTimeString("sv-SE") : "-"

  return (
    <Paper sx={{ width: "9rem", padding: "0.5rem", textAlign: "center" }}>
      <h4 style={{ margin: "0" }}>{telemetryName}</h4>
      <h3>{value}°</h3>

      <p style={{ fontSize: "0.8rem" }}>
        Rec At: {localReceivedAt}
        <br />
        Enc At: {localEnclosedAt}
        <br />
        Diff: {received_at != null ? (received_at - enclosed_at) / 1000: "-"} sec
        {/* Diff: {received_at != null ? Math.floor((received_at - enclosed_at) / 1000) : "N/A"} seconds */}
      </p>
    </Paper>
  );
}
