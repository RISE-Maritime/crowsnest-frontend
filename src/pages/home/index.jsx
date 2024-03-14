import React from "react"
import { Grid, Typography } from "@mui/material"
import ViewList from "./components/viewList"
import PlatformPicker from "./components/PlatformPicker"

export default function index() {
  return (
    <Grid container row spacing={4} sx={{ py: 4, px: 2 }} justifyContent="center">
      <Grid item>
        <Typography variant="h3" component="h1">
          Welcome to Crowsnest ECDIS / RCC
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <PlatformPicker />
      </Grid>
      <Grid item xs={12}>
        <ViewList />
      </Grid>
    </Grid>
  )
}
