import React from "react"
import SailPanel from "./components/SailPanel"
import ThrustPanel from "./components/ThrustPanel"
import SailPositions from "./components/SailPositions"
import { Grid } from "@mui/material"
import { useKeelsonData } from "../../hooks/useKeelsonData"
import { parseKeelsonMessage } from "../../utils"

export default function index() {
  const onMessage = envelope => {
    let msg = parseKeelsonMessage(envelope)
    console.log("Control msg", msg)
  }

  useKeelsonData("rise/v0/seaman/pubsub/sail_control_state/backed/sail_control", "subscribe", onMessage)

  return (
    <Grid container sx={{ padding: "0.25rem" }} spacing={0.5}>
      <Grid item xs={2}>
        <ThrustPanel />
      </Grid>
      <Grid item xs={2}>
        <SailPositions />
      </Grid>
      <Grid item xs={8}>
        <SailPanel />
      </Grid>
    </Grid>
  )
}
