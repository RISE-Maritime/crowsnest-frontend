// Controlling pop up mini apps existing in folder ./components/mini_app

import React from "react"
import { showMiniAppsObj } from "../../recoil/atoms"
import { useRecoilState } from "recoil"
import { Box } from "@mui/material"
import { ObcAppMenu as AppMenu } from "@oicl/openbridge-webcomponents-react/components/app-menu/app-menu"
import { ObcAppButton as AppButton } from "@oicl/openbridge-webcomponents-react/components/app-button/app-button"
import { Obi19Current as CurrentIcon } from "@oicl/openbridge-webcomponents-react/icons/icon-19-current"
import { Obi15Play as PlayIcon } from "@oicl/openbridge-webcomponents-react/icons/icon-15-play"
import { Obi03Filter as FilterIcon } from "@oicl/openbridge-webcomponents-react/icons/icon-03-filter"

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
          style={{ whiteSpace: "nowrap" }}
          checked={showMiniApp.windCurrent}
          label="Wind & Current"
          onClick={() => ToggleMiniApp("windCurrent")}
        >
          <CurrentIcon size="24" slot="icon" />
        </AppButton>

        <AppButton checked={showMiniApp.playback} label="Playback" onClick={() => ToggleMiniApp("playback")}>
          <PlayIcon size="24" slot="icon" />
        </AppButton>
        <AppButton checked={showMiniApp.controls} label="Controls" onClick={() => ToggleMiniApp("controls")}>
          <FilterIcon size="24" slot="icon" />
        </AppButton>
      </AppMenu>
    </Box>
  )
}
