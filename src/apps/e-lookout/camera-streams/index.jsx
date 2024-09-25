import React from "react"
import { Grid, Paper, Stack, Typography } from "@mui/material"
import CamStream from "./components/CamStream"
import CamFrameKeelson from "./components/CamFrameKeelson"

export default function CameraStreams() {
  return (
    <div>
      <Stack justifyContent="center" alignItems="center">
        <Typography variant="h3" component="h1" p={4}>
          Camera Streams Tester
        </Typography>
      </Stack>

      <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <CamFrameKeelson />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3}>
            <Typography variant="h5" p={2}>
              WebRTC
            </Typography>
            <CamStream ID={"axis-1"} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
