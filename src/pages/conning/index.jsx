import React, { useEffect } from "react";
import { atomOwnShipData } from "../home/components/vesselPicker";
import { appState } from "../../globalAtomsSelectors";
import { useRecoilValue, useRecoilState } from "recoil";
// Components
import { Grid, Stack } from "@mui/material";
import AppWindCurrent from "./components/AppWindCurrent";
import AppHeadingRotDrift from "./components/AppHeadingRotDrift";
import AppShipSteering from "./components/AppShipSteering";
import AppSogCogObj from "./components/AppSogCogObj";
import AppWeatherData from "./components/AppWeatherData";
import AppDepthChart from "./components/AppDepthChart";
import AppRollPitch from "./components/AppRollPitch";
import ShipPosition from "./components/ShipPosition";

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
      <Grid item xs={3} sx={{ height: "calc(100vh - 40px)" }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", height: "100%" , position: 'relative'}}
          
        >
          <ShipPosition/>
          <AppShipSteering
            steeringMode={"Demo Mode"}
            bow1SET={-1}
            bow1ACT={-1}
            bow2SET={-0.4}
            bow2ACT={-0.4}
            eng1SET={0.8}
            eng1ACT={-1.0}
            eng2SET={0.8}
            eng2ACT={-0.8}
            rud1SET={10}
            rud1ACT={15}
            rud2SET={3}
            rud2ACT={10}
          />
        </Stack>
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
            <AppHeadingRotDrift
              heading={222}
              drift={10}
              driftTo={"port"}
              rot={80}
              rotMax={100}
            />
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
            {/* TODO: <MapMotion />  */}
            <AppSogCogObj
              showNearbyObj={false}
              heading={0}
              cog={275.0}
              sogAFT={-5}
              sogMID={1}
              sogFWD={3}
              rot={-10}
              loa={100}
              woa={30}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Column 3 */}
      <Grid
        item
        xs={3}
        sx={{
          display: "grid",
          placeItems: "center",
          height: "calc(100vh - 40px)",
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <AppWindCurrent
              heading={45}
              windSpeedTrue={10}
              windSpeedRel={20}
              windDirTrue={270}
              windDirRel={180}
              windDirDistribution={45}
              currentSpeedTrue={20}
              currentSpeedRel={10}
              currentDirTrue={50}
              currentDirRel={90}
              currentDirDistribution={40}
            />
            <AppWeatherData />
            <AppDepthChart />
            <AppRollPitch
              pitchSET={0}
              pitchACT={-0.2}
              pitchACTangle={-2}
              pitchACTmin={-10}
              pitchACTmax={10}
              rollSET={0}
              rollACT={-3}
              rollACTangle={-2}
              rollACTmin={-10}
              rollACTmax={10}
            />
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
