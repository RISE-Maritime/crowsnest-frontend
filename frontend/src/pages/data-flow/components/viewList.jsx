import React from "react";
import ROUTES from "../../../ROUTES.json";
import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function ViewList() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <h3>View list</h3>
      </Grid>
      <Grid item xs={12}>
        <Button component={Link} to={ROUTES.ECDIS}>
          ECDIS
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button component={Link} to={ROUTES.CONNING}>
          Conning
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button component={Link} to={ROUTES.REMOTE_CONTROL}>
          Remote control
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button component={Link} to={ROUTES.DATA_FLOW}>
          Data flow
        </Button>
      </Grid>
    </Grid>
  );
}
