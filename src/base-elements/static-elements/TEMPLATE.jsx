/*
    Template 
*/

import React, { useContext, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MyContext from "../../context/MyContext";
import { Grid, Button } from "@material-ui/core";
import Footer from "../../base-element/footer";
import Navbar from "../../base-element/navbar";
import ReportButton from "../../base-element/static-elements/report_button";
import { Link } from "react-router-dom";
import ROUTES from "../../ROUTES.json";
import FB from "../../../FirebaseMy";

const useStyles = makeStyles((theme) => ({
  page: {
    position: "relative",
    minHeight: "100vh",
  },
  footer_space: {
    height: "2.5rem",
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const context = useContext(MyContext);

  useEffect(() => {
    context.updateTab(3);
  },[]);

  return (
    <div className={classes.page}>
      <Navbar />
      <ReportButton />

    

      <div className={classes.footer_space}></div>
      <Footer />
    </div>
  );
};

export default React.memo(Home);
