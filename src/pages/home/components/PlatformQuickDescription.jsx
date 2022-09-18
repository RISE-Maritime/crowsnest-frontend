import React from "react"
import { useRecoilState } from "recoil"
import { atomActivePlatform } from "../../../recoil/atoms"

import { Stack, Typography } from "@mui/material"

export default function PlatformQuickDescription() {
  const [activePlatform, setActivePlatform] = useRecoilState(atomActivePlatform)

  return (
    <Stack>
      <Typography variant="h5" align="center">
        {activePlatform.platformName || "PLATFORM"}
      </Typography>
      <img src={activePlatform.picture || ""} style={{ height: "15rem", borderRadius: "0.5rem", objectFit: "cover" }} />

      <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={2} sx={{ margin: "1rem 0rem" }}>
        <Typography variant="caption">
          Platform type: {activePlatform.activePlatformType}
          <br />
          MMSI: {activePlatform.mmsi}
        </Typography>
      </Stack>
    </Stack>
  )
}
