import React, { useState, useEffect } from "react"
import { Grid } from "@mui/material"
import StatusSideBar from "./components/StatusSideBarNEW"
import Chart from "./components/Chart"
import ChartControls from "./components/ChartControls"

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
    worker.port.postMessage({
      type: "credentials",
      payload: {
        username: process.env.REACT_APP_MQTT_USERNAME,
        password: process.env.REACT_APP_MQTT_PASSWORD,
      },
    })
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
