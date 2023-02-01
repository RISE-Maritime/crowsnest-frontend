import React, { useEffect } from "react"
import { calcPosFromBearingDistance } from "../../../utils"
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import {
  lidarObservationAtom,
  targetsAIS,
  radarObservationAtom,
  OS_POSITIONS,
  OS_POSITION_SETTING,
  OS_HEADING,
  OS_HEADING_SETTING,
  AtomShoreRadarObservation,
} from "../../../recoil/atoms"
// import "mapbox-gl/dist/mapbox-gl.css"
import { Map, StaticMap } from "react-map-gl"
import { HeatmapLayer } from "@deck.gl/aggregation-layers"
import DeckGL from "@deck.gl/react"
import VesselContourLayer from "../../../base-elements/custom-deckgl-layers/vessel-contour-layer"
import { PointCloudLayer } from "@deck.gl/layers"
import { COORDINATE_SYSTEM } from "@deck.gl/core"
import { BitmapLayer, IconLayer, LineLayer } from "@deck.gl/layers"
import { TileLayer } from "@deck.gl/geo-layers"
import PicOwnShipBlack from "../../../resources/chart_symbols/own_ship_black.png"
import { MapView, FirstPersonView } from "@deck.gl/core"
import 'mapbox-gl/dist/mapbox-gl.css';

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
  default: ["ENIRO", "Street map", "Satellite", "Dark", "Sea Marks"],
})

export const atomLayersShowing = atom({
  key: "atom_layers_showing",
  default: ["ENIRO"],
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


export default function SeaChart() {
  const setClickInfo = useSetRecoilState(clickInfoAtom)
  const setMapCursorPos = useSetRecoilState(mapCursorPosAtom)
  const [mapState, setMapState] = useRecoilState(atomMapState)
  const [mapSetting, setMapSetting] = useRecoilState(atomMapSetting)
  const layersShowing = useRecoilValue(atomLayersShowing)

  const os_pos = useRecoilValue(OS_POSITIONS)
  const os_pos_setting = useRecoilValue(OS_POSITION_SETTING)
  const os_heading = useRecoilValue(OS_HEADING)
  const os_heading_setting = useRecoilValue(OS_HEADING_SETTING)

  const AIStargets = useRecoilValue(targetsAIS)
  const radarFrames = useRecoilValue(radarObservationAtom)
  const shoreRadarFrames = useRecoilValue(AtomShoreRadarObservation)
  const lidarObservations = useRecoilValue(lidarObservationAtom)

  // // State of the map
  // const [viewstate, setViewState] = useState({
  //   latitude: os_pos[os_pos_setting.source].latitude,
  //   longitude: os_pos[os_pos_setting.source].longitude,
  //   zoom: 10,
  //   pitch: 0,
  //   maxZoom: 24,
  //   maxPitch: 85,
  // })

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

    // OS radar layer
    // new PointCloudLayer({
    //   id: "radar-point-cloud-layer",
    //   data: radarFrames,
    //   pickable: false,
    //   coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
    //   coordinateOrigin: [os_pos[os_pos_setting.source].longitude, os_pos[os_pos_setting.source].latitude], //Longitude, latitude
    //   sizeUnits: "meters",
    //   pointSize: 2,
    //   getPosition: d => d.point,
    //   // getNormal: d => d.normal,
    //   // getColor: d => [15, 117, 17, d.weight],
    //   visible: false,
    // }),

    // Shore radar / Landkrabban
    // new PointCloudLayer({
    //   id: "shore-radar-point",
    //   data: shoreRadarFrames,
    //   pickable: false,
    //   coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
    //   coordinateOrigin: [57.7, 11.94], //Longitude, latitude
    //   sizeUnits: "meters",
    //   pointSize: 2,
    //   getPosition: d => d.point,
    //   // getNormal: d => d.normal,
    //   getColor: d => [76, 168, 50, d.weight],
    //   visible: false,
    // }),

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
      // getPosition: d => {
      //   // console.log("HERE",d)
      //   return [d[1],d[0]]
      // },
      getPosition: d => d.point, // SWEEP
      getWeight: d => d.weight,
      aggregation: "MEAN", // SUM or MEAN
      weightsTextureSize: 2048, //  default 2048 Smaller texture sizes lead to visible pixelation.
      threshold: 0.0001,
      radiusPixels: mapState.zoom * 1.5,
      intensity: 1, // (viewstate.zoom * 30) / 1,
      visible: true,
      opacity: 1,
    }),

    new HeatmapLayer({
      id: "shore-radar-heatmapLayer",
      data: shoreRadarFrames,
      coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
      coordinateOrigin: [11.88666, 57.68577],
      // coordinateOrigin: [os_pos[os_pos_setting.source].longitude - 0.002, os_pos[os_pos_setting.source].latitude],
      getPosition: d => d.point,
      getWeight: d => d.weight,
      aggregation: "MEAN", // SUM or MEAN
      weightsTextureSize: 2048, //  default 2048 Smaller texture sizes lead to visible pixelation.
      threshold: 0.0001,
      radiusPixels: mapState.zoom * 1.5,
      intensity: 1, // (viewstate.zoom * 30) / 1,
      visible: true,
      opacity: 1,
    }),

    // This one
    // new ScatterplotLayer({
    //   id: "radar-scatterplot-layer",
    //   data: radarFrames,
    //   coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
    //   coordinateOrigin: [os_pos[os_pos_setting.source].longitude, os_pos[os_pos_setting.source].latitude],
    //   pickable: true,
    //   billboard: false,
    //   opacity: 0.5,
    //   stroked: false,
    //   filled: true,
    //   radiusScale: 1,
    //   radiusMinPixels: 0,
    //   radiusMaxPixels: 100,
    //   // lineWidthMinPixels: 1,
    //   getPosition: d => d.point,
    //   getRadius: d => d.distance / 11,
    //   getFillColor: d => [255, 140, 0, d.weight],
    //   getLineColor: () => [0, 0, 0],
    //   visible: false,
    // }),

    //  LIDAR layer
    new PointCloudLayer({
      id: "lidar-point-cloud-layer",
      data: lidarObservations,
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
      id: 'heading-line-layer',
      visible: true,
      data: [{ pos: [os_pos[os_pos_setting.source].longitude, os_pos[os_pos_setting.source].latitude], heading: os_heading[os_heading_setting.source].heading }],
      pickable: true,
      getWidth: 2,
      getSourcePosition: d => d.pos,
      getTargetPosition: d => calcPosFromBearingDistance(d.pos[1],d.pos[0],d.heading,10),
      getColor: d => [0, 0, 0]
    })
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
      viewState={mapState}
      initialViewState={INITIAL_VIEW_STATE}
      onViewStateChange={e => changeViewState(e)}
      onHover={e => hoverMapCursor(e)}
      controller={{ dragPan: true, doubleClickZoom: false }}
      getTooltip={getTooltip}
      getCursor={() => "crosshair"}
    >
 
    </DeckGL>
  )
}
