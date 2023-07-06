import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Snackbar, Alert } from '@mui/material';

export default function TableRoute() {
    const [snackbar, setSnackbar] = useState(null);
    const [active_route_data, set_active_route_data] = useState(

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
                    id: 0,
                    latitude: 0,
                    longitude: 0,
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

    )



    const processRowUpdate = (newRow, oldRow) => {

        console.log(newRow, oldRow)
        // new Promise((resolve, reject) => {

        //     const mutation = computeMutation(newRow, oldRow);

        //     if (mutation) {
        //       // Save the arguments to resolve or reject the promise later
        //       setPromiseArguments({ resolve, reject, newRow, oldRow });
        //     } else {
        //       resolve(oldRow); // Nothing was changed
        //     }

        //   }

    }

    const handleProcessRowUpdateError = (error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }

    const handleCloseSnackbar = () => setSnackbar(null);


    return (
        <>
            <DataGrid
                editMode="row"
                rows={active_route_data.waypoints}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                columns={[
                   
                    { field: 'name', headerName: 'Name', editable: true, width: 200 },
                ]}
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

            {!!snackbar && (
                <Snackbar
                    open
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    onClose={handleCloseSnackbar}
                    autoHideDuration={6000}
                >
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
            )}
        </>
    )
}
