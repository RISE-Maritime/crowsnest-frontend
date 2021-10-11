import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import StatusSideBar from "./components/statusSideBar";
import SeaChart from "./components/SeaChart";
import TopBar from "./components/topBar";
export default function Ecdis() {
  useEffect(() => {
    console.log("Humm...");
    return () => {
      console.log("cleaning...");
    };
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <TopBar />
      </Grid>
      <Grid item xs={10} sx={{ display: "grid", placeItems: "center", position: 'relative', height: '93vh'}} >
        <SeaChart />
      </Grid>
      <Grid item xs={2} sx={{ display: "grid", placeItems: "center", position: 'relative', height: '93vh'}} >
        <StatusSideBar/>
     
      </Grid>
    </Grid>
  );
}
