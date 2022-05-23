import { selector, useSetRecoilState } from "recoil";
import {
  userState,
  observationsStateAtom,
  playbackState,
  targetsAIS,
  lidarObservationAtom,
  radarObservationAtom
} from "./atoms";


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

export const wsMessageParser = selector({
  key: "websocket_latest_message",
  get: () => {
    return null;
  },
  set: ({ set }, latestMessage) => {
    let source = "/NTpro";

    switch (latestMessage.topic) {
      // AIS messages  
      case latestMessage.topic.match(/^CROWSNEST\/EXTERNAL\/AIS/)?.input: {

        const incomming = latestMessage.payload.message
        AISlist[incomming.mmsi] = {
          ...AISlist[incomming.mmsi],
          ...incomming,
          // loa: (AISlist[incomming.mmsi].to_bow + AISlist[incomming.mmsi].to_stern) || 100
        }

        const date = new Date();
        if (date.getTime() - last > 2000) {  // 2000
          last = date.getTime();
          set(targetsAIS, () => Object.values(AISlist))
        }

        break;
      }

      case latestMessage.topic.match(/^CROWSNEST\/LANDKRABBA\/LIDAR\/0/)?.input: {
        // console.log(latestMessage.topic);
        // console.log(latestMessage.payload);
        set(lidarObservationAtom, () => (
          latestMessage.payload.message
        ));
        break;
      }

      case latestMessage.topic.match(/^CROWSNEST\/LANDKRABBA\/RADAR\/0/)?.input: {
        // console.log(latestMessage.topic);
        // console.log(latestMessage.payload.message);
        let radarFrame = []
        for (let i = 0; i < latestMessage.payload.message.points.length; i++) {
          const radarPoint = {
            point: latestMessage.payload.message.points[i],
            weight: latestMessage.payload.message.weights[i],
            distance: Math.sqrt(Math.abs(latestMessage.payload.message.points[i][0]) ** 2 + Math.abs(latestMessage.payload.message.points[i][1]) ** 2)
          }
          radarFrame.push(radarPoint)
        }

        // console.log(radarFrame);

        set(radarObservationAtom, () => (
          radarFrame
        ));
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
