import React, { useState } from "react"
import { Button, Typography } from "@mui/material"
import { OS_POSITIONS } from "../../../recoil/atoms"
import { useRecoilState, useSetRecoilState } from "recoil"
import { updateSimState } from "../../../recoil/selectors"
export default function SimpleShipSim() {
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
      setUpdateSimState()
    }, 1000)

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
        Position: Lat {osPositions.SIM.latitude}  Long {osPositions.SIM.longitude}
        <br />
        Heading:  {shipState.heading}
        <br />
        SOG: {shipState.sog}
        <br />
        COG: {shipState.cog}
        <br />
        ROT: {shipState.rot}
        <br />
        Rudder: {shipState.rudder}
        <br />
        Engine: {shipState.engine}
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
