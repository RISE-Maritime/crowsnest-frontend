import React  from "react"
import { Grid } from "@mui/material"
import StatusSideBar from "./components/StatusSideBar"
import SeaChart, { vesselTargetsAtom } from "./components/SeaChart"
import ChartControls from "./components/ChartControls"


export default function Ecdis() {


  return (
    <Grid container>
      <Grid
        item
        xs={10}
        sx={{
          // display: "grid",
          // placeItems: "center",
          position: "relative",
          // top: 0,
          height: "calc(100vh - 80px)",
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
          height: "93vh",
        }}
      >
        <StatusSideBar />
      </Grid>
      <Grid item xs={12}>
        <ChartControls/>
      </Grid>
    </Grid>
  )
}
