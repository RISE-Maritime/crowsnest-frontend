import {
  IconButton,
  Stack,
  Typography,
  Box,
  Chip,
  ButtonGroup,
  Button,
  OutlinedInput,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material"

import basemaps from "./baseMaps.json"
import React from "react"
import { useTheme } from "@mui/material/styles"
import ZoomOutIcon from "@mui/icons-material/ZoomOut"
import ZoomInIcon from "@mui/icons-material/ZoomIn"
import {
  atomMapState,
  atomChartSettings,
  atomLayersTaggable,
  atomLayersShowing,
  atomSensorLayersShowing,
  atomSensorLayersTaggable,
} from "./Chart"
import { useRecoilState, useRecoilValue } from "recoil"
import { OS_POSITIONS, OS_POSITION_SETTING } from "../../../recoil/atoms"
import RadarRangeChange from "./RadarRangeChange"
import RadarOSRangeChange from "./RadarOSRangeChange"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(layersTaggable, name, theme) {
  return {
    fontWeight: layersTaggable.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  }
}

const BasemapSelector = () => {
  const [chartSettings, setChartSettings] = useRecoilState(atomChartSettings)
  return (
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
  )
}

export default function ChartControls() {
  const [mapState, setMapState] = useRecoilState(atomMapState)
  const [chartSettings, setChartSettings] = useRecoilState(atomChartSettings)
  const layersTaggable = useRecoilValue(atomLayersTaggable)
  const [layersShowing, setLayersShowing] = useRecoilState(atomLayersShowing)
  const sensorLayersTaggable = useRecoilValue(atomSensorLayersTaggable)
  const [sensorLayersShowing, setSensorLayersShowing] = useRecoilState(atomSensorLayersShowing)
  const osPos = useRecoilValue(OS_POSITIONS)
  const osPosSetting = useRecoilValue(OS_POSITION_SETTING)

  // Get the name of the default basemap

  const zoomOut = () => {
    setMapState({
      ...mapState,
      zoom: mapState.zoom - 1,
    })
  }

  const zoomIn = () => {
    setMapState({
      ...mapState,
      zoom: mapState.zoom + 1,
    })
  }

  const setNorthUp = () => {
    setMapState({
      ...mapState,
      bearing: 0,
    })
  }

  const setHeadUp = () => {
    setMapState({
      ...mapState,
      bearing: 0,
    })
  }

  const setFreeUp = () => {
    setMapState({
      ...mapState,
      bearing: 0,
    })
  }

  const set2D = () => {
    setMapState({
      ...mapState,
      pitch: 0,
    })
  }

  const set3D = () => {
    setMapState({
      ...mapState,
      pitch: 75,
    })
  }

  const theme = useTheme()

  const handleChange = event => {
    const {
      target: { value },
    } = event
    setLayersShowing(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }

  const handleChangeSensorLayer = event => {
    const {
      target: { value },
    } = event
    setSensorLayersShowing(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }

  const setOsPosChartCenter = () => {
    setMapState({
      ...mapState,
      latitude: osPos[osPosSetting.source].latitude,
      longitude: osPos[osPosSetting.source].longitude,
    })
    setChartSettings({
      ...chartSettings,
      chartFix: "OS",
    })
  }

  const setOsPosChartManual = () => {
    setChartSettings({
      ...chartSettings,
      chartFix: "MANUAL",
    })
  }

  return (
    <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
      <Button onClick={setOsPosChartCenter} variant={chartSettings.chartFix === "OS" ? "contained" : "outlined"}>
        Center OS
      </Button>
      <Button onClick={setOsPosChartManual} variant={chartSettings.chartFix === "MANUAL" ? "contained" : "outlined"}>
        Manual
      </Button>

      <IconButton onClick={zoomOut}>
        <ZoomOutIcon />
      </IconButton>
      <Typography variant="subtitle1"> {mapState.zoom.toFixed(1)} </Typography>
      <IconButton onClick={zoomIn}>
        <ZoomInIcon />
      </IconButton>

      <ButtonGroup variant="outlined" aria-label="outlined button group" size="small">
        <Button onClick={setNorthUp}>N-UP</Button>
        <Button onClick={setHeadUp}>H-UP</Button>
        <Button onClick={setFreeUp}>FREE</Button>
      </ButtonGroup>

      <ButtonGroup variant="outlined" aria-label="outlined button group" size="small">
        <Button onClick={set2D}>2D</Button>
        <Button onClick={set3D}>3D</Button>
      </ButtonGroup>

      <BasemapSelector />

      {/* SENSOR LAYERS SELECTOR */}
      <FormControl sx={{ width: 500 }} size="small">
        <InputLabel id="sensor-layer-chip-label">Sensor Layers</InputLabel>
        <Select
          labelId="sensor-layer-chip-label"
          id="sensor-layer-chip"
          multiple
          value={sensorLayersShowing}
          onChange={handleChangeSensorLayer}
          input={<OutlinedInput id="select-sensor-layer-chip" label="Chart Layers" />}
          renderValue={selected => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map(value => (
                <Chip key={value} label={value} size="small" />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {sensorLayersTaggable.map(name => (
            <MenuItem key={name} value={name} style={getStyles(sensorLayersTaggable, name, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Radar range shore radar */}
      <RadarRangeChange />
      <RadarOSRangeChange />
    </Stack>
  )
}
