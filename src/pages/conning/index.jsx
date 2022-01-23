import React, { useEffect } from "react";
import { appState } from "../../recoil/atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  observationsStateAtom,
  actionStateAtom,
  ownShipDataAtom,
} from "../../recoil/atoms";
import { mqttSubscribe } from "../../base-elements/MqttConnection";
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
  const ownShipData = useRecoilValue(ownShipDataAtom);
  const observations = useRecoilValue(observationsStateAtom);
  const actions = useRecoilValue(actionStateAtom);
  const [appObj, setAppObj] = useRecoilState(appState);

  useEffect(() => {
    // Start MQTT subscription
    mqttSubscribe("/NTpro/#");

    setAppObj({
      ...appObj,
      activeView: "Conning",
    });
  }, []);

  return (
    <Grid container>
      {/* Column 1 */}
      <Grid item xs={3} sx={{ height: "calc(100vh - 40px)" }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", height: "100%", position: "relative" }}
        >
          <ShipPosition />
          <AppShipSteering
            steeringMode={"Demo Mode"}
            bow1SET={0}
            bow1ACT={0.1}
            bow2SET={-0.4}
            bow2ACT={-0.4}
            eng1SET={0.8}
            eng1ACT={-0.5}
            eng2SET={0.8}
            eng2ACT={-0.8}
            rud1SET={actions.ruderSETps}
            rud1ACT={observations.ruderACTps}
            rud2SET={actions.ruderSETsb}
            rud2ACT={observations.ruderACTsb}
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
              heading={observations.heading}
              drift={10}
              driftTo={"port"}
              rot={observations.rot}
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
            <AppSogCogObj
              showNearbyObj={false}
              cog={observations.cog}
              heading={observations.heading}
              sogFWD={observations.sogBow}
              sogMID={observations.sog}
              sogAFT={observations.sogStern}
              rot={observations.rot}
              loa={ownShipData.loa}
              woa={ownShipData.woa}
              pred_min={0.75}
              pred_steps={4}
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
              heading={observations.heading}
              windSpeedTrue={10}
              windSpeedRel={20}
              windDirTrue={270}
              windDirRel={180}
              windDirDistribution={90}
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
