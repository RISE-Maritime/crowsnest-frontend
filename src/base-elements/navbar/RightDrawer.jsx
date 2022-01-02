import React from "react";
// Recoil
import { showMiniAppsObj } from "../../globalAtomsSelectors";
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
      // appName: !showMiniApp[appName]
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
          selected={showMiniApp.test}
          onClick={() => ToggleMiniApp("test")}
        >
          <Checkbox edge="start" checked={showMiniApp.test} color="secondary" />
          <ListItemText primary="Test Mini APP" />
        </ListItemButton>
      </List>
    </Box>
  );
}
