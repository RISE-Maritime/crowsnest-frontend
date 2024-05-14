import React from "react"
import { Grid } from "@mui/material"
import CamStream from "./components/CamStream"
import BearingLines from "./components/BearingLines"
import CamStreamYOLO from "./components/CamStreamYOLO"

export default function CamLookout() {
  return (
    <Grid container>
      <Grid item xs={6} sx={{ border: "solid" }}>
        <CamStream ID={"A"} />
        <BearingLines />
      </Grid>
      <Grid item xs={6} sx={{ border: "solid" }}>
        <CamStream ID={"B"} />
      </Grid>
      <Grid item xs={6} sx={{ border: "solid" }}>
        <CamStreamYOLO ID={"C"} />
      </Grid>
    </Grid>
  )
}
