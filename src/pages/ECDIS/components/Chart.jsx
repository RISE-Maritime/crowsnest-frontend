import React, { useState, useEffect } from "react"

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

const aisData = [
  {
    lon: 11.955110513070922,
    lat: 57.70674369756177,
    sog: 2,
    heading: 340,
  },
]

const step = 1
const loopLength = 2500

export default function Chart() {
  const chartSettings = useRecoilValue(atomChartSettings)
  const [animation] = useState({})
  const [startTime, setStartTime] = useState(null)
  const [time, setTime] = useState(0)
  const [viewState, setViewState] = React.useState({
    longitude: 11.97,
    latitude: 57.70887,
    zoom: 14,
    pitch: 0,
    bearing: 0,
  })
  console.log("refreshn")

  function animate(timestamp) {
    setTime(t => (t + timestamp) / 1000)
    window.requestAnimationFrame(animate)
  }

  console.log(time)

  useEffect(() => {
    console.log("starting animation")
    setStartTime(new Date().getTime())
    animation.id = window.requestAnimationFrame(animate)
    return () => {
      console.log("stopping animation")
      window.cancelAnimationFrame(animation.id)
    }
  }, [])

  const layers = [
    new TargetLayer({
      id: "target-layer",
      data: aisData,
      visible: aisData,
      getCoordinates: d => [d.lon, d.lat],
      getHeading: d => (d.heading * Math.PI) / 180,
      getFillColor: () => [65, 210, 82, 250],
      getSpeed: d => d.sog,
      pickable: true,
      iconSize: 100,
      elapsedTime: time,
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
  }

  return (
    <DeckGL
      layers={layers}
      viewState={viewState}
      onViewStateChange={e => changeViewState(e)}
      controller={{ dragPan: "dragging" }}
    >
      <ReactMapGl mapStyle={basemaps[chartSettings.basemap]} />
    </DeckGL>
  )
}
