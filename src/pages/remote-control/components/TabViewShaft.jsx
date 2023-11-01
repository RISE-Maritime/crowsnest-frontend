import React from "react"
import ControlBowThrustersMASSLAB from "./ControlBowThrustersMASSLAB"
import ControlEngineMASSLAB from "./ControlEngineMASSLAB"
import ControlRudderMASSLAB from "./ControlRudderMASSLAB"
import { Button, Grid, Stack } from "@mui/material"

export default function TabViewShaft() {
  return (
    <Grid container>
      <Grid item xs={8}>
        <Stack direction="column" justifyContent="center" alignItems="center" sx={{ height: "100%", width: "100%" }}>
          <ControlBowThrustersMASSLAB />

          <ControlRudderMASSLAB />
        </Stack>
      </Grid>

      <Grid item xs={4}>
        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
          <ControlEngineMASSLAB />
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
          <Button variant="outlined" size="large">
            Request command
          </Button>
        </Stack>
      </Grid>
    </Grid>
  )
}
