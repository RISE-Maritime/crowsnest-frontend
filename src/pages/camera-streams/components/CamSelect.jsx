import React from "react"
import { Button } from "@mui/material"
import "@tensorflow/tfjs"
import axios from "axios"

export default function CamSelect({ refV, refA,  ID }) {
  const startCamera = camID => {
    refV.onplay = () => {
      console.log("playing")
    }

    console.log("(1) start camera: " + camID)

    /* eslint-disable */
    const options = {
      // Clean session
      connectTimeout: 30000,
      // Auth
      clientId: "muppetA" + Math.random(),
      username: process.env.REACT_APP_MQTT_USERNAME,
      password: process.env.REACT_APP_MQTT_PASSWORD,
      protocolVersion: 5,
    }
    /* eslint-enable */

    let pc = null

    var config = {
      sdpSemantics: "unified-plan",
      iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }], // Always use a STUN server for ICE
    }

    // MQTT
    // let client = mqtt.connect("wss://crowsnest.mo.ri.se:443/mqtt", options)
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
        axios
          .post("http://localhost:8001/rise/marie/mediamtx/sealog-4/rpc/whep", {
            path: "axis",
            sdp: offer.sdp,
          })
          .then(response => {
            console.log("response", response.data)

            let sdpNew = response.data[0][1]

            console.log("res:", sdpNew)

            pc.setRemoteDescription(
              new RTCSessionDescription({
                type: "answer",
                sdp: sdpNew,
              })
            )
          })
      })

      .catch(function (e) {
        console.log("Error Cam Select", e)
      })
  }

  return (
    <div>
      <Button onClick={() => startCamera(ID)}>Start</Button>
    </div>
  )
}
