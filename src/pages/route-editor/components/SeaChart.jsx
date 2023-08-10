import React, { useEffect, useState } from "react"
import { calcPosFromBearingDistance } from "../../../utils"
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { selectRoutePathList } from "../../../recoil/selectors"
import IconWaypoint from "../../../resources/chart_symbols/Waypoint.png"
import DeckGL from "@deck.gl/react"
import VesselContourLayer from "../../../base-elements/custom-deckgl-layers/vessel-contour-layer"
import { PathLayer } from "@deck.gl/layers"
import { BitmapLayer, IconLayer, LineLayer } from "@deck.gl/layers"
import { TileLayer } from "@deck.gl/geo-layers"
import PicOwnShipBlack from "../../../resources/chart_symbols/own_ship_black.png"
import "mapbox-gl/dist/mapbox-gl.css"

// Atoms
import {
  targetsAIS,
  OS_POSITIONS,
  OS_POSITION_SETTING,
  OS_HEADING,
  OS_HEADING_SETTING,
  atomRouteWaypoints
} from "../../../recoil/atoms"


export const clickInfoAtom = atom({
  key: "click_info_atom_route_editor",
  default: {},
})

export const mapCursorPosAtom = atom({
  key: "map_cursor_pos_atom_route_editor",
  default: {
    latitude: 0,
    longitude: 0,
    onMap: false,
  },
})

export const atomMapState = atom({
  key: "atom_map_state_route_editor",
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
  key: "atom_map_setting_route_editor",
  default: {
    chartFix: "OS",
  },
})

export const atomLayersTaggable = atom({
  key: "atom_layers_taggable_route_editor",
  default: ["NO MAP", "ENIRO", "Street map", "Satellite", "Dark", "Sea Marks"],
})

export const atomLayersShowing = atom({
  key: "atom_layers_showing_route_editor",
  default: ["ENIRO"],
})

export const atomSensorLayersTaggable = atom({
  key: "atom_sensor_layers_taggable_route_editor",
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
  key: "atom_sensor_layers_showing_route_editor-sd",
  default: ["AIS", "OS Radar-0 Heatmap", "OS Radar-1 Heatmap", "Shore Radar-0 Heatmap", "Shore Radar-1 Heatmap"],
})

function getTooltip({ picked, object, coordinate, layer }) {

  // console.log(layer, picked, object)

  switch (layer?.id) {
    case "ais-targets":
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
    case "route-waypoints-layer":
      return (object && {
        html: `<h3>${object.name}</h2><div>${object.message}</div>`,
        style: {
          backgroundColor: '#0f954b',
          fontSize: '0.8em'
        }
      })

  } // Switch END 
} // getTooltip END

export default function SeaChart() {
  const setClickInfo = useSetRecoilState(clickInfoAtom)
  const setMapCursorPos = useSetRecoilState(mapCursorPosAtom)
  const [mapState, setMapState] = useRecoilState(atomMapState)
  const [mapSetting, setMapSetting] = useRecoilState(atomMapSetting)
  const [routeWaypoints, setRouteWaypoints] = useRecoilState(atomRouteWaypoints)
  const layersShowing = useRecoilValue(atomLayersShowing)
  const sensorLayerShowing = useRecoilValue(atomSensorLayersShowing)
  const os_pos = useRecoilValue(OS_POSITIONS)
  const os_pos_setting = useRecoilValue(OS_POSITION_SETTING)
  const os_heading = useRecoilValue(OS_HEADING)
  const os_heading_setting = useRecoilValue(OS_HEADING_SETTING)
  const AIStargets = useRecoilValue(targetsAIS)
  const [mapController, setMapController] = useState({ dragPan: true, doubleClickZoom: false })

  const [mapWPs, setMapWPs] = useState([])
  const [mapPath, setMapPath] = useState([])
  const [mapCursor, setMapCursor] = useState("crosshair")

  useEffect(() => {

    setMapWPs(routeWaypoints)

    // RoutePath
    const transformedList = [];
    for (let i = 0; i < routeWaypoints.length; i++) {
      transformedList.push([routeWaypoints[i].longitude, routeWaypoints[i].latitude]);
    }
    console.log(transformedList);
    setMapPath([transformedList])

  }, [routeWaypoints])

  // Center OS on chart if selected 
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

    // Route Waypoints 
    new IconLayer({
      id: 'route-waypoints-layer',
      data: mapWPs,
      getPosition: d => [d.longitude, d.latitude],
      pickable: true,
      billboard: false,
      getIcon: () => {
        return {
          url: IconWaypoint,
          width: 100,
          height: 100,
          anchorY: 50,
          anchorX: 50,
        }
      },
      sizeUnits: "common",
      sizeMinPixels: 10,
      sizeMaxPixels: 25,
      getSize: d => 5,
      onDragStart: () => {
        setMapController({ ...mapController, dragPan: false })
        setMapCursor("grabbing")
      },

      onDrag: ({ coordinate, object }) => {
        let long = coordinate[0]
        let lat = coordinate[1]
        let newRouteWaypoints = [...routeWaypoints]
        newRouteWaypoints[object.id] = { ...object, longitude: long, latitude: lat }
        setMapWPs(newRouteWaypoints)

        // RoutePath
        const transformedList = [];
        for (let i = 0; i < newRouteWaypoints.length; i++) {
          transformedList.push([newRouteWaypoints[i].longitude, newRouteWaypoints[i].latitude]);
        }
        setMapPath([transformedList])

      },
      onDragEnd: ({ coordinate, object }) => {
        let long = coordinate[0]
        let lat = coordinate[1]
        let newRouteWaypoints = [...routeWaypoints]
        newRouteWaypoints[object.id] = { ...object, longitude: long, latitude: lat }
        setRouteWaypoints(newRouteWaypoints)

        setMapController({ ...mapController, dragPan: true })
      },
      onClick: (info, event) => console.log('Clicked:', info, event),
      onHover: (info, event) => setMapCursor("grab")
      
      
    }),

    // Route Leg-lines
    new PathLayer({
      id: 'route-path-layer',
      data: mapPath,
      pickable: true,
      widthScale: 20,
      widthMinPixels: 2,
      getPath: d => d,
      getColor: d => [0, 0, 0],
      getWidth: d => 5
    }),

    // OWN SHIP symbol
    new IconLayer({
      id: "layer-own-ship",
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

    // OWN SHIP heading line
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
      getTargetPosition: d => calcPosFromBearingDistance(d.pos[1], d.pos[0], d.heading, 10),
      getColor: d => [0, 0, 0],
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
      viewState={mapState}
      onViewStateChange={e => changeViewState(e)}
      onHover={e => hoverMapCursor(e)}
      controller={mapController}
      getTooltip={getTooltip}
      getCursor={() => mapCursor}

    ></DeckGL>
  )
}
