import React, { useState, useRef, useCallback , useEffect} from "react"
import axios from "axios"
import { Autocomplete, TextField, Stack, Grid, Typography, Divider, Slider } from "@mui/material"
import { ObcButton as Button } from "@oicl/openbridge-webcomponents-react/components/button/button"
import jpeg from "jpeg-js"
import ByteBuffer from "bytebuffer"
import protobuf from "protobufjs/minimal.js"
import bundle from "../../../../proto/bundle.json"
import CamCanvas from "./CamCanvas"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import StopIcon from "@mui/icons-material/Stop"
import CamFlowMetadata from "./MetadataCamFlow"
import MetadataTelemetry from "./MetadataTelemetry"
import { useKeelsonData } from "../../../../hooks/useKeelsonData"

/* eslint-disable */

let baseURL = process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL
  ? process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL
  : "http://localhost:8000"

/* eslint-enable */

const URLcameras = [
  baseURL + "/rise/v0/boatswain/pubsub/compressed_image/axis-2",
  baseURL + "/rise/boatswain/mediamtx/purpose/compressed_image/axis-1",
  baseURL + "/rise/marie/mediamtx/sealog-4/compressed_image/axis",
  baseURL + "/rise/marie/mediamtx/sealog-4/raw_image/axis",
  baseURL + "/rise/seahorse/mediamtx/sh-1/compressed_image/axis-1",
  baseURL + "/rise/seahorse/mediamtx/sh-1/compressed_image/axis-2",
  baseURL + "/rise/seahorse/mediamtx/sh-1/compressed_image/axis-3",
  baseURL + "/rise/seahorse/mediamtx/sh-1/compressed_image/axis-4",
  baseURL + "/rise/seahorse/mediamtx/sh-2/compressed_image/axis-5",
  baseURL + "/rise/seahorse/mediamtx/sh-2/compressed_image/axis-6",
  baseURL + "/rise/seahorse/mediamtx/sh-2/compressed_image/axis-7",
  baseURL + "/rise/seahorse/mediamtx/sh-2/compressed_image/axis-8",
]

const marks = [
  {
    value: -60,
    label: "60s",
  },
  {
    value: -30,
    label: "30s",
  },
  {
    value: -2,
    label: "",
  },
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "",
  },
  {
    value: 5,
    label: "",
  },
  {
    value: 10,
    label: "",
  },
  {
    value: 15,
    label: "",
  },
  {
    value: 30,
    label: "30",
  },

  {
    value: 60,
    label: "60",
  },

  {
    value: 120,
    label: "120",
  },
]

let frameCount = 0

