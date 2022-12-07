import React from "react"
import PropTypes from "prop-types"
import { Grid, Stack, Typography } from "@mui/material"
// Icons
import CheckIcon from "@mui/icons-material/CheckCircle"
import CloseIcon from "@mui/icons-material/Cancel"

export default function ConnectionStatus({ connectionName, isConnected }) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Stack direction={"row"} alignItems="flex-start" justifyContent="space-between">
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
        </Stack>
      </Grid>
    </Grid>
  )
}

ConnectionStatus.propTypes = {
  connectionName: PropTypes.string.isRequired,
  isConnected: PropTypes.bool,
}
