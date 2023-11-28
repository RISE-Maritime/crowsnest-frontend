import React, { useEffect } from "react"
import { calcPosFromBearingDistance } from "../../../utils"
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import {
  lidarObservationAtom,
  targetsAIS,
  OS_POSITIONS,
  OS_POSITION_SETTING,
  OS_HEADING,
  OS_HEADING_SETTING,
  AtomShoreRadarObservation,
  AtomShoreRadar_1,
  OS_RADAR_0,
  OS_RADAR_1,
  OS_RADAR_0_SWEEP,
  OS_RADAR_1_SWEEP,
  AtomShoreRadarSetting,
  AtomOSRadarSetting,
} from "../../../recoil/atoms"

import { HeatmapLayer } from "@deck.gl/aggregation-layers"
import VesselContourLayer from "../../../base-elements/custom-deckgl-layers/vessel-contour-layer"
import { PointCloudLayer } from "@deck.gl/layers"
import { COORDINATE_SYSTEM } from "@deck.gl/core"
import { BitmapLayer, IconLayer, LineLayer, ScatterplotLayer } from "@deck.gl/layers"
import { TileLayer } from "@deck.gl/geo-layers"
import PicOwnShipBlack from "../../../resources/chart_symbols/own_ship_black.png"

import DeckGL from "@deck.gl/react"
import ReactMapGl from "react-map-gl/maplibre"

import basemaps from "./baseMaps.json"

// Atoms
export const vesselTargetsAtom = atom({
  key: "vessel_targets",
  default: {},
})

export const clickInfoAtom = atom({
  key: "click_info_atom",
  default: {},
})

export const mapCursorPosAtom = atom({
  key: "map_cursor_pos_atom",
  default: {
    latitude: 0,
    longitude: 0,
    onMap: false,
  },
})

export const atomMapState = atom({
  key: "atom_map_state",
  default: {
    zoom: 10,
    pitch: 6,
    maxZoom: 24,
    maxPitch: 85,
    altitude: 1.5,
    bearing: 0,
    // height: 891,
    latitude: 58.0,
    longitude: 12.01,
    // normalize: true,
    // width: 1397,
    chartFix: "OS", // Chart view position behavior
  },
})

export const atomChartSettings = atom({
  key: "atom_chart_settings",
  default: {
    chartFix: "OS",
    basemap: "riseSeaChart",
  },
})

export const atomLayersTaggable = atom({
  key: "atom_layers_taggable",
  default: ["NO MAP", "ENIRO", "Street map", "Satellite", "Dark", "Sea Marks"],
})

export const atomLayersShowing = atom({
  key: "atom_layers_showing",
  default: ["ENIRO"],
})

export const atomSensorLayersTaggable = atom({
  key: "atom_sensor_layers_taggable",
  default: [
    "AIS",
    "OS Radar-0 Point", // Done , no cut off
    "OS Radar-1 Point",
    "OS Radar-0 Heatmap",
    "OS Radar-1 Heatmap",
    "OS Radar-0 Heatmap (HEAD-UP)",
    "OS Radar-1 Heatmap (HEAD-UP)",

    "Shore Radar-0 Heatmap",
    "Shore Radar-1 Heatmap",
    "Shore Radar-0 Scatter",
    "Shore Radar-1 Scatter",

    "OS LIDAR 3D-point",
  ],
})

export const atomSensorLayersShowing = atom({
  key: "atom_sensor_layers_showing",
  default: ["AIS", "OS Radar-0 Heatmap", "OS Radar-1 Heatmap", "Shore Radar-0 Heatmap", "Shore Radar-1 Heatmap"],
})

function getTooltip({ object }) {
  // console.log(object)

  return (
    object &&
    `\
    MMSI: ${object.mmsi}
    Name: ${object.shipname}
    HDG: ${object.heading}
    COG: ${object.course}
    SOG: ${object.speed}
    ROT: ${object.turn}
    Destination: ${object.destination}
    Status: ${object.status}`
  )
}
// Use HTTP only when hosted locally, otherwise use HTTPS
const protocol = window.location.hostname === "localhost" ? "http://" : "https://"

// Get the URL corresponding to the charts of scale 4000
const chart4000 = protocol + window.location.hostname + "/tiles/styles/chart_4000/style.json"

const eniroSeaChart = {
  version: 8,
  sources: {
    eniroNautical: {
      type: "raster",
      scheme: "tms",
      tiles: ["http://map.eniro.com/geowebcache/service/tms1.0.0/nautical/{z}/{x}/{y}.png"],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: "eniroNautical-layer",
      type: "raster",
      source: "eniroNautical",
      minzoom: 0,
      maxzoom: 22,
    },
  ],
}

const darkMap = {
  version: 8,
  name: "Dark Map",
  sources: {
    rasterSource: {
      type: "raster",
      tiles: ["https://abcde.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: "rasterLayer",
      type: "raster",
      source: "rasterSource",
      paint: {
        "raster-opacity": 1,
        "raster-fade-duration": 0,
      },
    },
  ],
}

const openStreetMap = {
  version: 8,
  name: "Open Street Map",
  sources: {
    rasterSource: {
      type: "raster",
      tiles: ["https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: "rasterLayer",
      type: "raster",
      source: "rasterSource",
      paint: {
        "raster-opacity": 1,
        "raster-fade-duration": 0,
      },
    },
  ],
}

const satelliteImages = {
  version: 8,
  name: "Open Street Map",
  sources: {
    rasterSource: {
      type: "raster",
      tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: "rasterLayer",
      type: "raster",
      source: "rasterSource",
      paint: {
        "raster-opacity": 1,
        "raster-fade-duration": 0,
      },
    },
  ],
}

export default function Chart() {
  const chartSettings = useRecoilValue(atomChartSettings)

  React.useEffect(() => {}, [])

  const INITIAL_VIEW_STATE = {
    longitude: 11.97,
    latitude: 57.70887,
    zoom: 10,
    pitch: 0,
    bearing: 0,
  }

  return (
    <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={{ dragPan: "dragging" }}>
      <ReactMapGl mapStyle={basemaps[chartSettings.basemap]} />
    </DeckGL>
  )
}
