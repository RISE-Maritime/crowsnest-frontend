import React, { useState, useRef } from "react"
import CamCanvasV2 from "./CamCanvasFrame"
import axios from "axios"
import { Grid, Stack } from "@mui/material"
import { ObcButton as Button } from "@oicl/openbridge-webcomponents-react/components/button/button"
import { Obi13CameraOn as IconCameraOn } from "@oicl/openbridge-webcomponents-react/icons/icon-13-camera-on"

/**
 * Camera controller for single frame sent by Keelson protocol
 *
 * Component: CamCanvasFrame
 */

/* eslint-disable */
let URL_WEB_RTC =
  (process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL ? process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL : "http://localhost:8000") +
  "/rise/v0/boatswain/rpc/mediamtx/whep"
/* eslint-enable */

export default function CamControllerFrame({ defaultSelected }) {
  const [selectedCameraId, setSelectedCameraId] = useState(defaultSelected)

  const refVideo = useRef()
  const refAudio = useRef()

  const startCamera = camID => {
    setSelectedCameraId(camID)
    let pc = null

    refVideo.onplay = () => {
      console.log("playing")
    }

    console.log("(1) starting camera: " + camID)

    var config = {
      sdpSemantics: "unified-plan",
      iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }], // Always use a STUN server for ICE
    }

    pc = new RTCPeerConnection(config)

    // connect audio / video
    pc.addEventListener("track", function (evt) {
      console.log("#", evt)

      if (evt.track.kind == "video") {
        refVideo.current.srcObject = evt.streams[0]
        console.log("V2", refVideo.current.srcObject)
      } else {
        refAudio.current.srcObject = evt.streams[0]
      }
    })

    pc.addTransceiver("video", { direction: "recvonly" })
    pc.addTransceiver("audio", { direction: "recvonly" })

    pc.createOffer()
      .then(function (offer) {
        console.log("offer", offer)
        return pc.setLocalDescription(offer)
      })
      .then(function () {
        // wait for ICE gathering to complete
        return new Promise(function (resolve) {
          if (pc.iceGatheringState === "complete") {
            resolve()
          } else {
            // eslint-disable-next-line no-inner-declarations
            function checkState() {
              if (pc.iceGatheringState === "complete") {
                pc.removeEventListener("icegatheringstatechange", checkState)
                resolve()
              }
            }

            pc.addEventListener("icegatheringstatechange", checkState)
          }
        })
      })
      .then(function () {
        var offer = pc.localDescription



        console.log("Request ULR: " + URL_WEB_RTC)

        axios
          .post(URL_WEB_RTC, {
            path: "cam-" + camID,
            sdp: offer.sdp,
          })
          .then(response => {
            console.log("response ONE", response)
            console.log("response DATA", response.data)

            if (response.data.length > 0) {
              let sdpNew = response.data[0].value

              console.log("res:", sdpNew)

              pc.setRemoteDescription(
                new RTCSessionDescription({
                  type: "answer",
                  sdp: sdpNew,
                }),
              )
            } else {
              console.log("Empty response data")
            }
          }).catch(function (e) {
            console.log("WebRTC Error", e)
          })
      })

      .catch(function (e) {
        console.log("Error Cam Select", e)
      })
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Stack direction="row" spacing={2}>
          <Button variant="check" checked={selectedCameraId == "axis-1" ? true : false} onClick={() => startCamera("axis-1")}>
            <IconCameraOn slot={"leading-icon"} size="24" />1
          </Button>

          <Button variant="check" checked={selectedCameraId == "axis-2" ? true : false} onClick={() => startCamera("axis-2")}>
            <IconCameraOn slot={"leading-icon"} size="24" />2
          </Button>

          <Button variant="check" checked={selectedCameraId == "axis-3" ? true : false} onClick={() => startCamera("axis-3")}>
            <IconCameraOn slot={"leading-icon"} size="24" />3
          </Button>

          <Button variant="check" checked={selectedCameraId == "axis-4" ? true : false} onClick={() => startCamera("axis-4")}>
            <IconCameraOn slot={"leading-icon"} size="24" />4
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12} sx={{ border: "solid" }}>
        <audio ref={refAudio} autoPlay={true} />
        <video id={"video-id"} ref={refVideo} autoPlay={true} playsInline={true} width="100%">
          <p>Your browser doest support HTML5 video.</p>
        </video>
      </Grid>
    </Grid>
  )
}
