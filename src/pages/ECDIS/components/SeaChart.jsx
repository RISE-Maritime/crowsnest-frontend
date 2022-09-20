import React from "react"
import { atom, useRecoilValue, useSetRecoilState } from "recoil"
import { lidarObservationAtom, targetsAIS, radarObservationAtom, OS_POSITIONS, OS_POSITION_SETTING } from "../../../recoil/atoms"
import "mapbox-gl/dist/mapbox-gl.css"
import { Map } from "react-map-gl"
import { HeatmapLayer, HexagonLayer } from "@deck.gl/aggregation-layers"
import DeckGL from "@deck.gl/react"
import VesselContourLayer from "../../../base-elements/custom-deckgl-layers/vessel-contour-layer"
import { PointCloudLayer } from "@deck.gl/layers"
import { COORDINATE_SYSTEM } from "@deck.gl/core"
import { BitmapLayer, IconLayer, ScatterplotLayer } from "@deck.gl/layers"
import { TileLayer } from "@deck.gl/geo-layers"
import PicOwnShipBlack from "../../../resources/chart_symbols/own_ship_black.png"

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

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoieXlkZGVldHQiLCJhIjoiY2t0eGEyNjJhMWI0NjJxcW53dGNrMmk2eSJ9.6bkGb4cvC5pbb8sisIScSw"

export default function SeaChart() {
  const setClickInfo = useSetRecoilState(clickInfoAtom)
  const setMapCursorPos = useSetRecoilState(mapCursorPosAtom)

  const os_pos = useRecoilValue(OS_POSITIONS)
  const os_pos_setting = useRecoilValue(OS_POSITION_SETTING)

  const AIStargets = useRecoilValue(targetsAIS)
  const radarFrames = useRecoilValue(radarObservationAtom)
  const lidarObservations = useRecoilValue(lidarObservationAtom)

  // State of the map
  const [viewstate, setViewState] = React.useState({
    latitude: os_pos[os_pos_setting.source].latitude,
    longitude: os_pos[os_pos_setting.source].longitude,
    zoom: 13,
    pitch: 0,
    maxZoom: 24,
    maxPitch: 80,
  })

  const layers = [
    // SEA CHART
    new TileLayer({
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

    // OWN SHIP symbol
    new IconLayer({
      id: "icon-layer",
      data: [{ pos: [os_pos[os_pos_setting.source].longitude, os_pos[os_pos_setting.source].latitude] }],
      pickable: false,
      billboard: false,
      getIcon: d => {
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
      getSize: d => 5,
    }),

    // AIS targets
    new VesselContourLayer({
      id: "vessel-contour-layer",
      data: AIStargets,
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
        console.log(info.object)
        setClickInfo({
          layer: "ais",
          object: info.object,
        })
      },
    }),

    new PointCloudLayer({
      id: "radar-point-cloud-layer",
      data: radarFrames,
      pickable: false,
      coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
      coordinateOrigin: [os_pos[os_pos_setting.source].longitude, os_pos[os_pos_setting.source].latitude], //Longitude, latitude
      sizeUnits: "meters",
      pointSize: 3,
      getPosition: d => d.point,
      // getNormal: d => d.normal,
      getColor: d => [15, 117, 17, d.weight],
      visible: false,
    }),

    // new HexagonLayer({
    //   id: "hexagon-layer",
    //   data: radarFrames,
    //   pickable: true,
    //   coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
    //   coordinateOrigin: [os_pos.longitude, os_pos.latitude],
    //   extruded: true,
    //   radius: 3,
    //   elevationScale: 1,
    //   elevationRange: [0, 20],
    //   getPosition: d => d.point,
    //   getColorWeight: d => d.weight,
    //   getElevationWeight: d => d.weight,
    //   colorAggregation: "MEAN",
    //   elevationAggregation: "SUM",
    //   visible: false,
    // }),

    new HeatmapLayer({
      id: "radar-heatmapLayer",
      data: radarFrames,
      coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
      coordinateOrigin: [os_pos[os_pos_setting.source].longitude, os_pos[os_pos_setting.source].latitude],
      getPosition: d => d.point,
      getWeight: d => d.weight,
      aggregation: "MEAN", // SUM or MEAN
      weightsTextureSize: 2048, //  default 2048 Smaller texture sizes lead to visible pixelation.
      threshold: 0.0001,
      radiusPixels: viewstate.zoom * 1.5,
      intensity: 1, // (viewstate.zoom * 30) / 1,
      visible: true,
      opacity: 1,
    }),

    // This one
    new ScatterplotLayer({
      id: "radar-scatterplot-layer",
      data: radarFrames,
      coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
      coordinateOrigin: [os_pos[os_pos_setting.source].longitude, os_pos[os_pos_setting.source].latitude],
      pickable: true,
      billboard: false,
      opacity: 0.5,
      stroked: false,
      filled: true,
      radiusScale: 1,
      radiusMinPixels: 0,
      radiusMaxPixels: 100,
      // lineWidthMinPixels: 1,
      getPosition: d => d.point,
      getRadius: d => d.distance / 11,
      getFillColor: d => [255, 140, 0, d.weight],
      getLineColor: d => [0, 0, 0],
      visible: false,
    }),

    new PointCloudLayer({
      id: "lidar-point-cloud-layer",
      data: lidarObservations,
      pickable: false,
      coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
      coordinateOrigin: [os_pos[os_pos_setting.source].longitude, os_pos[os_pos_setting.source].latitude],
      pointSize: 4,
      getPosition: d => d,
      // getNormal: d => d.normal,
      // getColor: d => d.color
    }),
  ]

  const changeViewState = e => {
    setViewState(e.viewState)
  }

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
      viewState={viewstate}
      onViewStateChange={e => changeViewState(e)}
      onHover={e => hoverMapCursor(e)}
      controller={{ dragPan: true, doubleClickZoom: false }}
      getTooltip={getTooltip}
      getCursor={() => "crosshair"}
    >
      <Map mapboxAccessToken={MAPBOX_ACCESS_TOKEN} mapStyle="mapbox://styles/mapbox/streets-v9" />
    </DeckGL>
  )
}
