import React from "react"
import { ButtonGroup, Button, Slider, Grid } from "@mui/material"
import { ATOM_SAILS } from "../../../recoil/atoms"
import { useRecoilState } from "recoil"
import { sailAction } from "../../../recoil/selectors"
import { useSetRecoilState } from "recoil"

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
  const setSailAction = useSetRecoilState(sailAction)

  const setSailAddAngle = angle => {
    setSailAction({ sailId: sailId, sheetingAngleAddDeg: angle })
  }

  const setSailMode = mode => {
    setSails(prevState => {
      return {
        ...prevState,
        ["sail_" + sailId]: {
          ...prevState["sail_" + sailId],
          isActiveMode: mode,
        },
      }
    })
    setSailAction({ sailId: sailId, isActiveMode: mode })
  }

  const handleSliderChange = (event, newValue) => {
    setSails(prevState => {
      return {
        ...prevState,
        ["sail_" + sailId]: {
          ...prevState["sail_" + sailId],
          sheetingAngleSetDeg: newValue,
        },
      }
    })
    setSailAction({ sailId: sailId, sheetingAngleSetDeg: newValue})
  };

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
          onChange={handleSliderChange}
          value={sails[`sail_${sailId}`].sheetingAngleSetDeg}
        />
      </Grid>
      <Grid item>
        <ButtonGroup variant="outlined" disabled={disabled}>
          <Button onClick={() => setSailAddAngle(-10)}>-10</Button>
          <Button onClick={() => setSailAddAngle(-5)}>-5</Button>
          <Button onClick={() => setSailAddAngle(-1)}>-1</Button>
          <Button onClick={() => setSailAddAngle(1)}>+1</Button>
          <Button onClick={() => setSailAddAngle(5)}>+5</Button>
          <Button onClick={() => setSailAddAngle(10)}>+10</Button>
        </ButtonGroup>
      </Grid>
      <Grid item>
        {sails[`sail_${sailId}`].isActiveMode ? (
          <Button onClick={() => setSailMode(0)}>Start Sail</Button>
        ) : (
          <Button onClick={() => setSailMode(1)}>Stop Sail</Button>
        )}
      </Grid>
    </Grid>
  )
}
