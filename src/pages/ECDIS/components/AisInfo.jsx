import React from "react"
import { clickInfoAtom } from "./SeaChart"
import { useRecoilValue } from "recoil"
import { Typography } from "@mui/material"

export default function AisInfo() {
  const chartQueryInfo = useRecoilValue(clickInfoAtom)

  return (
    <div>
      <Typography variant={"h5"}> AisInfo</Typography>
      {chartQueryInfo.layer === "ais" ? (
        <Typography variant={"subtitle1"}>
          Name: {chartQueryInfo.object.shipname}
          <br />
          MMSI: {chartQueryInfo.object.mmsi}
          <br />
          HDG: {chartQueryInfo.object.heading}
          <br />
          COG: {chartQueryInfo.object.course}
          <br />
          SOG: {chartQueryInfo.object.speed}
          <br />
          ROT: {chartQueryInfo.object.turn}
          <br />
          Destination: {chartQueryInfo.object.destination}
          <br />
          NavStatus: {chartQueryInfo.object.status}`
        </Typography>
      ) : null}
    </div>
  )
}
