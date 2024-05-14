import React, { useState } from "react"
import TableRouteToolBar from "./TableRouteToolBar"
import { Snackbar, Alert } from "@mui/material"
import { GridRowModes, DataGrid, GridActionsCellItem, GridRowEditStopReasons } from "@mui/x-data-grid"
import { useRecoilState } from "recoil"
import { atomRouteWaypoints } from "../../../recoil/atoms"
// Icons
import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import CancelIcon from "@mui/icons-material/Close"
import LoupeIcon from "@mui/icons-material/Loupe"
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save"

export default function TableRoute() {
  const [snackbar, setSnackbar] = useState(null)
  const [rowModesModel, setRowModesModel] = useState({})
  const [route_waypoints, set_route_waypoints] = useRecoilState(atomRouteWaypoints)

  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={"ertgrwta"}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={"behrts"}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ]
        }

        if (id == route_waypoints.length - 1) {
          return [
            <GridActionsCellItem
              key={"cdgrgergrer"}
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              key={"cdgrer"}
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
          ]
        }

        return [
          <GridActionsCellItem
            key={"cdgrgergrer"}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={"cdgrer"}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,

          <GridActionsCellItem
            key={"regeqrerge"}
            icon={<LoupeIcon />}
            label="Add between"
            className="textPrimary"
            onClick={handelAddBetweenWP(id)}
            color="inherit"
          />,
        ]
      },
    },
    { field: "id", headerName: "ID", editable: true, width: 50, type: "number" },
    { field: "name", headerName: "Waypoint name", editable: true, width: 200 },
    { field: "course", headerName: "Course (°)", editable: false, width: 100, type: "number" },
    { field: "speed", headerName: "Speed (kts)", editable: true, width: 100, type: "number" },
    { field: "distance", headerName: "Distance (nm)", editable: true, width: 200, type: "number" },
    { field: "ttg", headerName: "TTG (hh:mm:ss)", editable: true, width: 200, type: "datetime" },
    { field: "radius", headerName: "Radius (nm)", editable: true, width: 200, type: "number" },
    { field: "latitude", headerName: "Latitude (°)", editable: true, width: 200, type: "number" },
    { field: "longitude", headerName: "Longitude (°)", editable: true, width: 200, type: "number" },
    { field: "note", headerName: "Note", editable: true, width: 200 },
  ]

  const handleProcessRowUpdateError = error => {
    setSnackbar({ children: error.message, severity: "error" })
  }

  const handleCloseSnackbar = () => setSnackbar(null)

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const handleEditClick = id => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = id => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleDeleteClick = id => () => {
    set_route_waypoints(route_waypoints.filter(row => row.id !== id))
  }

  const handleCancelClick = id => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    })

    const editedRow = route_waypoints.find(row => row.id === id)
    if (editedRow.isNew) {
      set_route_waypoints(route_waypoints.filter(row => row.id !== id))
    }
  }

  const processRowUpdate = newRow => {
    console.log("processRowUpdate", newRow)

    const updatedRow = { ...newRow, isNew: false }

    set_route_waypoints(oldRows => oldRows.map(row => (row.id === newRow.id ? updatedRow : row)))

    return updatedRow
  }

  const handleRowModesModelChange = newRowModesModel => {
    console.log("handleRowModesModelChange", newRowModesModel)
    setRowModesModel(newRowModesModel)
  }

  const handelAddBetweenWP = id => () => {
    console.log("🚀 ~ file: TableRoute.jsx:143 ~ handelAddBetweenWP ~ id:", id)

    let new_wps = [...route_waypoints]

    // Add new wp in between
    new_wps.splice(id + 1, 0, { id: "new", name: "New WP", latitude: 0, longitude: 0, note: "", speed: 10, radius: 1 })

    // Calc new id and position
    for (let i = 0; i < new_wps.length; i++) {
      if (new_wps[i].id === "new") {
        new_wps[i] = {
          ...new_wps[i],
          latitude: new_wps[i - 1].latitude + (new_wps[i + 1].latitude - new_wps[i - 1].latitude) / 2,
          longitude: new_wps[i - 1].longitude + (new_wps[i + 1].longitude - new_wps[i - 1].longitude) / 2,
        }
      }

      // Override id to a continuous number
      new_wps[i] = { ...new_wps[i], id: i }
    }

    console.log("🚀 ~ file: TableRoute.jsx:145 ~ handelAddBetweenWP ~ route_waypoints:", new_wps)

    set_route_waypoints(new_wps)
  }

  return (
    <>
      <DataGrid
        columns={columns}
        rows={route_waypoints}
        editMode="row"
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        rowModesModel={rowModesModel}
        slots={{
          toolbar: TableRouteToolBar,
        }}
        slotProps={{
          toolbar: { route_waypoints, set_route_waypoints, setRowModesModel },
        }}
      />

      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  )
}
