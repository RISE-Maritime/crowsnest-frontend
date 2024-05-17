import React, { useState } from "react"
import { useKeelsonData } from "../../../../hooks/useKeelsonData"
import { parseKeelsonMessage } from "../../../../utils"
import { Stack } from "@mui/material"
import TelemetryCard from "./TelemetryCard"

/* eslint-disable */
// const routerURL = process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL
//   ? process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL
//   : "http://localhost:8000"
/* eslint-enable */

export default function MetadataTelemetry({ keyExpression }) {
  const [heading, setHeading] = useState({ value: 0, received_at: null, enclosed_at: null })
  const [groundSpeed, setGroundSpeed] = useState({ value: 0, received_at: null, enclosed_at: null })
  const [throttle, setThrottle] = useState({ value: 0, received_at: null, enclosed_at: null })

  const onMessage = envelope => {
    console.log(envelope);
    let msg = parseKeelsonMessage(envelope)
    if (msg.payload) {
      setHeading({
        ...heading,
        value: msg.payload.heading,
        received_at: msg.received_at,
        enclosed_at: msg.enclosed_at,
      })
      setGroundSpeed({
        ...groundSpeed,
        value: msg.payload.groundspeed,
        received_at: msg.received_at,
        enclosed_at: msg.enclosed_at,
      })
      setThrottle({
        ...throttle,
        value: msg.payload.throttle,
        received_at: msg.received_at,
        enclosed_at: msg.enclosed_at,
      })
    }
  }

  // useKeelsonData(keyExpression, "get_loop", onMessage)
  useKeelsonData(keyExpression, "subscribe", onMessage)

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
      <TelemetryCard
        telemetryName={"Heading"}
        unit={"°"}
        value={heading.value}
        received_at={heading.received_at}
        enclosed_at={heading.enclosed_at}
      />
      <TelemetryCard
        telemetryName={"SOG"}
        unit={"m/s"}
        value={groundSpeed.value}
        received_at={groundSpeed.received_at}
        enclosed_at={groundSpeed.enclosed_at}
      />

      <TelemetryCard
        telemetryName={"Throttle"}
        unit={"%"}
        value={throttle.value}
        received_at={throttle.received_at}
        enclosed_at={throttle.enclosed_at}
      />
    </Stack>
  )
}
