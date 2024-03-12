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

import React, { useEffect, useRef, useState } from "react"
// Recoil
import { useRecoilState } from "recoil"
import { appState } from "../../recoil/atoms"
// Components
import Clock from "react-live-clock"
import GridCenter from "../components/GridCenter"
import LeftDrawer from "./LeftDrawer"
import RightDrawer from "./RightDrawer"
import { Grid, AppBar, Typography, SwipeableDrawer, Stack, Avatar, Popover } from "@mui/material"
import IconButton from "../components/IconButton"
import { styled, useTheme } from "@mui/material/styles"
// Icons & Images
import LogoCrowsnest from "../../resources/crowsnest.png"
import AppsRoundedIcon from "@mui/icons-material/AppsRounded"
import MenuIcon from "@mui/icons-material/Menu"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import { ObcButton as Button } from "@oicl/openbridge-webcomponents-react/components/button/button"
import { ObcTopBar as TopBar } from "@oicl/openbridge-webcomponents-react/components/top-bar/top-bar"
import { ObcBrillianceMenu as BrillianceMenu } from "@oicl/openbridge-webcomponents-react/components/brilliance-menu/brilliance-menu"
import { ObcNavigationMenu as NavigationMenu } from "@oicl/openbridge-webcomponents-react/components/navigation-menu/navigation-menu"
import { ObcNavigationItem as NavigationItem } from "@oicl/openbridge-webcomponents-react/components/navigation-item/navigation-item"
import ROUTES from "../../ROUTES.json"
import MapRoundedIcon from "@mui/icons-material/MapRounded"

export default function NavBar() {
  const theme = useTheme()
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

  // const ToggleThemeMode = () => {
  //   if (appObj.appActiveColorTheme === "light") {
  //     setAppObj({
  //       ...appObj,
  //       appActiveColorTheme: "dark",
  //     })
  //   } else {
  //     setAppObj({
  //       ...appObj,
  //       appActiveColorTheme: "light",
  //     })
  //   }
  // }

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
        {/* <LeftDrawer side={"left"} toggleDrawer={toggleDrawer} /> */}
        <NavigationMenu>
          <NavigationItem slot="main" label="Home" href={ROUTES.home}>
            {/* <HomeIcon slot="icon" /> */}
            <HomeRoundedIcon slot="icon" />
          </NavigationItem>
          <NavigationItem slot="main" label="ECDIS" href={ROUTES.home}>
            <MapRoundedIcon slot="icon" />
          </NavigationItem>
          <NavigationItem slot="main" label="Bearing Rate" href={ROUTES.BEARING_RATE}>
            <MapRoundedIcon slot="icon" />
          </NavigationItem>
        </NavigationMenu>
      </SwipeableDrawer>

      <Popover
        // anchorReference="anchorPosition"
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
        <BrillianceMenu className="brilliance" onPaletteChanged={handleBrillianceChange} />
      </Popover>
    </>
  )

  // return (
  //   <>
  //     <AppBar>
  //       <Stack direction="row" gap={4}>
  //         <IconButton size="large" onClick={toggleDrawer("left", true)}>
  //           <MenuIcon />
  //         </IconButton>
  //         <IconButton size="medium" onClick={toggleDrawer("left", true)}>
  //           <MenuIcon />
  //         </IconButton>
  //         <Stack direction="row" spacing={2} alignItems="center">
  //           <SiteHeading>Crowsnest</SiteHeading>
  //           <PageHeading>
  //             {appObj.activeMode}, {appObj.activeVessel}
  //           </PageHeading>
  //         </Stack>
  //       </Stack>
  //       {/* Left app navigation menu */}
  // <SwipeableDrawer
  //   anchor={"left"}
  //   open={drawerState["left"]}
  //   onClose={toggleDrawer("left", false)}
  //   onOpen={toggleDrawer("left", true)}
  // >
  //   <LeftDrawer side={"left"} toggleDrawer={toggleDrawer} />
  // </SwipeableDrawer>
  //       <Stack direction="row" spacing={2} alignItems="center">
  //         <Button variant="text" onClick={setTheme("day")}>
  //           Day
  //         </Button>
  //         <Button variant="text" onClick={setTheme("bright")}>
  //           Bright
  //         </Button>
  //         <Button variant="text" onClick={setTheme("dusk")}>
  //           Dusk
  //         </Button>
  //         <Button variant="text" onClick={setTheme("night")}>
  //           Night
  //         </Button>
  //       </Stack>
  //     </AppBar>
  //   </>
  // )
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
