import React from "react"
import { Grid, Stack } from "@mui/material"
import ViewList from "./components/ViewList"
import PicCrowsnestAI from "../../resources/pictures/crowsnest-AI.jpeg"

export default function index() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
      <Grid container spacing={4} sx={{ py: 4, px: 2, maxWidth: "1200px" }}>
        <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ height: "100%" }}>
            <h1>Welcome to Crowsnest</h1>
            <p style={{ maxWidth: "850px" }}>
              Crowsnest, a testing and demonstration application base developed by RISE Maritime. This platform is designed to
              serve as a launchpad for swift prototyping, offering an opportunity to experience future Human-Machine Interfaces
              (HMI) for use in marine operations, remote operation centers and more.
              <br />
              <br />
              <a href="https://github.com/MO-RISE/crowsnest-frontend">RISE Maritime Github Crowsnest</a>
            </p>
            <br />
            <h3>Keelson</h3>
            <p>
              Data flow managed with Keelson that is an API specification for a distributed system tailored for digital maritime
              systems.
              <br />
              <br />
              <a href="https://github.com/MO-RISE/keelson">RISE Maritime Github Keelson</a>
            </p>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <img src={PicCrowsnestAI} style={{ height: "450px", borderRadius: "0.3rem" }} />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <ViewList />
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ height: "100%" }}>
            <p style={{ maxWidth: "850px" }}>
              <i>
                Crowsnest trying to follow <a href="https://www.openbridge.no/"> OpenBridge Design System</a>
              </i>
            </p>
          </Stack>
        </Grid>
      </Grid>
    </div>
  )
}
