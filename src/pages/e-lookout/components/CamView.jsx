import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import mqtt from "precompiled-mqtt";

/* eslint-disable */
const options = {
  // Clean session
  connectTimeout: 4000,
  // Auth
  clientId: "muppet" + Math.random(),
  // username: "admin",
  username: process.env.REACT_APP_WEBRTC_USERNAME,
  // password: "verysecretadminpassword!",
  password: process.env.REACT_APP_WEBRTC_PASSWORD,
  protocolVersion: 5,
};
/* eslint-enable */

function text2Binary(string) {
  return string
    .split("")
    .map(function (char) {
      return char.charCodeAt(0).toString(2);
    })
    .join(" ");
}

export default function CamLookout() {
  const [rtcCon, setRtcCon] = useState(null);

  useEffect(() => {
    start();
    return () => {
      stop();
    };
  }, []);

  const pushedStart = () => {
    start();
  };

  const pushedStop = () => {
    stop();
  };

  function stop() {
    // close peer connection
    console.log("CLOSE");
    // rtcCon.close();
  }

  const start = () => {
    const config = {
      sdpSemantics: "unified-plan",
      iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }], // Always use a STUN server for ICE
    };
    let pc = new RTCPeerConnection(config);
    setRtcCon(pc);

    console.log("Start");
    let client = mqtt.connect("wss://crowsnest.mo.ri.se:443/mqtt", options);

    // connect audio / video
    pc.addEventListener("track", function (evt) {
      console.log("HERE", evt);
      if (evt.track.kind == "video") {
        document.getElementById("video").srcObject = evt.streams[0];

        console.log("EVENT", evt.streams[0]);
      } else {
        document.getElementById("audio").srcObject = evt.streams[0];
      }
    });

    pc.addTransceiver("video", { direction: "recvonly" });
    pc.addTransceiver("audio", { direction: "recvonly" });

    pc.createOffer()
      .then(function (offer) {
        setRtcCon(pc.setLocalDescription(offer));
        return pc.setLocalDescription(offer);
      })
      .then(function () {
        // wait for ICE gathering to complete
        return new Promise(function (resolve) {
          if (pc.iceGatheringState === "complete") {
            resolve();
          } else {
            // eslint-disable-next-line no-inner-declarations
            function checkState() {
              if (pc.iceGatheringState === "complete") {
                pc.removeEventListener("icegatheringstatechange", checkState);
                resolve();
              }
            }
            pc.addEventListener("icegatheringstatechange", checkState);
          }
        });
      })
      .then(function () {
        var offer = pc.localDescription;
        var payload = JSON.stringify({
          sdp: offer.sdp,
          type: offer.type,
        });

        client.on("message", function (topic, message) {
          console.log(JSON.parse(message.toString()));
          pc.setRemoteDescription(JSON.parse(message.toString()));
        });
        client.subscribe("/random/topic");

        client.publish("/test/test/offer", payload, {
          properties: {
            responseTopic: "/random/topic",
            correlationData: text2Binary("hej"),
          },
        });
      })
      .catch(function (e) {
        alert(e);
      });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button onClick={pushedStart}>Start</Button>
        <Button onClick={pushedStop}>Stop</Button>
      </Grid>
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
  );
}
