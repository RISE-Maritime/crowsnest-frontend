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
import RightPopOver from "./RightPopover"
import { Popover } from "@mui/material"
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

  // Right Popover
  const [anchorRight, setAnchorRight] = React.useState(null)

  const openRight = Boolean(anchorEl)
  const idRight = openRight ? "right-popover" : undefined

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
        onAppsButtonClicked={e => setAnchorRight(e.currentTarget)}
        onMenuButtonClicked={toggleDrawer("left", !drawerState.left)}
        style={{ position: "fixed", width: "100%", zIndex: 1000 }}
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

      {/* Menu Left */}
      {/* <Drawer
        variant="permanent"
        sx={{
          zIndex: 1,
          width: 240,
      
        }}
        anchor={"left"}
        open={drawerState["left"]}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
      </Drawer> */}

      {drawerState.left ? <LeftDrawer /> : <> </>}

      {/* App Picker Right */}
      <Popover
        id={idRight}
        open={!!anchorRight}
        anchorEl={anchorRight}
        onClose={() => setAnchorRight(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: 360,
        }}
      >
        <RightPopOver />
      </Popover>

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
