import React from 'react'
import { Grid } from '@mui/material'

export default function ActiveConfiguration() {
  return (
    <Grid container spacing={2} sx={{padding: "0.5rem"}}>
      <Grid item xs={12}>
        <h2 style={{ paddingLeft: "1rem" }}>Active Platform Configuration</h2>
      </Grid>
    </Grid>
  )
}
