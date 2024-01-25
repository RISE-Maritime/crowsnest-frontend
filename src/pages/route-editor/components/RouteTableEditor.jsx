import React from "react"
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
import { useTheme } from "@mui/material/styles"
import ZoomOutIcon from "@mui/icons-material/ZoomOut"
import ZoomInIcon from "@mui/icons-material/ZoomIn"
import { atomMapState, atomLayersTaggable, atomLayersShowing } from "./SeaChart"
import { useRecoilState, useRecoilValue } from "recoil"
import Grid from "@mui/material/Unstable_Grid2"
import TableRoute from "./TableRoute"

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

export default function RouteTableEditor() {
  const theme = useTheme()
  const [mapState, setMapState] = useRecoilState(atomMapState)
  const layersTaggable = useRecoilValue(atomLayersTaggable)
  const [layersShowing, setLayersShowing] = useRecoilState(atomLayersShowing)

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

  const handleChange = event => {
    const {
      target: { value },
    } = event
    setLayersShowing(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }

  return (
    <Grid container sx={{ marginTop: "0.3rem" }}>
      {/* Map controls */}
      <Grid xs={12} md={6} lg={4} xl={3}>
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
          <IconButton onClick={zoomOut}>
            <ZoomOutIcon />
          </IconButton>
          <Typography variant="subtitle1"> {mapState.zoom.toFixed(1)} </Typography>
          <IconButton onClick={zoomIn}>
            <ZoomInIcon />
          </IconButton>

          <ButtonGroup variant="outlined" aria-label="outlined button group" size="small">
            <Button onClick={setNorthUp} sx={{ width: "4rem" }}>
              N-UP
            </Button>
          </ButtonGroup>

          <ButtonGroup variant="outlined" aria-label="outlined button group" size="small">
            <Button onClick={set2D}>2D</Button>
            <Button onClick={set3D}>3D</Button>
          </ButtonGroup>

          {/* MAP TILES SELECT */}
          <FormControl sx={{ minWidth: 250 }}>
            <InputLabel id="demo-multiple-chip-label">Chart Layers</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              size="small"
              sx={{ height: "2rem" }}
              value={layersShowing}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chart Layers" size="small" />}
              renderValue={selected => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.2 }}>
                  {selected.map(value => (
                    <Chip key={value} label={value} sx={{ height: "1.2rem", marginTop: "0.2rem" }} size="small" />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {layersTaggable.map(name => (
                <MenuItem key={name} value={name} style={getStyles(layersTaggable, name, theme)}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Grid>

      <Grid xs={12}>
        <TableRoute />
      </Grid>
    </Grid>
  )
}
