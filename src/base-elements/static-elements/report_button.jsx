/*
    Event report button overlay 
*/

import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Fab } from "@material-ui/core";
import ReportRoundedIcon from "@material-ui/icons/Report";
import DialogSimpel from "./dialogs/report_event.jsx"

const useStyles = makeStyles(() => ({
  button: {
    position: "fixed",
    bottom: "1rem",
    right: "1rem",
    zIndex: "10",
  },
}));

const SingelTrack = () => {
  const classes = useStyles();
  


  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
    <DialogSimpel handleClose={handleClose} handleClickOpen={handleClickOpen} open={dialogOpen}/>
    <Fab aria-label="like" className={classes.button} color="secondary" onClick={handleClickOpen}>
      <ReportRoundedIcon fontSize="large" />
    </Fab>
  </>
  );
};

export default React.memo(SingelTrack);
