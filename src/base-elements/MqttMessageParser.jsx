// import React, { useEffect } from "react";
// import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
// import { playbackState, observationsState } from "../recoil/atoms";
// import { vesselTargetsAtom } from "./SeaChart.jsx";
// import { mqttMessageAtom } from "./MqttConnection.jsx";

// export default function MqttMessageParser() {
//   const mqttMessage = useRecoilValue(mqttMessageAtom);
//   const setVesselTargets = useSetRecoilState(vesselTargetsAtom);
//   const [playbackObj, setPlaybackObj] = useRecoilState(playbackState);
//   const [observations, setObservations] = useRecoilState(observationsState);

//   useEffect(() => {
//     console.log(mqttMessage.topic);

//     let newObs = {};

//     if (mqttMessage.topic.includes("AIS")) {
//       let targets = {};
//       let last = 0;
//       const vessel = JSON.parse(mqttMessage.payload.toString());
//       targets = { ...targets };
//       targets[vessel.mmsi] = vessel;
//       const date = new Date();
//       if (date.getTime() - last > 2000) {
//         last = date.getTime();
//         setVesselTargets(targets);
//       }
//     }
//     if (mqttMessage.topic == "/NTpro/playback") {
//       const payload = JSON.parse(mqttMessage.payload.toString());
//       console.log("MQTT PLAY:", {
//         ...playbackObj,
//         ...payload,
//       });
//       setPlaybackObj({
//         ...playbackObj,
//         ...payload,
//       });
//     } else if (mqttMessage.topic.includes("/NTpro/observations")) {
//       const inData = JSON.parse(mqttMessage.payload.toString());
//       console.log("MQTT:", inData);

//       if (
//         "https://mo-rise.github.io/brefv/0.1.0/messages/observations/rudder.json" ===
//         inData.message_type
//       ) {
//         console.log("RUDER " + inData.message.angle);

//         if (inData.message.sensor_id === "1") {
//           newObs = {
//             ...newObs,
//             ruderACTps: inData.message.angle,
//           };
//         } else if (inData.message.sensor_id === "2") {
//           newObs = {
//             ...newObs,
//             ruderACTsb: inData.message.angle,
//           };
//         }
//       }
//     } else {
//       console.log(
//         "Received MQTT message with topic " +
//           mqttMessage.topic +
//           mqttMessage.payload
//       );
//     }

//     setObservations({
//       ...observations,
//       ...newObs,
//     });
//   }, [mqttMessage]);

//   return <></>;
// }
