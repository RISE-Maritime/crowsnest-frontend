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
import DeckGL from "@deck.gl/react"
import VesselContourLayer from "../../../base-elements/custom-deckgl-layers/vessel-contour-layer"
import { PointCloudLayer } from "@deck.gl/layers"
import { COORDINATE_SYSTEM } from "@deck.gl/core"
import { BitmapLayer, IconLayer, LineLayer, ScatterplotLayer } from "@deck.gl/layers"
import { TileLayer } from "@deck.gl/geo-layers"
import PicOwnShipBlack from "../../../resources/chart_symbols/own_ship_black.png"
import "mapbox-gl/dist/mapbox-gl.css"

import chartStyle from "./chart_4000.json"

import ReactMapGl from "react-map-gl/maplibre"

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

export const atomMapSetting = atom({
  key: "atom_map_setting",
  default: {
    chartFix: "OS",
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
  default: ["AIS", "OS Radar-0 Heatmap", "OS Radar-1 Heatmap",  "OS LIDAR 3D-point"],
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

const eniro = {
  version: 8,
  sources: {
    "raster-tiles": {
      type: "raster",
      tiles: ["http: //map.eniro.com/geowebcache/service/tms1.0.0/nautical/{z}/{x}/{y}.png"],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: "osm-tiles",
      type: "raster",
      source: "raster-tiles",
      minzoom: 0,
      maxzoom: 19,
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

const satellite = {
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

export default function SeaChart() {
  // Viewport settings
  const INITIAL_VIEW_STATE = {
    longitude: 11.97,
    latitude: 57.70887,
    zoom: 10,
    pitch: 0,
    bearing: 0,
  }

  return (
    <div id="map-wrapper">
      <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={{ dragPan: "dragging" }}>
        <ReactMapGl mapStyle={eniro} />
      </DeckGL>
    </div>
  )
}

function SeaChartOLD() {
  const setClickInfo = useSetRecoilState(clickInfoAtom)
  const setMapCursorPos = useSetRecoilState(mapCursorPosAtom)
  const [mapState, setMapState] = useRecoilState(atomMapState)
  const [mapSetting, setMapSetting] = useRecoilState(atomMapSetting)
  const layersShowing = useRecoilValue(atomLayersShowing)
  const sensorLayerShowing = useRecoilValue(atomSensorLayersShowing)

  const os_pos = useRecoilValue(OS_POSITIONS)
  const os_pos_setting = useRecoilValue(OS_POSITION_SETTING)
  const os_heading = useRecoilValue(OS_HEADING)
  const os_heading_setting = useRecoilValue(OS_HEADING_SETTING)

  const AIStargets = useRecoilValue(targetsAIS)
  const radarFrames_0 = useRecoilValue(OS_RADAR_0)
  const radarFrames_1 = useRecoilValue(OS_RADAR_1)
  const radarFrames_0_sweep = useRecoilValue(OS_RADAR_0_SWEEP)
  const radarFrames_1_sweep = useRecoilValue(OS_RADAR_1_SWEEP)
  const shoreRadarFrames = useRecoilValue(AtomShoreRadarObservation)
  const shoreRadarFrames_1 = useRecoilValue(AtomShoreRadar_1)
  const shoreRadarSetting = useRecoilValue(AtomShoreRadarSetting)
  const OSRadarSetting = useRecoilValue(AtomOSRadarSetting)

  const lidarObservations = useRecoilValue(lidarObservationAtom)

  // Viewport settings
  const INITIAL_VIEW_STATE = {
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  }

  useEffect(() => {
    if (mapSetting.chartFix === "OS") {
      setMapState({
        ...mapState,
        latitude: os_pos[os_pos_setting.source].latitude,
        longitude: os_pos[os_pos_setting.source].longitude,
      })
    }
  }, [os_pos[os_pos_setting.source].latitude])

  const changeViewState = e => {
    setMapState({
      ...e.viewState,
    })
    setMapSetting({
      ...mapSetting,
      chartFix: "MANUAL",
    })
  }

  const layers = [
    // SEA CHART ENIRO
    new TileLayer({
      id: "tail-layer-enior",
      visible: layersShowing.includes("ENIRO"),
      data: "http://map.eniro.com/geowebcache/service/tms1.0.0/nautical/{z}/{x}/{-y}.png",
      minZoom: 0,
      maxZoom: 19,
      tileSize: 256,

      renderSubLayers: props => {
        const {
          bbox: { west, south, east, north },
        } = props.tile

        return new BitmapLayer(props, {
          data: null,
          image: props.data,
          bounds: [west, south, east, north],
        })
      },
    }),

    // Open street map
    new TileLayer({
      id: "tail-layer-open-street-map",
      visible: layersShowing.includes("Street map"),

      data: "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",

      minZoom: 0,
      maxZoom: 19,
      tileSize: 256,

      renderSubLayers: props => {
        const {
          bbox: { west, south, east, north },
        } = props.tile

        return new BitmapLayer(props, {
          data: null,
          image: props.data,
          bounds: [west, south, east, north],
        })
      },
    }),

    // Satellite map
    new TileLayer({
      id: "tail-layer-satellite",
      visible: layersShowing.includes("Satellite"),

      data: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",

      minZoom: 0,
      maxZoom: 19,
      tileSize: 256,

      renderSubLayers: props => {
        const {
          bbox: { west, south, east, north },
        } = props.tile

        return new BitmapLayer(props, {
          data: null,
          image: props.data,
          bounds: [west, south, east, north],
        })
      },
    }),

    // Dark Map
    new TileLayer({
      id: "tail-layer-dark",
      visible: layersShowing.includes("Dark"),
      data: "https://abcde.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      minZoom: 0,
      maxZoom: 19,
      tileSize: 256,

      renderSubLayers: props => {
        const {
          bbox: { west, south, east, north },
        } = props.tile

        return new BitmapLayer(props, {
          data: null,
          image: props.data,
          bounds: [west, south, east, north],
        })
      },
    }),

    // Open Sea Mark
    new TileLayer({
      id: "tail-layer-sea-marks",
      visible: layersShowing.includes("Sea Marks"),
      data: "https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png",
      minZoom: 0,
      maxZoom: 19,
      tileSize: 256,
      renderSubLayers: props => {
        const {
          bbox: { west, south, east, north },
        } = props.tile

        return new BitmapLayer(props, {
          data: null,
          image: props.data,
          bounds: [west, south, east, north],
        })
      },
    }),

    // AIS targets
    new VesselContourLayer({
      id: "vessel-contour-layer",
      data: AIStargets,
      visible: sensorLayerShowing.includes("AIS"),
      getCoordinates: d => [d.lon, d.lat],
      getLength: d => {
        if (d.to_bow) {
          return d.to_bow + d.to_stern
        }
        return 100
      },
      getBeam: d => {
        if (d.to_port) {
          return d.to_port + d.to_starboard
        }
        return 25
      },
      getHeading: d => (d.heading * Math.PI) / 180,
      getFillColor: () => [65, 210, 82, 250],
      pickable: true,
      onClick: info => {
        setClickInfo({
          layer: "ais",
          object: info.object,
        })
      },
    }),

    // OS LIDAR layer
    new PointCloudLayer({
      id: "os-lidar-point-cloud-layer",
      data: lidarObservations,
      visible: sensorLayerShowing.includes("OS LIDAR 3D-point"),
      pickable: false,
      coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
      coordinateOrigin: [os_pos[os_pos_setting.source].longitude, os_pos[os_pos_setting.source].latitude],
      pointSize: 3,
      getPosition: d => d,
      getNormal: () => [0, 0, 1],
      getColor: d => {
        // console.log(d[2]*100);
        return [d[2] * 100, 0, 0, 255]
      },
      getAngle: 45,
      opacity: 0.8,
    }),

    // OS Radar 1 point cloud (Under)
    new PointCloudLayer({
      id: "radar-1-point-cloud-layer",
      data: radarFrames_1,
      visible: sensorLayerShowing.includes("OS Radar-1 Point"),
      pickable: false,
      coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
      coordinateOrigin: [os_pos[os_pos_setting.source].longitude, os_pos[os_pos_setting.source].latitude], //Longitude, latitude
      sizeUnits: "meters",
      pointSize: 2,
      getPosition: d => {
        return d.distance <= OSRadarSetting.range_change ? null : d.point
      },
    }),

    // OS Radar 0 point cloud (Over)
    new PointCloudLayer({
      id: "radar-0-point-cloud-layer",
      data: radarFrames_0,
      visible: sensorLayerShowing.includes("OS Radar-0 Point"),
      pickable: false,
      coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
      coordinateOrigin: [os_pos[os_pos_setting.source].longitude, os_pos[os_pos_setting.source].latitude], //Longitude, latitude
      sizeUnits: "meters",
      pointSize: 2,
      getPosition: d => d.point,
    }),

    // OS Radar-1 heatmap
    new HeatmapLayer({
      id: "os-radar-1-heatmapLayer-mean",
      data: radarFrames_1,
      visible: sensorLayerShowing.includes("OS Radar-1 Heatmap"),
      coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
      coordinateOrigin: [os_pos[os_pos_setting.source].longitude, os_pos[os_pos_setting.source].latitude],
      getPosition: d => {
        return d.distance <= OSRadarSetting.range_change ? null : d.point
      },
      getWeight: d => {
        return d.distance <= OSRadarSetting.range_change ? null : d.weight
      },
      aggregation: "MEAN", // SUM or MEAN
      weightsTextureSize: 2048, //  default 2048 Smaller texture sizes lead to visible pixelation.
      threshold: 0.0001,
      radiusPixels: mapState.zoom * 1.5,
      intensity: 1, // (viewstate.zoom * 30) / 1,
      opacity: 0.4,
      colorRange: [
        [25, 0, 0, 25],
        [85, 0, 0, 85],
        [127, 0, 0, 127],
        [170, 0, 0, 170],
        [190, 0, 0, 190],
        [255, 0, 0, 255],
      ],
    }),

    // OS Radar-1 heatmap
    new HeatmapLayer({
      id: "os-radar-1-heatmapLayer-sweep",
      data: radarFrames_1_sweep,
      visible: sensorLayerShowing.includes("OS Radar-1 Heatmap (HEAD-UP)"),
      coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
      coordinateOrigin: [os_pos[os_pos_setting.source].longitude, os_pos[os_pos_setting.source].latitude],
      getPosition: d => {
        return d.distance <= OSRadarSetting.range_change ? null : d.point
      },
      getWeight: d => {
        return d.distance <= OSRadarSetting.range_change ? null : d.weight
      },
      aggregation: "MEAN", // SUM or MEAN
      weightsTextureSize: 2048, //  default 2048 Smaller texture sizes lead to visible pixelation.
      threshold: 0.0001,
      radiusPixels: mapState.zoom * 1.5,
      intensity: 1, // (viewstate.zoom * 30) / 1,
      opacity: 0.4,
      colorRange: [
        [25, 0, 0, 25],
        [85, 0, 0, 85],
        [127, 0, 0, 127],
        [170, 0, 0, 170],
        [190, 0, 0, 190],
        [255, 0, 0, 255],
      ],
    }),

    // OS Radar-0 heatmap
    new HeatmapLayer({
      id: "os-radar-0-heatmapLayer",
      data: radarFrames_0,
      visible: sensorLayerShowing.includes("OS Radar-0 Heatmap"),
      coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
      coordinateOrigin: [os_pos[os_pos_setting.source].longitude, os_pos[os_pos_setting.source].latitude],
      getPosition: d => d.point, // SWEEP
      getWeight: d => d.weight,
      aggregation: "MEAN", // SUM or MEAN
      weightsTextureSize: 2048, //  default 2048 Smaller texture sizes lead to visible pixelation.
      threshold: 0.0001,
      radiusPixels: mapState.zoom * 1.5,
      intensity: 1, // (viewstate.zoom * 30) / 1,
      opacity: 0.3,
      colorRange: [
        [0, 25, 0, 25],
        [0, 85, 0, 85],
        [0, 127, 0, 127],
        [0, 170, 0, 170],
        [0, 190, 0, 190],
        [0, 255, 0, 255],
      ],
    }),
    // OS Radar-0 heatmap
    new HeatmapLayer({
      id: "os-radar-0-heatmapLayer-head-up",
      data: radarFrames_0_sweep,
      visible: sensorLayerShowing.includes("OS Radar-0 Heatmap (HEAD-UP)"),
      coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
      coordinateOrigin: [os_pos[os_pos_setting.source].longitude, os_pos[os_pos_setting.source].latitude],
      getPosition: d => d.point, // SWEEP
      getWeight: d => d.weight,
      aggregation: "MEAN", // SUM or MEAN
      weightsTextureSize: 2048, //  default 2048 Smaller texture sizes lead to visible pixelation.
      threshold: 0.0001,
      radiusPixels: mapState.zoom * 1.5,
      intensity: 1, // (viewstate.zoom * 30) / 1,
      opacity: 0.3,
      colorRange: [
        [212, 127, 209],
        [209, 61, 204],
        [209, 40, 203],
        [199, 2, 192],
      ],
    }),
    // Shore Radar-0 heatmap MEAN
    new HeatmapLayer({
      id: "shore-radar-0-heatmapLayer-mean",
      data: shoreRadarFrames,
      visible: sensorLayerShowing.includes("Shore Radar-0 Heatmap"),
      coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
      coordinateOrigin: [11.8861, 57.6855],
      getPosition: d => {
        return d.point
      },
      getWeight: d => d.weight,
      aggregation: "MEAN", // SUM or MEAN
      weightsTextureSize: 512, //  default 2048 Smaller texture sizes lead to visible pixelation.
      threshold: 0.1,
      radiusPixels: mapState.zoom * 2.5,
      intensity: 1, // (mapState.zoom * 30) / 1,
      opacity: 0.3,
      colorRange: [
        [0, 25, 0, 25],
        [0, 85, 0, 85],
        [0, 127, 0, 127],
        [0, 170, 0, 170],
        [0, 190, 0, 190],
        [0, 255, 0, 255],
      ],
    }),

    // Shore Radar-1 heatmap MEAN
    new HeatmapLayer({
      id: "shore-radar-1-heatmapLayer-mean",
      data: shoreRadarFrames_1,
      // visible: true,
      visible: sensorLayerShowing.includes("Shore Radar-1 Heatmap"),
      coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
      coordinateOrigin: [11.8861, 57.6855],
      // coordinateOrigin: [os_pos[os_pos_setting.source].longitude - 0.002, os_pos[os_pos_setting.source].latitude],
      getPosition: d => {
        return d.distance <= shoreRadarSetting.range_change ? null : d.point
      },
      getWeight: d => (d.distance <= shoreRadarSetting.range_change ? null : d.weight),
      aggregation: "MEAN", // SUM or MEAN
      weightsTextureSize: 512, //  default 2048 Smaller texture sizes lead to visible pixelation.
      threshold: 0.1,
      radiusPixels: mapState.zoom * 2.5,
      intensity: 1, // (mapState.zoom * 30) / 1,
      opacity: 0.4,
      colorRange: [
        [0, 25, 0, 25],
        [0, 85, 0, 85],
        [0, 127, 0, 127],
        [0, 170, 0, 170],
        [0, 190, 0, 190],
        [0, 255, 0, 255],
      ],
    }),

    // Shore Radar-0 scatter
    new ScatterplotLayer({
      id: "shore-radar-0-scatterplot-layer",
      data: shoreRadarFrames,
      visible: sensorLayerShowing.includes("Shore Radar-0 Scatter"),
      coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
      coordinateOrigin: [11.88666, 57.68577],
      opacity: 0.3,
      // stroked: true,
      filled: true,
      radiusScale: 1,
      radiusMinPixels: 1,
      radiusMaxPixels: 100,
      lineWidthMinPixels: 1,
      getPosition: d => d.point,
      getRadius: () => 5, //d.distance * 0.01,
      getFillColor: d => [186, 12, 0, d.weight],
      getLineColor: () => [0, 0, 0, 0],
    }),

    // Shore Radar-1 scatter
    new ScatterplotLayer({
      id: "shore-radar-1-scatterplot-layer",
      data: shoreRadarFrames_1,
      visible: sensorLayerShowing.includes("Shore Radar-1 Scatter"),
      coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
      coordinateOrigin: [11.88666, 57.68577],
      opacity: 0.3,
      // stroked: true,
      filled: true,
      radiusScale: 1,
      radiusMinPixels: 1,
      radiusMaxPixels: 100,
      lineWidthMinPixels: 1,
      getPosition: d => {
        return d.distance <= shoreRadarSetting.range_change ? null : d.point
      },
      getRadius: () => 5, //d.distance * 0.01,
      getFillColor: d => [186, 12, 0, d.weight],
      getLineColor: () => [0, 0, 0, 0],
    }),

    // OWN SHIP symbol
    new IconLayer({
      id: "icon-layer",
      data: [{ pos: [os_pos[os_pos_setting.source].longitude, os_pos[os_pos_setting.source].latitude] }],
      pickable: false,
      billboard: false,
      getIcon: () => {
        return {
          url: PicOwnShipBlack,
          width: 400,
          height: 400,
          anchorY: 200,
        }
      },
      sizeUnits: "common",
      sizeMinPixels: 10,
      sizeMaxPixels: 25,

      getPosition: d => d.pos,
      getSize: () => 5,
    }),

    new LineLayer({
      id: "heading-line-layer",
      visible: true,
      data: [
        {
          pos: [os_pos[os_pos_setting.source].longitude, os_pos[os_pos_setting.source].latitude],
          heading: os_heading[os_heading_setting.source].heading,
        },
      ],
      pickable: true,
      getWidth: 2,
      getSourcePosition: d => d.pos,
      getTargetPosition: d => calcPosFromBearingDistance(d.pos[1], d.pos[0], d.heading, 10, "km"),
      getColor: () => [0, 0, 0],
    }),
  ]

  const hoverMapCursor = e => {
    if (e.viewport === undefined) {
      setMapCursorPos({
        latitude: 0,
        longitude: 0,
        onMap: false,
      })
    } else if (Array.isArray(e.coordinate)) {
      setMapCursorPos({
        latitude: e.coordinate[1],
        longitude: e.coordinate[0],
        onMap: true,
      })
    }
  }

  return (
    <DeckGL
      layers={layers}
      //viewState={mapState}
      initialViewState={INITIAL_VIEW_STATE}
      onViewStateChange={e => changeViewState(e)}
      onHover={e => hoverMapCursor(e)}
      controller={{ dragPan: true, doubleClickZoom: false }}
      getTooltip={getTooltip}
      getCursor={() => "crosshair"}
    ></DeckGL>
  )
}




