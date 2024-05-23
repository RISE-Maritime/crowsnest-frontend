import React from "react"
import { useKeelsonData } from "../../../hooks/useKeelsonData"
import { parseKeelsonMessage } from "../../../utils"
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
