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
        <ListItem button key={"Home"} component={Link} to={ROUTES.HOME}>
          <ListItemIcon>
            <HomeRoundedIcon />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>

        <ListItem button key={"ECDIS"} component={Link} to={ROUTES.ECDIS}>
          <ListItemIcon>
            <MapRoundedIcon />
          </ListItemIcon>
          <ListItemText primary={"ECDIS"} />
        </ListItem>

        <ListItem
          button
          key={"BEARING_RATE"}
          component={Link}
          to={ROUTES.BEARING_RATE}
        >
          <ListItemIcon>
            <TrackChangesIcon />
          </ListItemIcon>
          <ListItemText primary={"Bearing Rate"} />
        </ListItem>

        <ListItem button key={"Conning"} component={Link} to={ROUTES.CONNING}>
          <ListItemIcon>
            <SpeedRoundedIcon />
          </ListItemIcon>
          <ListItemText primary={"Conning"} />
        </ListItem>

        <ListItem button key={"E-lookout"} component={Link} to={ROUTES.E_LOOKOUT}>
          <ListItemIcon>
            <VrpanoIcon />
          </ListItemIcon>
          <ListItemText primary={"E-Lookout"} />
        </ListItem>
        <ListItem button key={"E-lookout-V2"} component={Link} to={ROUTES.E_LOOKOUT_V2}>
          <ListItemIcon>
            <VrpanoIcon />
          </ListItemIcon>
          <ListItemText primary={"E-Lookout-V2"} />
        </ListItem>

        <ListItem
          button
          key={"remoteControl"}
          component={Link}
          to={ROUTES.REMOTE_CONTROL}
        >
          <ListItemIcon>
            <SportsEsportsRoundedIcon />
          </ListItemIcon>
          <ListItemText primary={"Remote Control"} />
        </ListItem>

        <ListItem
          button
          key={"DEVISE_SENSOR"}
          component={Link}
          to={ROUTES.DEVISE_SENSORS}
        >
          <ListItemIcon>
            <EdgesensorHighIcon />
          </ListItemIcon>
          <ListItemText primary={"Devise Sensors"} />
        </ListItem>


      </List>
      <Divider />
      <List>
        <ListItem button key={"data"} component={Link} to={ROUTES.DATA_FLOW}>
          <ListItemIcon>
            <InsightsRoundedIcon />
          </ListItemIcon>
          <ListItemText primary={"Data flow"} />
        </ListItem>
      </List>
    </Box>
  );
}
