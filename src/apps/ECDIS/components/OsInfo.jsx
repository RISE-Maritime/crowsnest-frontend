import React from "react"
import { styled } from "@mui/material/styles"
import { Stack, FormControl, InputLabel, Select, MenuItem, Typography, Grid } from "@mui/material"
import { useRecoilState, useRecoilValue } from "recoil"
import { OS_POSITION_SETTING, OS_VELOCITY_SETTING, OS_VELOCITY, OS_HEADING, OS_HEADING_SETTING } from "../../../recoil/atoms"

import Paper from "@mui/material/Paper"
import ContainerHeading from "../../../base-elements/components/ContainerHeading"
import PositionStatusSmall from "./PositionStatusSmall"

import { ObcInstrumentField } from "@oicl/openbridge-webcomponents-react/navigation-instruments/instrument-field/instrument-field"

function handleDataField(data, field) {
  if (data !== undefined && data !== null) {
    return data[field] !== null && data[field] !== undefined ? data[field].toString() : 0
  } else {
    return 0
  }
}

const Tag = styled(Typography)`
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem;
  color: var(--instrument-regular-secondary-color);
`

export default function OsInfo({ data, identifier }) {
  return (
    <Paper sx={{ height: "100%" }}>
      <ContainerHeading heading="Own ship" />
      <Grid container sx={{ padding: "0.5rem" }}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between">
            icon
            <Stack direction="row" spacing={1}>
              <ObcInstrumentField hasSetpoint={false} degree value={handleDataField(data[identifier], "heading")} tag="" />
              <Tag>HDG</Tag>
            </Stack>
            select
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between">
            icon
            <Stack direction="row" spacing={1}>
              <ObcInstrumentField hasSetpoint={false} degree value={handleDataField(data[identifier], "course")} tag="" />
              <Tag>COG</Tag>
            </Stack>
            select
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between">
            icon
            <Stack direction="row" spacing={1}>
              <ObcInstrumentField hasSetpoint={false} degree value={handleDataField(data[identifier], "speed")} tag="" />
              <Tag>SOG</Tag>
            </Stack>
            select
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between">
            icon
            <Stack direction="row" spacing={1}>
              <ObcInstrumentField hasSetpoint={false} degree value={handleDataField(data[identifier], "rate")} tag="" />
              <Tag>
                ROT
                <br />
                /min
              </Tag>
            </Stack>
            select
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <PositionStatusSmall />
        </Grid>
      </Grid>
    </Paper>
  )
}
