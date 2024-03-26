import React from "react"
import PropTypes from "prop-types"
import { Grid,  Stack } from "@mui/material"
import CheckIcon from "@mui/icons-material/CheckCircle"
import CloseIcon from "@mui/icons-material/Cancel"
import MqttRemoteBrokerLogin from "./ConnMqttBroker"

export default function ConnectionMQTT({   isConnected }) {
  return (
    <Grid container>
      {/* Connection state indicator and Broker Login */}
      <Grid item xs={12}>
        <Stack direction={"row"} alignItems="center" justifyContent="space-between" >
          <Stack direction={"row"} alignItems="center">
            <h2 style={{marginRight: "0.5rem"}}>Connected </h2>

            {isConnected ? (
              <CheckIcon sx={{ fontSize: "2rem", color: "#2eb847" }} />
            ) : (
              <CloseIcon sx={{ fontSize: "2rem", color: "#9d1b1b" }} />
            )}
          </Stack>

          <MqttRemoteBrokerLogin />
        </Stack>
      </Grid>
      
    </Grid>
  )
}

ConnectionMQTT.propTypes = {
  connectionName: PropTypes.string.isRequired,
  isConnected: PropTypes.bool,
}
