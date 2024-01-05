import React, { useState } from "react"
import DeckGL from "@deck.gl/react"
import { TileLayer } from "@deck.gl/geo-layers"
import { BitmapLayer, IconLayer, LineLayer } from "@deck.gl/layers"
import { OS_POSITIONS, OS_HEADING } from "../../../recoil/atoms"
import { useRecoilValue, useRecoilState } from "recoil"
import PicOwnShipBlack from "../../../resources/chart_symbols/own_ship_black.png"
import { calcPosFromBearingDistance } from "../../../utils"
import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import ModeStandbyIcon from "@mui/icons-material/ModeStandby"

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

export default function SimMap() {
  const [rightClickMenu, setRightClickMenu] = useState({ xPos: 0, yPos: 0, showMenu: false })
  const [rightClickCoordinates, setRightClickCoordinates] = useState({ lat: 0, long: 0 })
  const [mapState, setMapState] = useState({
    zoom: 13,
    pitch: 6,
    maxZoom: 24,
    maxPitch: 85,
    altitude: 1.5,
    bearing: 0,
    latitude: 57.68,
    longitude: 11.85,
    chartFix: "OS", // Chart view position behavior
  })

  const [os_pos, set_os_pos] = useRecoilState(OS_POSITIONS)
  const os_heading = useRecoilValue(OS_HEADING)

  const layers = [
    // Satellite map
    new TileLayer({
      id: "tail-layer-satellite",
      visible: true,

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

    // Open Sea Mark
    new TileLayer({
      id: "tail-layer-sea-marks",
      visible: true,
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

    // SEA CHART ENIRO
    new TileLayer({
      id: "tail-layer-enior",
      visible: true,
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
      data: [{ pos: [os_pos.SIM.longitude, os_pos.SIM.latitude] }],
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
          pos: [os_pos.SIM.longitude, os_pos.SIM.latitude],
          heading: os_heading.SIM.heading,
        },
      ],
      pickable: true,
      getWidth: 2,
      getSourcePosition: d => d.pos,
      getTargetPosition: d => calcPosFromBearingDistance(d.pos[1], d.pos[0], d.heading, 10, "nm"),
      getColor: () => [0, 0, 0],
    }),
  ]

  const changeViewState = e => {
    setMapState({
      ...e.viewState,
    })
  }

  const handleContextMenu = event => {
    event.preventDefault()

    console.log("🚀 ~ file: SimMap.jsx:161 ~ handleContextMenu ~ event.type:", event)

    if (event.type === "contextmenu") {
      // console.log(event)
      setRightClickMenu({
        ...rightClickMenu,
        showMenu: true,
      })
    } else {
      setRightClickMenu({
        ...rightClickMenu,
        showMenu: false,
      })
    }
  }

  function updateOsPosition() {
    console.log("updateOsPosition")
    set_os_pos(prevOsPositions => {
      return {
        ...prevOsPositions,
        SIM: {
          ...prevOsPositions.SIM,
          latitude: rightClickCoordinates.lat,
          longitude: rightClickCoordinates.long,
        },
      }
    })
    setRightClickMenu({
      ...rightClickMenu,
      showMenu: false,
    })
  }

  return (
    <div onContextMenu={handleContextMenu}>
      <DeckGL
        layers={layers}
        viewState={mapState}
        onViewStateChange={e => changeViewState(e)}
        controller={{ dragPan: true, doubleClickZoom: false }}
        getTooltip={getTooltip}
        getCursor={() => "crosshair"}
        onClick={info => {
          console.log("🚀 ~ file: SimMap.jsx:176 ~ SimMap ~ info:")

          setRightClickMenu({
            xPos: info.x,
            yPos: info.y,
          })

          setRightClickCoordinates({
            lat: info.coordinate[1],
            long: info.coordinate[0],
          })
        }}
      />
      {rightClickMenu.showMenu ? (
        <div style={{ position: "absolute", top: rightClickMenu.yPos, left: rightClickMenu.xPos, zIndex: 100 }}>
          <List sx={{ background: "#0f954b" }} dense={true}>
            <ListItem disablePadding>
              <ListItemButton onClick={updateOsPosition}>
                <ListItemIcon>
                  <ModeStandbyIcon />
                </ListItemIcon>
                <ListItemText primary="SET OS POSITION" />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      ) : null}
    </div>
  )
}
