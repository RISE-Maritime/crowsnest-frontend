import React, { useState, useEffect } from "react"
import { Grid } from "@mui/material"
import StatusSideBar from "./components/StatusSideBarNEW"
import Chart from "./components/Chart"
import ChartControls from "./components/ChartControls"

function getCookieValue(cookieName) {
  const allCookies = document.cookie
  const cookieArray = allCookies.split("; ")

  for (let cookie of cookieArray) {
    const [key, value] = cookie.split("=")
    if (key === cookieName) {
      return value
    }
  }
  return null // Return null if the cookie was not found
}

export default function Ecdis() {
  const [ais, setAis] = useState([])
  const [aisWorker, setAisWorker] = useState(null)

  useEffect(() => {
    // AIS WORKER
    const worker = new SharedWorker(new URL("../../workers/workerAis.js", import.meta.url))
    worker.port.onmessage = e => {
      switch (e.data.type) {
        case "error":
          console.log(e.data.payload)
          break
        case "ais":
          setAis(e.data.payload)
          break
        default:
          console.log("Unexpected message type " + e.data.type + " from workerAis")
      }
    }
    worker.port.start()
    // Send the worker the login credentials
    let credentials
    const token = getCookieValue("crowsnest-auth-acccess")
    if (token) {
      credentials = {
        username: token,
      }
      console.log("Cookie credentials.")
    } else {
      credentials = {
        username: process.env.REACT_APP_MQTT_USERNAME,
        password: process.env.REACT_APP_MQTT_PASSWORD,
      }
      console.log("Env var credentials.")
    }
    if (credentials) {
      worker.port.postMessage({
        type: "credentials",
        payload: credentials,
      })
    } else {
      console.log("Error: Credentials for AIS worker missing!")
    }
    setAisWorker(worker)

    // Cleanup
    return () => {
      aisWorker.terminate()
    }
  }, [])

  return (
    <Grid container spacing={0}>
      <Grid container spacing={0}>
        <Grid
          item
          xs={10}
          sx={{
            position: "relative",
            padding: "0px",
            height: "calc(99vh - 95px)",
            cursor: "crosshair",
            overflow: "hidden",
          }}
        >
          <Chart ais={ais} />
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "grid",
            placeItems: "center",
            position: "relative",
            height: "calc(99vh - 95px)",
          }}
        >
          <StatusSideBar />
        </Grid>
      </Grid>
      <Grid
        item
        md={12}
        sx={{
          display: "grid",
          position: "relative",
          height: "50px",
        }}
      >
        <ChartControls />
      </Grid>
    </Grid>
  )
}
