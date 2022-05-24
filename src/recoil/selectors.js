import { selector, useSetRecoilState } from "recoil";
import {
  userState,
  observationsStateAtom,
  playbackState,
  targetsAIS,
  lidarStateAtom,
  lidarObservationAtom,
  radarObservationAtom
} from "./atoms";
import { toRadians } from "../utils"
import messages from './radar_pb'


// import proto

export const selectUser = selector({
  key: "selectUser",
  get: ({ get }) => {
    // Try fetch from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser !== null) {
      return JSON.parse(savedUser);
    }
    return get(userState);
  },
});

let AISlist = {}
let last = 0;
let radarFrame = []
let isInside = false
let lastAzimute = -1
let spokeCount = 0

// Decode distances from spoke length and range metadata
const decode_distances = (spoke_length, _range) => {
  const step = _range / spoke_length
  let distanceArr = []

  for (let i = 1; i <= spoke_length; i++) {
    distanceArr.push(i * step)
  }

  return distanceArr
}

// Decode azimuth from integer spoke_direction"
const decode_azimuth = (spoke_direction) => {
  return spoke_direction / 4096 * 360
}



export const wsMessageParser = selector({
  key: "websocket_latest_message",
  get: () => {
    return null;
  },
  set: ({ set }, latestMessage) => {
    let source = "/NTpro";

    switch (latestMessage.topic) {
      // AIS messages  
      // case latestMessage.topic.match(/^CROWSNEST\/EXTERNAL\/AIS/)?.input: {

      //   const incomming = latestMessage.payload.message
      //   AISlist[incomming.mmsi] = {
      //     ...AISlist[incomming.mmsi],
      //     ...incomming,
      //     // loa: (AISlist[incomming.mmsi].to_bow + AISlist[incomming.mmsi].to_stern) || 100
      //   }

      //   const date = new Date();
      //   if (date.getTime() - last > 2000) {  // 2000
      //     last = date.getTime();
      //     set(targetsAIS, () => Object.values(AISlist))
      //   }

      //   break;
      // }

      case latestMessage.topic.match(/^CROWSNEST\/LANDKRABBA\/LIDAR\/0/)?.input: {
        // console.log(latestMessage.topic);
        // console.log(latestMessage.payload);
        set(lidarObservationAtom, () => (
          latestMessage.payload.message
        ));


        // LIDAR connection and transfer rate 
        const time_sent_at = new Date(latestMessage.payload.sent_at);
        const time_now = new Date()
        // const delay = new Date( time_sent_at.getTime() - time_now.getTime())
        const delay = (time_sent_at - time_now) / 11000 // Convert milliseconds to seconds 

        console.log("delay", delay);

        set(playbackState, (existing) => ({
          ...existing,
          delaySec: delay,
          connected: true
        }));

        break;
      }

      // case latestMessage.topic.match(/^CROWSNEST\/LANDKRABBA\/RADAR\/0\/SWEEP/)?.input: {
      //   // console.log(latestMessage.topic);
      //   // console.log(latestMessage.payload.message.toS);
      //   let frameR = JSON.parse(latestMessage.payload.toString())
      //   let radarFrame = []
      //   for (let i = 0; i < frameR.message.points.length; i++) {
      //     const radarPoint = {
      //       point: frameR.message.points[i],
      //       weight: frameR.message.weights[i],
      //       distance: Math.sqrt(Math.abs(frameR.message.points[i][0]) ** 2 + Math.abs(frameR.message.points[i][1]) ** 2)
      //     }
      //     radarFrame.push(radarPoint)
      //   }

      //   // console.log(radarFrame);

      //   set(radarObservationAtom, () => (
      //     radarFrame
      //   ));
      //   break;
      // }

      case latestMessage.topic.match(/^CROWSNEST\/LANDKRABBA\/RADAR\/0\/PROTOBUF/)?.input: {
        // console.log(latestMessage.topic);
        var message = messages.opendlv_proxy_RadarDetectionReading.deserializeBinary(new Uint8Array(latestMessage.payload))

        let arrPuls = message.getData()
        let range = message.getRange()
        let azimuth = decode_azimuth(message.getAzimuth())
        let distances = decode_distances(arrPuls.length, range)

        if (spokeCount % 2 === 0) {
          for (let i = 0; i < arrPuls.length; i++) {
            // Map from polar to cartesian coordinates
            let x = distances[i] * Math.cos(toRadians(azimuth))
            let y = distances[i] * Math.sin(toRadians(azimuth))
            let points = [x, y]
            const radarPoint = {
              point: points,
              weight: arrPuls[i],
              distance: distances[i]
            }
            radarFrame.push(radarPoint)
          }
        }

        spokeCount += 1

        if (azimuth < lastAzimute) {  // 2000
          set(radarObservationAtom, () => (
            radarFrame
          ));
          // console.log("frame", radarFrame);
          radarFrame = []
        }
        lastAzimute = azimuth
        break;
      }

      case source + "/playback":
        set(playbackState, (existing) => ({
          ...existing,
          ...latestMessage.payload.message,
        }));
        break;

      case source + "/observations/rudder/1":
        set(observationsStateAtom, (existing) => ({
          ...existing,
          ruderACTps: latestMessage.payload.message.angle,
        }));
        break;

      case source + "/observations/rudder/2":
        set(observationsStateAtom, (existing) => ({
          ...existing,
          ruderACTsb: latestMessage.payload.message.angle,
        }));
        break;

      case source + "/observations/rot/1":
        set(observationsStateAtom, (existing) => ({
          ...existing,
          rot: latestMessage.payload.message.rot,
        }));
        break;

      case source + "/observations/heading/1":
        set(observationsStateAtom, (existing) => ({
          ...existing,
          heading: latestMessage.payload.message.heading,
        }));
        break;

      case source + "/observations/ground_velocity/1":
        set(observationsStateAtom, (existing) => ({
          ...existing,
          cog: latestMessage.payload.message.cog,
          sog: latestMessage.payload.message.sog,
          sogBow: latestMessage.payload.message.sog_transverse_bow,
          sogStern: latestMessage.payload.message.sog_transverse_stern,
        }));
        break;

      default:
      // console.log("Unknown message of type " + latestMessage.topic);
      // console.log(latestMessage.payload.message);
    }
  },
});
