import { selector } from "recoil";
import {
  userState,
  observationsStateAtom,
  playbackState,
  targetsAIS,
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

export const wsMessageParser = selector({
  key: "websocket_latest_message",
  get: () => {
    return null;
  },
  set: ({ set }, latestMessage) => {
    let source = "/NTpro";

    switch (latestMessage.topic) {
      case "/AIS": {
        let targets = {};
        let last = 0;
        const vessel = JSON.parse(latestMessage.payload.toString());
        targets = { ...targets };
        targets[vessel.mmsi] = vessel;
        const date = new Date();
        if (date.getTime() - last > 2000) {
          last = date.getTime();
          set(targetsAIS, () => targets);
        }

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
        console.log("Unknown message of type " + latestMessage.topic);
    }
  },
});
