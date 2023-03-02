import React, { useEffect } from "react"
import { Grid } from "@mui/material"
import CamStream from "./components/CamStream"
import BearingLines from "./components/BearingLines"

export default function CamLookout() {
  useEffect(() => {}, [])

  return (
    <Grid direction="row" justifyContent="center" alignItems="center" spacing={0}>
       <Grid item xs={6} sx={{ border: "solid" }}>
        <CamStream ID={"axis1"} />
        <BearingLines/>
        </Grid>
    </Grid>
  )
}
