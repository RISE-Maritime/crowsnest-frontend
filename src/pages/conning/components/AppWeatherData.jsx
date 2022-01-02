import React from "react";
import { Grid } from "@mui/material";

import ValueAndChart from "./ValueAndChart";

export default function AppWeatherData() {
  return (
    <Grid
      container
      sx={{
        borderTop: "solid #707070",
        borderBottom: "solid #707070",
        borderWidth: "1px",
        textAlign: "center",
      }}
    >
      <Grid item xs={2.4}>
        <ValueAndChart valueName={"Temperature"} currentValue={"-25°C"} />
      </Grid>

      <Grid item xs={2.4}>
        <ValueAndChart valueName={"Pressure"} currentValue={"1011 hPa"} />
      </Grid>

      <Grid item xs={2.4}>
        <ValueAndChart valueName={"Sea state"} currentValue={"2m"} />
      </Grid>

      <Grid item xs={2.4}>
        <ValueAndChart valueName={"Humidity"} currentValue={"88%"} />
      </Grid>

      <Grid item xs={2.4}>
        <ValueAndChart valueName={"Visibility"} currentValue={"24nm"} />
      </Grid>
    </Grid>
  );
}
