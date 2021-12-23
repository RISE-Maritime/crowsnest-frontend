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

        <ListItem button key={"Conning"} component={Link} to={ROUTES.CONNING}>
          <ListItemIcon>
            <SpeedRoundedIcon />
          </ListItemIcon>
          <ListItemText primary={"Conning"} />
        </ListItem>

        <ListItem button key={"remoteControl"} component={Link} to={ROUTES.REMOTE_CONTROL}>
          <ListItemIcon>
            <SportsEsportsRoundedIcon />
          </ListItemIcon>
          <ListItemText primary={"Remote Control"} />
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
