import React from "react"

import CamSelector from "./components/CamContriller"
import { Grid, Paper, Stack } from "@mui/material"
import ControlMetadataTelemetry from "./components/TelemetryController"
import LidarController from "./components/LidarController"

export default function CameraArray() {
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
