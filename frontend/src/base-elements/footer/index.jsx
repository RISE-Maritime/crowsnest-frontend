/*
    Footer including 
    - Copyright note 
 */

import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    bottom: "0",
    width: "100%",
    height: "2.5rem",
    background: "#D1E9F5",
  },
  text: {
    margin: "0px",
  },
  grid_item_center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Footer = (props) => {
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} className={classes.grid_item_center}>
        <h6 variant="body2" className={classes.text}>
          {"Copyright © RISE "} {new Date().getFullYear()}
        </h6>
      </Grid>
    </Grid>
  );
};

export default React.memo(Footer);
