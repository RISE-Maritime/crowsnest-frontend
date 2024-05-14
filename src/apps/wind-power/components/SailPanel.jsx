import React from "react"
import { useKeelsonData } from "../../../hooks/useKeelsonData"
import { parseKeelsonMessage } from "../../../utils"
import { Grid } from "@mui/material"
import SailControl from "./SailControl"

export default function SailPanel() {
  const onMessage = envelope => {
    let msg = parseKeelsonMessage(envelope)
    console.log("SAIL msg", msg)
  }

  useKeelsonData("rise/v0/seaman/pubsub/sail_state/backed/sail/0", "subscribe", onMessage)

  return (
    <Grid container>
      <Grid item xs={12}>
        <SailControl />
      </Grid>
    </Grid>
  )
}
