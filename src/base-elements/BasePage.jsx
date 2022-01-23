/*
  Base page
  ----------------------
  - Controls base layout with components that renders on all pages
  - Manage render of floating apps 
  - Mange MQTT data flow initialization   
*/

import React from "react";
import NavigationBar from "./navbar";
import { useTheme } from "@mui/material/styles";
// APPs
import FloatApp from "./components/mini_app/FloatApp";
import FloatAppWind from "./components/mini_app/FloatAppWind";
import FloatAppPlayback from "./components/mini_app/FloatAppPlayback";
// Recoil
import { showMiniAppsObj } from "../recoil/atoms";
import { useRecoilValue } from "recoil";
// MQTT
import MqttConnection from "./MqttConnection";

export default function BasePage(props) {
  const theme = useTheme();
  let showMiniApp = useRecoilValue(showMiniAppsObj);
  return (
    <>
      <NavigationBar />

      {/* MQTT connector */}
      <MqttConnection />

      {/* Mini floating APPs */}
      {showMiniApp.test ? <FloatApp /> : null}
      {showMiniApp.windCurrent ? <FloatAppWind /> : null}
      {showMiniApp.playback ? <FloatAppPlayback /> : null}

      <div
        style={{
          minHeight: "94vh",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {props.children}
      </div>
    </>
  );
}
