import React from "react"
import { Stack, FormControl, InputLabel, Select, MenuItem, Typography, Grid } from "@mui/material"
import { useRecoilState, useRecoilValue } from "recoil"
import { OS_POSITION_SETTING, OS_VELOCITY_SETTING, OS_VELOCITY, OS_HEADING, OS_HEADING_SETTING } from "../../../recoil/atoms"

function handleDataField(data, field) {
  if (data !== undefined && data !== null) {
    return data[field] !== null && data[field] !== undefined ? data[field].toString() : "---"
  } else {
    return "---"
  }
}

export default function OsInfo({ data, identifier }) {
  return (
    <div>
      <hr style={{ width: "100%" }} />
      <Grid container sx={{ padding: "0.5rem" }}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="subtitle1">OS info</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <div style={{ textAlign: "center" }}>
                <Typography variant="caption">Heading</Typography>
                <Typography variant="subtitle1">{handleDataField(data[identifier], "heading")}°</Typography>
              </div>
            </Grid>

            <Grid item xs={6}>
              <div style={{ textAlign: "center" }}>
                <Typography variant="caption">COG</Typography>
                <Typography variant="subtitle1">{handleDataField(data[identifier], "course")}°</Typography>
              </div>
            </Grid>

            <Grid item xs={6}>
              <div style={{ textAlign: "center" }}>
                <Typography variant="caption">SOG</Typography>
                <Typography variant="subtitle1">{handleDataField(data[identifier], "speed")}kts</Typography>
              </div>
            </Grid>

            <Grid item xs={6}>
              <div style={{ textAlign: "center" }}>
                <Typography variant="caption">ROT</Typography>
                <Typography variant="subtitle1">{handleDataField(data[identifier], "rate")}°/min</Typography>
              </div>
            </Grid>
          </Grid>

          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}></Stack>
        </Grid>
      </Grid>
      <hr style={{ width: "100%" }} />
    </div>
  )
}
