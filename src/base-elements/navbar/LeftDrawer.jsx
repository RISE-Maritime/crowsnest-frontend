import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../ROUTES.json";
// Components
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItemButton
} from "@mui/material";
// Icons
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import VrpanoIcon from '@mui/icons-material/Vrpano';
import EdgesensorHighIcon from '@mui/icons-material/EdgesensorHigh';
import SettingsIcon from '@mui/icons-material/Settings';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import RouteIcon from '@mui/icons-material/Route';

export default function LeftDrawer(props) {
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
        <ListItemButton key={"Home"} component={Link} to={ROUTES.HOME}>
          <ListItemIcon>
            <HomeRoundedIcon />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItemButton>

        <ListItemButton key={"ECDIS"} component={Link} to={ROUTES.ECDIS}>
          <ListItemIcon>
            <MapRoundedIcon />
          </ListItemIcon>
          <ListItemText primary={"ECDIS"} />
        </ListItemButton>

        <ListItemButton
          key={"BEARING_RATE"}
          component={Link}
          to={ROUTES.BEARING_RATE}
        >
          <ListItemIcon>
            <TrackChangesIcon />
          </ListItemIcon>
          <ListItemText primary={"Bearing Rate"} />
        </ListItemButton>

        <ListItemButton key={"Conning"} component={Link} to={ROUTES.CONNING}>
          <ListItemIcon>
            <SpeedRoundedIcon />
          </ListItemIcon>
          <ListItemText primary={"Conning"} />
        </ListItemButton>

        <ListItemButton key={"E-lookout"} component={Link} to={ROUTES.E_LOOKOUT}>
          <ListItemIcon>
            <VrpanoIcon />
          </ListItemIcon>
          <ListItemText primary={"E-Lookout  (Seahorse)"} />
        </ListItemButton>

        <ListItemButton key={"E-lookout-V2"} component={Link} to={ROUTES.E_LOOKOUT_V2}>
          <ListItemIcon>
            <VrpanoIcon />
          </ListItemIcon>
          <ListItemText primary={"E-Lookout (Landkrabban)"} />
        </ListItemButton>

        <ListItemButton
          key={"remoteControl"}
          component={Link}
          to={ROUTES.REMOTE_CONTROL}
        >
          <ListItemIcon>
            <SportsEsportsRoundedIcon />
          </ListItemIcon>
          <ListItemText primary={"Remote Control"} />
        </ListItemButton>

        <ListItemButton
          key={"route_editor"}
          component={Link}
          to={ROUTES.ROUTE_EDITOR}
        >
          <ListItemIcon>
            <RouteIcon />
          </ListItemIcon>
          <ListItemText primary={"Route Editor"} />
        </ListItemButton>

        <ListItemButton
          key={"DEVICE_SENSOR"}
          component={Link}
          to={ROUTES.DEVICE_SENSORS}
        >
          <ListItemIcon>
            <EdgesensorHighIcon />
          </ListItemIcon>
          <ListItemText primary={"Device Sensors"} />
        </ListItemButton>


      </List>
      <Divider />
      <List>
        <ListItemButton key={"data"} component={Link} to={ROUTES.DATA_FLOW}>
          <ListItemIcon>
            <InsightsRoundedIcon />
          </ListItemIcon>
          <ListItemText primary={"Data flow"} />
        </ListItemButton>
        <ListItemButton key={"configuration"} component={Link} to={ROUTES.CONFIGURATION}>
          <ListItemIcon>
            <DirectionsBoatIcon />
          </ListItemIcon>
          <ListItemText primary={"OS configuration"} />
        </ListItemButton>
        <ListItemButton key={"settings"} component={Link} to={ROUTES.SETTINGS}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={"APP Settings"} />
        </ListItemButton>
      </List>
    </Box>
  );
}
