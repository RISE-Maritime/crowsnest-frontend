import React from "react"
import SvgRudderMASSLAB from "./SvgRudderMASSLAB"
import { ATOM_OS_RUDDERS } from "../../../recoil/atoms"
import { selSetRudder } from "../../../recoil/selectors"
import { useRecoilState, useSetRecoilState } from "recoil"

export default function ControlRudderMASSLAB() {
  const [rudders, setRudders] = useRecoilState(ATOM_OS_RUDDERS)
  const setRudder = useSetRecoilState(selSetRudder)

  return (
    
      <SvgRudderMASSLAB
        setAngle={rudders["RUDDER_0"].setAngle}
        actAngle={rudders["RUDDER_0"].actAngle}
        rudderID={"RUDDER_0"}
        rudderNAME={"RUDDER 0"}
        isTouchControl={true}
        setRudders={setRudder}
        rudders={rudders}
        maxAngle={rudders["RUDDER_0"].maxAngle}
      />
   
  )
}
