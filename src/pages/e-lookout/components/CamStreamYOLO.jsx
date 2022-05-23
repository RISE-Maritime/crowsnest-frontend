import React, { useEffect, useState, useRef } from "react"
import { Grid, Button } from "@mui/material"
import "@tensorflow/tfjs"
import * as cocoSsd from "@tensorflow-models/coco-ssd"

import CamSelect from "./CamSelect"

export default function CamStreamYOLO({ ID }) {
  const [objectDetected, setObjectDetected] = useState([])
  const refVideo = useRef()
  const refAudio = useRef()
  const refCanvas = useRef()



  const detectFrame = (video, model) => {
    model.detect(video, 10, 0).then(predictions => {
      setObjectDetected(predictions)
      renderPredictions(predictions)
      requestAnimationFrame(() => {
        detectFrame(video, model)
      })
    })
  }

  const renderPredictions = predictions => {
    const ctx = refCanvas.current.getContext("2d")
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    // Font options.
    const font = "30px sans-serif"
    ctx.font = font
    ctx.textBaseline = "top"
    predictions.forEach(prediction => {
      const x = prediction.bbox[0]
      const y = prediction.bbox[1]
      const width = prediction.bbox[2]
      const height = prediction.bbox[3]
      // Draw the bounding box.
      ctx.strokeStyle = "#00FFFF"
      ctx.lineWidth = 4
      ctx.strokeRect(x, y, width, height)
      // Draw the label background.
      ctx.fillStyle = "#00FFFF"
      const textWidth = ctx.measureText(prediction.class).width
      const textHeight = parseInt(font, 10) // base 10
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4)
    })

    predictions.forEach(prediction => {
      const x = prediction.bbox[0]
      const y = prediction.bbox[1]
      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#000000"
      ctx.fillText(prediction.class, x, y)
    })
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <CamSelect
          refV={refVideo}
          refA={refAudio}
          refCanvas={refCanvas}
          detectFrame={detectFrame}
          setObjectDetected={setObjectDetected}
        />
      </Grid>
      <Grid item xs={12} sx={{ border: "solid", position: "relative" }}>
        <audio ref={refAudio} autoPlay={true} />
        <video id={"video" + ID} ref={refVideo} autoPlay={true} playsInline={true} width="100%">
          <p>Your browser doest support HTML5 video.</p>
        </video>

        <canvas
          ref={refCanvas}
          width="1920"
          height="1080"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        />
      </Grid>
      <Grid item xs={12}>
        {objectDetected.map(obj => {
          return (
            <>
              <h2>
                {obj.class} | {obj.score}
              </h2>
            </>
          )
        })}
      </Grid>
    </Grid>
  )
}
