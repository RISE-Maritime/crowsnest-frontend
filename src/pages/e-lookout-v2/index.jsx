import React, { useEffect } from "react"
import { Stack } from "@mui/material"
import CamStream from "./components/CamStream"

export default function CamLookout() {
  useEffect(() => {}, [])

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
      <CamStream ID={"3"} />
      <CamStream ID={"2"} />
      <CamStream ID={"4"} />
      <CamStream ID={"1"} />
    </Stack>
  )
}
