import React from "react";
import { Grid } from "@mui/material";
import ViewList from "./components/viewList";

export default function index() {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ display: "grid", placeItems: "center", height: "20vh" }}>
        <h2>Remote Control</h2>
      </Grid>
      <Grid item xs={4} sx={{ display: "grid", placeItems: "center", height: "80vh" }}>
        <h1>Integrated Web Bridge</h1>
      </Grid>
      <Grid item xs={8} sx={{ display: "grid", placeItems: "center", height: "80vh" }}>
        <ViewList />
      </Grid>
    </Grid>
  );
}
