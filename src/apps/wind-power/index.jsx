import React, { useState } from "react"
import PanelSail from "./components/PanelSail"
import ThrustPanel from "./components/ThrustPanel"
import SailPositions from "./components/SailPositions"
import { Grid } from "@mui/material"
import { useKeelsonData } from "../../hooks/useKeelsonData"
import { parseKeelsonMessage } from "../../utils"
import { ATOM_SAIL_CONTROL, ATOM_SAILS } from "../../recoil/atoms"
import { useRecoilState } from "recoil"

export default function index() {
  const [controlState, setControlState] = useRecoilState(ATOM_SAIL_CONTROL)
  const [sailsState, setSailsState] = useRecoilState(ATOM_SAILS)

  const onMessageControl = envelope => {
    let msg = parseKeelsonMessage(envelope)
    console.log("Control msg", msg)

    if (msg.key === "rise/v0/seaman/pubsub/sail_control_state/backed/sail_control") {
      setControlState(prevState => {
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
      <Grid item xs={3} sx={{ height: "calc(100vh - 58px)" }}>
        <ThrustPanel />
      </Grid>
      <Grid item xs sx={{ height: "calc(100vh - 58px)" }}>
        <SailPositions />
      </Grid>
      <Grid item xs={6} sx={{ height: "calc(100vh - 58px)" }}>
        <PanelSail />
      </Grid>
    </Grid>
  )
}
