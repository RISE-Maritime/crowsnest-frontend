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
  key: "app_state",
  default: {
    activeView: "Active view",
    activeMode: "DEMO MODE",
    activeVessel: "DEMO Vessel",
    appActiveColorTheme: "dark",
  },
});


export const userState = atom({
  key: "user_state",
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



// Local DB 


// Platforms saved 
export const atomPlatforms = atom({
  key: "platforms",
  default: {
    landkrabban: {
      name: "Landkrabban",
      key: "landkrabban",
      mmsi: 2,
      imo: 2,
      source_position: "DEVISE",
      MQTTpath: "LANDKRABBAN",
      picture: PicLandkrabban
    },
    germanica: {
      name: "Stena Germainca",
      key: "germanica",
      source_position: "DEVISE",
      MQTTpath: "GERMANICA",
      mmsi: 266331000,
      imo: 9145176,
      picture: PicGermanica
    },
    seahorse: {
      name: "Seahorse",
      key: "seahorse",
      source_position: "GNSS_0",
      MQTTpath: "SEAHORSE",
      mmsi: 3,
      imo: 3,
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


// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------


// Active platform STATIC data 
export const atomActivePlatform = atom({
  key: "active_platform",
  default: {
    activePlatformType: "PLATFORM", // [PLATFORM, AIS, DEVICE]
    platformName: "Seahorse",
    MQTTpath: "SEAHORSE",
    mmsi: 3,
    imo: 3,
    callsign: "",
    ship_type: "",
    to_bow: 4,
    to_port: 1,
    to_starboard: 1,
    to_stern: 1,
    picture: PicSeahorse,
    destination: "",
    draught: 0.5,
    operation_state: "",
    operation_state_s: ""
  },
})

// ######################################
// ALL Realtime DATA 
// 
// OS Sensor or data source in use of components globally 
// 
//  os_X_setting ->> Selected active source in use  
//  os_X ->> Object include all sources of same value type   


// POSITION 

export const OS_POSITION_SETTING = atom({
  key: "os_position_stetting",
  default: {
    source: "GNSS_0",
    status: "normal", // [normal, warning, error] 
    statusText: "Normal",
    timeCreated: ""
  },
});


export const OS_POSITIONS = atom({
  key: "os_positions_state",
  default: {
    AIS: {
      latitude: 0.0, // degrees 
      longitude: 0.0,  // degrees
      altitude: 0.0, // meters
      std_dev_altitude: 0.0,
      std_dev_longitude: 0.0,
      std_dev_latitude: 0.0,
      status: "normal", // [normal, warning, error] 
      statusText: "Normal",
      timeCreated: null,
      delay: null // Delay in system 
    },
    GNSS_0: {
      latitude: 0.0, // degrees 
      longitude: 0.0,  // degrees
      altitude: 0.0, // meters
      std_dev_altitude: 0.0,
      std_dev_longitude: 0.0,
      std_dev_latitude: 0.0,
      status: "normal", // [normal, warning, error] 
      statusText: "Normal",
      timeCreated: null,
      delay: null // Delay in system 
    },
    DEVISE: {
      latitude: 0.0, // degrees 
      longitude: 0.0,  // degrees
      altitude: 0.0, // meters
      std_dev_altitude: 0.0,
      std_dev_longitude: 0.0,
      std_dev_latitude: 0.0,
      accuracy: null, // meters 
      status: "normal", // [normal, warning, error] 
      statusText: "Normal",
      timeCreated: null,
      delay: null
    },
    MANUAL: {
      latitude: 0.0, // degrees 
      longitude: 0.0,  // degrees
      altitude: 0.0, // meters
      std_dev_altitude: 0.0,
      std_dev_longitude: 0.0,
      std_dev_latitude: 0.0,
      status: "normal", // [normal, warning, error] 
      statusText: "Normal",
      timeCreated: null,
      delay: null
    }
  },
});


// VELOCITY Ground stabilized  

export const OS_VELOCITY_SETTING = atom({
  key: "os_velocity_stetting",
  default: {
    source: "GNSS_0",
    status: "normal", // [normal, warning, error] 
    statusText: "Normal",
    timeCreated: "" // Delay in system 
  },
});

export const OS_VELOCITY = atom({
  key: "os_velocity_state",
  default: {
    AIS: {
      sog: 0.0, // knots 
      cog: 0.0, // degrees
      rot: 0.0, // degrees per minute 
      status: "normal", // [normal, warning, error] 
      statusText: "Normal",
      timeCreated: "" // Delay in system 
    },
    DEVISE: {
      sog: 0.0, // units? 
      cog: 0.0, // units?
      status: "normal", // [normal, warning, error] 
      statusText: "Normal",
      timeCreated: "" // Delay in system 
    },
    GNSS_0: {
      sog: 0.0, // units? 
      cog: 0.0, // units?
      status: "normal", // [normal, warning, error] 
      statusText: "Normal",
      timeCreated: "" // Delay in system 
    },
    MANUAL: {
      sog: 0.0, // knots 
      cog: 0.0, // units?
      status: "normal", // [normal, warning, error] 
      statusText: "Normal",
      timeCreated: "" // Delay in system 
    }
  },
});


// HEADING  

export const OS_HEADING_SETTING = atom({
  key: "os_heading_stetting",
  default: {
    source: "GNSS_0",
    status: "normal", // [normal, warning, error] 
    statusText: "Normal",
    timeCreated: "" // Delay in system 
  },
});

export const OS_HEADING = atom({
  key: "os_heading_state",
  default: {
    AIS: {
      heading: 0.0, // degrees 
      heading_accuracy: 0.0,
      status: "normal", // [normal, warning, error] 
      statusText: "Normal",
      timeCreated: "" // Delay in system 
    },
    GNSS_0: {
      heading: 0.0, // degrees 
      heading_accuracy: 0.0,
      status: "normal", // [normal, warning, error] 
      statusText: "Normal",
      timeCreated: "" // Delay in system 
    },
    DEVISE: {
      heading: 0.0, // degrees
      heading_accuracy: 0.0,
      status: "normal", // [normal, warning, error] 
      statusText: "Normal",
      timeCreated: "" // Delay in system 
    },
    MANUAL: {
      heading: 0.0, // degrees
      heading_accuracy: 0.0,
      status: "normal", // [normal, warning, error] 
      statusText: "Normal",
      timeCreated: "" // Delay in system 
    }
  },
});



// LIDAR 

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



// RADAR

export const OS_RADAR_0 = atom({
  key: "radar_observation_state_0",
  default: [],
});

export const OS_RADAR_1 = atom({
  key: "radar_observation_state_1",
  default: [],
});

export const AtomShoreRadarSetting = atom({
  key: "atom_shore_radar_setting",
  default: {range_change: 145},
});

export const AtomOSRadarSetting = atom({
  key: "atom_OS_radar_setting",
  default: {range_change: 50  },
});

export const AtomShoreRadarObservation = atom({
  key: "atom_shore_radar_observation",
  default: [],
});

export const AtomShoreRadar_1 = atom({
  key: "atom_shore_radar_1",
  default: [],
});

/* message example
{ 
  "sent_at": "2023-02-17T15:27:27.930746+00:00", 
  "message": 
    {
      "wind_angle": 95, 
      "reference": "R", 
      "wind_speed": 0.1, 
      "wind_speed_units": "M", 
      "status": "A"
    }}
*/

// WIND 
export const OS_WIND_SETTING = atom({
  key: "os_wind_stetting",
  default: {
    source: "WIND_0",
    reference_angel: "R",
    status: "normal", // [normal, warning, error] 
    statusText: "Normal",
    timeCreated: "" // Delay in system 
  },
});

export const OS_WIND = atom({
  key: "os_wind_state",
  default: {
    WIND_0: {
      wind_angle: 0, 
      wind_speed: 0.0, 
      reference_angel: "R",
      status: "normal", // [normal, warning, error] 
      statusText: "A", // A NMEA?
      timeCreated: "" // Delay in system 
    }
  }
})


// -----------------------------------------------------------
// Data Flow 

// Remote MQTT 

export const atomMqttRemoteAccount = atom({
  key: "atom_mqtt_remote_account",
  default: {
    username: "",
    password: "",
    isLoading: false,
  },
});

export const atomMqttRemoteState = atom({
  key: "atom_mqtt_remote_state",
  default: { connected: false },
})

// Local MQTT

export const atomMqttTopics = atom({
  key: "atom_mqtt_topics",
  default: {},
});

export const atomMqttTopicsUnhandled = atom({
  key: "atom_mqtt_topics_unhandled",
  default: {},
});

export const atomMQTTLocalState = atom({
  key: "atom_mqtt_local_state",
  default: { connected: false },
})


// HW monitoring 

export const atomHWlog = atom({
  key: "atom_hw_log",
  default: {  },
  // default: { 
  //   "/CROWSNEST/EXAMPLE/HW/0/JSON": {

  //     "gpus": [],
  //     "partition": [
  //       {
  //         "device": "/dev/sda2",
  //         "mountpoint": "/etc/resolv.conf",
  //         "total_size": "115.78GB",
  //         "used_size": "17.23GB",
  //         "free_size": "92.62GB",
  //         "percent_used": 15.7
  //       },
  //       {
  //         "device": "/dev/sda2",
  //         "mountpoint": "/etc/hostname",
  //         "total_size": "115.78GB",
  //         "used_size": "17.23GB",
  //         "free_size": "92.62GB",
  //         "percent_used": 15.7
  //       },
  
  //     ]
  //   }
   


  //  },
})




// -----------------------------------------------------------
// Bellow to be removed 


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