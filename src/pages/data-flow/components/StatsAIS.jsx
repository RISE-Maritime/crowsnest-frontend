import React from "react"
// Components
import { Typography, Grid, Paper, Stack } from "@mui/material"
import ChartTimeLineValues from "./ChartTimeLineValues"
import MapAISsmallPlot from "./MapAISsmallPlot"
// Atoms
import { useRecoilValue } from "recoil"
import { atomMqttTopics, targetsAIS } from "../../../recoil/atoms"

export default function StatsAIS() {
  let mqttTopics = useRecoilValue(atomMqttTopics)
  let AISlist = useRecoilValue(targetsAIS)

  return (
    <div style={{ width: "100%" }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4">AIS External</Typography>
          <br />
        </Grid>
        <Grid item xs={12}></Grid>

        <Grid container>
          <Grid item xs={6}>
            <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
              <Paper elevation={3} sx={{ width: "11rem", textAlign: "center" }}>
                <Typography variant="h5"> {mqttTopics["CROWSNEST/EXTERNAL/AIS"]?.count}</Typography>
                <Typography variant="body1">Total Messages</Typography>
              </Paper>

              <Paper elevation={3} sx={{ width: "11rem", textAlign: "center" }}>
                <Typography variant="h5"> {AISlist?.length}</Typography>
                <Typography variant="body1">Total unique ships</Typography>
              </Paper>

              <Paper elevation={3} sx={{ width: "11rem", textAlign: "center" }}>
                <Typography variant="h5">
                  {mqttTopics["CROWSNEST/EXTERNAL/AIS"]?.time_received.toLocaleTimeString("sv-SV")}
                </Typography>
                <Typography variant="body1">Last update</Typography>
              </Paper>
            </Stack>
            <br />
            <ChartTimeLineValues data_list={mqttTopics["CROWSNEST/EXTERNAL/AIS"]?.list_ship_unique} />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              position: "relative",
              // height: "calc(100vh - 95px)",
              padding: "0px",
              height: "300px",
              cursor: "crosshair",
            }}
          >
            <MapAISsmallPlot AISlist={AISlist} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
