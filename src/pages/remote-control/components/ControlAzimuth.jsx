import React from "react"
import SvgAzimuth from "./SvgAzimuth"

export default function ControlAzimuth() {
  return (
    <div style={{ width: "50vw" }}>
      <SvgAzimuth setEng={75} actEng={85} setAngle={20} actAngle={50} />
    </div>
  )
}
