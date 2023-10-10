import React from "react"
import { Paper, Stack,Switch } from "@mui/material"
// Icons
import CheckIcon from "@mui/icons-material/CheckCircle"
import CloseIcon from "@mui/icons-material/Cancel"

export default function ConnectorCard({ connectionState, connectionName, iconSymbol }) {
  

 
  return (
    <Paper square={false} sx={{ padding: "1rem" }}>
      <Stack direction={"column"} alignItems="center">



        <h3> {connectionName}</h3>
        <div>
          {/* <SignalCellularAltIcon /> */}
          {iconSymbol}

          {connectionState ? (
            <CheckIcon sx={{ fontSize: "2rem", color: "#2eb847" }} />
          ) : (
            <CloseIcon sx={{ fontSize: "2rem", color: "#9d1b1b" }} />
          )}
        </div>

      
      </Stack>
    </Paper>
  )
}
