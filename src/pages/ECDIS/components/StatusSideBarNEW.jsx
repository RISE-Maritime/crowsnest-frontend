import React from "react"
import { Grid } from "@mui/material"
import PositionStatusSmall from "./PositionStatusSmall"
import MapCursorInfo from "./MapCursorInfo"
import AisInfo from "./AisInfo"
import OsInfo from "./OsInfo"
import MonitorManager from "./MonitorManager"

export default function StatusSideBar({ data, identifier }) {
  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid item xs={12}>
        <MonitorManager />
      </Grid>
      <Grid item xs={12}>
        <PositionStatusSmall />
      </Grid>
      <Grid item xs={12}>
        <OsInfo data={data} identifier={identifier} />
      </Grid>
      <Grid item xs={12}>
        <AisInfo />
      </Grid>
      <Grid item xs={12}>
        <MapCursorInfo />
      </Grid>
    </Grid>
  )
}
