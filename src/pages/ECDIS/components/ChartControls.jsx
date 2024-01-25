import { Stack, Typography, ButtonGroup, Button, InputLabel, FormControl, Select, MenuItem, Container } from "@mui/material"

import basemaps from "./baseMaps.json"
import React from "react"
//import { useTheme } from "@mui/material/styles"
import ZoomOutIcon from "@mui/icons-material/ZoomOut"
import ZoomInIcon from "@mui/icons-material/ZoomIn"
import { atomChartSettings } from "./Chart"
import { useRecoilState } from "recoil"

export default function ChartControls() {
  const [chartSettings, setChartSettings] = useRecoilState(atomChartSettings)

  //const theme = useTheme()

  return (
    <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", padding: "10px" }}>
      <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
        {/* Zoom selector */}
        <ButtonGroup size="small">
          <Button
            onClick={() => {
              setChartSettings({ ...chartSettings, zoom: chartSettings.zoom - 1 })
            }}
          >
            <ZoomOutIcon />
          </Button>
          <Button
            onClick={() => {
              setChartSettings({ ...chartSettings, zoom: chartSettings.zoom + 1 })
            }}
          >
            <ZoomInIcon />
          </Button>
        </ButtonGroup>

        {/* Chart fix */}
        <ButtonGroup size="small">
          <Button
            variant={chartSettings.centerFix == "free" ? "contained" : "outlined"}
            onClick={() => {
              setChartSettings({ ...chartSettings, centerFix: "free" })
            }}
          >
            <Typography>FREE</Typography>
          </Button>
          <Button
            variant={chartSettings.centerFix == "OS" ? "contained" : "outlined"}
            onClick={() => {
              setChartSettings({ ...chartSettings, centerFix: "OS" })
            }}
          >
            <Typography>OS</Typography>
          </Button>
        </ButtonGroup>

        {/* Chart Orientation */}
        <ButtonGroup size="small">
          <Button
            variant={chartSettings.visualisation == "2D" ? "contained" : "outlined"}
            onClick={() => {
              setChartSettings({ ...chartSettings, visualisation: "2D" })
            }}
          >
            2D
          </Button>
          <Button
            variant={chartSettings.visualisation == "3D" ? "contained" : "outlined"}
            onClick={() => {
              setChartSettings({ ...chartSettings, visualisation: "3D" })
            }}
          >
            3D
          </Button>
        </ButtonGroup>

        {/* Chart Orientation */}
        <ButtonGroup size="small">
          <Button
            variant={chartSettings.verticalFix == "northUp" ? "contained" : "outlined"}
            onClick={() => {
              setChartSettings({ ...chartSettings, verticalFix: "northUp" })
            }}
          >
            N-UP
          </Button>
          <Button
            variant={chartSettings.verticalFix == "headingUp" ? "contained" : "outlined"}
            onClick={() => {
              setChartSettings({ ...chartSettings, verticalFix: "headingUp" })
            }}
          >
            H-UP
          </Button>
          <Button
            variant={chartSettings.verticalFix == "free" ? "contained" : "outlined"}
            onClick={() => {
              setChartSettings({ ...chartSettings, verticalFix: "free" })
            }}
          >
            FREE
          </Button>
        </ButtonGroup>

        {/* BasemapSelector */}
        <FormControl sx={{ width: 300 }} size="small">
          <InputLabel id="basemap-select-label">Basemap</InputLabel>
          <Select
            labelId="basemap-select-label"
            id="basemap-select"
            value={chartSettings.basemap}
            onChange={event => {
              console.log(event.target.value)
              setChartSettings({ ...chartSettings, basemap: event.target.value })
            }}
          >
            {Object.entries(basemaps).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Container>
  )
}
