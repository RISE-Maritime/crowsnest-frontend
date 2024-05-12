import React, { useRef, useCallback, useState, useEffect } from "react"
import { useKeelsonData } from "../../../../hooks/useKeelsonData"
import protobuf from "protobufjs/minimal.js"
import bundle from "../../../../proto/bundle.json"
import ByteBuffer from "bytebuffer"
import jpeg from "jpeg-js"

export default function CamCanvasFrame({ keyExpression }) {
  let canvasRef = useRef()

  const [AAFrame, setAAFrame] = useState({ height: 1080, width: 1920, data: null, hasData: false })

  const onMessage = useCallback(envelope => {
    // console.log(envelope)

    let msgValue = envelope.value // Base64 encoded JPEG
    const root = protobuf.Root.fromJSON(bundle)
    let bytes = new Uint8Array(ByteBuffer.fromBase64(msgValue).toArrayBuffer())
    const Envelope = root.lookupType("Envelope")
    const CompressedVideo = root.lookupType("CompressedImage")
    const decodedEnvelope = Envelope.decode(bytes)
    const readable = CompressedVideo.decode(decodedEnvelope.payload)

    try {
      const { data, width, height } = jpeg.decode(readable.data, { useTArray: true })

      if (width !== AAFrame.width || height !== AAFrame.height) {
        setAAFrame({ height: height, width: width, data: new Uint8ClampedArray(data), hasData: true })
      }

      const imageData = new ImageData(new Uint8ClampedArray(data), width, height)
      const ctx = canvasRef.current.getContext("2d")
      ctx.putImageData(imageData, 0, 0)
    } catch (error) {
      console.error("Failed to decode JPEG frame:", error)
    }
  }, [])

  useKeelsonData(keyExpression, "get_loop", onMessage)

  return (
    <canvas
      id="efwepr"
      ref={canvasRef}
      height={AAFrame?.height}
      width={AAFrame?.width}
      style={{ width: "100%", backgroundColor: "#000" }}
    />
  )
}
