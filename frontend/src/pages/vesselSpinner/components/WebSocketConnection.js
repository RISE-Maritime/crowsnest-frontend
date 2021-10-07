import React from 'react';

// State
import { useState, useEffect } from 'react';
import { atom, useSetRecoilState } from 'recoil'

// Material-UI
import { Backdrop } from '@mui/material';
import { Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';

export const wsMessageAtom = atom({
  key: 'ws_message',
  default: {}
})

let ws = new WebSocket("ws://127.0.0.1:9999/ws")

export const sendMessage = (type, data) => {
  ws.send(JSON.stringify({
    type: type,
    data: { ...data }
  }))
}

export default function WebSocketConnection() {

  const [connected, setConnected] = useState(false)
  const setWsMessage = useSetRecoilState(wsMessageAtom)

  useEffect(() => {
    ws.onopen = () => {
      console.log("WebSocket CONNECTED")
      setConnected(true)
    }
    ws.onclose = () => {
      console.log("WebSocket DISCONNECTED")
      setConnected(false)
    }
    ws.onmessage = event => {
      var wsMessage = JSON.parse(event.data)
      console.log("received")
      console.log(wsMessage)
      setWsMessage(wsMessage)
    }
  }, [setWsMessage])

  const connectionBackdrop = connected ? <></> : <Backdrop open>
    <CircularProgress />
    <Typography color="primary">
      Connecting ...
    </Typography>
  </Backdrop>

  return connectionBackdrop

}
