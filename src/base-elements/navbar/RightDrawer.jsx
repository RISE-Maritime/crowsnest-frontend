import React from "react";
// Recoil
import { showMiniAppsObj } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
// Components
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
      </List>
    </Box>
  );
}
