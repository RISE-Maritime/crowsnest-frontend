import React from "react"
import { Grid } from "@mui/material"
import { useRecoilValue } from "recoil"
import { atomKeelsonKeyExpressionHandled, atomKeelsonKeyExpressionUnmanaged } from "../../../recoil/atoms"

export default function KeelsonFlow() {
  let keysExp_handled = useRecoilValue(atomKeelsonKeyExpressionHandled)
  let keysExp_unhandled = useRecoilValue(atomKeelsonKeyExpressionUnmanaged)

  return (
    <Grid container>
      <Grid item xs={12}>
        <h1>Keelson flow in:</h1>
        {Object.keys(keysExp_handled).map(topic => {
          return (
            <p key={"eargae" + topic}>
              <b> {topic}</b>
              <br />
              Received: {keysExp_handled[topic]?.time_received.toLocaleString("sv-SV")}
              <br />
              Network delay: {keysExp_handled[topic]?.delay_calc ? "-" + keysExp_handled[topic]?.delay_calc + " sec" : ""}
              <br />
              Message count: {keysExp_handled[topic]?.count}
            </p>
          )
        })}
        <h1>Unhandled Key Expressions</h1>
        
        {Object.keys(keysExp_unhandled).map(topic => {
         
          return (
            <p key={"gwrrgaer" + topic}>
              {topic} , {keysExp_unhandled[topic]?.time_received.toLocaleString("sv-SV")}
              <br />
              {keysExp_unhandled[topic]?.count}
            </p>
          )
        })}
      </Grid>
    </Grid>
  )
}
