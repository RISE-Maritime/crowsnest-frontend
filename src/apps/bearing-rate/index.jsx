import React from "react";
import { Grid } from "@mui/material";
import AppBearingRate from "./components/AppBearingRate";

const targetList = [
  {
    tgName: "TG-1",
    cpa: 0.35,
    tcpa: 13.4,
    distance: 3,
    distanceClosing: true,
    relBearings: [
      20, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120, 130, 140, 150, 160, 170,
      180, -180, -170,
    ], // Latest bearing first in list (index 0)
  },
];

export default function BearingRate() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <AppBearingRate
          targetList={targetList}
          updateFrequencyMIN={1}
          maxTimeMIN={20}
          rangeSETlong={8}
          rangeSETshort={3}
        />
      </Grid>
    </Grid>
  );
}
