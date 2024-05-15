import React, { useState } from "react"
import SvgThrust0to100 from "./SvgThrust0to100"
import { Stack } from "@mui/material"

export default function ControlThrust() {
  const [engines, setEngines] = useState({
    ENGINE_0: {
      setPower: 0, // -100 to 100 --> displayed as %
      actPower: 0, // -100 to 100 --> displayed as %
      status: "normal", // [normal, warning, error]
      statusText: "Normal",
      timeUpdated: "", // Delay in system
    },
    ENGINE_1: {
      setPower: 0,
      actPower: 0,
      status: "normal", // [normal, warning, error]
      statusText: "Normal",
      timeUpdated: "", // Delay in system
    },
  })


  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ height: "46rem", paddingTop: "0rem", fontSize: "1.5rem" }}
      >
        <p>
          <strong>100%</strong>
        </p>
        <p>
          <strong>50%</strong>
        </p>
        <p>
          <strong>0%</strong>
        </p>
      </Stack>
      <SvgThrust0to100
        setPower={engines?.ENGINE_0?.setPower}
        actPower={engines?.ENGINE_0?.actPower}
        thrusterID={"ENGINE_0"}
        isTouchControl={false}
        setEngines={setEngines}
        engines={engines}
      />
    </Stack>
  )
}
