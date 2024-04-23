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
const routerURL = process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL
  ? process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL
  : "http://localhost:8000"
/* eslint-enable */

export default function LidarChart({ keyExpression }) {
  const [pointcloud, setPointcloud] = useState([])
  const [viewState, setViewState] = useState({
    longitude: 11.976048877985928,
    latitude: 57.68867744534118,
    zoom: 20,
    pitch: 0,
    bearing: 0,
    maxZoom: 25,
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
        return [d.coordinates[0], -d.coordinates[1], d.coordinates[2]]

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

  const onMessage = envelope => {
    // console.log("🚀 ~ onMessage ~ envelope:", envelope)
    let msg = parseKeelsonMessage(envelope)
    setPointcloud(msg.payload.pointPositions)

    // TODO: Foxglove BINARY parser for LIDAR  
    // console.log("🚀 ~ onMessage ~ LIDAR:", msg)
    // console.log("🚀 ~ LIDAR PARSED:", msg.payload.pointPositions)
    // let binary_distances = msg.payload.data // Assuming this is your binary data
    // let buffer = new ArrayBuffer(binary_distances.length)
    // let dataview = new DataView(buffer)
    // // Assuming binary_distances is an array of bytes
    // for (let i = 0; i < binary_distances.length; i++) {
    //   dataview.setUint8(i, binary_distances[i])
    // }
    // let distances = {
    //   x: [],
    //   y: [],
    //   z: [],
    // }
    // let toBepointcloud = []
    // for (let i = 0; i < dataview.byteLength; i += 24) {
    //   let x = dataview.getFloat64(i, false)
    //   let y = dataview.getFloat64(i + 8, false)
    //   let z = dataview.getFloat64(i + 16, false)
    //   distances.x.push(x)
    //   distances.y.push(y)
    //   distances.z.push(z)
    //   toBepointcloud.push([x, y, z])
    // }
    // // console.log("🚀 ~ onMessage ~ BUFFER:", distances)
    // console.log("🚀 ~ onMessage ~ toBepointcloud:", toBepointcloud)
  }

  useKeelsonData(routerURL, keyExpression, "get_loop", onMessage)

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
