import React, { useState, createRef } from "react"
import axios from "axios"
import { Button } from "@mui/material"
import jpeg from "jpeg-js"
import ByteBuffer from "bytebuffer"
import protobuf from "protobufjs/minimal.js"
import bundle from "../../../proto/bundle.json"

/* eslint-disable */
// let URL = process.env.REACT_APP_MQTT_PASSWORD ? process.env.REACT_APP_CAM_STREAM : "http://localhost:8000/rise/marie/**"
/* eslint-enable */


// TODO: Add configurable URL  
// TODO: Add subscribe & unsubscribe 
// TODO: Add Get frame by seconds (loop button)

export default function CamRaw() {
  let canvasRef = createRef()

  const getFrame = () => {
    axios.get("http://localhost:8000/rise/marie/mediamtx/sealog-4/compressed_image/axis").then(res => {
    // axios.get("http://localhost:8000/rise/marie/mediamtx/sealog-4/raw_image/axis").then(res => {
      let time = new Date()
      console.log("Raw CAM Response: ", time, res)

      let msgValue = res.data[0].value // Base64 encoded JPEG
      const root = protobuf.Root.fromJSON(bundle)
      let bytes = new Uint8Array(ByteBuffer.fromBase64(msgValue).toArrayBuffer())

      const Envelope = root.lookupType("Envelope")
      const CompressedVideo = root.lookupType("CompressedImage")
      const decodedMessage = Envelope.decode(bytes)
      const readable = CompressedVideo.decode(decodedMessage.payload)

      console.log("jpegFrame", readable)

      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      try {
       
        const { data, width, height } = jpeg.decode(readable.data, { useTArray: true })
        console.log("HERE",  width, height); // 1920 1080
        const imageData = new ImageData(new Uint8ClampedArray(data), width, height)
        ctx.putImageData(imageData, 0, 0)
      } catch (error) {
        console.error("Failed to decode JPEG frame:", error)
      }
    })
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={getFrame}>
        Get Frame
      </Button>
      <canvas ref={canvasRef} height={1080} width={1920} style={{width:"100%"}} />
    
    </div>
  )
}
