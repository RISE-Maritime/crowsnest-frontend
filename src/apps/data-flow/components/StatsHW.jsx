import React from "react"
// Components
import { Typography, Grid,  Stack } from "@mui/material"
// Atoms
import { atomHWlog } from "../../../recoil/atoms"
import { useRecoilValue } from "recoil"
import CardSystemInfo from "./CardSystemInfo"
import ChartTimeLineLoad from "./ChartTimeLineLoad"

export default function StatsHW() {
  let hwLog = useRecoilValue(atomHWlog)


  return (
    <div style={{ width: "100%" }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4">Logging hardware monitoring</Typography>
          <br />
        </Grid>

        {Object.keys(hwLog).map(function (topic, index) {
        
          return (
            <Grid item xs={12} key={index+"adsfkgjbas"}>
              <hr />
              <Typography variant="h6">{hwLog[topic]?.sys_name?.toUpperCase()}</Typography>
              <Stack direction="row" alignItems="center">
                {/* System Info */}
                <CardSystemInfo
                  op_system={hwLog[topic].op_system}
                  boot_time={hwLog[topic].boot_time}
                  received_at={hwLog[topic].received_at}
                  network_delay={hwLog[topic].network_delay}
                  ram_size={hwLog[topic].ram_size}
                />

                {/* Charts CPU, RAM, STORAGE */}
                <ChartTimeLineLoad
                  data_list={hwLog[topic].cpu_load_trend}
                  valueName={"CPU Load"}
                  currentValue={hwLog[topic].cpu_load_procreant}
                  valueUnit={"%"}
                />
                 <ChartTimeLineLoad
                  data_list={hwLog[topic].cpu_temp_trend}
                  valueName={"CPU Temp"}
                  currentValue={hwLog[topic].cpu_temp}
                  valueUnit={"°C"}
                />
                    <ChartTimeLineLoad
                  data_list={hwLog[topic].ram_usage_trend}
                  valueName={"RAM Load"}
                  currentValue={hwLog[topic].ram_usage}
                  valueUnit={"%"}
                />
              </Stack>
              
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}
