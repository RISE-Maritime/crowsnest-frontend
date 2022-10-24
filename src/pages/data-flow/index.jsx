import React from "react"
import { Grid } from "@mui/material"
import { useTheme, styled } from "@mui/material/styles"
// Components
import DataConnectionState from "./components/ConnectionStatus"
import DataConnectionMQTT from "./components/ConnectionMQTT"
// Recoil
import { useRecoilValue } from "recoil"
import { mqttStateAtom } from "../../base-elements/RemoteMqttConnection"
import { lidarStateAtom } from "../../recoil/atoms"

const GridCenter = styled(Grid)(({ theme }) => ({
  display: "grid",
  placeItems: "center",
  borderStyle: "solid",
  borderColor: theme.palette.primary.main,
  borderRadius: "0.4rem",
  margin: "1rem",
  padding: "0.5rem"
}));

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
      <GridCenter item xs={12}>
        <DataConnectionMQTT connectionName={"MQTT RISE Cloud Broker"} isConnected={mqttState.connected} />
      </GridCenter>

      <Grid item xs={12}>
        <DataConnectionState connectionName={"MQTT Local Broker"} isConnected={false} />
      </Grid>

      <Grid item xs={12}>
        <DataConnectionState connectionName={"Own Device"} isConnected={true} delay={lidarSate.delaySec} />
      </Grid>
    </Grid>
  )
}


