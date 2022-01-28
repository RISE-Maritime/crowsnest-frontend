import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import CamView from "./components/CamView"


// const options = {
//   // Clean session
//   connectTimeout: 4000,
//   // Auth
//   clientId: "muppet" + Math.random(),
//   username: "admin",
//   password: "verysecretadminpassword!",
//   protocolVersion: 5,
// };

// let client = mqtt.connect("wss://crowsnest.mo.ri.se:443/mqtt", options);

// var pc = null;

// function negotiate() {
//   pc.addTransceiver("video", { direction: "recvonly" });
//   pc.addTransceiver("audio", { direction: "recvonly" });
//   return pc
//     .createOffer()
//     .then(function (offer) {
//       return pc.setLocalDescription(offer);
//     })
//     .then(function () {
//       // wait for ICE gathering to complete
//       return new Promise(function (resolve) {
//         if (pc.iceGatheringState === "complete") {
//           resolve();
//         } else {
//           // eslint-disable-next-line no-inner-declarations
//           function checkState() {
//             if (pc.iceGatheringState === "complete") {
//               pc.removeEventListener("icegatheringstatechange", checkState);
//               resolve();
//             }
//           }
//           pc.addEventListener("icegatheringstatechange", checkState);
//         }
//       });
//     })
//     .then(function () {
//       var offer = pc.localDescription;
//       var payload = JSON.stringify({
//         sdp: offer.sdp,
//         type: offer.type,
//       });

//       client.on("message", function (topic, message) {
//         pc.setRemoteDescription(JSON.parse(message.toString()));
//       });
//       client.subscribe("/random/topic");

//       client.publish("/test/test/offer", payload, {
//         properties: {
//           responseTopic: "/random/topic",
//           correlationData: text2Binary("hej"),
//         },
//       });
//     })
//     .catch(function (e) {
//       alert(e);
//     });
// }

// function text2Binary(string) {
//   return string
//     .split("")
//     .map(function (char) {
//       return char.charCodeAt(0).toString(2);
//     })
//     .join(" ");
// }

// function start() {
//   var config = {
//     sdpSemantics: "unified-plan",
//   };

//   // Always use a STUN server for ICE
//   config.iceServers = [{ urls: ["stun:stun.l.google.com:19302"] }];

//   pc = new RTCPeerConnection(config);

//   // connect audio / video
//   pc.addEventListener("track", function (evt) {
//     if (evt.track.kind == "video") {
//       document.getElementById("video").srcObject = evt.streams[0];
//     } else {
//       document.getElementById("audio").srcObject = evt.streams[0];
//     }
//   });

//   negotiate();
// }

// function stop() {
//   // close peer connection
//   setTimeout(function () {
//     pc.close();
//   }, 500);
// }

export default function CamLookout() {
  useEffect(() => {
  
  }, []);

  return (
    <Grid container>
      <Grid item xs={6} sx={{ border: "solid" }}>
        <CamView/>
      </Grid>
    </Grid>
  );
}
