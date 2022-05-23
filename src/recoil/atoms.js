import { atom } from "recoil";

const localStorageEffect =
  (key) =>
    ({ setSelf, onSet }) => {
      const savedValue = localStorage.getItem(key);
      if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet(({ remember, ...newValue }, _, isReset) => {
        if (isReset) {
          localStorage.removeItem(key);
        } else {
          if (remember) {
            localStorage.setItem(key, JSON.stringify(newValue));
          }
        }
      });
    };

// App Settings / State
export const appState = atom({
  key: "appState",
  default: {
    activeView: "Active view",
    activeMode: "DEMO MODE",
    activeVessel: "DEMO Vessel",
    appActiveColorTheme: "dark",
  },
});

// Mini apps show or hide mini apps (floating and resizable window)
export const showMiniAppsObj = atom({
  key: "showMiniAppsObj",
  default: {
    windCurrent: false,
    playback: false,
  },
});

export const themeModeState = atom({
  key: "themeModeValue",
  default: "light",
});

export const userState = atom({
  key: "user",
  default: {
    accessToken: "",
    username: "",
    role: "",
    userGroup: "Test account",
    isLoading: false,
    error: null,
    remember: false,
  },
  effects_UNSTABLE: [localStorageEffect("current_user")],
});

export const observationsStateAtom = atom({
  key: "observation_state",
  default: {
    ruderACTps: 0,
    ruderACTsb: 0,
    rot: 0,
    heading: 0,
    cog: 0,
    sog: 0,
    sogBow: 0,
    sogStern: 0,
  },
});

export const actionStateAtom = atom({
  key: "action_state",
  default: {
    ruderSETps: 0,
    ruderSETsb: 0,
  },
});

export const playbackState = atom({
  key: "playback_state",
  default: {
    duration: 30,
    timeline_position: 0,
    is_playing: false,
  },
});

export const targetsAIS = atom({
  key: "targets_ais",
  default: {
    duration: 30,
    timeline_position: 0,
    is_playing: false,
  },
});

export const ownShipDataAtom = atom({
  key: "own_ship_data",
  default: {
    loa: 200, // length over all
    woa: 30, // width over all
  },
});


// Platforms 
export const atomPlatforms = atom({
  key: "platforms",
  default: {
    landkrabban: {
      name: "Landkrabban",
      key: "landkrabban",
      MQTTpath: "",
    
    },
    germanica: {
      name: "Stena Germainca",
      key: "germanica",
      MQTTpath: "",
      mmsi: 266331000,
      imo: 9145176
    }
  },
})

// Active platform
export const atomActivePlatform = atom({
  key: "active_platform",
  default: {
    activePlatformKey: "",
    activePlatformType: "PLATFORM", // [PLATFORM, AIS, DEVICE]
    platformName: "",
    MQTTpath: "",
    mmsi: 0
  },
})


export const OS_POSITION = atom({
  key: "os_position_state",
  default: {
   latitude: 57.70958, // degrees 
   longitude: 11.9466,  // degrees
   source: "manual",
   status: "normal", // [normal, warning, error] 
   statusText: ""
  },
});

export const lidarObservationAtom = atom({
  key: "lidar_observation_state",
  default: [],
});

export const radarObservationAtom = atom({
  key: "radar_observation_state",
  default: [],
});

