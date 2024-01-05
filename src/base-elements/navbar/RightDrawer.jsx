// Controlling pop up mini apps existing in folder ./components/mini_app 

import React from "react";
import { showMiniAppsObj } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import {
  Box,
  List,
  Checkbox,
  ListItemButton,
  ListItemText,
} from "@mui/material";

export default function RightDrawer(props) {
  let [showMiniApp, setShowMiniApp] = useRecoilState(showMiniAppsObj);

  const ToggleMiniApp = (appName) => {
    console.log(appName);
    setShowMiniApp({
      ...showMiniApp,
      [appName]: !showMiniApp[appName],
    });
  };

  return (
    <Box
      sx={{
        width: props.side === "top" || props.side === "bottom" ? "auto" : 250,
      }}
      role="presentation"
      onClick={props.toggleDrawer(props.side, false)}
      onKeyDown={props.toggleDrawer(props.side, false)}
    >
      <List>

        {/* WIND */}
        <ListItemButton
          selected={showMiniApp.wind}
          onClick={() => ToggleMiniApp("windCurrent")}
        >
          <Checkbox
            edge="start"
            checked={showMiniApp.windCurrent}
            color="secondary"
          />
          <ListItemText primary="Wind & Current" />
        </ListItemButton>

        {/* Playback */}
        <ListItemButton
          selected={showMiniApp.playback}
          onClick={() => ToggleMiniApp("playback")}
        >
          <Checkbox
            edge="start"
            checked={showMiniApp.playback}
            color="secondary"
          />
          <ListItemText primary="Playback" />
        </ListItemButton>


        <ListItemButton
          selected={showMiniApp.playback}
          onClick={() => ToggleMiniApp("controls")}
        >
          <Checkbox
            edge="start"
            checked={showMiniApp.controls}
            color="secondary"
          />
          <ListItemText primary="Controls" />
        </ListItemButton>
      </List>
    </Box>
  );
}
