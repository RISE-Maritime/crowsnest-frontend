/*
  Navigation bar 
  -----------------

  List of planed components in top bar
  - App navigation menu
    - View Name 
    - View state 
  - Active vessel ID 
  - Alerts 
  - User/profile active
  - Light / Dark Mode
  - Apps

 */

import React, { useState } from "react"
// Recoil
import { useRecoilState } from "recoil"
import { appState } from "../../recoil/atoms"
// Components
import LeftDrawer from "./LeftDrawer"
import RightDrawer from "./RightDrawer"
import { SwipeableDrawer, Popover } from "@mui/material"
// Icons & Images
import { ObcTopBar as TopBar } from "@oicl/openbridge-webcomponents-react/components/top-bar/top-bar"
import { ObcBrillianceMenu as BrillianceMenu } from "@oicl/openbridge-webcomponents-react/components/brilliance-menu/brilliance-menu"

export default function NavBar() {
  const [appObj, setAppObj] = useRecoilState(appState)
  const [drawerState, setDrawerState] = useState({
    left: false,
    right: false,
  })
  const [anchorEl, setAnchorEl] = React.useState(null)

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

  return (
    <>
      <TopBar
        appTitle="Crowsnest"
        pageName="demo"
        showDimmingButton
        showAppsButton
        onDimmingButtonClicked={e => setAnchorEl(e.currentTarget)}
        onAppsButtonClicked={toggleDrawer("right", true)}
        onMenuButtonClicked={toggleDrawer("left", true)}
      />

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
