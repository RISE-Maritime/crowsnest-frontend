import React, { useState, useEffect } from "react"
import axios from "axios"
import ByteBuffer from "bytebuffer"
import protobuf from "protobufjs/minimal.js"
import bundle from "../../../../proto/bundle.json"
import jpeg from "jpeg-js"
import CamCanvas from "./CamCanvas"
import { Typography } from "@mui/material"

let frameCount = 0

export default function ViewWindow({ URLcam }) {
  const [camFrame, setCamFrame] = useState({ height: 1080, width: 1920, data: null, hasData: false })
  const [startTime, setStartTime] = useState(Date.now())
  const [metadata, setMetadata] = useState({
    camera: "Axis",
    model: "-",
  })

  useEffect(() => {
    console.log("Loaded CamFrameKeelson.jsx")
    const interval = setInterval(() => {
      getFrame(URLcam)
    }, 1000) // intervalMilliseconds

    return () => {
      clearInterval(interval)
    }
  }, [URLcam])

  const getFrame = URLcam => {
    // console.log("🚀 ~ file: CamFrameKeelson.jsx:88 ~ getFrame ~ URLcam", URLcam)
    axios.get(URLcam).then(res => {
      // console.log("🚀 ~ file: CamFrameKeelson.jsx:88 ~ axios.get ~ res:", res)

      let msgValue = res.data[0].value // Base64 encoded JPEG
      const root = protobuf.Root.fromJSON(bundle)
      let bytes = new Uint8Array(ByteBuffer.fromBase64(msgValue).toArrayBuffer())
      const Envelope = root.lookupType("Envelope")
      const CompressedVideo = root.lookupType("CompressedImage")
      const decodedEnvelope = Envelope.decode(bytes)
      const readable = CompressedVideo.decode(decodedEnvelope.payload)

      try {
        const { data, width, height } = jpeg.decode(readable.data, { useTArray: true })
        setCamFrame({ height: height, width: width, data: new Uint8ClampedArray(data), hasData: true })
      } catch (error) {
        console.error("Failed to decode JPEG frame:", error)
      }

      setMetadata(getMetadataFromEnvelope(decodedEnvelope))
    }).catch(err => {
      console.error("Failed to fetch frame from camera:", err)
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

  return (
    <>
      <CamCanvas jpegFrame={camFrame} />
      <Typography variant="body1" align="center">
        {metadata.envelope_time} {/*({metadata.latency})*/} 
      </Typography>
    </>
  )
}
