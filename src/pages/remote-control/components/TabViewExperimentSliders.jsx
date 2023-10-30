import React from "react"
import { Stack } from "@mui/material"
import ControlThruster from "./ControlBowThruster"
import ControlEngPS from "./ControlEngPS"
import ControlRudder from "./ControlRudder"

export default function TabViewExperimentSliders() {
  return (
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={4}>
      <ControlThruster />

      <ControlEngPS />

      <ControlRudder />
    </Stack>
  )
}
