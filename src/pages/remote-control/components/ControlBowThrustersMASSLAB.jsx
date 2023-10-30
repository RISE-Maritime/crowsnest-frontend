import React from "react"
import SvgThrustersMASSLAB from "./SvgBowThrustersMASSLAB"
import { Grid, Stack } from "@mui/material"
import { ATOM_OS_THRUSTERS } from "../../../recoil/atoms"
import { useRecoilState } from "recoil"

export default function ControlBowThrustersMASSLAB() {
  const [thrusters, setThrusters] = useRecoilState(ATOM_OS_THRUSTERS)

  return (
    <Grid container>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
          <SvgThrustersMASSLAB
            setPower={thrusters?.THRUSTER_0.setPower}
            actPower={thrusters?.THRUSTER_0.actPower}
            thrusterID={"THRUSTER_0"}
            thrusterNAME={"Thruster 0"}
            isTouchControl={true}
            setThrusters={setThrusters}
            thrusters={thrusters}
          />
        </Stack>
      </Grid>
    </Grid>
  )
}
