import React from "react"
import { Grid, Paper, Typography } from "@mui/material"
import { useRecoilValue } from "recoil"
import { ATOM_KEELSON_KEYEXP_MANAGED, ATOM_KEELSON_KEYEXP_UNMANAGED } from "../../../recoil/atoms"

export default function KeelsonFlow() {
  let keysExp_handled = useRecoilValue(ATOM_KEELSON_KEYEXP_MANAGED)
  let keysExp_unhandled = useRecoilValue(ATOM_KEELSON_KEYEXP_UNMANAGED)

  return (
    <Grid container>
      <Grid item xs={12}>
    
        <h3>Managed KeyExpressions</h3>

        {Object.keys(keysExp_handled).length === 0 && <p>No managed KeyExpressions</p>}

        {Object.keys(keysExp_handled).map(topic => {
          return (
            <Paper key={"random_segeargae" + topic}>
              <b> KeyExpression: {topic} </b>
              <br />
              Time last received: {keysExp_handled[topic]?.time_received.toLocaleString("sv-SV")}
              <br />
              Network delay: {keysExp_handled[topic]?.delay_calc ? "-" + keysExp_handled[topic]?.delay_calc + " sec" : ""}
              <br />
              Message count: {keysExp_handled[topic]?.count}
            </Paper>
          )
        })}

        <h3>Unmanaged KeyExpressions</h3>

        {Object.keys(keysExp_unhandled).length === 0 && <p>No unmanaged KeyExpressions</p>}

        {Object.keys(keysExp_unhandled).map(topic => {
          return (
            <Paper key={"random_sfljnrg" + topic} sx={{ padding: "0.5rem", margin: "0.5rem" }}>
              <b> KeyExpression: {topic} </b>
              <br />
              Time last received: {keysExp_unhandled[topic]?.time_received.toLocaleString("sv-SV")}
              <br />
              Time message encoded: {keysExp_unhandled[topic]?.time_encoded.toLocaleString("sv-SV")}
              <br />
              Message count: {keysExp_unhandled[topic]?.count}
            </Paper>
          )
        })}
      </Grid>
    </Grid>
  )
}
