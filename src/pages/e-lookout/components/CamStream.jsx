import React, { useEffect, useState } from "react"
import { Grid, Button } from "@mui/material"
import mqtt from "precompiled-mqtt"

/* eslint-disable */
const options = {
  // Clean session
  connectTimeout: 4000,
  // Auth
  clientId: "muppet" + Math.random(),
  username: process.env.REACT_APP_WEBRTC_USERNAME,
  password: process.env.REACT_APP_WEBRTC_PASSWORD,
  protocolVersion: 5,
}
/* eslint-enable */

function text2Binary(string) {
  return string
    .split("")
    .map(function (char) {
      return char.charCodeAt(0).toString(2)
    })
    .join(" ")
}

function checkState(pc, resolve) {
  if (pc.iceGatheringState === "complete") {
    pc.removeEventListener("icegatheringstatechange", checkState)
    resolve()
  }
}

function negotiate(pc, client, requestTopic) {
  pc.addTransceiver("video", { direction: "recvonly" })
  pc.addTransceiver("audio", { direction: "recvonly" })
  return pc
    .createOffer()
    .then(function (offer) {
      return pc.setLocalDescription(offer)
    })
    .then(function () {
      // wait for ICE gathering to complete
      return new Promise(function (resolve) {
        if (pc.iceGatheringState === "complete") {
          resolve()
        } else {
          checkState(pc, resolve)
          pc.addEventListener("icegatheringstatechange", checkState)
        }
      })
    })
    .then(function () {
      var offer = pc.localDescription
      var payload = JSON.stringify({
        sdp: offer.sdp,
        type: offer.type,
      })

      var responseTopic = "muppet" + Math.random()

      client.on("message", function (topic, message) {
        client.unsubscribe(responseTopic)
        pc.setRemoteDescription(JSON.parse(message.toString()))
      })
      client.subscribe(responseTopic)

      client.publish(requestTopic, payload, {
        properties: {
          responseTopic: responseTopic,
          correlationData: text2Binary("hej"),
        },
      })
    })
    .catch(function (e) {
      alert(e)
    })
}

export default function CamStream() {
  
  useEffect(() => {
    let client = mqtt.connect("wss://crowsnest.mo.ri.se:443/mqtt", options)
    var pc = null
    const requestTopic = "CROWSNEST/LANDKRABBA/WEBRTC/axis-1"

    var config = {
      sdpSemantics: "unified-plan",
    }

    // Always use a STUN server for ICE
    config.iceServers = [{ urls: ["stun:stun.l.google.com:19302"] }]

    pc = new RTCPeerConnection(config)

    // connect audio / video
    pc.addEventListener("track", function (evt) {
      if (evt.track.kind == "video") {
        document.getElementById("video").srcObject = evt.streams[0]
      } else {
        document.getElementById("audio").srcObject = evt.streams[0]
      }
    })

    negotiate(pc, client, requestTopic)

    return () => {
      pc.close()
    }
  }, [])

  return (
    <Grid container>
      <Grid item xs={12} sx={{ border: "solid" }}>
        <audio id="audio" autoPlay={true}></audio>
        <video
          id="video"
          autoPlay={true}
          playsInline={true}
          width="100%"
          //   height="auto"
        ></video>
      </Grid>
    </Grid>
  )
}
