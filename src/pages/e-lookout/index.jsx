import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import CamView from "./components/CamStream";

export default function CamLookout() {
  useEffect(() => {}, []);

  return (
    <Grid container>
      <Grid item xs={6} sx={{ border: "solid" }}>
        <CamView />
      </Grid>
    </Grid>
  );
}
