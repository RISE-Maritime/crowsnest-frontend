/*
  Base page
  ----------------------
  - Controls base layout with components that renders on all pages
  - Manage render of floating components 
  - Mange MQTT data flow initialization   
*/

import React from "react"
import NavigationBar from "./navbar"
// Floating APPs
import FloatAppWind from "./float_comp/FloatAppWind"
import FloatAppPlayback from "./float_comp/FloatAppPlayback"
import FloatBoxControls from "./float_comp/FloatBoxControls"
// Recoil
import { showMiniAppsObj } from "../recoil/atoms"
import { useRecoilValue } from "recoil"

export default function BasePage(props) {

  let showMiniApp = useRecoilValue(showMiniAppsObj)
  return (
    <>
      <NavigationBar />
        <div style={{height: "48px"}} />
      {/* Mini floating components */}
      {showMiniApp.windCurrent ? <FloatAppWind /> : null}
      {showMiniApp.playback ? <FloatAppPlayback /> : null}
      {showMiniApp.controls ? <FloatBoxControls /> : null}


      {/* Main EXternal incoming data 

        Component sublist <-- comp  

      */}

      <div
        style={{
          minHeight: "95vh",
        }}
      >
        {props.children}
      </div>
    </>
  )
}
