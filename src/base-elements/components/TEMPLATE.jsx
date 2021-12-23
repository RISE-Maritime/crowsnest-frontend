/*
    Template 
*/

import React, { useContext, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MyContext from "../../context/MyContext";
import Footer from "../../base-element/footer";
import Navbar from "../../base-element/navbar";
import ReportButton from "../../base-element/static-elements/report_button";


const useStyles = makeStyles(() => ({
  page: {
    position: "relative",
    minHeight: "100vh",
  },
  footer_space: {
    height: "2.5rem",
  },
}));

const Home = () => {
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
