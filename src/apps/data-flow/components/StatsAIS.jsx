import React from "react"
import {  Grid, Paper, Stack } from "@mui/material"
import ChartTimeLineValues from "./ChartTimeLineValues"
import MapAISsmallPlot from "./MapAISsmallPlot"
import { useRecoilValue } from "recoil"
import { atomMQTTtopics, targetsAIS } from "../../../recoil/atoms"

export default function StatsAIS() {
  let mqttTopics = useRecoilValue(atomMQTTtopics)
  let AISlist = useRecoilValue(targetsAIS)

  return (
    <div style={{ width: "100%" }}>
      <Grid container>
     
        <Grid item xs={12}></Grid>

        <Grid container>
          <Grid item xs={6}>
            <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
              <Paper elevation={3} sx={{ width: "11rem", textAlign: "center" }}>
                <h3>Total Messages
                <br />
                {mqttTopics["CROWSNEST/EXTERNAL/AIS"]?.count ? mqttTopics["CROWSNEST/EXTERNAL/AIS"]?.count : 0 }
                </h3>
              </Paper>

              <Paper elevation={3} sx={{ width: "11rem", textAlign: "center" }}>
              <h3>Total unique ships
                <br />
                {AISlist?.length ? AISlist?.length : 0 }
                </h3>
              </Paper>

              <Paper elevation={3} sx={{ width: "11rem", textAlign: "center" }}>
              <h3>Last update
                <br />
                {mqttTopics["CROWSNEST/EXTERNAL/AIS"]?.time_received.toLocaleTimeString("sv-SV") ? mqttTopics["CROWSNEST/EXTERNAL/AIS"]?.time_received.toLocaleTimeString("sv-SV") : "00:00" }
                </h3>

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
              height: "350px",
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
