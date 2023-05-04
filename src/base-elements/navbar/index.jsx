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

import React, { useEffect, useState } from "react";
// Recoil
import { useRecoilState } from "recoil";
import { appState } from "../../recoil/atoms";
// Components
import Clock from "react-live-clock";
import GridCenter from "../components/GridCenter";
import LeftDrawer from "./LeftDrawer";
import RightDrawer from "./RightDrawer";
import {
  Grid,
  AppBar,
  IconButton,
  Typography,
  SwipeableDrawer,
  Stack,
  Avatar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
// Icons & Images
import LogoCrowsnest from "../../resources/crowsnest.png";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

export default function NavBar() {
  const theme = useTheme()
  const [appObj, setAppObj] = useRecoilState(appState);
  const [drawerState, setDrawerState] = useState({
    left: false,
    right: false,
  });

  useEffect(() => {}, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const ToggleThemeMode = () => {
    if (appObj.appActiveColorTheme === "light") {
      setAppObj({
        ...appObj,
        appActiveColorTheme: "dark",
      });
    } else {
      setAppObj({
        ...appObj,
        appActiveColorTheme: "light",
      });
    }
  };

  return (
    <AppBar position="static">
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Left side */}
        <GridCenter item xs={4}>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            {/* App navigation button */}
            <IconButton onClick={toggleDrawer("left", true)}>
              <MenuIcon sx={{color: theme.palette.primary.contrastText}}/>
            </IconButton>
            {/* Active view status text */}
            <Typography variant={"h6"}>Crowsnest</Typography>
            {/* Active navigation mode */}
            <Typography variant={"button"}>{appObj.activeMode}</Typography>
          </Stack>
        </GridCenter>

        {/* Active vessel */}
        <GridCenter item xs={3}>
          <Typography variant={"subtitle1"}>{appObj.activeVessel}</Typography>
        </GridCenter>

        {/* Time */}
        <GridCenter item xs={2}>
          <Typography variant={"subtitle1"}>
            <Clock
              format={"YYYY-MM-DD  HH:mm:ss"}
              ticking={true}
              timezone={"Europe/Stockholm"}
            />
          </Typography>
        </GridCenter>

        <Grid item xs={3}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            {/* Alarm management */}
            <NotificationsNoneIcon />

            {/* User profile */}
            <Avatar src={LogoCrowsnest} sx={{ width: 24, height: 24 }}>
              D
            </Avatar>

            {/* Day and night mode (App color theme) */}
            <IconButton onClick={ToggleThemeMode}>
              {appObj.appActiveColorTheme === "light" ? (
                <DarkModeIcon sx={{color: theme.palette.primary.contrastText}}/>
              ) : (
                <LightModeIcon sx={{color: theme.palette.primary.contrastText}}/>
              )}
            </IconButton>

            {/* Floating mini apps */}
            <IconButton onClick={toggleDrawer("right", true)}>
              <AppsRoundedIcon sx={{color: theme.palette.primary.contrastText}}/>
            </IconButton>
          </Stack>
        </Grid>
      </Grid>

      {/* Left app navigation menu */}
      <SwipeableDrawer
        anchor={"left"}
        open={drawerState["left"]}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        <LeftDrawer side={"left"} toggleDrawer={toggleDrawer} />
      </SwipeableDrawer>

      {/* Right mini app selector */}
      <SwipeableDrawer
        anchor={"right"}
        open={drawerState["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        <RightDrawer side={"right"} toggleDrawer={toggleDrawer} />
      </SwipeableDrawer>
    </AppBar>
  );
}
