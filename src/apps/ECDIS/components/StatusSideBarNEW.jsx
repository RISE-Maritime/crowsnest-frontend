import React from "react"
import { Grid, Paper } from "@mui/material"
import PositionStatusSmall from "./PositionStatusSmall"
import MapCursorInfo from "./MapCursorInfo"
import AisInfo from "./AisInfo"
import OsInfo from "./OsInfo"
import MonitorManager from "./MonitorManager"
import { useKeelsonData } from "../../../hooks/useKeelsonData"

export default function StatusSideBar({ data, identifier }) {
  // useCallback is necessary to prevent useKeelsonData to be re-creation of useKeelsonData
  // every time the component re-renders.
  const onMessage = React.useCallback(e => {
    console.log(`Message form useKeelsonData: `)
    console.log(e)
  }, [])
  useKeelsonData("rise/v0/boatswain/pubsub/flight_controller_telemetry_vfrhud/speedybee", "subscribe", onMessage)

  return (
    <Grid container spacing={0.5} sx={{ height: "100%" }}>
      <Grid item xs={12}>
        <OsInfo data={data} identifier={identifier} />
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ height: "100%" }}>
          <MonitorManager />
          <AisInfo />
          <MapCursorInfo />
        </Paper>
      </Grid>
    </Grid>
  )
}
