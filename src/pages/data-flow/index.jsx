import React from "react"
import { Grid } from "@mui/material"
import { useTheme, styled } from "@mui/material/styles"
// Components
import DataConnectionState from "./components/ConnectionStatus"
import DataConnectionMQTT from "./components/ConnectionMQTT"
import ConnectorsSummaryCards from "./components/ConnectorsSummaryCards"
// Recoil
import { useRecoilValue } from "recoil"
import { lidarStateAtom } from "../../recoil/atoms"
import { atomMQTTconnectionState,atomKeelsonConnectionState } from "../../recoil/atoms"
import MqttFlowIN from "./components/MqttFlowIN"
import StatsAIS from "./components/StatsAIS"
import StatsHW from "./components/StatsHW"
import ConnectionKeelson from "./components/ConnectionKeelson"

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
  const mqttConnectionState = useRecoilValue(atomMQTTconnectionState)
  const keelsonConnectionState = useRecoilValue(atomKeelsonConnectionState)
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
        <h1>Data connectors & flow</h1>
      </Grid>

      <GridCenter item xs={12}>
        <h2>CONNECTORS</h2>
        <ConnectorsSummaryCards />
      </GridCenter>

      <GridCenter item xs={12}>
        <ConnectionKeelson connectionName={"Keelson Router"} isConnected={keelsonConnectionState} />
      </GridCenter>

      <GridCenter item xs={12}>
        <DataConnectionMQTT connectionName={"MQTT Broker"} isConnected={mqttConnectionState} />
      </GridCenter>

      <GridCenter item xs={12}>
        <MqttFlowIN />
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
    </Grid>
  )
}
