import React from "react"
import { useRecoilValue } from "recoil"
import { atomActivePlatform, OS_POSITION_SETTING, OS_POSITIONS } from "../../../recoil/atoms"
import { Stack, Typography } from "@mui/material"

export default function PlatformQuickDescription() {
  const activePlatform = useRecoilValue(atomActivePlatform)
  const os_pos_ref = useRecoilValue(OS_POSITION_SETTING)
  const os_pos = useRecoilValue(OS_POSITIONS)

  return (
    <Stack>
      <Typography variant="h5" align="center">
        {activePlatform.platformName || "PLATFORM"}
      </Typography>

      <img
        src={activePlatform.picture || ""}
        style={{ height: "15rem", borderRadius: "0.5rem", objectFit: "cover", marginTop: "1rem" }}
      />

      <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={2} sx={{ marginTop: "1rem" }}>
        <Typography>
          Platform type: {activePlatform.activePlatformType}
          <br />
          Platform name: {activePlatform.name}
          <br />
          MMSI: {activePlatform.mmsi}
          <br />
          POS: {os_pos[os_pos_ref.source]?.latitude} , {os_pos[os_pos_ref.source]?.longitude}
          <br />
          Delay: {os_pos[os_pos_ref.source]?.delay}
        </Typography>
      </Stack>
    </Stack>
  )
}
