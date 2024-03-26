// Controlling pop up mini apps existing in folder ./components/mini_app

import React from "react"
import { showMiniAppsObj } from "../../recoil/atoms"
import { useRecoilState } from "recoil"
import { Box, Paper, Grid } from "@mui/material"
import { ObcAppMenu as AppMenu } from "@oicl/openbridge-webcomponents-react/components/app-menu/app-menu"
import { ObcAppButton as AppButton } from "@oicl/openbridge-webcomponents-react/components/app-button/app-button"
import { Obi19Current as CurrentIcon } from "@oicl/openbridge-webcomponents-react/icons/icon-19-current"
import { Obi06Ecdis as IconEcdis } from "@oicl/openbridge-webcomponents-react/icons/icon-06-ecdis"
import { Obi15Play as PlayIcon } from "@oicl/openbridge-webcomponents-react/icons/icon-15-play"
import { Obi03Filter as FilterIcon } from "@oicl/openbridge-webcomponents-react/icons/icon-03-filter"
import { Obi01Close as IconClose } from "@oicl/openbridge-webcomponents-react/icons/icon-01-close"
import GridCenter from "../components/GridCenter"
import Divider from "@mui/material/Divider"
import { APPS, APP_CONFIG } from "../../apps"
import { useNavigate } from "react-router-dom"

export default function RightPopOver(props) {
  const navigate = useNavigate()
  let [showMiniApp, setShowMiniApp] = useRecoilState(showMiniAppsObj)

  const ToggleMiniApp = appName => {
    console.log(appName)
    setShowMiniApp({
      ...showMiniApp,
      [appName]: !showMiniApp[appName],
    })
  }

  return (
    <AppMenu onSearchInput={e => console.log("TODO: Searching:", e)}>
       <h3>APPs</h3>
      <div /> <div /> <div />
      {APPS.map(app => (
        <AppButton
          key={app.label + "egW"}
          label={app.label}
          checked={app.href === window.location.pathname}
          onClick={() => navigate(app.href)}
        >
          {app.icon}
        </AppButton>
      ))}

   
      <div />
      <h4>Mini APPs</h4>
      <div /> <div /> <div />

      <AppButton checked={showMiniApp.windCurrent} label="Anometer" onClick={() => ToggleMiniApp("windCurrent")}>
        <CurrentIcon size="24" slot="icon" />
      </AppButton>

      <AppButton checked={showMiniApp.playback} label="Playback" onClick={() => ToggleMiniApp("playback")}>
        <PlayIcon size="24" slot="icon" />
      </AppButton>

      <AppButton checked={showMiniApp.controls} label="Controls" onClick={() => ToggleMiniApp("controls")}>
        <FilterIcon size="24" slot="icon" />
      </AppButton>
    </AppMenu>
  )
}
