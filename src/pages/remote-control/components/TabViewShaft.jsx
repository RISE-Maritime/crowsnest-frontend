import React from "react"
import ControlEngineMASSLAB from "./ControlEngineMASSLAB"
import ControlRudderMASSLAB from "./ControlRudderMASSLAB"
import ControlThrusterMASSLAB from "./ControlThrusterMASSLAB"
import { Grid, Stack } from "@mui/material"

export default function TabViewShaft() {
  return (
    <Grid container>
      <Grid item xs={8}>
        <Stack direction="column" justifyContent="center" alignItems="center" sx={{ height: "100%", width: "100%" }}>
          <ControlThrusterMASSLAB />
          <ControlRudderMASSLAB />
        </Stack>
      </Grid>

      <Grid item xs={4}>
        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
          <ControlEngineMASSLAB />
        </Stack>
      </Grid>
    </Grid>
  )
}
