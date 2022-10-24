import React from "react"
import { Stack, FormControl, InputLabel, Select, MenuItem,  Typography, Grid } from "@mui/material"
import { useRecoilState } from "recoil"
import { OS_POSITIONS, OS_POSITION_SETTING, OS_VELOCITY_SETTING, OS_VELOCITY, OS_HEADING, OS_HEADING_SETTING } from "../../../recoil/atoms"

export default function OsInfo() {
  const [osPos, setOsPos] = useRecoilState(OS_POSITIONS)
  const [posSetting, setPosSetting] = useRecoilState(OS_POSITION_SETTING)
  const [osVelocity, setOsVelocity] = useRecoilState(OS_VELOCITY)
  const [osVelocitySetting, setOsVelocitySetting] = useRecoilState(OS_VELOCITY_SETTING)
  const [osHeading, setOsHeading] = useRecoilState(OS_HEADING)
  const [osHeadingSetting, setOsHeadingSetting] = useRecoilState(OS_HEADING_SETTING)

  const handleChangeGNSSsource = event => {
    const newPosSource = event.target.value
    setPosSetting({
      ...posSetting,
      source: newPosSource,
    })
  }

  return (
    <div>
      <hr style={{ width: "100%" }} />
      <Grid container sx={{ padding: "0.5rem" }}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="subtitle1">OS info</Typography>
            <FormControl variant="outlined" size="small" sx={{ minWidth: "3rem" }}>
              <InputLabel id="select-velocity-source-sger">Velocity</InputLabel>
              <Select
                labelId="select-velocity-source-sger"
                id="select-gnss-source-sdgreg"
                value={osVelocitySetting.source}
                onChange={handleChangeGNSSsource}
                label="Velocity"
                sx={{ fontSize: "0.8rem" }}
              >
                {Object.keys(osVelocity).map(osPoskey => {
                  return (
                    <MenuItem key={"jhv" + osPoskey} value={osPoskey}>
                      {osPoskey}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <div style={{ textAlign: "center" }}>
              <Typography variant="caption">Heading</Typography>
              <Typography variant="subtitle1">{osHeading[osHeadingSetting.source]?.heading}°</Typography>
            </div>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <div style={{ textAlign: "center" }}>
              <Typography variant="caption">COG</Typography>
              <Typography variant="subtitle1">{osVelocity[osVelocitySetting.source]?.cog}°</Typography>
            </div>
            <div style={{ textAlign: "center" }}>
              <Typography variant="caption">SOG</Typography>
              <Typography variant="subtitle1">{osVelocity[osVelocitySetting.source]?.sog}kts</Typography>
            </div>
            <div style={{ textAlign: "center" }}>
              <Typography variant="caption">ROT</Typography>
              <Typography variant="subtitle1">{osVelocity[osVelocitySetting.source]?.rot}°/min</Typography>
            </div>
          </Stack>
        </Grid>
      </Grid>
      <hr style={{ width: "100%" }} />
    </div>
  )
}
