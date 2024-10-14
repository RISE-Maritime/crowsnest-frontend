import { Stack, InputLabel, FormControl, Select, MenuItem, Container } from "@mui/material"
import basemaps from "./baseMaps.json"
import React from "react"
import ZoomOutIcon from "@mui/icons-material/ZoomOut"
import ZoomInIcon from "@mui/icons-material/ZoomIn"
import { atomChartSettings } from "./Chart"
import { useRecoilState } from "recoil"
import { ObcIconButton as IconButton } from "@oicl/openbridge-webcomponents-react/components/icon-button/icon-button"
import { ObcButton as Button } from "@oicl/openbridge-webcomponents-react/components/button/button"

export default function ChartControls() {
  const [chartSettings, setChartSettings] = useRecoilState(atomChartSettings)

  return (
    <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", padding: "10px" }}>
      <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
        {/* Zoom selector */}
        <Stack direction="row" px={1}>
          <IconButton
            onClick={() => {
              setChartSettings({ ...chartSettings, zoom: chartSettings.zoom - 1 })
            }}
            cornerLeft={true}
          >
            <ZoomOutIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setChartSettings({ ...chartSettings, zoom: chartSettings.zoom + 1 })
            }}
            cornerRight={true}
          >
            <ZoomInIcon />
          </IconButton>
        </Stack>

        {/* Chart fix */}
        <Stack direction="row" px={1}>
          <Button
            variant="check"
            checked={chartSettings.centerFix === "free" ? true : false}
            onClick={() => {
              setChartSettings({ ...chartSettings, centerFix: "free" })
            }}
          >
            FREE
          </Button>
          <Button
            variant="check"
            checked={chartSettings.centerFix === "OS" ? true : false}
            onClick={() => {
              setChartSettings({ ...chartSettings, centerFix: "OS" })
            }}
            cornerRight={true}
          >
            OS
          </Button>
        </Stack>

        {/* Chart Orientation */}
        <Stack direction="row" px={1}>
          <Button
            variant="check"
            checked={chartSettings.visualisation === "2D" ? true : false}
            onClick={() => {
              setChartSettings({ ...chartSettings, visualisation: "2D" })
            }}
          >
            2D
          </Button>
          <Button
            variant="check"
            checked={chartSettings.visualisation === "3D" ? true : false}
            onClick={() => {
              setChartSettings({ ...chartSettings, visualisation: "3D" })
            }}
          >
            3D
          </Button>
        </Stack>

        {/* Chart Orientation */}
        <Stack direction="row" px={1}>
          <Button
            variant="check"
            checked={chartSettings.verticalFix === "northUp" ? true : false}
            onClick={() => {
              setChartSettings({ ...chartSettings, verticalFix: "northUp" })
            }}
            style={{ whiteSpace: "nowrap" }}
          >
            N-UP
          </Button>
          <Button
            variant="check"
            checked={chartSettings.verticalFix === "headingUp" ? true : false}
            onClick={() => {
              setChartSettings({ ...chartSettings, verticalFix: "headingUp" })
            }}
            style={{ whiteSpace: "nowrap" }}
          >
            H-UP
          </Button>
          <Button
            variant="check"
            checked={chartSettings.verticalFix === "free" ? true : false}
            onClick={() => {
              setChartSettings({ ...chartSettings, verticalFix: "free" })
            }}
          >
            FREE
          </Button>
        </Stack>

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
