import React, { useEffect } from "react"

// State
import { useState } from "react"
import { useRecoilValue, atom, useSetRecoilState } from "recoil"
import WebSocketConnection, { sendMessage, wsMessageAtom } from "./components/WebSocketConnection.js"

// UI
import { TextField } from "@mui/material"
import { Typography } from "@mui/material"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"

import Chart from "./components/Chart.js"

// Imported Atoms
import { vesselTargetsAtom } from "./components/Chart.js"

// Component to send JSON messages to the server
function MessageSender() {
  const [inputA, setInputA] = useState(null)
  const [inputB, setInputB] = useState(null)
  return (
    <>
      <Stack spacing={2} direction="row">
        <Typography>Heading</Typography>
        <TextField
          onChange={event => {
            setInputA(event.target.value)
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            sendMessage("heading", { value: inputA })
          }}
        >
          Send
        </Button>
      </Stack>

      <Stack spacing={2} direction="row">
        <Typography>Rate Of Turn</Typography>
        <TextField
          onChange={event => {
            setInputB(event.target.value)
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            sendMessage("rate_of_turn", { value: inputB })
          }}
        >
          Send
        </Button>
      </Stack>
    </>
  )
}

// Component to display rate of turn
const rateOfTurnAtom = atom({
  key: "rate_of_turn",
  default: null,
})

function RateOfTurnDisplay() {
  const rateOfTurn = useRecoilValue(rateOfTurnAtom)
  return <Typography>ROT: {rateOfTurn}</Typography>
}

// Component to display heading
const headingAtom = atom({
  key: "heading",
  default: null,
})

function HeadingDisplay() {
  const heading = useRecoilValue(headingAtom)
  return <Typography>HDG: {heading}</Typography>
}

// Component to parse the websocket messages

function WsMessageParser() {
  const wsMessage = useRecoilValue(wsMessageAtom)
  const setRateOfTurn = useSetRecoilState(rateOfTurnAtom)
  const setHeading = useSetRecoilState(headingAtom)
  const setVesselTargets = useSetRecoilState(vesselTargetsAtom)

  useEffect(() => {
    switch (wsMessage.type) {
      case "rate_of_turn":
        setRateOfTurn(wsMessage.data.value)
        break

      case "heading":
        setHeading(wsMessage.data.value)
        break

      case "vessel_targets":
        setVesselTargets(wsMessage.data)
        break

      default:
        console.log("Received message with unknown type.")
    }
  })

  return null
}

export default function App() {
  return (
    <>
      <WebSocketConnection />
      <WsMessageParser />
      <Box
        sx={{
          position: "absolute",
          background: "white",
          left: 20,
          top: 20,
          height: 300,
          width: 300,
          padding: 5,
          borderColor: "black",
        }}
      >
        <MessageSender />
        <RateOfTurnDisplay />
        <HeadingDisplay />
      </Box>
      <Chart />
    </>
  )
}
