/*
    Navigation bar 
 */

import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MyContext from "../../context/MyContext";
import AppBar from "@material-ui/core/AppBar";
import { Grid, Hidden, Tab, Tabs, Drawer, List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ROUTES from "../../ROUTES.json";
import { AuthContext } from "../../Auth";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import TimelineRounded from "@material-ui/icons/TimelineRounded"
// Pics
import LogoShip from "../../resources/logo-ship.png";
import { Link } from "react-router-dom";
import FB from "../../FirebaseMy";

const useStyles = makeStyles(() => ({
  logo_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",

    textDecoration: "none",
    minHeight: "4rem",
  },
  logo: {
    height: "2.3rem",
    marginLeft: "1rem",
    marginRight: "0.5rem",
  },
  title: {
    margin: "0px",
    color: "#fff",
    "&:avisited": {},
    "&:hover": {
      color: "#d1d9e6",
    },
  },
  menu_container: {
    display: "flex",
    flexDirection: "row-reverse",
  },
  icon: {
    fontSize: "2rem",
    marginRight: "0.5rem",
  },
  link_text: {
    "&:avisited": {
      color: "#A0BF49",
    },
    "&:hover": {
      color: "#000",
    },
  },
  pagesIcones: {},
  tabs: {},
}));

const Home = () => {
  const classes = useStyles();
  const context = useContext(MyContext);
  const { currentUser } = useContext(AuthContext);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {}, []);

  return (
    <AppBar position="static">
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item xs={8} sm={6} md={4} className={classes.logo_container} component={Link} to={ROUTES.HOME}>
          <img src={LogoShip} alt="logo-ship" className={classes.logo} />
          <h1 className={classes.title}>MASS Safety</h1>
        </Grid>

        {currentUser ? (
          <>
            <Hidden smDown>
              <Grid item sm={6}>
                <Tabs value={context.tab} centered className={classes.tabs}>
                  {/* <Tab label="Reports" component={Link} to={ROUTES.REPORTS} /> */}
                  <Tab label="Pre Pare Ship" component={Link} to={ROUTES.PREPARESHIP} />
                  <Tab label="Report (DEMO)" component={Link} to={ROUTES.REPORTS_DEMO} />
                  <Tab label="nmea (DEMO)" component={Link} to={ROUTES.NMEA} />
                </Tabs>
              </Grid>
            </Hidden>

            <Grid item xs={1} className={classes.menu_container}>
              <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={openDrawer}>
                <MenuIcon className={classes.icon} />
              </IconButton>
            </Grid>
          </>
        ) : (
          <></>
        )}
      </Grid>

      <Drawer anchor={"right"} open={isDrawerOpen} onClose={closeDrawer}>
        <List>
          <ListItem
            button
            component={Link}
            to={ROUTES.PREPARESHIP}
      
          >
            <ListItemIcon>
              <TimelineRounded className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={"PrePareShip"} />
          </ListItem>

          <ListItem button onClick={() => FB.auth().signOut()} selected={context.tabIndex === 10}>
            <ListItemIcon>
              <MeetingRoomIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default React.memo(Home);
