import React, { useRef, useState } from "react"
import { useEffect } from "react"

export default function CamCanvas({ jpegFrame }) {
  const [camWidth, setCamWidth] = useState("100%")
  let canvasRef = useRef()

  useEffect(() => {
    if (jpegFrame.hasData) {
      const imageData = new ImageData(jpegFrame.data, jpegFrame.width, jpegFrame.height)
      const ctx = canvasRef.current.getContext("2d")
      ctx.putImageData(imageData, 0, 0)
    }
  }, [jpegFrame])

  function toggelWidth() {
    if (camWidth === "100%") {
      setCamWidth("200%")
      console.log("200%");
    } else {
      setCamWidth("100%")
      console.log("100%");
    }
  }

  return (
    <canvas
      onClick={toggelWidth}
      id="efwepr"
      ref={canvasRef}
      height={jpegFrame?.height}
      width={jpegFrame?.width}
      style={{ width: camWidth,  zIndex: camWidth !== "100&" ? 0 : 10,  backgroundColor: "#000" }}
    />
  )
}
