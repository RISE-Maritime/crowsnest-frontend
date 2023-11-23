import React, { useEffect } from "react"
import { Grid } from "@mui/material"
import CamStream from "./components/CamStream"
import BearingLines from "./components/BearingLines"
import CamRaw from "./components/CamRaw"

export default function CamLookout() {
  useEffect(() => {}, [])

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={0}>
      <Grid item xs={6} sx={{ border: "solid" }}>
        <CamStream ID={"axis1"} />
        <BearingLines />
      </Grid>
      <Grid item xs={6} sx={{ border: "solid" }}>
        <CamRaw />
      </Grid>
    </Grid>
  )
}
