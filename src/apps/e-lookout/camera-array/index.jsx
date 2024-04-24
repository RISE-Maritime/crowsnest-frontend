import React from "react"

import CamSelector from "./components/CamContriller"
import { Grid, Paper, Stack } from "@mui/material"
import ControlMetadataTelemetry from "./components/TelemetryController"
import LidarController from "./components/LidarController"

export default function CameraArray() {

  function parseUint8ArrayToFloat64Array(uint8Array) {
    // const float64ArrayLength = uint8Array.length / 8;
    const numPoints = uint8Array.length / 16

    const points = []
    for (let i = 0; i < numPoints; i++) {
      const point = []
      point.push(new Float64Array(uint8Array.buffer, 0, 1)[0])
      point.push(new Float64Array(uint8Array.buffer, 8, 1)[0])

      points.push(point)
    }
    return points
  }

  // Example usage:
  const uint8Array = new Uint8Array([
    150, 69, 34, 127, 32, 23, 0, 64, 150, 69, 34, 127, 32, 23, 20, 64, 150, 69, 34, 127, 32, 23, 0, 64, 150, 69, 34,
    127, 32, 23, 20, 64,
  ]) // Example bytes representing two float64 values
  const float64Array = parseUint8ArrayToFloat64Array(uint8Array)
  console.log("HERE: ",float64Array) // Output: Float64Array [ 1, 2 ]

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper sx={{ padding: "0.5rem", margin: "0.5rem" }}>
          <Stack direction="row">
            <CamSelector defaultSelected={"axis-1"} />
            <CamSelector defaultSelected={"axis-3"} />
            <CamSelector defaultSelected={"axis-4"} />
            <CamSelector defaultSelected={"axis-2"} />
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper sx={{ padding: "0.5rem", margin: "0.5rem", height: "100%" }}>
          <LidarController />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper sx={{ padding: "0.5rem", margin: "0.5rem", height: "100%" }}>
          <ControlMetadataTelemetry />
        </Paper>
      </Grid>
    </Grid>
  )
}
