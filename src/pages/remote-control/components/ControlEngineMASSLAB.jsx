import React from "react"
import SvgEngineMASSLAB from "./SvgEngineMASSLAB"
import { ATOM_OS_ENGINES, ATOM_OS_COMMAND } from "../../../recoil/atoms"
import { useRecoilState, useRecoilValue } from "recoil"

export default function ControlEngineMASSLAB() {
  const [engines, setEngines] = useRecoilState(ATOM_OS_ENGINES)
  const command = useRecoilValue(ATOM_OS_COMMAND)
  return (
    <SvgEngineMASSLAB
      setPower={engines?.ENGINE_0?.setPower}
      actPower={engines?.ENGINE_0?.actPower}
      thrusterID={"ENGINE_0"}
      thrusterNAME={"ENGINE 0"}
      isTouchControl={command.guiInCommand}
      setEngines={setEngines}
      engines={engines}
    />
  )
}
