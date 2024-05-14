import React from "react"

import CamControllerFrame from "./components/CamControllerFrame"
import CamControllerWebRTC from "./components/CamControllerWebRTC"
import { Grid, Paper, Stack, Tab, Box, Tabs } from "@mui/material"
import ControlMetadataTelemetry from "./components/TelemetryController"
import LidarController from "./components/LidarController"

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function CameraArray() {
  const [tabValue, setTabValue] = React.useState("webrtc")

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper sx={{ padding: "0.5rem", margin: "0.5rem" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="lab API tabs example">
              <Tab label="WebRTC" value="webrtc" />
              <Tab label="Frames" value="frames" />
            </Tabs>
          </Box>
          <CustomTabPanel value={tabValue} index={"webrtc"}>
            <Stack direction="row">
              <CamControllerWebRTC defaultSelected={"axis-1"} />
              <CamControllerWebRTC defaultSelected={"axis-3"} />
              <CamControllerWebRTC defaultSelected={"axis-4"} />
              <CamControllerWebRTC defaultSelected={"axis-2"} />
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={"frames"}>
            <Stack direction="row">
              <CamControllerFrame defaultSelected={"axis-1"} />
              <CamControllerFrame defaultSelected={"axis-3"} />
              <CamControllerFrame defaultSelected={"axis-4"} />
              <CamControllerFrame defaultSelected={"axis-2"} />
            </Stack>
          </CustomTabPanel>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper sx={{ padding: "0.5rem", margin: "0.5rem", height: "100%" }}>
          <LidarController />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper sx={{ padding: "0.5rem", margin: "0.5rem", height: "100%" }}>
          <ControlMetadataTelemetry />
        </Paper>
      </Grid>
    </Grid>
  )
}
