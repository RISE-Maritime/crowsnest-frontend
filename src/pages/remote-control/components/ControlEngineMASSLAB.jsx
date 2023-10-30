import React from "react"
import SvgEngineMASSLAB from "./SvgEngineMASSLAB"
import { ATOM_OS_ENGINES } from "../../../recoil/atoms"
import { useRecoilState } from "recoil"

export default function ControlEngineMASSLAB() {
  const [engines, setEngines] = useRecoilState(ATOM_OS_ENGINES)
  return (
    <div>
      <SvgEngineMASSLAB
        setPower={engines?.ENGINE_0?.setPower}
        actPower={engines?.ENGINE_0?.actPower}
        thrusterID={"ENGINE_0"}
        thrusterNAME={"ENGINE 0"}
        isTouchControl={false}
        setEngines={setEngines}
        engines={engines}
      />
    </div>
  )
}
