import React from "react"
import Paper from "@mui/material/Paper"
import CardHeading from "./CardHeading"
import { Stack } from "@mui/material"
import { ObcInstrumentField } from "@oicl/openbridge-webcomponents-react/navigation-instruments/instrument-field/instrument-field"
import ControlThrust from "./ControlThrust"

export default function ThrustPanel() {
  return (
    <Paper>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={0}>
        <CardHeading heading="Thrust" />
        <ObcInstrumentField
          value={5}
          hasSetpoint={true}
          setpoint={10}
          degree={false}
          tag={"POWER"}
          unit={"%"}
          source={"simulation"}
          hasSource={false}
          size={"large"}
          maxDigits={3}
        />
        <ControlThrust />
      </Stack>
    </Paper>
  )
}
