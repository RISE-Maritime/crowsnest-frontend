import React from "react"
import { Stack } from "@mui/material"
import ControlThruster from "../../../base-elements/components/maneuver-controls/SliderControlThruster"
import ControlEngPS from "../../../base-elements/components/maneuver-controls/SliderControlEng"
import ControlRudder from "../../../base-elements/components/maneuver-controls/SliderControlRudder"

export default function TabViewExperimentSliders() {
  return (
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={4}>
      <ControlThruster />

      <ControlEngPS />

      <ControlRudder />
    </Stack>
  )
}
