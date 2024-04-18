import React from "react"
import { Grid } from "@mui/material"
import MetadataTelemetry from "./MetadataTelemetry"

export default function ControlMetadataTelemetry() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <h3>Telemetry</h3>
        <MetadataTelemetry keyExpression={"rise/v0/boatswain/pubsub/flight_controller_telemetry/speedybee/vfr"} />
      </Grid>
    </Grid>
  )
}
