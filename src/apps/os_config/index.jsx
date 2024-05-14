import React from "react"
import { Grid, Paper } from "@mui/material"
// import GridCenter from "../../base-elements/components/GridCenter"
import PlatformPicker from "./components/PlatformPicker"
import ActiveConfiguration from "./components/ActiveConfiguration"


export default function PageConfiguration() {
  return (
    <Grid container spacing={2} sx={{padding: "0.5rem"}}>
      <Grid item xs={12} sx={{textAlign: "center"}}>
        <h2>Own Ship/Platform Configuration </h2>
      </Grid>

      <Grid item xs={12}>
        <Paper>
          <PlatformPicker />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper>
          <ActiveConfiguration />
        </Paper>
      </Grid>
    </Grid>
  )
}
