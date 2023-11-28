{
  /**
  Route Editor Page
  -----------------

  This page is for editing a route. It is a full screen page with a chart

  Route properties and functions:
    - Track line
    - Waypoints
    - Navigable area
    - Safety buffer zone
    - Grounding line 

  Route format is a JSON object with the following structure:

  {
    "name": "Route name",
    "description": "Route description",

    "settings": {
      "polylineMinDistanceBetweenPoints": 10,
      "polylineMinDistanceUnits": "m",
    }

    "waypoints": [
      {
        "name": "Waypoint name",
        "description": "Waypoint description",
        "position": {
          "latitude": 0,
          "longitude": 0
        },
        "radius": 0,
        "radiusUnits": "m",
        "bearing": 0,
        "bearingUnits": "deg",
        "speed": 0,
        "speedUnits": "kn",
        "turn": 0,
        "turnUnits": "deg",
        "turnDirection": "port",
        "turnRate": 0,
        "turnRateUnits": "deg/min",
        "turnRadius": 0,
        "turnRadiusUnits": "m",
        
        "xteLinePort": 0,
        "xteUnits": "m",
        
        "xteLineStarboard": 0,
        "xteUnits": "m",

        "xtePolygon": [],
        "xtePolygonUnits": "m",

        "xtSafetyZonePolygon": [],
        "xteSafetyZonePolygonUnits": "m",

        "groundingLinePolygon": [],
        "groundingLinePolygonUnits": "m",
        
  }

*/
}

import React from "react"
import { Grid } from "@mui/material"
import SideBarTools from "./components/SideBarTools"
import SeaChart from "./components/SeaChart"
import RouteTableEditor from "./components/RouteTableEditor"

export default function RouteEditor() {
  return (
    <Grid container>
      <Grid
        item
        xs={10}
        sx={{
          position: "relative",
          padding: "0px",
          height: "70vh",
          cursor: "crosshair",
        }}
      >
        <SeaChart />
      </Grid>

      <Grid
        item
        xs={2}
        sx={{
          display: "grid",
          placeItems: "center",
          position: "relative",
          height: "100%",
        }}
      >
        <SideBarTools />
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          display: "grid",
          position: "relative",
          height: "calc(30vh - 40px)",
        }}
      >
        <RouteTableEditor />
      </Grid>
    </Grid>
  )
}
