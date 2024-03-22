import React from "react"
import { Grid, Stack, Typography } from "@mui/material"
import { useTheme, styled } from "@mui/material/styles"
// Components
import DataConnectionState from "./components/ConnectionStatus"
import DataConnectionMQTT from "./components/ConnectionMQTT"
import ConnectorsSummaryCards from "./components/ConnectorsSummaryCards"
// Recoil
import { useRecoilValue } from "recoil"
import { lidarStateAtom } from "../../recoil/atoms"
import { atomMQTTconnectionState } from "../../recoil/atoms"
import MqttFlowIN from "./components/MqttFlow"
import StatsAIS from "./components/StatsAIS"
import StatsHW from "./components/StatsHW"
import KeelsonSubscribe from "./components/KeelsonSubscribe"
import KeelsonPush from "./components/KeelsonPush"
import KeelsonQueryable from "./components/KeelsonQueryable"
import KeelsonFlow from "./components/KeelsonFlow"
import KeelsonGetLoop from "./components/KeelsonGetLoop"
import DockerMonitoring from "./components/DockerMonitoring"
import SimpleShipSim from "./components/SimpleShipSim"

const GridCenter = styled(Grid)({
  display: "grid",
  placeItems: "center",
  borderStyle: "solid",
  backgroundColor: "var(--container-section-color)",
  borderColor: "var(--border-outline-color)",
  borderRadius: "0.4rem",
  margin: "1rem",
  padding: "0.5rem",
})

export default function DataFlow() {
  const theme = useTheme()
  const mqttConnectionState = useRecoilValue(atomMQTTconnectionState)
  const lidarSate = useRecoilValue(lidarStateAtom)

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          display: "grid",
          placeItems: "center",
        }}
      >
        <Typography variant="h3" component="h1">
          Data connectors & flow
        </Typography>
      </Grid>

      <GridCenter item xs={12}>
        <Typography variant="h4" component="h2">
          Connectors
        </Typography>
        <ConnectorsSummaryCards />
      </GridCenter>

      <GridCenter item xs={12}>
        <Stack direction={"row"} alignItems="stretch" justifyContent="space-between" spacing={2}>
          <KeelsonGetLoop />
          <KeelsonSubscribe />
          <KeelsonPush />
          <KeelsonQueryable />
        </Stack>
      </GridCenter>
      <GridCenter item xs={12}>
        <KeelsonFlow />
      </GridCenter>

      <GridCenter item xs={12}>
        <DataConnectionMQTT connectionName="MQTT Broker" isConnected={mqttConnectionState} />
      </GridCenter>

      <GridCenter item xs={12}>
        <MqttFlowIN />
      </GridCenter>

      <GridCenter item xs={12}>
        <DataConnectionState connectionName="Own Device" isConnected={true} delay={lidarSate.delaySec} />
      </GridCenter>

      <GridCenter item xs={12}>
        <StatsAIS />
      </GridCenter>

      <GridCenter item xs={12}>
        <StatsHW />
      </GridCenter>
      <GridCenter item xs={12}>
        <DockerMonitoring />
      </GridCenter>

      <GridCenter item xs={12}>
        <SimpleShipSim />
      </GridCenter>
    </Grid>
  )
}
