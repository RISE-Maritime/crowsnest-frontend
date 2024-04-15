import React from "react"
import { Grid, Paper, Typography } from "@mui/material"

export default function CamFlowMetadata({ metadata }) {
  return (
    <Paper sx={{width: "100%"}} >
      <Grid container p={1}>
        <Grid item xs={12}>
          <Typography variant="h5">Metadata</Typography>
          <Typography variant="body1">
            Camera: {metadata?.camera}
            <br />
            Model: {metadata?.model}
            <br />
            Envelope Date: {metadata?.envelope_date}
            <br />
            Envelope Time: {metadata?.envelope_time}
            <br />
            Latency: {metadata?.latency} sec
            <br />
            FPS: {metadata?.fps?.toFixed(4)}
            <br />
            Frame Count: {metadata?.count}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}
