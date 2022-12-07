import React from "react"
import { Grid } from "@mui/material"
import ViewList from "./components/viewList"
import PlatformPicker from "./components/PlatformPicker"
import PickerExternalSensor from "./components/PickerExternalSensor"

export default function index() {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ display: "grid", placeItems: "center" }}>
        <h1>Welcome to Crowsnest ECDIS / RCC </h1>
        <PlatformPicker />
      </Grid>
      <Grid item xs={12} sx={{ display: "grid", placeItems: "center" }}>
        <PickerExternalSensor />
      </Grid>
      <Grid item xs={12} sx={{ display: "grid", placeItems: "center" }}>
        <ViewList />
      </Grid>
    </Grid>
  )
}
