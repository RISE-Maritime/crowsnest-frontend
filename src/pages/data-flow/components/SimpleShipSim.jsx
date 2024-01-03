import React, { useState } from "react"
import { Button, Typography } from "@mui/material"
import { OS_POSITIONS, OS_HEADING, OS_VELOCITY, ATOM_OS_RUDDERS, ATOM_OS_ENGINES } from "../../../recoil/atoms"
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil"
import { updateSimState } from "../../../recoil/selectors"

export default function SimpleShipSim() {
  const osHeading = useRecoilValue(OS_HEADING)
  const osVelocity = useRecoilValue(OS_VELOCITY)
  const osRudder = useRecoilValue(ATOM_OS_RUDDERS)
  const osEng = useRecoilValue(ATOM_OS_ENGINES)
  const [osPositions, setOsPositions] = useRecoilState(OS_POSITIONS)
  const setUpdateSimState = useSetRecoilState(updateSimState)
  const [simInterval, setSimInterval] = useState()
  const [shipState, setShipState] = useState({
    position: [0, 0],
    heading: 0,
    sog: 0,
    cog: 0,
    rot: 0,
    rudder: 0, // -35 to 35 degrees
    engine: 0, // -100% to 100%
  })

  function startSim() {
    console.log("Start")

    let interval = setInterval(() => {
      setUpdateSimState(100)
    }, 100)

    setSimInterval(interval)
  }

  function stopSim() {
    console.log("Stop")
    clearInterval(simInterval)
  }

  return (
    <div>
      <Typography variant="h4">SimpleShipSim</Typography>

      <Typography variant="h6">
        <b> OS State </b>
        <br />
        Lat {osPositions.SIM?.latitude.toFixed(4)}°
        <br />
        Long {osPositions.SIM?.longitude.toFixed(4)}°
        <br />
        Heading: {osHeading?.SIM?.heading.toFixed(1)}°
        <br />
        SOG: {osVelocity?.SIM?.sog.toFixed(1)} kts 
        <br />
        COG: {osVelocity?.SIM?.cog.toFixed(1)}°
        <br />
        ROT: {osVelocity.SIM?.rot.toFixed(0)}°/min
        <br />
        Rudder: {(osRudder.RUDDER_0?.maxAngle * (osRudder.RUDDER_0?.setAngle/100)).toFixed(0) } °
        <br />
        Engine: {osEng.ENGINE_0?.setPower}%
      </Typography>

      <Button variant="contained" color="primary" onClick={startSim}>
        Start
      </Button>

      <Button variant="contained" color="primary" onClick={stopSim}>
        Stop
      </Button>
    </div>
  )
}
