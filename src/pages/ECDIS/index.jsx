import React from "react"
import { Grid } from "@mui/material"
import StatusSideBar from "./components/StatusSideBar"
import SeaChart from "./components/SeaChart"
import ChartControls from "./components/ChartControls"

export default function Ecdis() {
  return (
    <Grid container>
      <Grid
        item
        xs={10}
        sx={{
          position: "relative",
          // height: "calc(100vh - 95px)",
          height: "92vh",
          cursor: "crosshair",
        }}
      >
        <SeaChart />
      </Grid>
      <Grid
        item
        xs={2}
        sx={{
          display: "grid",
          placeItems: "center",
          position: "relative",
          height: "90vh",
        }}
      >
        <StatusSideBar />
      </Grid>
      <Grid item xs={12}>
        <ChartControls />
      </Grid>
    </Grid>
  )
}
