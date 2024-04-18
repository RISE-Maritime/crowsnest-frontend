import React, { useState } from "react"
import { useKeelsonData } from "../../../../hooks/useKeelsonData"

import { parseKeelsonMessage } from "../../../../utils"
import { Stack } from "@mui/material"
import TelemetryCard from "./TelemetryCard"

/* eslint-disable */
const routerURL = process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL
  ? process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL
  : "http://localhost:8000"
/* eslint-enable */

export default function MetadataTelemetry({ keyExpression }) {
  const [heading, setHeading] = useState({ value: 0, received_at: null, enclosed_at: null })

  const onMessage = envelope => {
    console.log("🚀 ~ onMessage ~ envelope:", envelope)
    let msg = parseKeelsonMessage(envelope)

    console.log("🚀 ~ onMessage ~ msgData:", msg)
    setHeading({
      ...heading,
      value: msg.payload.heading,
      received_at: msg.received_at,
      enclosed_at: msg.enclosed_at,
    })
  }

  useKeelsonData(routerURL, keyExpression, "get_loop", onMessage)

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
      <TelemetryCard
        telemetryName={"Heading"}
        value={heading.value}
        received_at={heading.received_at}
        enclosed_at={heading.enclosed_at}
      />
      <TelemetryCard telemetryName={"Heading"} value={heading.value} />
    </Stack>
  )
}
