import React, { useState, useEffect } from "react"
import { Grid } from "@mui/material"
import StatusSideBar from "./components/StatusSideBarNEW"
import Chart from "./components/Chart"
import ChartControls from "./components/ChartControls"

const identifier = 265810550

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
  const [monitorData, setMonitorData] = useState({})
  const [aisWorker, setAisWorker] = useState(null)
  const [monitorWorker, setMonitorWorker] = useState(null)
  console.log(monitorData)
  useEffect(() => {
    // AIS WORKER
    const tmpAisWorker = new SharedWorker(new URL("../../workers/workerAis.js", import.meta.url))
    tmpAisWorker.port.onmessage = e => {
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
    tmpAisWorker.port.start()

    // MONITOR WORKER
    let tmpData
    const tmpMonitorWorker = new SharedWorker(new URL("../../workers/workerMonitor.js", import.meta.url))
    tmpMonitorWorker.port.onmessage = e => {
      switch (e.data.type) {
        case "error":
          console.log(e.data.payload)
          break
        case "ais":
          tmpData = {}
          tmpData[e.data.payload.mmsi] = e.data.payload
          setMonitorData({ ...monitorData, ...tmpData })
          break
        default:
          console.log("Unexpected message type " + e.data.type + " from workerMonitor")
      }
    }
    tmpMonitorWorker.port.start()

    // Send the workers the MQTT credentials
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
      tmpAisWorker.port.postMessage({
        type: "mqtt_credentials",
        payload: credentials,
      })
      tmpMonitorWorker.port.postMessage({
        type: "mqtt_credentials",
        payload: credentials,
      })
    } else {
      console.log("Error: Credentials for MQTT worker missing!")
    }

    // Send a monitored ais vessel
    tmpMonitorWorker.port.postMessage({
      type: "add_ais_mmsi",
      identifier: identifier,
    })

    setAisWorker(tmpAisWorker)
    setMonitorWorker(tmpMonitorWorker)

    // Cleanup
    return () => {
      aisWorker.terminate()
      monitorWorker.terminate()
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
          <StatusSideBar data={monitorData} identifier={identifier} />
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
