import { atom } from "recoil";

import PicGermanica from "../resources/platforms/germanica.png"
import PicSeahorse from "../resources/platforms/seahorse.png"
import PicLandkrabban from "../resources/platforms/landkrabban.png"
import PicVikingGrace from "../resources/platforms/viking_grace.png"
import PicJutlandica from "../resources/platforms/jutlandica.png"

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



// Mini apps show or hide mini apps (floating and resizable window)
export const showMiniAppsObj = atom({
  key: "showMiniAppsObj",
  default: {
    windCurrent: false,
    playback: false,
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






// Platforms saved 
export const atomPlatforms = atom({
  key: "platforms",
  default: {
    landkrabban: {
      name: "Landkrabban",
      key: "landkrabban",
      mmsi: 2,
      MQTTpath: "",
      picture: PicLandkrabban
    },
    germanica: {
      name: "Stena Germainca",
      key: "germanica",
      MQTTpath: "",
      mmsi: 266331000,
      imo: 9145176,
      picture: PicGermanica
    },
    seahorse: {
      name: "Seahorse",
      key: "seahorse",
      MQTTpath: "",
      mmsi: 3,
      imo: 0,
      picture: PicSeahorse
    }
  },
})


// AIS Platforms saved 
export const atomPlatformsAIS = atom({
  key: "platforms_ais",
  default: [
    {
      id: "viking_glory_platform",
      platformName: "VIKING GLORY",
      mmsi: 230041000,
      callsign: "OJTC",
      imo: 9827877,
      ship_type: "PASSENGER",
      to_bow: 25,
      to_port: 18,
      to_starboard: 18,
      to_stern: 198,
      
    },
    {
      id: "Viking_grace_kbralebr",
      platformName: "Viking Grace",
      mmsi: 230629000,
      picture: PicVikingGrace
    },
    {
      id: "tg_glory",
      platformName: "Stena Jutlandica",
      mmsi: 265410000,
      picture: PicJutlandica
    },
   
  ]
})

// Active platform STATIC data 
export const atomActivePlatform = atom({
  key: "active_platform",
  default: {
    activePlatformKey: "",
    activePlatformType: "PLATFORM", // [PLATFORM, AIS, DEVICE]
    platformName: "",
    MQTTpath: "",
    mmsi: 0,
    imo: 0,
    callsign: "OJTC",
    ship_type: "PASSENGER",
    to_bow: 25,
    to_port: 18,
    to_starboard: 18,
    to_stern: 198,
    picture: ""
  },
})

// ######################################
// ALL Realtime DATA 
// 
// Own ship operational data like sensors... 

export const OS_POSITION = atom({
  key: "os_position_state",
  default: {
    latitude: 0.0, // degrees 
    longitude: 0.0,  // degrees
    source: "MANUAL",
    status: "normal", // [normal, warning, error] 
    statusText: "Normal",
    timeCreated: ""
  },
});

export const OS_POSITIONS_AVAILABLE = atom({
  key: "os_positions_state",
  default: [{
    latitude: 57.70907, // degrees 
    longitude: 11.94741,  // degrees
    source: "manual",
    status: "normal", // [normal, warning, error] 
    statusText: "",
    timeCreated: ""
  }],
});


export const lidarStateAtom = atom({
  key: "lidar_state",
  default: {
    type: "lidar",
    mqttMessageCount: 0,
    timeDataLogged: "",
    delaySec: 0,
    connected: false
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


export const targetsAIS = atom({
  key: "targets_ais",
  default: [],
});

export const ownShipDataAtom = atom({
  key: "own_ship_data",
  default: {
    loa: 200, // length over all
    woa: 30, // width over all
  },
});