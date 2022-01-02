import React from "react";
import { Grid } from "@mui/material";

export default function index() {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{ display: "grid", placeItems: "center", height: "20vh" }}
      >
        <h2>Remote Control (TODO)</h2>
      </Grid>
    </Grid>
  );
}
