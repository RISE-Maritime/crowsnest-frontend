import React, { useEffect, useState, useRef } from "react"
import { Grid, Button } from "@mui/material"

import CamSelect from "./CamSelect"

export default function CamStream({ ID }) {
  const refVideo = useRef()
  const refAudio = useRef()

  useEffect(() => {
    console.log("V1", refVideo.current)
  }, [])

  return (
    <Grid container>
      <Grid item xs={12}>
        <CamSelect refV={refVideo} refA={refAudio} />
      </Grid>
      <Grid item xs={12} sx={{ border: "solid" }}>
        <audio ref={refAudio} autoPlay={true} />
        <video
          id={"video" + ID}
          ref={refVideo}
          autoPlay={true}
          playsInline={true}
          width="100%"

          //   height="auto"
        >
          
          <p>Your browser doest support HTML5 video.</p>{" "}
        </video>
      </Grid>
    </Grid>
  )
}
