import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';

export default function TableRoute() {
    const [active_route_data, set_active_route_data] = useState(
        [
            {
                name: "Route name",
                description: "Route description",
                settings: {
                    "polylineMinDistanceBetweenPoints": 10,
                    "polylineMinDistanceUnits": "m",
                },
                waypoints: [
                    {
                        name: "Waypoint name",
                        description: "Waypoint description",
                        position: {
                            latitude: 0,
                            longitude: 0
                        },
                        radius: 0,
                        radiusUnits: "m",
                        bearing: 0,
                        bearingUnits: "deg",
                        speed: 0,
                        speedUnits: "kn",
                        turn: 0,
                        turnUnits: "deg",
                        turnDirection: "port",
                        turnRate: 0,
                        turnRateUnits: "deg/min",
                        turnRadius: 0,
                        turnRadiusUnits: "m",
                        xteLinePort: 0,
                        xteUnits: "m",
                        xteLineStarboard: 0,
                        xtePolygon: [],
                        xtePolygonUnits: "m",
                        xtSafetyZonePolygon: [],
                        xteSafetyZonePolygonUnits: "m",
                        groundingLinePolygon: [],
                        groundingLinePolygonUnits: "m",
                    }
                ]
            }    
        ]
    )

    return (
        <DataGrid

            rows={active_route_data}
            columns={[{ field: 'id', headerName: 'ID', width: 90 }]}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
        />

    )
}
