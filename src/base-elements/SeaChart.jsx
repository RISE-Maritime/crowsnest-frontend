import React from 'react';

import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import VesselContourLayer from './custom-deckgl-layers/vessel-contour-layer';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

// Atoms
export const vesselTargetsAtom = atom({
    key: 'vessel_targets',
    default: {},
})

export const clickInfoAtom = atom({
  key: 'click_info_atom',
  deafault: {},
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


function formatTime(s) {
  const dtFormat = new Intl.DateTimeFormat('en-GB', {
    timeStyle: 'medium',
    timeZone: 'UTC'
  });
  return dtFormat.format(new Date(s * 1e3));
}

function roundValue(value) {
  return Math.round(value*100)/100
}

function getTooltip({object}) {
  return (
    object &&
    `\
    MMSI: ${object.mmsi}
    Name: ${object.shipname}
    UTC Timestamp: ${formatTime(object.timestamp)}
    HDG: ${roundValue(object.heading)}
    COG: ${roundValue(object.cog)}
    SOG: ${roundValue(object.sog)}`
  );
}

export default function SeaChart() {

    // State of the map
    const [viewstate, setViewState] = React.useState({
        latitude: 57.68477776430862,
        longitude: 11.846957404275882,
        zoom: 13,
        pitch: 0,
    });

    const setClickInfo = useSetRecoilState(clickInfoAtom)
    
    const vesselTargets = useRecoilValue(vesselTargetsAtom)
    console.log(Object.values(vesselTargets).length)
    
    const layers = [
      new VesselContourLayer({
        id: 'vessel-contour-layer',
        data: Object.values(vesselTargets),
        getCoordinates: d => [d.lon, d.lat],
        getLength: d => d.l,
        getBeam: d => d.b,
        getHeading: d => d.heading*Math.PI/180,
        getFillColor: () => [255,0,0,255],
        pickable: true,
        onClick: info => {setClickInfo(info.object)}
        })
    ];

    return <DeckGL
            layers={layers}
            viewState={viewstate}
            onViewStateChange={e => setViewState(e.viewState)}
            controller={{ dragPan: true }}
            getTooltip={getTooltip}
        >
        
            <StaticMap mapStyle={ENIRO} />
        </DeckGL>
     
}
