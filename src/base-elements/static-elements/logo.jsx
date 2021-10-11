import React from "react"
import PicLogo from "../../resources/Logo.png"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: "7rem",
  },
  text: {
    color: "#A0BF49",
    fontSize: "4rem",
  },
}))

export default function Logo() {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <img src={PicLogo} alt="Logo" className={classes.logo} />
      <h1 className={classes.text}>YardCDM och StationCDM</h1>
    </div>
  )
}
