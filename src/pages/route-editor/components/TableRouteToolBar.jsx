import React, { useState } from "react"
import { GridToolbarContainer, GridToolbarExport, GridRowModes } from "@mui/x-data-grid"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import {
  atomRouteTurningRadius,
  atomRouteTurningRadiusCenter,
  atomRouteTurningRadiusStart,
  atomRouteTurningRadiusEnd,
} from "../../../recoil/atoms"

import { Stack } from "@mui/material"
import { useCSVReader } from "react-papaparse"
import {
  calcBearingBetween,
  calcDistanceBetween,
  calc_time_to_go,
  intHoursToStrHoursAndMinutes,
  calc_turn_radius_circle,
} from "../../../utils"
import { useRecoilState } from "recoil"

export default function TableRouteToolBar(props) {
  const { route_waypoints, set_route_waypoints, setRowModesModel } = props
  const { CSVReader } = useCSVReader()
  const [route_turning_radius, set_route_turning_radius] = useRecoilState(atomRouteTurningRadius)
  const [route_turning_radius_center, set_route_turning_radius_center] = useRecoilState(atomRouteTurningRadiusCenter)

  const [route_turning_radius_start, set_route_turning_radius_start] = useRecoilState(atomRouteTurningRadiusStart)
  const [route_turning_radius_end, set_route_turning_radius_end] = useRecoilState(atomRouteTurningRadiusEnd)

  const handleClickAddWP = () => {
    console.log(route_waypoints[route_waypoints.length - 1])
    const id = route_waypoints[route_waypoints.length - 1].id + 1

    set_route_waypoints(oldRows => [
      ...oldRows,
      {
        id: id,
        name: "",
        note: "",
        latitude: 2,
        longitude: 2,
        radius: 0,
        course: 0,
        speed: 10,
      },
    ])
    setRowModesModel(oldModel => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }))
  }

  const calculateCourse = () => {
    let new_wps = [...route_waypoints]
    var turning_radius_wps_pos = []
    var turning_radius_center_pos = []
    var turning_radius_start_pos = []
    var turning_radius_end_pos = []

    for (let i = 1; i < new_wps.length; i++) {
      // Start from 1 because we need to calculate course from previous waypoint
      // Calculate course
      let course = calcBearingBetween(
        new_wps[i - 1].latitude,
        new_wps[i - 1].longitude,
        new_wps[i].latitude,
        new_wps[i].longitude
      )
      course = Math.round(course * 100) / 100 // Round to 2 decimals

      // Calculate distance
      let distance = calcDistanceBetween(
        new_wps[i - 1].latitude,
        new_wps[i - 1].longitude,
        new_wps[i].latitude,
        new_wps[i].longitude
      )
      distance = Math.round(distance * 1000) / 1000 // Round to 3 decimals
      console.log("distance", distance)
      let ttg_hours = calc_time_to_go(new_wps[i].speed, distance)
      console.log("ttg_hours", ttg_hours)
      let ttg = intHoursToStrHoursAndMinutes(ttg_hours)

      // Calculate turn radius circle

      if (i < new_wps.length - 1) {
        let pos_obj_wp_radius = calc_turn_radius_circle(
          new_wps[i].radius,
          new_wps[i].course,
          new_wps[i + 1].course,
          new_wps[i].latitude,
          new_wps[i].longitude
        )
        turning_radius_wps_pos.push(pos_obj_wp_radius.turn_wps)
        turning_radius_center_pos.push(pos_obj_wp_radius.pos_circle_center)
        turning_radius_start_pos.push(pos_obj_wp_radius.pos_turn_start)
        turning_radius_end_pos.push(pos_obj_wp_radius.pos_turn_end)
      }

      // Update values in object
      new_wps[i] = { ...new_wps[i], course: course, distance: distance, ttg: ttg }
    }

    set_route_waypoints(new_wps)
    set_route_turning_radius(turning_radius_wps_pos)
    set_route_turning_radius_center(turning_radius_center_pos)
    set_route_turning_radius_start(turning_radius_start_pos)
    set_route_turning_radius_end(turning_radius_end_pos)
  }

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClickAddWP}>
        Add waypoint
      </Button>

      <Button color="inherit" disabled={true}>
        Generate XTE ZONE
      </Button>
      <Button color="inherit" disabled={true}>
        Generate Available Water ZONE
      </Button>
      <Button color="inherit" onClick={calculateCourse}>
        CALC
      </Button>

      {/* Export route */}
      <GridToolbarExport
        csvOptions={{
          fileName: "route_export.csv",
          allColumns: true,
          includeHeaders: true,
        }}
      />

      {/* Upload route */}
      <CSVReader
        onUploadAccepted={results => {
          console.log("---------------------------")
          console.log(results)
          console.log("---------------------------")
          let dataIn = results.data
          console.log("dataIn", dataIn)
          let typeAdjustedArr = []

          dataIn.map(object => {
            // Filer out empty rows
            if (Object.keys(object).length > 4) {
              typeAdjustedArr.push({
                ...object,
                id: parseInt(object.id),
                latitude: parseFloat(object.latitude),
                longitude: parseFloat(object.longitude),
                radius: parseFloat(object.radius),
                course: parseFloat(object.course),
                speed: parseFloat(object.speed),
              })
            }
          })

          console.log("typeAdjustedArr", typeAdjustedArr)

          set_route_waypoints(typeAdjustedArr)
        }}
        config={{
          header: true,
          transformHeader: header => {
            switch (header) {
              case "Name":
                return "name"
              case "Note":
                return "note"
              case "Latitude":
                return "latitude"
              case "Longitude":
                return "longitude"
              case "Radius":
                return "radius"
              case "Course":
                return "course"
              case "Speed":
                return "speed"
              case "ID":
                return "id"
              case "Waypoint name":
                return "name"
              default:
                return header.toLowerCase()
            }
          },
        }}
      >
        {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
          <>
            <Stack direction="row">
              <Button variant="contained" {...getRootProps()} size="small" sx={{ width: "17rem" }}>
                Browse route file
              </Button>

              <div
                style={{
                  border: "1px solid #ccc",

                  lineHeight: 2.5,
                  paddingLeft: 10,
                  width: "60%",
                }}
              >
                {(acceptedFile && acceptedFile.name) || "No file selected"}
              </div>
              <Button variant="contained" {...getRemoveFileProps()}>
                Remove
              </Button>
            </Stack>

            <ProgressBar style={{ backgroundColor: "red" }} />
          </>
        )}
      </CSVReader>
    </GridToolbarContainer>
  )
}
