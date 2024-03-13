// Controlling pop up mini apps existing in folder ./components/mini_app

import React from "react"
import { showMiniAppsObj } from "../../recoil/atoms"
import { useRecoilState } from "recoil"
import { Box } from "@mui/material"
import { ObcAppMenu as AppMenu } from "@oicl/openbridge-webcomponents-react/components/app-menu/app-menu"
import { ObcAppButton as AppButton } from "@oicl/openbridge-webcomponents-react/components/app-button/app-button"

export default function RightDrawer(props) {
  let [showMiniApp, setShowMiniApp] = useRecoilState(showMiniAppsObj)

  const ToggleMiniApp = appName => {
    console.log(appName)
    setShowMiniApp({
      ...showMiniApp,
      [appName]: !showMiniApp[appName],
    })
  }

  return (
    <Box
      role="presentation"
      // onClick={props.toggleDrawer(props.side, false)}
      onKeyDown={props.toggleDrawer(props.side, false)}
    >
      <AppMenu>
        <AppButton
          checked={showMiniApp.windCurrent}
          label="Wind & Current"
          onClick={() => ToggleMiniApp("windCurrent")}
        ></AppButton>

        <AppButton checked={showMiniApp.playback} label="Playback" onClick={() => ToggleMiniApp("playback")}></AppButton>
        <AppButton checked={showMiniApp.controls} label="Controls" onClick={() => ToggleMiniApp("controls")}></AppButton>
      </AppMenu>
    </Box>
  )
}
