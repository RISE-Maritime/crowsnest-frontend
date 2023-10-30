import React, { useEffect, useState } from "react"
import { Grid, Box, Tab, Tabs, Typography } from "@mui/material"
import TabViewExperiments from "./components/TabViewExperiments"
import TabViewExperimentSliders from "./components/TabViewExperimentSliders"
import TabViewShaft from "./components/TabViewShaft"
import TabViewAzimuth from "./components/TabViewAzimuth"

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

export default function index() {
  const [tabValue, seTabValue] = useState("shaft")

  const handleTabChange = (event, newValue) => {
    seTabValue(newValue)
  }

  // If pressed key is our target key then set to true
  const downHandler = ({ key }) => {
    if (key === "g") {
      // setKeyPressed(true);
      console.log(key)
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    console.log(key)
    if (key === "h") {
      // setKeyPressed(false);
      console.log("HERE", key)
    }
  }

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler)
    window.addEventListener("keyup", upHandler)
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler)
      window.removeEventListener("keyup", upHandler)
    }
  }, [])

  return (
    <Grid container>
      <Grid item xs={12} sx={{ display: "grid", placeItems: "center" }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
              <Tab label="Shaft" value={"shaft"} />
              <Tab label="Azimuth" value={"azimuth"} />
              <Tab label="Experiment (New)" value={"new"} />
              <Tab label="Experiment (Sliders)" value={"sliders"} />
            </Tabs>
          </Box>
          <CustomTabPanel value={tabValue} index={"shaft"}>
            <TabViewShaft />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={"azimuth"}>
            <TabViewAzimuth />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={"new"}>
            <TabViewExperiments />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={"sliders"}>
            <TabViewExperimentSliders />
          </CustomTabPanel>
        </Box>
      </Grid>
    </Grid>
  )
}
