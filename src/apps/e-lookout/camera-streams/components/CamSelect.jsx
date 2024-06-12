import React from "react"
import axios from "axios"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { ObcButton as Button } from "@oicl/openbridge-webcomponents-react/components/button/button"


/* eslint-disable */
let BASE_URL_WEB_RTC =
  (process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL ? process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL : "http://localhost:8000") 
/* eslint-enable */

export default function CamSelect({ refV, refA, ID, platform }) {
  
  const startCamera = camID => {
    refV.onplay = () => {
      console.log("playing")
    }

    console.log("(1) start camera: " + camID)


    let pc = null

    var config = {
      sdpSemantics: "unified-plan",
      iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }], // Always use a STUN server for ICE
    }


    pc = new RTCPeerConnection(config)

    // connect audio / video
    pc.addEventListener("track", function (evt) {
      console.log("#", evt)

      if (evt.track.kind == "video") {
        refV.current.srcObject = evt.streams[0]
        console.log("V2", refV.current.srcObject)
      } else {
        refA.current.srcObject = evt.streams[0]
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

        console.log("SENDING TO: ", { sdp: offer.sdp, mediamtx_path: "example" })

        console.log("send sdp:", offer.sdp)

        let URL = BASE_URL_WEB_RTC+"/rise/v0/"+ platform +"/rpc/mediamtx/whep"

        console.log("Request ULR: " + URL)

        axios
        .post(URL, {
            path: "cam-axis-1",
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
                })
              )

              
            } else {
              console.log("Empty response data")
            }
          })
      })

      .catch(function (e) {
        console.log("Error Cam Select", e)
      })
  }

  return (
    <div>
      <Button onClick={() => startCamera(ID)}>
        <PlayArrowIcon slot="leading-icon" /> Start {platform} 
      </Button>
    </div>
  )
}
