import React, { useEffect } from "react"
import { Grid } from "@mui/material"
import CamStream from "./components/CamStream"
import BearingLines from "./components/BearingLines"
import CamRaw from "./components/CamRaw"

export default function CameraFeeds() {
  useEffect(() => {}, [])

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={0}>
      <Grid item xs={12}>
        <h1>Camera Feeds</h1>
      </Grid>

      <Grid item xs={12} sx={{ border: "solid" }}>
        <CamRaw />
      </Grid>

      <Grid item xs={12} sx={{ border: "solid" }}>
        <h1>WebRTC</h1>
        <CamStream ID={"axis1"} />
        <BearingLines />
      </Grid>
    </Grid>
  )
}
