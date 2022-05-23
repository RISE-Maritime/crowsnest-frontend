import React from "react"
import { mapCursorPosAtom } from "./SeaChart"
import { useRecoilValue } from "recoil"
import { formatLatitude, formatLongitude } from "../../../utils"

export default function MapCursorInfo() {
  const mapCursor = useRecoilValue(mapCursorPosAtom)

  return (
    <div>
      <h5>
        {mapCursor.onMap ? mapCursor.latitude : "-"} {mapCursor.onMap ? mapCursor.longitude : "-"}
      </h5>
      <h5>
        {mapCursor.onMap ? formatLatitude(mapCursor.latitude, 4) : "-"}{" "}
        {mapCursor.onMap ? formatLongitude(mapCursor.longitude, 4) : "-"}
      </h5>
    </div>
  )
}
