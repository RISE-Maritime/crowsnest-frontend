import React from "react"
import DeckGL from "@deck.gl/react"
import { TileLayer } from "@deck.gl/geo-layers"
import { BitmapLayer, ScatterplotLayer } from "@deck.gl/layers"

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: 13,
  latitude: 61,
  zoom: 3,
  pitch: 0,
  bearing: 0,
}

export default function MapAISsmallPlot({ AISlist }) {
  const layers = [
    // Dark Map
    new TileLayer({
      id: "tail-layer-dark",
      visible: true,
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

    new ScatterplotLayer({
      id: "ais-small-scatter-plot-layer",
      data: AISlist,
      visible: true,
      getPosition: d => [d.lon, d.lat],
      filled: true,
      radiusScale: 20,
      radiusMinPixels: 3,
      radiusMaxPixels: 100,
      lineWidthMinPixels: 1,
      getFillColor: () => [186, 12, 0],
    }),
  ] // Layers end

  return (
    <div>
      <DeckGL
        layers={layers}
        initialViewState={INITIAL_VIEW_STATE}
        controller={{ dragPan: true, doubleClickZoom: false }}
        getCursor={() => "crosshair"}
      ></DeckGL>
    </div>
  )
}