export default function CamFrameKeelson() {
  let router = useRef()
  const [URLcam, setURLcam] = useState("")
  const [intervalFps, setIntervalFps] = useState(null)
  const [loopFps, setLoopFps] = useState(1)
  const [isActive, setIsActive] = useState("")
  const [AAFrame, setAAFrame] = useState({ height: 1080, width: 1920, data: null, hasData: false })
  // const [frameCount, setFrameCount] = useState(0)
  const [startTime, setStartTime] = useState(Date.now())
  const [metadata, setMetadata] = useState({
    camera: "Axis",
    model: "-",
  })

  const getFrame = () => {
    axios
      .get(URLcam)
      .then(res => {
        console.log("🚀 ~ file: CamFrameKeelson.jsx:88 ~ axios.get ~ res:", res)

        let msgValue = res.data[0].value // Base64 encoded JPEG
        const root = protobuf.Root.fromJSON(bundle)
        let bytes = new Uint8Array(ByteBuffer.fromBase64(msgValue).toArrayBuffer())
        const Envelope = root.lookupType("Envelope")
        const CompressedVideo = root.lookupType("CompressedImage")
        const decodedEnvelope = Envelope.decode(bytes)
        const readable = CompressedVideo.decode(decodedEnvelope.payload)

        try {
          const { data, width, height } = jpeg.decode(readable.data, { useTArray: true })
          setAAFrame({ height: height, width: width, data: new Uint8ClampedArray(data), hasData: true })
        } catch (error) {
          console.error("Failed to decode JPEG frame:", error)
        }

        setMetadata(getMetadataFromEnvelope(decodedEnvelope))
      })
      .catch(error => {
        console.error("Failed to get frame:", error)
      })
  }

  function getMetadataFromEnvelope(decodedEnvelope) {
    // Parsing Metadata
    const seconds = decodedEnvelope.enclosedAt.seconds
    const nanos = decodedEnvelope.enclosedAt.nanos

    // Convert seconds to milliseconds and nanoseconds to milliseconds, then add them together
    const envelopeEncodedAtDate = new Date(seconds * 1000 + nanos / 1000000)

    // Get the time difference in milliseconds
    let timeNow = new Date()
    const diffMs = timeNow - envelopeEncodedAtDate

    // Convert the time difference to seconds
    const diffSec = diffMs / 1000

    frameCount = frameCount + 1
    const elapsedTime = (Date.now() - startTime) / 1000
    const fps = frameCount / elapsedTime

    // setFrameCount(newFrameCount)

    return {
      ...metadata,
      envelope_date: envelopeEncodedAtDate.toLocaleDateString("sv-SE"),
      envelope_time: envelopeEncodedAtDate.toLocaleTimeString("sv-SE"),
      latency: diffSec,
      fps: fps,
      count: frameCount,
    }
  }

  const startFpsLoop = () => {
    // console.log("startFrameLoop", loopFps, typeof loopFps)
    setStartTime(Date.now())

    let intervalMilliseconds = 1000
    if (loopFps > 0) {
      intervalMilliseconds = (1 / loopFps) * 1000
    } else if (loopFps < 0) {
      intervalMilliseconds = -loopFps * 1000
    }

    const interval = setInterval(() => {
      getFrame()
    }, intervalMilliseconds)
    setIntervalFps(interval)
    setIsActive("loopFps")
  }

  const stopFpsLoop = () => {
    console.log("stopFrameLoop")
    clearInterval(intervalFps)
    setIsActive("")
  }

  function valuetext(value) {
    if (value > 0) {
      return `${value} FPS`
    } else if (value < 0) {
      return `${-value}s`
    }
  }

  function subParseFrame(e) {
    let zenohVal = JSON.parse(e.data)
    let bytes = new Uint8Array(ByteBuffer.fromBase64(zenohVal.value).toArrayBuffer())
    const root = protobuf.Root.fromJSON(bundle)
    const Envelope = root.lookupType("Envelope")
    const CompressedVideo = root.lookupType("CompressedImage")
    const decodedEnvelope = Envelope.decode(bytes)
    const readable = CompressedVideo.decode(decodedEnvelope.payload)

    try {
      const { data, width, height } = jpeg.decode(readable.data, { useTArray: true })
      setAAFrame({ height: height, width: width, data: new Uint8ClampedArray(data), hasData: true })
    } catch (error) {
      console.error("Failed to decode JPEG frame:", error)
    }

    setMetadata(getMetadataFromEnvelope(decodedEnvelope))
  }

  function startSubscribe() {
    setStartTime(Date.now())
    console.log("StartSubscribe")
    router.current = new EventSource(URLcam)
    router.current.addEventListener("PUT", subParseFrame, false)
    setIsActive("subscribing")
  }

  function stopUnsubscribe() {
    console.log("StopUnsubscribe")
    router.current.removeEventListener("PUT", subParseFrame, false)
    document.location.reload()
    setIsActive("")
  }





  // const onMessage = useCallback(e => {
  //   console.log(e)
  // }, [])


  // const newGet = () => {
  //     console.log("NewGet");
  // }


  // const some = useKeelsonData("http://localhost:8888", "rise/v0/masslab/pubsub/lever_position_pct/**", "get_loop", onMessage);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        {/* Action bar  */}

        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
          <Typography variant="h5" p={2}>
            Keelson
          </Typography>
          {/* <p>URL: {URLcam}</p> */}

          <Autocomplete
            freeSolo
            id="autocomplete-camera-url"
            options={URLcameras}
            sx={{ width: 800 }}
            value={URLcam}
            // onChange={(event, newValue) => {
            //   console.log("newValue", newValue);
            //   setURLcam(newValue)
            // }}
            onInputChange={(event, newValue) => {
              // console.log("newValue2", newValue);
              setURLcam(newValue)
            }}
            renderInput={params => <TextField {...params} label="URL" size="small" />}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} px={2}>
        {/* --- Data Getter --- */}
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0}>
          {/* Get single frame */}
          <Button disabled={isActive !== ""} onClick={getFrame}>
            Get Frame
          </Button>

          <Divider orientation="vertical" flexItem sx={{ margin: "0.5rem" }} />

          {/* --- Loop interval --- */}

          <Slider
            size="small"
            disabled={isActive !== ""}
            sx={{ width: 500, margin: "0rem 0.5rem" }}
            value={loopFps}
            track={false}
            onChange={event => {
              setLoopFps(event.target.value)
            }}
            marks={marks}
            valueLabelFormat={valuetext}
            valueLabelDisplay="auto"
            step={null}
            min={-60}
            max={120}
          />
          <Typography variant="subtitle1" sx={{ marginRight: "0.5rem" }}>
            FPS
          </Typography>

          {isActive === "loopFps" ? (
            <Button onClick={stopFpsLoop}>
              <StopIcon slot="leading-icon" /> Loop
            </Button>
          ) : (
            <Button onClick={startFpsLoop} disabled={isActive !== ""}>
              <PlayArrowIcon slot="leading-icon" /> Loop
            </Button>
          )}

          <Divider orientation="vertical" flexItem sx={{ margin: "0.5rem" }} />

          {/* --- Subscriber --- */}

          {isActive === "subscribing" ? (
            <Button onClick={stopUnsubscribe}>Unsubscribe</Button>
          ) : (
            <Button onClick={startSubscribe} disabled={isActive !== ""}>
              Subscribe
            </Button>
          )}

          <Divider orientation="vertical" flexItem sx={{ margin: "0.5rem" }} />

         

        </Stack>
      </Grid>

      <Grid item xs={10}>
        <br />
        <CamCanvas jpegFrame={AAFrame} />
      </Grid>
      <Grid item xs={2} p={1}>
        <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={0}>
          <CamFlowMetadata metadata={metadata} />
          <MetadataTelemetry />
        </Stack>
      </Grid>
    </Grid>
  )
}
