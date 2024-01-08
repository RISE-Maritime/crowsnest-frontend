/*
  Base page
  ----------------------
  - Controls base layout with components that renders on all pages
  - Manage render of floating components 
  - Mange MQTT data flow initialization   
*/

import React from "react"
import NavigationBar from "./navbar"
import { useTheme } from "@mui/material/styles"
// Floating APPs
import FloatAppWind from "./float_comp/FloatAppWind"
import FloatAppPlayback from "./float_comp/FloatAppPlayback"
import FloatBoxControls from "./float_comp/FloatBoxControls"
// Recoil
import { showMiniAppsObj } from "../recoil/atoms"
import { useRecoilValue } from "recoil"

export default function BasePage(props) {
  const theme = useTheme()
  let showMiniApp = useRecoilValue(showMiniAppsObj)
  return (
    <>
      <NavigationBar />

      {/* Mini floating components */}
      {showMiniApp.windCurrent ? <FloatAppWind /> : null}
      {showMiniApp.playback ? <FloatAppPlayback /> : null}
      {showMiniApp.controls ? <FloatBoxControls /> : null}

      <div
        style={{
          minHeight: "95vh",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {props.children}
      </div>
    </>
  )
}
