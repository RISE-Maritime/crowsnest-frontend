import React from "react"
import { ButtonGroup, Button, Slider, Grid } from "@mui/material"
import { ATOM_SAILS } from "../../../recoil/atoms"
import { useRecoilState } from "recoil"

const marks = [
  {
    value: -180,
    label: "-180°",
  },
  {
    value: -90,
    label: "-90°",
  },
  {
    value: 0,
    label: "0°",
  },
  {
    value: 90,
    label: "90°",
  },
  {
    value: 180,
    label: "180°",
  },
]

export default function SailControlButtonSlider({ disabled, sailId }) {
  let [sails, setSails] = useRecoilState(ATOM_SAILS)

  const setSailAngle = angle => {
    setSails(prevState => {
      return {
        ...prevState,
        [sailId]: {
          ...prevState.sailId,

          sheetingAngleSetDeg: angle,
        },
      }
    })
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      sx={{ height: "9rem", borderTop: "1px solid var(--border-divider-color)" }}
    >
      <Grid item xs={6}>
        <Slider
          min={-180}
          max={180}
          valueLabelDisplay="auto"
          marks={marks}
          step={10}
          defaultValue={0}
          track={false}
          disabled={disabled}
        />
      </Grid>
      <Grid item>
        <ButtonGroup variant="outlined" disabled={disabled}>
          <Button onClick={() => setSailAngle(-10)}>-10</Button>
          <Button>-5</Button>
          <Button>-1</Button>
          <Button>+1</Button>
          <Button>+5</Button>
          <Button>+10</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  )
}
