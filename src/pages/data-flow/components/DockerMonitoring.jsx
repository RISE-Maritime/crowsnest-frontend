import React, { useEffect, useState } from "react"
import { Typography, Grid, Button } from "@mui/material"
import axios from "axios"
import ByteBuffer from "bytebuffer"
import protobuf from "protobufjs"
import bundle from "../../../proto/bundle.json"
import TableDocker from "./TableDocker"

const URL = "http://localhost:8000/rise/seahorse/docker-sdk/sh-1/docker/id"

export default function DockerMonitoring() {

  const [timeMsg, setTimeMsg] = useState(null)
  const [dockerContainers, setDockerContainers] = useState([])

  useEffect(() => {
    // const interval = setInterval(() => {
    //   getDockerState()
    // }, 5000)
    // return () => {
    //   clearInterval(interval)
    // }
  }, [])

  function getDockerState() {
    axios.get(URL).then(res => {
      let time = new Date()
      console.log("Loop retrieved update: ", time, res)

      let data_values = res.data[0].value
      let bytes = new Uint8Array(ByteBuffer.fromBase64(data_values).toArrayBuffer())
      const root = protobuf.Root.fromJSON(bundle)
      const Envelope = root.lookupType("Envelope")
      const decodedEnvelope = Envelope.decode(bytes)
      const envelopeEncodedAtDate = new Date(
        decodedEnvelope.enclosedAt.seconds * 1000 + decodedEnvelope.enclosedAt.nanos / 1000000
      )
      setTimeMsg(envelopeEncodedAtDate.toLocaleString("sv-SV"))

      console.log("🚀 ~ file: DockerMonitoring.jsx:35 ~ axios.get ~ envelopeEncodedAtDate:", envelopeEncodedAtDate)
      
      let decoder = new TextDecoder("utf-8")
      let decodedData = decoder.decode(decodedEnvelope.payload)
      let jsonData = JSON.parse(decodedData)
      console.log("🚀 ~ file: DockerMonitoring.jsx:30 ~ axios.get ~ jsonData:", jsonData)
      setDockerContainers(jsonData)
    })
  }

  return (
    <div style={{ width: "100%" }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4">Docker Monitoring</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="caption">Last retrieved date at {timeMsg ? timeMsg : "-" }</Typography>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={getDockerState}>
            Get Docker State
          </Button>
        </Grid>

        <Grid item xs={12}>
          <TableDocker dockerContainers={dockerContainers}/>
        </Grid>

      </Grid>
    </div>
  )
}
