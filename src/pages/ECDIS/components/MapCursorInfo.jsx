import React, { useState } from "react"
import { mapCursorPosAtom } from "./Chart"
import { OS_POSITIONS, OS_POSITION_SETTING, OS_VELOCITY_SETTING, OS_VELOCITY } from "../../../recoil/atoms"
import { useRecoilValue } from "recoil"
import { formatLatitude, formatLongitude, calcDistanceBetween, calcBearingBetween } from "../../../utils"
import { Stack, Typography, Grid } from "@mui/material"

export default function MapCursorInfo() {
  const mapCursor = useRecoilValue(mapCursorPosAtom)

  const osPos = useRecoilValue(OS_POSITIONS)
  const osPosSetting = useRecoilValue(OS_POSITION_SETTING)

  const osVelocitySetting = useRecoilValue(OS_VELOCITY_SETTING)
  const osVelocity = useRecoilValue(OS_VELOCITY)

  const [displayOptions, setDisplayOptions] = useState({
    positionInDegrees: false,
  })

  const togglePositionUnit = () => {
    setDisplayOptions({
      ...displayOptions,
      positionInDegrees: !displayOptions.positionInDegrees,
    })
  }
  return (
    <Stack>
      <hr style={{ width: "100%" }} />

      <Typography variant="overline" style={{ padding: "0.5rem" }}>
        Cursor
      </Typography>

      <Grid container sx={{ padding: "0.5rem" }}>
        <Grid item xs={5}>
          {displayOptions.positionInDegrees ? (
            <div onClick={togglePositionUnit} style={{ minWidth: "50%" }}>
              <Typography variant="caption">
                {mapCursor.onMap ? mapCursor.latitude.toFixed(4) : "-"} <br />
                {mapCursor.onMap ? mapCursor.longitude.toFixed(4) : "-"}
              </Typography>
            </div>
          ) : (
            <div onClick={togglePositionUnit} style={{ minWidth: "50%" }}>
              <Typography variant="caption">{mapCursor.onMap ? formatLatitude(mapCursor.latitude, 3) : "-"}</Typography>
              <br />
              <Typography variant="caption">{mapCursor.onMap ? formatLongitude(mapCursor.longitude, 3) : "-"}</Typography>
            </div>
          )}
        </Grid>
        <Grid item xs={7}>
          <Typography variant="caption">
            DIST:{" "}
            {calcDistanceBetween(
              mapCursor.latitude,
              mapCursor.longitude,
              osPos[osPosSetting.source].latitude,
              osPos[osPosSetting.source].longitude
            )}
            nm
            <br />
            DIST:{" "}
            {calcDistanceBetween(
              mapCursor.latitude,
              mapCursor.longitude,
              osPos[osPosSetting.source].latitude,
              osPos[osPosSetting.source].longitude,
              "m"
            )}
            meter
            <br />
            BRG:
            {calcBearingBetween(
              osPos[osPosSetting.source].latitude,
              osPos[osPosSetting.source].longitude,
              mapCursor.latitude,
              mapCursor.longitude
            )}
            °
            <br />
            TTG:
            {(
              calcDistanceBetween(
                mapCursor.latitude,
                mapCursor.longitude,
                osPos[osPosSetting.source].latitude,
                osPos[osPosSetting.source].longitude
              ) * osVelocity[osVelocitySetting.source].sog
            ).toFixed(1)}
            min
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  )
}
