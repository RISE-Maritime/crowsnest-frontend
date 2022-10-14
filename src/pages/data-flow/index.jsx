import React from "react"
import { Grid } from "@mui/material"
import { useTheme } from "@mui/material/styles"
// Components
import DataConnectionState from "./components/connectionStatus"
// Recoil
import { useRecoilValue } from "recoil"

import { mqttStateAtom } from "../../base-elements/RemoteMqttConnection"
import { lidarStateAtom } from "../../recoil/atoms"

export default function DataFlow() {
  const theme = useTheme()
  const mqttState = useRecoilValue(mqttStateAtom)
  const lidarSate = useRecoilValue(lidarStateAtom)

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          display: "grid",
          placeItems: "center",
          color: theme.palette.primary.contrastText,
        }}
      >
        <h1>Data flow & Sources</h1>
      </Grid>
      <Grid item xs={12}>
        <DataConnectionState connectionName={"MQTT RISE Broker"} isConnected={mqttState.connected} />
      </Grid>

      <Grid item xs={12}>
        <DataConnectionState connectionName={"MQTT Local Broker"} isConnected={false} />
      </Grid>

      <Grid item xs={12}>
        <DataConnectionState connectionName={"Own Device"} isConnected={true} delay={lidarSate.delaySec} />
      </Grid>
    </Grid>
  )
}


