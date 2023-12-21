import React from "react"
import { Grid, Paper, Typography } from "@mui/material"
import ViewWindow from "./ViewWindow"

export default function CamRow4({ bowURLs, title="Cameras" }) {
  return (
    <Paper sx={{ padding: "0.5rem", margin: "0.5rem" }}>
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5" align="center">
          {title}
        </Typography>
      </Grid>

      {bowURLs.map((url, index) => (
        <Grid item xs={3} key={"random_gegrg" + index}>
          <ViewWindow URLcam={url} />
        </Grid>
      ))}
    </Grid>
    </Paper>
  )
}
