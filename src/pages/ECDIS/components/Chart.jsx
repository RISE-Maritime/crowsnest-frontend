import React, { useState, useEffect } from "react"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"

import { atom, useRecoilValue } from "recoil"

import DeckGL from "@deck.gl/react"
import ReactMapGl from "react-map-gl/maplibre"

import basemaps from "./baseMaps.json"
import TargetLayer from "../../../base-elements/custom-deckgl-layers/target-layer"

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

export const atomChartSettings = atom({
  key: "atom_chart_settings",
  default: {
    centerFix: "free",
    verticalFix: "northUp",
    visualisation: "2D",
    zoom: 10,
    pitch: 0,
    bearing: 0,
    basemap: "riseSeaChart",
  },
})

const DataPresentationComponent = ({ hoverInfo }) => {
  const to_show = {
    shipname: "Name",
    speed: "SOG",
    heading: "HDG",
    course: "COG",
    callsign: "CallSign",
    // Add other key mappings as needed
  }

  return (
    <div style={{ position: "absolute", zIndex: 1, pointerEvents: "none", left: hoverInfo.x, top: hoverInfo.y }}>
      <Paper square style={{ padding: "10px" }}>
        <Grid container spacing={0}>
          {Object.entries(to_show).map(([key, label]) => (
            <Grid item xs={12} key={key}>
              <Typography variant="caption">
                {label}:{" "}
                {hoverInfo.object[key] !== null && hoverInfo.object[key] !== undefined ? hoverInfo.object[key].toString() : "---"}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  )
}

export default function Chart() {
  const chartSettings = useRecoilValue(atomChartSettings)
  const [animation] = useState({})
  const [worker, setWorker] = useState(null)
  const [hoverInfo, setHoverInfo] = useState({})
  const [time, setTime] = useState(0)
  const [targets, setTargets] = useState([])
  const [iconSize, setIconSize] = useState(14 * 7)
  const [viewState, setViewState] = React.useState({
    longitude: 11.97,
    latitude: 57.70887,
    zoom: 14,
    pitch: 0,
    bearing: 0,
  })

  function animate(timestamp) {
    setTime(t => (t + timestamp) / 1000)
    window.requestAnimationFrame(animate)
  }

  useEffect(() => {
    // AIS data
    const myWorker = new SharedWorker(new URL("./workerAis.js", import.meta.url))
    myWorker.port.onmessage = e => {
      switch (e.data.type) {
        case "error":
          console.log(e.data.payload)
          break
        case "targets":
          setTargets(e.data.payload)
          break
        default:
          console.log("Unexpected message type " + e.data.type + " from workerAis")
      }
    }
    myWorker.port.start()
    setWorker(myWorker)

    // Animation
    console.log("Starting animation ...")
    animation.id = window.requestAnimationFrame(animate)
    return () => {
      console.log("Stopping animation ...")
      window.cancelAnimationFrame(animation.id)
      console.log("Stopping workers ...")
      worker.terminate()
    }
  }, [])

  const layers = [
    new TargetLayer({
      id: "target-layer",
      data: targets,
      visible: true,
      getCoordinates: d => [d.lon, d.lat],
      getHeading: d => (d.heading * Math.PI) / 180, // deg to rad
      getCourse: d => (d.course * Math.PI) / 180,
      getFillColor: d => d.color,
      getSpeed: d => d.speed * 0, //0.514444, // knots to m/s
      pickable: true,
      iconSize: iconSize,
      elapsedTime: time,
      onHover: info => setHoverInfo(info),
    }),
  ]

  React.useEffect(() => {
    var changes = {}
    if (chartSettings.visualisation === "2D") {
      changes.pitch = 0.0
    }
    if (chartSettings.verticalFix === "northUp") {
      changes.bearing = 0.0
    }
    setViewState({ ...viewState, ...changes })
  }, [chartSettings])

  function changeViewState(e) {
    var tempViewState = e.viewState
    if (chartSettings.visualisation === "2D") {
      tempViewState.pitch = 0
    }
    if (chartSettings.verticalFix === "northUp") {
      tempViewState.bearing = 0
    }
    setViewState(tempViewState)
    if (e.viewState.zoom < 14) {
      setIconSize(14 * 8)
    } else {
      setIconSize((20 - e.viewState.zoom) * 8)
    }
  }
  return (
    <DeckGL
      layers={layers}
      viewState={viewState}
      onViewStateChange={e => changeViewState(e)}
      controller={{ dragPan: "dragging" }}
    >
      <ReactMapGl mapStyle={basemaps[chartSettings.basemap]} />
      {hoverInfo.object && <DataPresentationComponent hoverInfo={hoverInfo} />}
    </DeckGL>
  )
}
