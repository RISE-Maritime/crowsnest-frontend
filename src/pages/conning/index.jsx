import React, { useEffect } from "react";

import { atomOwnShipData } from "../home/components/vesselPicker";
import { appState } from "../../globalAtomsSelectors";
import { useRecoilValue, useRecoilState } from "recoil";
// Components
import { Grid } from "@mui/material";
import SteeringState from "./components/SteeringState";
import MapMotion from "./components/MapMotion";
import AppWind from "./components/AppWind";

export default function Conning() {
  const ownShipData = useRecoilValue(atomOwnShipData);
  const [appObj, setAppObj] = useRecoilState(appState);

  useEffect(() => {
    setAppObj({
      ...appObj,
      activeView: "Conning",
    });
    return () => {};
  }, [ownShipData]);

  return (
    <Grid container>
      {/* Column 1 */}
      <Grid item xs={4} sx={{ height: "calc(100vh - 40px)" }}>
        <SteeringState />
      </Grid>

      {/* Column 2 */}
      <Grid
        item
        xs={6}
        sx={{
          display: "grid",
          placeItems: "center",
          height: "calc(100vh - 40px)",
        }}
      >
        <Grid container>
          {/* Column 2 Row 1 */}
          <Grid
            item
            xs={12}
            sx={{
              display: "grid",
              placeItems: "center",
              height: "15vh",
            }}
          >
            <h1>
              {ownShipData.heading
                ? ownShipData.heading
                : "Heading data missing"}
            </h1>
          </Grid>
          {/* Column 2 Row 2 */}
          <Grid
            item
            xs={12}
            sx={{
              display: "grid",
              placeItems: "center",
              height: "calc(85vh - 40px)",
              position: "relative",
            }}
          >
            <MapMotion />
          </Grid>
        </Grid>
      </Grid>

      {/* Column 3 */}
      <Grid
        item
        xs={2}
        sx={{ display: "grid", placeItems: "center", height: "80vh" }}
      >

        <Grid container>  
        <Grid item xs={12}>
          <AppWind/>
        </Grid>
        <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
        </Grid>
        <h1>Wind</h1>
        <h1>Current</h1>
        <h1>Roll / Heel</h1>
      </Grid>
    </Grid>
  );
}
