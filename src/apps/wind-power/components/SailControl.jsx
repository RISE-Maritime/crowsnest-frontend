import React from "react"
import { Button, Paper } from "@mui/material"
import { sailControlAction, sailAction } from "../../../recoil/selectors"
import { useSetRecoilState } from "recoil"
import CardHeading from "./CardHeading"

export default function SailControl() {
  const newSailControlAction = useSetRecoilState(sailControlAction)
  const newSailAction = useSetRecoilState(sailAction)

  const makeQuerySailControl = () => {
    console.log("makeQuerySailControl")
    newSailControlAction({
      sheetingMode: 0, // (int) 1= manual, 2= automatic
      coupledSteeringMode: 0, // (int) 0=activated, 1=deactivated
      variableThrustMode: 0, // (int) 0=activated, 1=deactivated
      variableThrustSetPct: 0.4, // (float) 0.0 -> 1.0 = 0% -> 100%
    })
  }

  const makeQuerySails = () => {
    console.log("makeQuerySails")
    newSailAction({
      sailId: 0,
      isActiveMode: 0, // (int) 0=activated, 1=deactivated
      sheetingAngleSetDeg: 45, // # (float) -180 to 180 degrees
    })
  }

  return (
    <Paper>
      <CardHeading heading="Sail control" />
      <Button onClick={makeQuerySailControl}>TEST QUERY SAIL CONTROL</Button>
      <br />
      <Button onClick={makeQuerySails}>TEST QUERY SAILS</Button>
    </Paper>
  )
}
