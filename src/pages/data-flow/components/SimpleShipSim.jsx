import React, { useRef } from "react"
import { Grid } from "@mui/material"
import { ObcButton as Button } from "@oicl/openbridge-webcomponents-react/components/button/button"
import {
  // OS_POSITIONS,
  // OS_HEADING,
  // OS_VELOCITY,
  // ATOM_OS_RUDDERS,
  // ATOM_OS_ENGINES,
  ATOM_SIM_STATE,
  showMiniAppsObj,
} from "../../../recoil/atoms"
import { useRecoilState, useSetRecoilState } from "recoil"
import { updateSimState } from "../../../recoil/selectors"
import SimMap from "./SimMap"
import VideogameAssetOffIcon from "@mui/icons-material/VideogameAssetOff"
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset"
import SimCommands from "./SimCommands"
import SimStateSetup from "./SimStateSetup"
import SimShipModelSelector from "./SimShipModelSelector"

export default function SimpleShipSim() {
  // const osHeading = useRecoilValue(OS_HEADING)
  // const osVelocity = useRecoilValue(OS_VELOCITY)
  // const osRudder = useRecoilValue(ATOM_OS_RUDDERS)
  // const osEng = useRecoilValue(ATOM_OS_ENGINES)
  // const osPositions = useRecoilValue(OS_POSITIONS)
  const setUpdateSimState = useSetRecoilState(updateSimState)
  const simInterval = useRef(null)
  const [simState, setSimState] = useRecoilState(ATOM_SIM_STATE)

  function startSim() {
    console.log("Start")
    simInterval.current = setInterval(() => {
      setUpdateSimState(simState.updateMilSec)
    }, simState.updateMilSec / simState.runTimeSpeedUp)
    setSimState({
      ...simState,
      state: "RUNNING",
    })
  }

  function pauseSim() {
    console.log("Pause")
    clearInterval(simInterval.current)
    setSimState({
      ...simState,
      state: "PAUSED",
    })
  }

  function restartSim() {
    console.log("Restart")
    clearInterval(simInterval.current)
    setSimState({
      ...simState,
      milSecElapsed: 0,
      state: "STOPPED",
    })
  }

  let [showMiniApp, setShowMiniApp] = useRecoilState(showMiniAppsObj)

  const ToggleMiniApp = appName => {
    console.log(appName, !showMiniApp[appName])
    setShowMiniApp({
      ...showMiniApp,
      [appName]: !showMiniApp[appName],
    })
  }

  return (
    <div style={{ width: "100%" }}>
      <Grid container>
        <Grid item xs={4}>
          <SimCommands simTimeMilSec={simState.milSecElapsed} pauseSim={pauseSim} startSim={startSim} />

          <br />
          <Button checked={showMiniApp.controls} variant="check" onClick={() => ToggleMiniApp("controls")}>
            {!showMiniApp.controls ? <VideogameAssetIcon slot="leading-icon" /> : <VideogameAssetOffIcon slot="leading-icon" />}{" "}
            Controls
          </Button>
          <br />
          <SimShipModelSelector />
        </Grid>

        <Grid item xs={3}>
          <SimStateSetup restartSim={restartSim} />
        </Grid>
        <Grid
          item
          xs={5}
          sx={{
            display: "grid",
            position: "relative",
            height: "40rem",
          }}
        >
          <SimMap />
        </Grid>
      </Grid>
    </div>
  )
}
