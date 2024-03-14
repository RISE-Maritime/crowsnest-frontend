import React from "react"
import { Typography, Slider, Stack } from "@mui/material"
import { ObcButton as Button } from "@oicl/openbridge-webcomponents-react/components/button/button"
import { millisecondsToTime } from "../../../utils"
import { useRecoilState } from "recoil"
import { ATOM_SIM_STATE } from "../../../recoil/atoms"

// Icons
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"

const marks = [
  {
    value: 1,
    label: "RT",
  },
  {
    value: 2,
    label: "",
  },
  {
    value: 3,
    label: "",
  },
  {
    value: 4,
    label: "",
  },
  {
    value: 5,
    label: "x5",
  },
  {
    value: 10,
    label: "x10",
  },
  {
    value: 20,
    label: "x20",
  },
  {
    value: 30,
    label: "x30",
  },
  {
    value: 40,
    label: "x40",
  },
  {
    value: 50,
    label: "x50",
  },
]

function valuetext(value) {
  if (value === 1) return "Real Time"
  return `X${value}`
}

export default function SimCommands({ simTimeMilSec, pauseSim, startSim }) {
  const [simState, setSimState] = useRecoilState(ATOM_SIM_STATE)

  return (
    <div>
      <Typography variant="h4">Simple Simulator</Typography>
      <Typography variant="body1">
        Time elapsed: {millisecondsToTime(simTimeMilSec)} ({simState.state})
      </Typography>

      <Stack direction="row" spacing={1}>
        <Button checked={simState.state === "RUNNING"} variant="check" onClick={startSim} disabled={simState.state === "RUNNING"}>
          <PlayArrowIcon slot="leading-icon" /> Run
        </Button>

        <Button
          checked={simState.state === "STOPPED" || simState.state === "PAUSED"}
          variant="check"
          onClick={pauseSim}
          disabled={simState.state === "STOPPED" || simState.state === "PAUSED"}
        >
          <PauseIcon slot="leading-icon" /> Pause
        </Button>
      </Stack>

      <br />
      <Typography variant="subtitle1" sx={{ marginRight: "0.5rem" }}>
        Simulation Speed
      </Typography>
      <Slider
        size="small"
        disabled={!(simState.state === "STOPPED" || simState.state === "PAUSED")}
        sx={{ width: "80%", margin: "0rem 0.5rem" }}
        value={simState.runTimeSpeedUp}
        track={false}
        onChange={event => {
          setSimState({
            ...simState,
            runTimeSpeedUp: event.target.value,
          })
        }}
        marks={marks}
        valueLabelFormat={valuetext}
        valueLabelDisplay="auto"
        step={null}
        min={1}
        max={50}
      />
    </div>
  )
}
