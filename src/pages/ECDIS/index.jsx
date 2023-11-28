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
            //height: "calc(100vh - 95px)",
            padding: "0px",
            height: "calc(80vh)",
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
            height: "calc(80vh)",
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
          height: "calc(15vh)",
        }}
      >
        <ChartControls />
      </Grid>
    </Grid>
  )
}
