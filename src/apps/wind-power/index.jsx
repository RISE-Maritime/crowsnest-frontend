import React from "react"
import PanelSailControl from "./components/PanelSailControl"
import PanelThrust from "./components/PanelThrust"
import PanelSailPositions from "./components/PanelSailPositions"
import { Grid } from "@mui/material"
import { useKeelsonData } from "../../hooks/useKeelsonData"
import { parseKeelsonMessage } from "../../utils"
import { ATOM_SAIL_CONTROL, ATOM_SAILS } from "../../recoil/atoms"
import { useSetRecoilState } from "recoil"

export default function index() {
  const setControlState = useSetRecoilState(ATOM_SAIL_CONTROL)
  const setSailsState = useSetRecoilState(ATOM_SAILS)

  // Setting up the subscription to the sail control state
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

  // Setting up the subscription to the sails state
  const onMessageSail = envelope => {
    let msg = parseKeelsonMessage(envelope)
    let sailNum = msg.key.split("/").at(-1)

    console.log("SAIL_" + sailNum + " msg", msg)

    setSailsState(prevState => {
      return {
        ...prevState,
        [`sail_${sailNum}`]: {
          isActiveMode: msg.payload.isActiveMode,
          sheetingAngleActualDeg: msg.payload.sheetingAngleActualDeg,
          sheetingAngleSetDeg: msg.payload.sheetingAngleSetDeg,
          windApparentAngleDeg: msg.payload.windApparentAngleDeg,
          boomAngleActualDeg: msg.payload.boomAngleActualDeg,
          windApparentSpeedMs: msg.payload.windApparentSpeedMs,
          windTrueAngleDeg: msg.payload.windTrueAngleDeg,
          windTrueSpeedMs: msg.payload.windTrueSpeedMs,
        },
      }
    })
  }

  useKeelsonData("rise/v0/seaman/pubsub/sail_state/backed/sail/*", "subscribe", onMessageSail)

  return (
    <Grid container sx={{ padding: "0.25rem" }} spacing={0.5}>
      <Grid item xs={3} sx={{ minHeight: "calc(100vh - 58px)" }}>
        <PanelThrust />
      </Grid>
      <Grid item xs sx={{ minHeight: "calc(100vh - 58px)" }}>
        <PanelSailPositions />
      </Grid>
      <Grid item xs={6} sx={{ minHeight: "calc(100vh - 58px)" }}>
        <PanelSailControl />
      </Grid>
    </Grid>
  )
}
