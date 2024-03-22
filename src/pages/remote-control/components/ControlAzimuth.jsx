import React from "react"
import SvgAzimuth from "./SvgAzimuth"
import { atom_OS_AZIMUTH_LEFT } from "../../../recoil/atoms"
import { useRecoilValue } from "recoil"
import { Box } from "@mui/material"
import { ObcAzimuthThruster } from "@oicl/openbridge-webcomponents-react/navigation-instruments/azimuth-thruster/azimuth-thruster"

export default function ControlAzimuth() {
  const azimuthLeft = useRecoilValue(atom_OS_AZIMUTH_LEFT)
  return (
    <>
      <div style={{ width: "50vw" }}>
        <SvgAzimuth setEng={azimuthLeft.vertical} actEng={85} setAngle={azimuthLeft.horizontal} actAngle={50} />
      </div>
      <Box
        sx={{
          width: "50vw",
          height: "50vw",
        }}
      >
        <ObcAzimuthThruster size="l" thrust={50} thrustSetpoint={70} angle={30} angleSetpoint={40} state="inCommand" width={32} />
      </Box>
    </>
  )
}
