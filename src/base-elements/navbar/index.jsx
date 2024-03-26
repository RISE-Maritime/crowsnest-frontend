/*
  Navigation bar 
  -----------------
 */

import React, { useState, useEffect } from "react"
// Recoil
import { useRecoilState } from "recoil"
import { appState } from "../../recoil/atoms"
// Components
import LeftDrawer from "./LeftDrawer"
import RightDrawer from "./RightDrawer"
import { SwipeableDrawer, Popover } from "@mui/material"
import { ObcTopBar as TopBar } from "@oicl/openbridge-webcomponents-react/components/top-bar/top-bar"
import { ObcBrillianceMenu as BrillianceMenu } from "@oicl/openbridge-webcomponents-react/components/brilliance-menu/brilliance-menu"
import { ObcAlertTopbarElement as AlertTopbarElementElement } from "@oicl/openbridge-webcomponents-react/components/alert-topbar-element/alert-topbar-element"

import { useLocation } from "react-router-dom"
import { ROUTE_TO_LABEL } from "../../apps"

export default function NavBar() {
  const [appObj, setAppObj] = useRecoilState(appState)
  const [drawerState, setDrawerState] = useState({
    left: false,
    right: false,
  })
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { pathname } = useLocation()

  const handleBrillianceChange = e => {
    document.documentElement.setAttribute("data-obc-theme", e.detail.value)
    setTheme(e.detail.value)()
  }

  const toggleDrawer = (anchor, open) => event => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return
    }

    setDrawerState({ ...drawerState, [anchor]: open })
  }

  const setTheme = themeName => () => {
    setAppObj({ ...appObj, appActiveColorTheme: themeName })
  }

  const pageName = ROUTE_TO_LABEL[pathname]

  // App Time and Date
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date()), 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <TopBar
        appTitle="Crowsnest"
        pageName={pageName}
        showDimmingButton
        showAppsButton
        showClock
        showDate
        date={currentTime}
        onDimmingButtonClicked={e => setAnchorEl(e.currentTarget)}
        onAppsButtonClicked={toggleDrawer("right", true)}
        onMenuButtonClicked={toggleDrawer("left", true)}
      >
        <AlertTopbarElementElement
          slot="alerts"
          nAlerts={1}
          blinkAlarmValue={false}
          blinkWarningValue={false}
          showAck={true}
          minimized={false}
          onMuteclick={() => console.log("onMuteclick")}
          onAckclick={() => console.log("onAckclick")}
          onAlertclick={() => console.log("onAlertclick")}
          onMessageclick={() => console.log("onMessageclick")}
        />
      </TopBar>

      <SwipeableDrawer
        anchor={"left"}
        open={drawerState["left"]}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        <LeftDrawer side={"left"} toggleDrawer={toggleDrawer} />
      </SwipeableDrawer>

      <SwipeableDrawer
        anchor={"right"}
        open={drawerState["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        <RightDrawer side={"right"} toggleDrawer={toggleDrawer} />
      </SwipeableDrawer>

      {/* Theme picker */}
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: 360,
        }}
      >
        <BrillianceMenu className="brilliance" palette={appObj.appActiveColorTheme} onPaletteChanged={handleBrillianceChange} />
      </Popover>
    </>
  )
}
