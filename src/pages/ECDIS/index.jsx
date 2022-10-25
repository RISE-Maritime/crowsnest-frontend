import React from "react"
import { Grid } from "@mui/material"
import StatusSideBar from "./components/StatusSideBarNEW"
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
          height: "90vh",
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
          height: "100%",
        }}
      >
        <StatusSideBar />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "grid",
          position: "relative",
          height: "calc(10vh - 40px)",
        }}
      >
        <ChartControls />
      </Grid>
    </Grid>
  )
}
