import React from "react"
import { Grid } from "@mui/material"
import { useTheme, styled } from "@mui/material/styles"
// Components
import DataConnectionState from "./components/ConnectionStatus"
import DataConnectionMQTT from "./components/ConnectionMQTT"
// Recoil
import { useRecoilValue } from "recoil"
import { lidarStateAtom } from "../../recoil/atoms"
import { atomMQTTLocalState, atomMqttRemoteState } from "../../recoil/atoms"
import MqttFlowIN from "./components/MqttFlowIN"
import StatsAIS from "./components/StatsAIS"
import StatsHW from "./components/StatsHW"

const GridCenter = styled(Grid)(({ theme }) => ({
  display: "grid",
  placeItems: "center",
  borderStyle: "solid",
  borderColor: theme.palette.primary.main,
  borderRadius: "0.4rem",
  margin: "1rem",
  padding: "0.5rem",
}))

export default function DataFlow() {
  const theme = useTheme()
  const mqttRemoteState = useRecoilValue(atomMqttRemoteState)
  const mqttLocalState = useRecoilValue(atomMQTTLocalState)
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
        <DataConnectionMQTT conn={"REMOTE"} connectionName={"MQTT RISE Cloud Broker"} isConnected={mqttRemoteState.connected} />
      </GridCenter>

      <GridCenter item xs={12}>
        <DataConnectionMQTT conn={"LOCAL"} connectionName={"MQTT Local Broker"} isConnected={mqttLocalState.connected} />
      </GridCenter>

      <GridCenter item xs={12}>
        <DataConnectionState connectionName={"Own Device"} isConnected={true} delay={lidarSate.delaySec} />
      </GridCenter>

      <GridCenter item xs={12}>
        <StatsAIS />
      </GridCenter>

      <GridCenter item xs={12}>
        <StatsHW />
      </GridCenter>

      <GridCenter item xs={12}>
        <MqttFlowIN />
      </GridCenter>
    </Grid>
  )
}
