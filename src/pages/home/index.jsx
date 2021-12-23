import React from "react";
import { Grid } from "@mui/material";
import ViewList from "./components/viewList";
import VesselPicker from "./components/vesselPicker";

export default function index() {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ display: "grid", placeItems: "center" }}>
        <h1>Crow´s Nest</h1>
        <VesselPicker />
      </Grid>
      <Grid item xs={12} sx={{ display: "grid", placeItems: "center"}}>
        <ViewList />
      </Grid>
    </Grid>
  );
}
