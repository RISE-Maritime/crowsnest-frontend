import React from "react"
import { Grid } from "@mui/material"
import CamRow4 from "./components/CamRow4"

/* eslint-disable */
const bowURLs = [
  (process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL_ ? process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL_ : "http://localhost:8000") +
    "/rise/seahorse/mediamtx/sh-2/compressed_image/axis-7",
    (process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL_ ? process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL_ : "http://localhost:8000") +
    "/rise/seahorse/mediamtx/sh-2/compressed_image/axis-8",
    (process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL_ ? process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL_ : "http://localhost:8000") +
    "/rise/seahorse/mediamtx/sh-2/compressed_image/axis-6",
    (process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL_ ? process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL_ : "http://localhost:8000") +
    "/rise/seahorse/mediamtx/sh-2/compressed_image/axis-5",
]

const aftURLs = [
  (process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL_ ? process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL_ : "http://localhost:8000") +
  "/rise/seahorse/mediamtx/sh-1/compressed_image/axis-1",
  (process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL_ ? process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL_ : "http://localhost:8000") +
  "/rise/seahorse/mediamtx/sh-1/compressed_image/axis-2",
  (process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL_ ? process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL_ : "http://localhost:8000") +
  "/rise/seahorse/mediamtx/sh-1/compressed_image/axis-3",
  (process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL_ ? process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL_ : "http://localhost:8000") +
  "/rise/seahorse/mediamtx/sh-1/compressed_image/axis-4",
]
/* eslint-enable */

export default function Lookout360() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <CamRow4 bowURLs={bowURLs} title={"Bow"} />
      </Grid>

      <Grid item xs={12}>
        <CamRow4 bowURLs={aftURLs} title={"Aft"} />
      </Grid>
    </Grid>
  )
}
