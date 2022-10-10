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
import React from "react"
import { useTheme } from "@mui/material/styles"
import ZoomOutIcon from "@mui/icons-material/ZoomOut"
import ZoomInIcon from "@mui/icons-material/ZoomIn"
import { atomMapState , atomLayersTaggable, atomLayersShowing} from "./SeaChart"
import { useRecoilState } from "recoil"

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


function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  }
}

export default function ChartControls() {
  const [mapState, setMapState] = useRecoilState(atomMapState)
  const [layersTaggable, setLayersTaggable] = useRecoilState(atomLayersTaggable)
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
  const [personName, setPersonName] = React.useState([])

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
    <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1} sx={{height: "75px"}}>
      <IconButton>
        <ZoomOutIcon onClick={zoomOut} />
      </IconButton>
      <Typography variant="subtitle1"> {mapState.zoom.toFixed(1)} </Typography>
      <IconButton>
        <ZoomInIcon onClick={zoomIn} />
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

      {/* MAP TILES SELECT */}
      <FormControl sx={{ m: 1, width: 300 }} size="small">
        <InputLabel id="demo-multiple-chip-label">Chart Layers</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={layersShowing}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chart Layers" />}
          renderValue={selected => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map(value => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {layersTaggable.map(name => (
            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}
