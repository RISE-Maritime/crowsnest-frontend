import React from "react"
import { Box, Grid, Paper, Tabs, Tab, TabPanel } from "@mui/material"
import MapCursorInfo from "./MapCursorInfo"
import AisInfo from "./AisInfo"
import OsInfo from "./OsInfo"
import MonitorManager from "./MonitorManager"
import { useKeelsonData } from "../../../hooks/useKeelsonData"

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`-tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  )
}

export default function StatusSideBar({ data, identifier }) {
  // useCallback is necessary to prevent useKeelsonData to be re-creation of useKeelsonData
  // every time the component re-renders.
  const onMessage = React.useCallback(e => {
    console.log(`Message form useKeelsonData: `)
    console.log(e)
  }, [])
  useKeelsonData("rise/v0/boatswain/pubsub/flight_controller_telemetry_vfrhud/speedybee", "subscribe", onMessage)

  const [value, setValue] = React.useState("tab1")

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  console.log(value)

  return (
    <Grid container spacing={0.5} sx={{ height: "100%" }}>
      <Grid item xs={12}>
        <OsInfo data={data} identifier={identifier} />
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ height: "100%", minHeight: "50vh" }}>
          <Box sx={{ display: "flex", flexDirection: "column", height: "inherit" }}>
            <CustomTabPanel value={value} index={"tab1"}>
              <MonitorManager />
              <AisInfo />
              <MapCursorInfo />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={"tab2"}>
              Item Two
            </CustomTabPanel>
            <CustomTabPanel value={value} index={"tab3"}>
              Item Three
            </CustomTabPanel>

            <Tabs value={value} onChange={handleChange} sx={{ marginTop: "auto" }}>
              <Tab label="Item One" value={"tab1"} />
              <Tab label="Item Two" value={"tab2"} />
              <Tab label="Item Three" value={"tab3"} />
            </Tabs>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}
