import React from "react"
import PropTypes from "prop-types"
import { Grid, Stack } from "@mui/material"
// Icons
import CheckIcon from "@mui/icons-material/CheckCircle"
import CloseIcon from "@mui/icons-material/Cancel"

export default function ConnectionStatus({  isConnected }) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Stack direction={"row"} alignItems="flex-start" justifyContent="space-between">
          <Stack direction={"row"} alignItems="center">
            <h3 style={{marginRight: "0.5rem"}}>
              Is connected: 
            </h3>

            {isConnected ? (
              <CheckIcon sx={{ fontSize: "2rem", color: "#2eb847" }} />
            ) : (
              <CloseIcon sx={{ fontSize: "2rem", color: "#9d1b1b" }} />
            )}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  )
}

ConnectionStatus.propTypes = {
  connectionName: PropTypes.string.isRequired,
  isConnected: PropTypes.bool,
}
