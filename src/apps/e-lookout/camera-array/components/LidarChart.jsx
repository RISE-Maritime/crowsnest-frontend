import React, { useState } from "react"
import DeckGL from "@deck.gl/react"
import ReactMapGl from "react-map-gl/maplibre"
import basemaps from "../../../ECDIS/components/baseMaps.json"
import { PointCloudLayer, ScatterplotLayer } from "@deck.gl/layers"
import { COORDINATE_SYSTEM } from "@deck.gl/core"
import { useKeelsonData } from "../../../../hooks/useKeelsonData"
import { parseKeelsonMessage } from "../../../../utils"
import { max } from "moment-timezone"

/* eslint-disable */
// const routerURL = process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL
//   ? process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL
//   : "http://localhost:8000"
/* eslint-enable */

export default function LidarChart({ keyExpression }) {
  const [pointcloud, setPointcloud] = useState([])
  const [viewState, setViewState] = useState({
    longitude: 11.976048877985928,
    latitude: 57.68867744534118,
    zoom: 20,
    pitch: 0,
    bearing: 0,
    maxZoom: 40,
  })

  const layers = [
    new PointCloudLayer({
      id: "PointCloudLayer",
      // data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/pointcloud.json",
      data: pointcloud,
      getColor: d => [15, 149, 75, 255],
      // getNormal: d => d.normal,
      getPosition: d => {
        // console.log("🚀 ~ getPosition ~ d:", d)
        return [d[0], -d[1], d[2]]
      },
      pointSize: 2,
      coordinateOrigin: [11.976048877985928, 57.68867744534118],
      coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
      pickable: true,
    }),
    // new ScatterplotLayer({
    //   id: 'ScatterplotLayer',
    //   data: [[11.976048877985928, 57.68867744534118]],
    //   stroked: true,
    //   getPosition: d => d,
    //   getRadius: d => 1,
    //   getFillColor: [255, 140, 0],
    //   getLineColor: [0, 0, 0],
    //   getLineWidth: 1,
    //   radiusScale: 1,
    //   pickable: true
    // })
  ]

  function parseUint8ArrayToPointArray(uint8Array, pointStride) {
    const numPoints = uint8Array.length / pointStride
    const pointArray = []
    for (let i = 0; i < numPoints; i++) {
      const point = []
      point.push(new Float64Array(uint8Array.buffer, i * pointStride + 0, 1)[0])
      point.push(new Float64Array(uint8Array.buffer, i * pointStride + 8, 1)[0])
      point.push(new Float64Array(uint8Array.buffer, i * pointStride + 16, 1)[0])
      pointArray.push(point)
    }
    return pointArray
  }

  const onMessage = envelope => {
    // console.log("🚀 ~ onMessage ~ envelope:", envelope)
    let msg = parseKeelsonMessage(envelope)
    console.log("🚀 ~ LIDAR PAYLOAD:", msg)
    let pointStride = msg.payload.pointStride
    let binary_positions = new Uint8Array(msg.payload.data) // Assuming this is your binary data
    let pointCloudParsed = parseUint8ArrayToPointArray(binary_positions, pointStride)

    // console.log("🚀 ~ onMessage ~ pointCloudParsed:", pointCloudParsed)

    setPointcloud(pointCloudParsed)
  }

  useKeelsonData(keyExpression, "subscribe", onMessage)

  return (
    <div style={{ height: "30rem", position: "relative", overflow: "hidden" }}>
      <DeckGL
        layers={layers}
        viewState={viewState}
        onViewStateChange={e => setViewState(e.viewState)}
        controller={{ dragPan: "dragging" }}
      >
        {/*  <ReactMapGl mapStyle={basemaps["eniroSeaChart"]} />*/}
      </DeckGL>
    </div>
  )
}
