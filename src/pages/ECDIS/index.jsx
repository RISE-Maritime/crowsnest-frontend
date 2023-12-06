import React from "react"
import { Grid } from "@mui/material"
import StatusSideBar from "./components/StatusSideBarNEW"
import Chart from "./components/Chart"
import ChartControls from "./components/ChartControls"

export default function Ecdis() {
  return (
    <Grid container spacing={0}>
      <Grid container spacing={0}>
        <Grid
          item
          xs={10}
          sx={{
            position: "relative",
            padding: "0px",
            height: "calc(99vh - 95px)",
            cursor: "crosshair",
            overflow: "hidden",
          }}
        >
          <Chart />
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "grid",
            placeItems: "center",
            position: "relative",
            height: "calc(99vh - 95px)",
          }}
        >
          <StatusSideBar />
        </Grid>
      </Grid>
      <Grid
        item
        md={12}
        sx={{
          display: "grid",
          position: "relative",
          height: "50px",
        }}
      >
        <ChartControls />
      </Grid>
    </Grid>
  )
}
