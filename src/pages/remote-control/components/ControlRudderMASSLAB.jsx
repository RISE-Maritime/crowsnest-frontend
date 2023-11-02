import React from "react"
import SvgRudderMASSLAB from "./SvgRudderMASSLAB"
import { ATOM_OS_RUDDERS, ATOM_OS_COMMAND } from "../../../recoil/atoms"
import { selSetRudder } from "../../../recoil/selectors"
import {  useSetRecoilState, useRecoilValue } from "recoil"

export default function ControlRudderMASSLAB() {
  
  const setRudder = useSetRecoilState(selSetRudder)
  const rudders = useRecoilValue(ATOM_OS_RUDDERS)
  const command = useRecoilValue(ATOM_OS_COMMAND)

  return (
    <SvgRudderMASSLAB
      setAngle={rudders["RUDDER_0"].setAngle}
      actAngle={rudders["RUDDER_0"].actAngle}
      rudderID={"RUDDER_0"}
      rudderNAME={"RUDDER 0"}
      isTouchControl={command.guiInCommand}
      setRudders={setRudder}
      rudders={rudders}
      maxAngle={rudders["RUDDER_0"].maxAngle}
    />
  )
}
