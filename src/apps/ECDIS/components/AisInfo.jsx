import React from "react"
import { clickInfoAtom } from "./Chart"
import { useRecoilValue } from "recoil"
import { Typography } from "@mui/material"

export default function AisInfo() {
  const chartQueryInfo = useRecoilValue(clickInfoAtom)

  return (
    <div>
      <Typography variant={"subtitle1"} sx={{ margin: "0.3rem" }}>
        AIS Info
      </Typography>
      {chartQueryInfo.layer === "ais" ? (
        <>
          <Typography variant={"body"} component={"p"}>
            Name: {chartQueryInfo.object.shipname}
          </Typography>
          <Typography variant={"body"} component={"p"}>
            MMSI: {chartQueryInfo.object.mmsi}
          </Typography>
          <Typography variant={"body"} component={"p"}>
            HDG: {chartQueryInfo.object.heading}
          </Typography>
          <Typography variant={"body"} component={"p"}>
            COG: {chartQueryInfo.object.course}
          </Typography>
          <Typography variant={"body"} component={"p"}>
            SOG: {chartQueryInfo.object.speed}
          </Typography>
          <Typography variant={"body"} component={"p"}>
            ROT: {chartQueryInfo.object.turn}
          </Typography>
          <Typography variant={"body"} component={"p"}>
            Destination: {chartQueryInfo.object.destination}
          </Typography>
          <Typography variant={"body"} component={"p"}>
            NavStatus: {chartQueryInfo.object.status}`
          </Typography>
        </>
      ) : null}
    </div>
  )
}
