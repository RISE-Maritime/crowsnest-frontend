import React from "react";
import { Grid } from "@mui/material";
// Components
import DataConnectionState from "./components/connectionStatus";
import TopBar from "./components/topBar";
// Recoil
import { useRecoilValue } from "recoil";
import { atomRiseAisMetadata } from "../../connectors/RISE-AIS";
import { atomLidarMetadata } from "../../connectors/RISE-LIDAR";

export default function DataFlow() {
  const riseAisMetadata = useRecoilValue(atomRiseAisMetadata);
  const riseLidarMetadata = useRecoilValue(atomLidarMetadata);

  return (
    <Grid container>
      <Grid item xs={12}>
        <TopBar />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ display: "grid", placeItems: "center", color: "#1d3658" }}
      >
        <h1>Data flow</h1>
      </Grid>
      <Grid item xs={12}>
        <DataConnectionState
          connectionName={"AIS"}
          isConnected={riseAisMetadata.connected}
        />
      </Grid>
      <Grid item xs={12}>
        <DataConnectionState
          connectionName={"LIDAR"}
          isConnected={riseLidarMetadata.connected}
        />
      </Grid>
    </Grid>
  );
}
