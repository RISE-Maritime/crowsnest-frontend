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

import React, { useEffect, useState } from "react"
// Recoil
import { useRecoilState } from "recoil"
import { appState } from "../../recoil/atoms"
// Components
import Clock from "react-live-clock"
import GridCenter from "../components/GridCenter"
import LeftDrawer from "./LeftDrawer"
import RightDrawer from "./RightDrawer"
import { Grid, AppBar, Typography, SwipeableDrawer, Stack, Avatar, Button } from "@mui/material"
import IconButton from "../components/IconButton"
import { styled, useTheme } from "@mui/material/styles"
// Icons & Images
import LogoCrowsnest from "../../resources/crowsnest.png"
import AppsRoundedIcon from "@mui/icons-material/AppsRounded"
import MenuIcon from "@mui/icons-material/Menu"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"

export default function NavBar() {
  const theme = useTheme()
  const [appObj, setAppObj] = useRecoilState(appState)
  const [drawerState, setDrawerState] = useState({
    left: false,
    right: false,
  })

  useEffect(() => {}, [])

  const toggleDrawer = (anchor, open) => event => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return
    }

    setDrawerState({ ...drawerState, [anchor]: open })
  }

  const setTheme = themeName => () => {
    setAppObj({ ...appObj, appActiveColorTheme: themeName })
  }

  const ToggleThemeMode = () => {
    if (appObj.appActiveColorTheme === "light") {
      setAppObj({
        ...appObj,
        appActiveColorTheme: "dark",
      })
    } else {
      setAppObj({
        ...appObj,
        appActiveColorTheme: "light",
      })
    }
  }

  return (
    <AppBar>
      <Stack direction="row" gap={4}>
        <IconButton size="large" onClick={toggleDrawer("left", true)}>
          <MenuIcon />
        </IconButton>
        <IconButton size="medium" onClick={toggleDrawer("left", true)}>
          <MenuIcon />
        </IconButton>
        <Stack direction="row" spacing={2} alignItems="center">
          <SiteHeading>Crowsnest</SiteHeading>
          <PageHeading>
            {appObj.activeMode}, {appObj.activeVessel}
          </PageHeading>
        </Stack>
      </Stack>
      {/* Left app navigation menu */}
      <SwipeableDrawer
        anchor={"left"}
        open={drawerState["left"]}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        <LeftDrawer side={"left"} toggleDrawer={toggleDrawer} />
      </SwipeableDrawer>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button variant="text" onClick={setTheme("day")}>
          Day
        </Button>
        <Button variant="text" onClick={setTheme("bright")}>
          Bright
        </Button>
        <Button variant="text" onClick={setTheme("dusk")}>
          Dusk
        </Button>
        <Button variant="text" onClick={setTheme("night")}>
          Night
        </Button>
      </Stack>
    </AppBar>
  )
  //   <AppBar position="static" sx={{ height: "40px", backgrounColor: "hotpink" }}>
  //     <Grid container direction="row" justifyContent="space-between" alignItems="center">
  //       {/* Left side */}
  //       <GridCenter item xs={4}>
  //         <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
  //           {/* App navigation button */}
  //           <IconButton onClick={toggleDrawer("left", true)}>
  //             <MenuIcon sx={{ color: theme.palette.primary.contrastText }} />
  //           </IconButton>
  //           {/* Active view status text */}
  //           <Typography variant={"h6"}>Crowsnest</Typography>
  //           {/* Active navigation mode */}
  //           <Typography variant={"button"}>{appObj.activeMode}</Typography>
  //         </Stack>
  //       </GridCenter>

  //       {/* Active vessel */}
  //       <GridCenter item xs={3}>
  //         <Typography variant={"subtitle1"}>{appObj.activeVessel}</Typography>
  //       </GridCenter>

  //       {/* Time */}
  //       <GridCenter item xs={2}>
  //         <Typography variant={"subtitle1"}>
  //           <Clock format={"YYYY-MM-DD  HH:mm:ss"} ticking={true} timezone={"Europe/Stockholm"} />
  //         </Typography>
  //       </GridCenter>

  //       <Grid item xs={3}>
  //         <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
  //           {/* Alarm management */}
  //           <NotificationsNoneIcon />

  //           {/* User profile */}
  //           <Avatar src={LogoCrowsnest} sx={{ width: 24, height: 24 }}>
  //             D
  //           </Avatar>

  //           <Stack direction="row" spacing={2} alignItems="center">
  //             <Button variant="text" onClick={setTheme("day")}>
  //               Day
  //             </Button>
  //             <Button variant="text" onClick={setTheme("bright")}>
  //               Bright
  //             </Button>
  //             <Button variant="text" onClick={setTheme("dusk")}>
  //               Dusk
  //             </Button>
  //             <Button variant="text" onClick={setTheme("night")}>
  //               Night
  //             </Button>
  //           </Stack>

  //           {/* Floating mini apps */}
  //           <IconButton onClick={toggleDrawer("right", true)}>
  //             <AppsRoundedIcon sx={{ color: theme.palette.primary.contrastText }} />
  //           </IconButton>
  //         </Stack>
  //       </Grid>
  //     </Grid>

  //     {/* Right mini app selector */}
  //     <SwipeableDrawer
  //       anchor={"right"}
  //       open={drawerState["right"]}
  //       onClose={toggleDrawer("right", false)}
  //       onOpen={toggleDrawer("right", true)}
  //     >
  //       <RightDrawer side={"right"} toggleDrawer={toggleDrawer} />
  //     </SwipeableDrawer>
  //   </AppBar>
  // )
}

const SiteHeading = ({ children }) => <Typography variant="body1">{children}</Typography>
const PageHeading = ({ children }) => (
  <Typography sx={{ fontWeight: 700 }} variant="subtitle1" component="h1">
    {children}
  </Typography>
)

// const PageHeading = styled(Typography)``
