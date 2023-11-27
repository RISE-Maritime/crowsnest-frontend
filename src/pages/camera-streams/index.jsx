import React from "react"
import { Grid, Paper, Stack, Typography } from "@mui/material"
import CamStream from "./components/CamStream"
import CamFrameKeelson from "./components/CamFrameKeelson"

export default function CameraStreams() {
  return (
    <>
      <Stack justifyContent={"center"} alignItems={"center"}>
        <Typography variant="h3">Camera Streams</Typography>
      </Stack>

      <Grid container direction="row" justifyContent="center" alignItems="center" spacing={0}>
        <Grid item xs={12} sx={{ marginBottom: "0.5rem" }}>
          <Paper elevation={3}>
            <CamFrameKeelson />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3}>
            <Typography variant="h5" sx={{ padding: "0.8rem" }}>
              WebRTC
            </Typography>
            <CamStream ID={"axis1"} />
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
