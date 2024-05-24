import React from "react"
import SvgThrust0to100 from "./SvgThrust0to100"
import { Stack } from "@mui/material"
import { ATOM_SAIL_CONTROL } from "../../../recoil/atoms"
import { useRecoilState } from "recoil"

export default function ControlThrust() {
  const [sailControl, setSailControl] = useRecoilState(ATOM_SAIL_CONTROL)

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ height: "695px", paddingTop: "0rem", fontSize: "1rem" }}
      >
        <p>
          <b>100%</b>
        </p>
        <p>
          <b>50%</b>
        </p>
        <p>
          <b>0%</b>
        </p>
      </Stack>
      <SvgThrust0to100
        isTouchControl={false}
        setPower={sailControl.variableThrustSetPct * 100}
        actPower={0}
        // actPower={sailControl.variableThrustActualPct*100}
        setSailControl={setSailControl}
      />
    </Stack>
  )
}
