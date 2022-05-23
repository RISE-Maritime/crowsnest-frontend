import React from "react"
import { Grid } from "@mui/material"
import PositionStatusSmall from "./PositionStatusSmall"
import MapCursorInfo from "./MapCursorInfo"
import AisInfo from "./AisInfo"

export default function StatusSideBar() {
  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid item xs={12}>
        <PositionStatusSmall />
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
