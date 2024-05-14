import React from "react"
import Paper from "@mui/material/Paper"
import { Stack } from "@mui/material"
import { ObcInstrumentField } from "@oicl/openbridge-webcomponents-react/navigation-instruments/instrument-field/instrument-field"
export default function ThrustPanel() {
  return (
    <Paper>
      <Stack>
        <h5>Thrust Panel</h5>
        <ObcInstrumentField/>
      </Stack>
    </Paper>
  )
}
