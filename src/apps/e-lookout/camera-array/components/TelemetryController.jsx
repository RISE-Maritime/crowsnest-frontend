import React from "react"
import { Grid } from "@mui/material"
import MetadataTelemetry from "./TelemetryMetadata"

export default function ControlMetadataTelemetry() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <h3>Telemetry</h3>
        {/* rise/v0/boatswain/pubsub/flight_controller_telemetry_vfrhud/speedybee */}
        <MetadataTelemetry keyExpression={"rise/v0/boatswain/pubsub/flight_controller_telemetry_vfrhud/speedybee"} />
      </Grid>
    </Grid>
  )
}


