import React, { useState } from "react"
import CamCanvasFrame from "./CamCanvasFrame"
import { Grid, Stack } from "@mui/material"
import { ObcButton as Button } from "@oicl/openbridge-webcomponents-react/components/button/button"
import { Obi13CameraOn as IconCameraOn } from "@oicl/openbridge-webcomponents-react/icons/icon-13-camera-on"

/**
 * Camera controller for single JPEG frame sent over Keelson 
 * 
 * Component: CamCanvasFrame drawing the frame
 */
export default function CamControllerFrame({ defaultSelected }) {

  const [selectedCameraId, setSelectedCameraId] = useState(defaultSelected)

  /**
   * Handles the change of the selected camera.
   * @param {string} cameraId - The ID of the selected camera.
   */
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
            onClick={() => handleCameraChange("axis-4")}
          >
            <IconCameraOn slot={"leading-icon"} size="24" />4
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <CamCanvasFrame keyExpression={"rise/v0/boatswain/pubsub/compressed_image/" + selectedCameraId} />
      </Grid>
    </Grid>
  )
}
