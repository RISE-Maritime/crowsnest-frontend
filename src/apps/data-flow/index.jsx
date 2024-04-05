import React, {useEffect} from "react"
import { Grid, Paper, Stack } from "@mui/material"
import DataConnectionState from "./components/ConnectionStatus"
import DataConnectionMQTT from "./components/ConnectionMQTT"
import ConnectorsSummaryCards from "./components/ConnectorsSummaryCards"
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
import GridContainer from "../../base-elements/components/GridContainer"
import Panel from "../../base-elements/components/Panel"
import OwnDeviceFlow from "./components/OwnDeviceFlow"



export default function DataFlow() {
  const mqttConnectionState = useRecoilValue(atomMQTTconnectionState)
  const lidarSate = useRecoilValue(lidarStateAtom)


  return (
    <GridContainer container spacing={2}>
      <Grid item xs={12}>
        <Paper sx={{ padding: "0.5rem" }}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <h1>Data connectors & flows</h1>
            <ConnectorsSummaryCards />
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Panel title="Keelson Connector">
          <Stack direction={"row"} alignItems="stretch" justifyContent="space-between" spacing={2}>
            <KeelsonGetLoop />
            <KeelsonSubscribe />
            <KeelsonPush />
            <KeelsonQueryable />
          </Stack>
        </Panel>
      </Grid>

      <Grid item xs={12}>
        <Panel title="Keelson Data Flow">
          <KeelsonFlow />
        </Panel>
      </Grid>

      <Grid item xs={12}>
        <Panel title="MQTT Connector">
          <DataConnectionMQTT isConnected={mqttConnectionState} />
        </Panel>
      </Grid>

      <Grid item xs={12}>
        <Panel title="MQTT Data Flow">
          <MqttFlowIN />
        </Panel>
      </Grid>

      <Grid item xs={12}>
        <Panel title="Own Device Connector">
          <DataConnectionState isConnected={true} delay={lidarSate.delaySec} />
        </Panel>
      </Grid>

      <Grid item xs={12}>
        <Panel title="Own Device Data Flow">
          <OwnDeviceFlow />
        </Panel>
      </Grid>

      <Grid item xs={12}>
        <Panel title="AIS Data Flow">
          <StatsAIS />
        </Panel>
      </Grid>

      <Grid item xs={12}>
        <Panel title="Hardware Monitoring">
          <StatsHW />
        </Panel>
      </Grid>

      <Grid item xs={12}>
        <Panel title="Docker Monitoring">
          <DockerMonitoring />
        </Panel>
      </Grid>

      <Grid item xs={12}>
        <Panel title="Simple Simulator">
          <SimpleShipSim />
        </Panel>
      </Grid>
    </GridContainer>
  )
}
