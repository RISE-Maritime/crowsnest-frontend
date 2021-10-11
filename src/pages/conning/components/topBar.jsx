/*
    Top bar / Navbar
    - Time & Date
    - Menu icon  
*/

import React from "react";
import ROUTES from '../../../ROUTES.json'
// Components
import { Grid, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import Clock from 'react-live-clock';
// Icons
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
// Atoms
import { useRecoilValue } from "recoil";
import {atomSelectedVesselModel} from '../../home/components/vesselPicker'

export default function TopBar() {
    const vesselModel = useRecoilValue(atomSelectedVesselModel);

  return (
    <Grid container alignItems="center"  justifyContent="space-between">
      <Grid item>
        <IconButton component={Link} to={ROUTES.HOME}>
          <AppsRoundedIcon />
        </IconButton>
      </Grid>
      <Grid item>
      <h3>{vesselModel.mmsi}</h3>
      </Grid>
      <Grid item>
        <h3 style={{ margin: '0rem 1rem', color: '#616161'}}>
          <Clock format={"HH:mm:ss"} ticking={true} timezone={"Europe/Stockholm"} />
        </h3>
      </Grid>
    </Grid>
  );
}
