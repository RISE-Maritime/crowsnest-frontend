import React from "react"
import { Grid } from "@mui/material"
import SailControl from "./SailControl"

export default function SailPanel() {

  return (
    <Grid container>
      <Grid item xs={12}>
        <SailControl />
      </Grid>
    </Grid>
  )
}
