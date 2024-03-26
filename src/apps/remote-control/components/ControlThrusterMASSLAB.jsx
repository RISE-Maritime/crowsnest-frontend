import React from "react"
import SvgBowThrustersMASSLAB from "./SvgBowThrustersMASSLAB"
import { ATOM_OS_THRUSTERS, ATOM_OS_COMMAND } from "../../../recoil/atoms"
import { selSetThruster } from "../../../recoil/selectors"
import { useSetRecoilState, useRecoilValue } from "recoil"

export default function ControlRudderMASSLAB() {
  const setThrusters = useSetRecoilState(selSetThruster)
  const thrusters = useRecoilValue(ATOM_OS_THRUSTERS)
  const command = useRecoilValue(ATOM_OS_COMMAND)

  return (
    <SvgBowThrustersMASSLAB
      setPower={thrusters?.THRUSTER_0.setPower}
      actPower={thrusters?.THRUSTER_0.actPower}
      thrusterID={"THRUSTER_0"}
      thrusterNAME={"Thruster 0"}
      isTouchControl={command.guiInCommand}
      setThrusters={setThrusters}
      thrusters={thrusters}
    />
  )
}
