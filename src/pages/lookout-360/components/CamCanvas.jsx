import React, { useRef } from "react"
import { useEffect } from "react"

export default function CamCanvas({ jpegFrame }) {
  let canvasRef = useRef()

  useEffect(() => {
    if (jpegFrame.hasData) {
      const imageData = new ImageData(jpegFrame.data, jpegFrame.width, jpegFrame.height)
      const ctx = canvasRef.current.getContext("2d")
      ctx.putImageData(imageData, 0, 0)
    }
  }, [jpegFrame])

  return (
    <canvas
      id="efwepr"
      ref={canvasRef}
      height={jpegFrame?.height}
      width={jpegFrame?.width}
      style={{ width: "100%", backgroundColor: "#000" }}
    />
  )
}
