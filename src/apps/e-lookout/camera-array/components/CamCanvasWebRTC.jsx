import React, { useRef, useCallback, useState, useEffect } from "react"
import { useKeelsonData } from "../../../../hooks/useKeelsonData"
import protobuf from "protobufjs/minimal.js"
import bundle from "../../../../proto/bundle.json"
import ByteBuffer from "bytebuffer"
import jpeg from "jpeg-js"

// NOT IN USE
export default function CamCanvasFrame({ keyExpression }) {
  const refVideo = useRef()
  const refAudio = useRef()

  return (
    <>
      <audio ref={refAudio} autoPlay={true} />
      <video id={"video" } ref={refVideo} autoPlay={true} playsInline={true} width="100%">
        <p>Your browser doest support HTML5 video.</p>
      </video>
    </>
  )
}
