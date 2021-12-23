import React from "react";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";

// Tiles
const ENIRO = {
  version: 8,
  sources: {
    "raster-tiles": {
      type: "raster",
      scheme: "tms",
      tiles: [
        "http://map.eniro.com/geowebcache/service/tms1.0.0/nautical/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: "osm-tiles",
      type: "raster",
      source: "raster-tiles",
      minzoom: 0,
      maxzoom: 23,
    },
  ],
};

export default function MapMotion() {
  // State of the map
  const [viewstate, setViewState] = React.useState({
    latitude: 57.68477776430862,
    longitude: 11.846957404275882,
    zoom: 13,
    pitch: 0,
  });

  return (
    <DeckGL
      viewState={viewstate}
      onViewStateChange={(e) => setViewState(e.viewState)}
      controller={{ dragPan: true }}
    >
      <StaticMap mapStyle={ENIRO} />
    </DeckGL>
  );
}
