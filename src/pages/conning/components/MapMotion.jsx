import React from "react";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoieXlkZGVldHQiLCJhIjoiY2t0eGEyNjJhMWI0NjJxcW53dGNrMmk2eSJ9.6bkGb4cvC5pbb8sisIScSw";

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
      
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
}
