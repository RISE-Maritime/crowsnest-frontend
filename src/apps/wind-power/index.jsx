import React, { useState } from "react"
import PanelSail from "./components/PanelSail"
import ThrustPanel from "./components/ThrustPanel"
import SailPositions from "./components/SailPositions"
import { Grid } from "@mui/material"
import { useKeelsonData } from "../../hooks/useKeelsonData"
import { parseKeelsonMessage } from "../../utils"

export default function index() {
  const [controlState, setcontrolState] = useState({
    coupledSteeringMode: 0,
    sheetingMode: 1,
    variableThrustActualPct: 5,
    variableThrustMode: 0,
    variableThrustSetPct: 0.5,
  })

  const [sailsState, setSailsState] = useState({
    sail1: {
      coupledSteeringMode: 0,
      sheetingMode: 1,
      variableThrustActualPct: 5,
      variableThrustMode: 0,
      variableThrustSetPct: 0.5,
    },
    sail2: {
      coupledSteeringMode: 0,
      sheetingMode: 1,
      variableThrustActualPct: 5,
      variableThrustMode: 0,
      variableThrustSetPct: 0.5,
    },
    sail3: {
      coupledSteeringMode: 0,
      sheetingMode: 1,
      variableThrustActualPct: 5,
      variableThrustMode: 0,
      variableThrustSetPct: 0.5,
    },
    sail4: {
      coupledSteeringMode: 0,
      sheetingMode: 1,
      variableThrustActualPct: 5,
      variableThrustMode: 0,
      variableThrustSetPct: 0.5,
    },
    sail5: {
      coupledSteeringMode: 0,
      sheetingMode: 1,
      variableThrustActualPct: 5,
      variableThrustMode: 0,
      variableThrustSetPct: 0.5,
    },
    sail6: {
      coupledSteeringMode: 0,
      sheetingMode: 1,
      variableThrustActualPct: 5,
      variableThrustMode: 0,
      variableThrustSetPct: 0.5,
    },
  })

  const onMessageControl = envelope => {
    let msg = parseKeelsonMessage(envelope)
    console.log("Control msg", msg)

    setSailsState(prevState => {
      return {
        ...prevState,
        coupledSteeringMode: msg.payload.coupledSteeringMode,
        sheetingMode: msg.payload.sheetingMode,
        variableThrustActualPct: msg.payload.variableThrustActualPct,
        variableThrustMode: msg.payload.variableThrustMode,
        variableThrustSetPct: msg.payload.variableThrustSetPct,
      }
    })
  }

  useKeelsonData("rise/v0/seaman/pubsub/sail_control_state/backed/sail_control", "subscribe", onMessageControl)

  const onMessageSail = envelope => {
    let msg = parseKeelsonMessage(envelope)
    console.log("SAIL msg", msg)
    let sailNum = msg.key.split("/")[-1]

    setSailsState(prevState => {
      return {
        ...prevState,
        [`sail${sailNum}`]: {
          coupledSteeringMode: msg.payload.coupledSteeringMode,
          sheetingMode: msg.payload.sheetingMode,
          variableThrustActualPct: msg.payload.variableThrustActualPct,
          variableThrustMode: msg.payload.variableThrustMode,
          variableThrustSetPct: msg.payload.variableThrustSetPct,
        },
      }
    })
  }

  useKeelsonData("rise/v0/seaman/pubsub/sail_state/backed/sail/*", "subscribe", onMessageSail)

  return (
    <Grid container sx={{ padding: "0.25rem" }} spacing={0.5}>
      <Grid item xs={3} sx={{ height: "100vh - 58px" }}>
        <ThrustPanel controlState={controlState} />
      </Grid>
      <Grid item xs sx={{ height: "100vh - 58px" }}>
        <SailPositions />
      </Grid>
      <Grid item xs={6} sx={{ height: "100vh - 58px" }}>
        <PanelSail controlState={controlState} />
      </Grid>
    </Grid>
  )
}
