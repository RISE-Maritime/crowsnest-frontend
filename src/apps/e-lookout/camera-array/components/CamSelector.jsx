import React, { useState } from "react"
import CamCanvasV2 from "./CamCanvasV2"
import { Grid, Stack } from "@mui/material"
import { ObcButton as Button } from "@oicl/openbridge-webcomponents-react/components/button/button"
import { Obi13CameraOn as IconCameraOn } from "@oicl/openbridge-webcomponents-react/icons/icon-13-camera-on"

export default function CamSelector({ defaultSelected }) {
  const [selectedCameraId, setSelectedCameraId] = useState(defaultSelected)

  const handleCameraChange = cameraId => {
    console.log("🚀 ~ handleCameraChange ~ cameraId:", cameraId)
    setSelectedCameraId(cameraId)
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="check"
            checked={selectedCameraId == "axis-1" ? true : false}
            onClick={() => handleCameraChange("axis-1")}
          >
            <IconCameraOn slot={"leading-icon"} size="24" />1
          </Button>

          <Button
            variant="check"
            checked={selectedCameraId == "axis-2" ? true : false}
            onClick={() => handleCameraChange("axis-2")}
          >
            <IconCameraOn slot={"leading-icon"} size="24" />2
          </Button>
          <Button
            variant="check"
            checked={selectedCameraId == "axis-3" ? true : false}
            onClick={() => handleCameraChange("axis-3")}
          >
            <IconCameraOn slot={"leading-icon"} size="24" />3
          </Button>

          <Button
            variant="check"
            checked={selectedCameraId == "axis-4" ? true : false}
            onClick={() => handleCameraChange("axis-")}
          >
            <IconCameraOn slot={"leading-icon"} size="24" />4
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <CamCanvasV2 keyExpression={"rise/v0/boatswain/pubsub/compressed_image/" + selectedCameraId} />
      </Grid>
    </Grid>
  )
}
