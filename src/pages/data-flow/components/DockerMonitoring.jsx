import React, { useEffect, useState } from "react"
import { Typography, Grid, Button, Autocomplete, TextField, Stack } from "@mui/material"
import axios from "axios"
import ByteBuffer from "bytebuffer"
import protobuf from "protobufjs"
import bundle from "../../../proto/bundle.json"
import TableDocker from "./TableDocker"

/* eslint-disable */
const URLdockers = [
  (process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL_ ? process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL_ : "http://localhost:8000") +
  "/rise/seahorse/docker-sdk/sh-1/docker/id",
  (process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL_ ? process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL_ : "http://localhost:8000") +
  "/rise/masslab/docker-sdk/masslab-3/docker/id",
  (process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL_ ? process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL_ : "http://localhost:8000") +
  "/rise/masslab/docker-sdk/masslab-4/docker/id",
  (process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL_ ? process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL_ : "http://localhost:8000") +
  "/rise/masslab/docker-sdk/ted/docker/id"
]
/* eslint-enable */

export default function DockerMonitoring() {
  const [timeMsg, setTimeMsg] = useState(null)
  const [dockerContainers, setDockerContainers] = useState([])
  const [URL, setURL] = useState("http://localhost:8000/rise/seahorse/docker-sdk/sh-1/docker/id")

  useEffect(() => {
    const interval = setInterval(() => {
      getDockerState()
    }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  function getDockerState() {
    
    console.log("🚀 ~ file: DockerMonitoring.jsx:32 ~ axios.get ~ URL:", URL)
    
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
          <Typography variant="caption">Last retrieved date at {timeMsg ? timeMsg : "-"}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" spacing={2} sx={{ margin: "0.5rem" }}>
            <Autocomplete
              freeSolo
              id="autocomplete-camera-url"
              options={URLdockers}
              sx={{ width: 800 }}
              value={URL}
              // onChange={(event, newValue) => {
              //   console.log("newValue", newValue);
              //   setURLcam(newValue)
              // }}
              onInputChange={(event, newValue) => {
                // console.log("newValue2", newValue);
                setURL(newValue)
              }}
              renderInput={params => <TextField {...params} label="URL" size="small" />}
            />
            <Button variant="contained" onClick={getDockerState}>
              Get Docker State
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <TableDocker dockerContainers={dockerContainers} URL={URL} />
        </Grid>
      </Grid>
    </div>
  )
}
