import React, { useRef } from "react"
import { Grid } from "@mui/material"
import CamSelect from "./CamSelect"

export default function CamStream({ ID }) {
  const refVideo = useRef()
  const refAudio = useRef()

  return (
    <Grid container>
      <Grid item xs={12}>
        <CamSelect refV={refVideo} refA={refAudio} />
        {/* <CamSelectH2 refV={refVideo} refA={refAudio}/> */}
      </Grid>
      <Grid item xs={12} sx={{ border: "solid" }}>
        <audio ref={refAudio} autoPlay={true} />
        <video id={"video" + ID} ref={refVideo} autoPlay={true} playsInline={true} width="100%">
          <p>Your browser doest support HTML5 video.</p>{" "}
        </video>
      </Grid>
    </Grid>
  )
}
