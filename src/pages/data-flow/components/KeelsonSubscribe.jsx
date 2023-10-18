import React from "react"
import PropTypes from "prop-types"
import { Grid, Typography, Stack } from "@mui/material"
// Icons
import CheckIcon from "@mui/icons-material/CheckCircle"
import CloseIcon from "@mui/icons-material/Cancel"
import ConnKeelson from "./ConnKeelson"

export default function KeelsonSubscribe({ connectionName, isConnected }) {
  return (
    <Grid container>
      {/* Connection state indicator and Broker Login */}
   
      <Grid item xs={12}>
        <Stack direction={"column"} alignItems="center" justifyContent="space-between">
          <Stack direction={"row"} alignItems="center">
            <Typography variant="h4" sx={{ marginRight: "1rem" }}>
              {connectionName}
            </Typography>

            {isConnected ? (
              <CheckIcon sx={{ fontSize: "2rem", color: "#2eb847" }} />
            ) : (
              <CloseIcon sx={{ fontSize: "2rem", color: "#9d1b1b" }} />
            )}
          </Stack>

          <ConnKeelson />
        </Stack>
      </Grid>
    </Grid>
  )
}

KeelsonSubscribe.propTypes = {
  connectionName: PropTypes.string.isRequired,
  isConnected: PropTypes.bool,
}
