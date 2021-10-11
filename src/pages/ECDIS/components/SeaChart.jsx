import React from 'react';


// UI
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
//import Box from '@mui/material/Box';

// State
import { atom, useRecoilValue } from 'recoil'

// Turf.js
import { transformRotate, destination } from '@turf/turf'
import { polygon, point} from '@turf/helpers'

// Atoms
export const vesselTargetsAtom = atom({
    key: 'vessel_targets',
    default: [],
})

// Tiles
const ENIRO = {
    version: 8,
    sources: {
        "raster-tiles": {
            type: "raster",
            scheme: "tms",
            tiles: [
                'http://map.eniro.com/geowebcache/service/tms1.0.0/nautical/{z}/{x}/{y}.png',
            ],
            tileSize: 256
        }
    },
    layers: [
        {
            id: "osm-tiles",
            type: "raster",
            source: "raster-tiles",
            minzoom: 0,
            maxzoom: 23
        }
    ]
};


function makeGeoJsonVessel({longitude, latitude, heading, length, beam, lcg}) {

    const LOA = length / 1000 // km
    const BEAM = beam / 1000 // km
    const cx = LOA / 2 + lcg / 1000 // km
    const chamfer = 0.2

    const CG = point([longitude, latitude])
    const points = []

    points[0] = destination(CG, cx, 180)
    points[1] = destination(points[0], BEAM / 2, 90)
    points[2] = destination(points[1], (1 - chamfer) * LOA, 0)
    points[3] = destination(points[0], LOA, 0)
    points[6] = points[0]
    points[5] = destination(points[6], BEAM / 2, -90)
    points[4] = destination(points[5], (1 - chamfer) * LOA, 0)

    let geoJsonVessel = polygon([points.map(p => p.geometry.coordinates)], { latitude: latitude, longitude: longitude, heading: heading })
    geoJsonVessel = transformRotate(geoJsonVessel, heading)

    return geoJsonVessel
}


export default function SeaChart() {

    // State of the map
    const [viewstate, setViewState] = React.useState({
        latitude: 57.68477776430862,
        longitude: 11.846957404275882,
        zoom: 13,
        pitch: 0,
    });
    
    // Generate GeoJSON objects for each of the vessel targets.
    const vesselTargets = useRecoilValue(vesselTargetsAtom)
    const vesselTargetsGeoJson = vesselTargets.map((vt) => makeGeoJsonVessel(vt))

    const layers = [
        new GeoJsonLayer({
            id: 'vessel_targets_geojson',
            data: vesselTargetsGeoJson,
            opacity: 1.0,
            stroked: false,
            filled: true,
            extruded: false,
            wireframe: true,
            getLineColor: [255, 255, 255],
            getFillColor: [43, 153, 138],
            pickable: true,
            getElevation: 30
        })
    ];
    
    return <DeckGL
            layers={layers}
            viewState={viewstate}
            onViewStateChange={e => setViewState(e.viewState)}
            controller={{ dragPan: true }}
        >
            <StaticMap mapStyle={ENIRO} />
        </DeckGL>
     
    

}
/*
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
*/