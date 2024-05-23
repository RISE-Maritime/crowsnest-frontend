import React from "react"
import Paper from "@mui/material/Paper"
import GridHeading from "./GridHeading"
import { Stack } from "@mui/material"
import { ObcInstrumentField } from "@oicl/openbridge-webcomponents-react/navigation-instruments/instrument-field/instrument-field"
import ControlThrust from "./ControlThrust"
import LabelledRadioButton from "./LabelledRadioButton"
import { useRecoilState } from "recoil"
import { ATOM_SAIL_CONTROL } from "../../../recoil/atoms"

export default function ThrustPanel() {
  let [sailControl, setSailControl] = useRecoilState(ATOM_SAIL_CONTROL)

  const onSelectThrust = () => {
    setSailControl(prevState => {
      return {
        ...prevState,
        variableThrustMode: prevState.variableThrustMode === 0 ? 1 : 0,
      }
    })
  }

  return (
    <Paper sx={{ height: "100%" }}>
      <GridHeading
        heading="Variable sail thrust"
        actionButton={
          <LabelledRadioButton
            label="Use variable thrust"
            checked={sailControl.variableThrustMode === 0 ? true : false}
            onSelect={onSelectThrust}
          />
        }
      />
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        padding={2}
        sx={{ opacity: sailControl.variableThrustMode === 0 ? "100%" : "10%" }}
      >
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
          <ObcInstrumentField
            value={sailControl.variableThrustActualPct * 100}
            hasSetpoint={true}
            setpoint={sailControl.variableThrustSetPct * 100}
            degree={false}
            tag={"POWER"}
            unit={"%"}
            source={"simulation"}
            hasSource={false}
            size={"large"}
            maxDigits={3}
          />
        </Stack>
        <ControlThrust />
      </Stack>
    </Paper>
  )
}
