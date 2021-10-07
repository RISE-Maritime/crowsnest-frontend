import React from "react";
import DeckGL from "@deck.gl/react";
import { PointCloudLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";
import { MapView, COORDINATE_SYSTEM } from "@deck.gl/core";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoieXlkZGVldHQiLCJhIjoiY2t0dng2dDhhMHhvZDJxcW5idXJucHN5YSJ9.6JmMY8r6_xyg4MaF8twdIg";

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: 12,
  latitude: 57.6,
  zoom: 9,
  pitch: 0,
  bearing: 0,
  maxPitch: 90,
  minPitch: 0,
};

const dataPointCloud = [
  { position: [0, 0, 0],  },
  { position: [50, 0, 0] },
  { position: [0, -100, 5] },
];

export default function ChartArea() {
  const pointCloudLayers = new PointCloudLayer({
    id: "point-cloud-layer",
    data: dataPointCloud,
    pickable: false,
    // coordinateSystem: COORDINATE_SYSTEM.LNGLAT, 
    coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
    coordinateOrigin: [12.00188, 57.65271, 10],
    sizeUnits: "meters",
    radius: 50,
    getPosition: (d) => d.position,
    getNormal: [0, 1, 0],
    getColor:  [160, 14, 14],
  });

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={[pointCloudLayers]}
      getTooltip={({ object }) => object && object.name}
    >
      <MapView id="map" width="100%" maxPitch="90" controller={true}>
        <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
      </MapView>
    </DeckGL>
  );
}
