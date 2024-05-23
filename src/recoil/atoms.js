import { atom } from "recoil"

import PicGermanica from "../resources/platforms/germanica.png"
import PicSeahorse from "../resources/platforms/seahorse.png"
import PicLandkrabban from "../resources/platforms/landkrabban.png"
import PicVikingGrace from "../resources/platforms/viking_grace.png"
import PicJutlandica from "../resources/platforms/jutlandica.png"
import PicGota from "../resources/platforms/farja_gota.jpg"

const localStorageEffect =
  (key, alwaysRemember) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue))
    }

    onSet(({ remember, ...newValue }, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key)
      } else {
        if (remember || alwaysRemember) {
          localStorage.setItem(key, JSON.stringify(newValue))
        }
      }
    })
  }

// App Settings / State
export const appState = atom({
  key: "app_state",
  default: {
    activeView: "Active view",
    activeMode: "DEMO MODE",
    activeVessel: "DEMO Vessel",
    appActiveColorTheme: "day",
  },
  effects: [localStorageEffect("app_state", true)],
})

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
})

// Mini apps show or hide mini apps (floating and resizable window)
export const showMiniAppsObj = atom({
  key: "showMiniAppsObj",
  default: {
    windCurrent: false,
    playback: false,
    controls: false,
  },
})

export const playbackState = atom({
  key: "playback_state",
  default: {
    duration: 30,
    timeline_position: 0,
    is_playing: false,
  },
})

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
      source_position: "DEVICE",
      MQTTpath: "LANDKRABBAN",
      picture: PicLandkrabban,
    },
    germanica: {
      name: "Stena Germainca",
      key: "germanica",
      source_position: "DEVICE",
      MQTTpath: "GERMANICA",
      mmsi: 266331000,
      imo: 9145176,
      picture: PicGermanica,
    },
    seahorse: {
      name: "Seahorse",
      key: "seahorse",
      source_position: "GNSS_0",
      MQTTpath: "SEAHORSE",
      mmsi: 3,
      imo: 3,
      picture: PicSeahorse,
    },
    gota: {
      name: "Göta",
      key: "gota",
      source_position: "GNSS_0",
      MQTTpath: "",
      mmsi: 265522230,
      imo: 8311481,
      callsign: "SFHQ",
      picture: PicGota,
    },
    mass_lab: {
      name: "MASS LAB",
      key: "masslab",
      source_position: "GNSS_0",
      MQTTpath: "",
      mmsi: 265522230,
      imo: 8311481,
      callsign: "SFHQ",
      picture: PicGota,
    },
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
      picture: PicVikingGrace,
    },
    {
      id: "tg_glory",
      platformName: "Stena Jutlandica",
      mmsi: 265410000,
      picture: PicJutlandica,
    },
  ],
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
    operation_state_s: "",
  },
})

// Route areas
export const atomRouteDescription = atom({
  key: "route_description",
  default: {
    name: "Route name",
    description: "Route description",
    settings: {
      polylineMinDistanceBetweenPoints: 10,
      polylineMinDistanceUnits: "m",
      radiusUnits: "m",
      bearingUnits: "deg",
      speedUnits: "kn",
      turnUnits: "deg",
      turnRadiusUnits: "m",
      turnRateUnits: "deg/min",
      xteUnits: "m",
      xtePolygonUnits: "m",
      xteSafetyZonePolygonUnits: "m",
      groundingLinePolygonUnits: "m",
    },
  },
})

// Route description
export const atomRouteAreas = atom({
  key: "route_areas",
  default: [
    {
      xteLinePort: 0,
      xteLineStarboard: 0,
      xtePolygon: [],
      xtSafetyZonePolygon: [],
      groundingLinePolygon: [],
    },
  ],
})

// Route waypoints
export const atomRouteWaypoints = atom({
  key: "route_waypoints",
  default: [
    {
      id: 0,
      name: "Start",
      note: "Waypoint description",
      latitude: 1,
      longitude: 1,
      radius: 0,
      course: 0,
      speed: 10,
    },
    {
      id: 1,
      name: "Turn",
      note: "Waypoint description",
      latitude: 1.5,
      longitude: 1,
      radius: 1,
      course: 0,
      speed: 10,
    },
    {
      id: 2,
      name: "End",
      note: "Waypoint description",
      latitude: 1.5,
      longitude: 2,
      radius: 1,
      course: 90,
      speed: 10,
    },
  ],
})

// Route waypoint turning radius
export const atomRouteTurningRadius = atom({
  key: "atom_route_turning_radius",
  default: [],
})

// Route waypoint turning radius
export const atomRouteTurningRadiusCenter = atom({
  key: "atom_route_turning_radius_center",
  default: [],
})

// Route waypoint turning radius START
export const atomRouteTurningRadiusStart = atom({
  key: "atom_route_turning_radius_start",
  default: [],
})

// Route waypoint turning radius END
export const atomRouteTurningRadiusEnd = atom({
  key: "atom_route_turning_radius_end",
  default: [],
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
    source: "SIM",
    status: "normal", // [normal, warning, error]
    statusText: "Normal",
    timeCreated: "",
  },
})

export const OS_POSITIONS = atom({
  key: "os_positions_state",
  default: {
    AIS: {
      latitude: 0.0, // degrees
      longitude: 0.0, // degrees
      altitude: 0.0, // meters
      std_dev_altitude: 0.0,
      std_dev_longitude: 0.0,
      std_dev_latitude: 0.0,
      status: "normal", // [normal, warning, error]
      statusText: "Normal",
      timeCreated: null,
      delay: null, // Delay in system
    },
    GNSS_0: {
      latitude: 57.6866, // degrees
      longitude: 11.8523, // degrees
      altitude: 0.0, // meters
      std_dev_altitude: 0.0,
      std_dev_longitude: 0.0,
      std_dev_latitude: 0.0,
      status: "normal", // [normal, warning, error]
      statusText: "Normal",
      timeCreated: null,
      delay: null, // Delay in system
    },
    DEVICE: {
      latitude: 0.0, // degrees
      longitude: 0.0, // degrees
      altitude: 0.0, // meters
      std_dev_altitude: 0.0,
      std_dev_longitude: 0.0,
      std_dev_latitude: 0.0,
      accuracy: null, // meters
      status: "normal", // [normal, warning, error]
      statusText: "Normal",
      timeCreated: null,
      delay: null,
    },
    MANUAL: {
      latitude: 0.0, // degrees
      longitude: 0.0, // degrees
      altitude: 0.0, // meters
      std_dev_altitude: 0.0,
      std_dev_longitude: 0.0,
      std_dev_latitude: 0.0,
      status: "normal", // [normal, warning, error]
      statusText: "Normal",
      timeCreated: null,
      delay: null,
    },
    SIM: {
      latitude: 57.683, // degrees
      longitude: 11.84, // degrees
      altitude: 0.0, // meters
      std_dev_altitude: 0.0,
      std_dev_longitude: 0.0,
      std_dev_latitude: 0.0,
      status: "normal", // [normal, warning, error]
      statusText: "Normal",
      timeCreated: null,
      delay: null,
    },
  },
})

// VELOCITY Ground stabilized

export const OS_VELOCITY_SETTING = atom({
  key: "os_velocity_stetting",
  default: {
    source: "SIM",
    status: "normal", // [normal, warning, error]
    statusText: "Normal",
    timeCreated: "", // Delay in system
  },
})

export const OS_VELOCITY = atom({
  key: "os_velocity_state",
  default: {
    AIS: {
      sog: 0.0, // knots
      cog: 0.0, // degrees
      rot: 0.0, // degrees per minute
      status: "normal", // [normal, warning, error]
      statusText: "Normal",
      timeCreated: "", // Delay in system
    },
    DEVICE: {
      sog: 0.0, // units?
      cog: 0.0, // units?
      rot: 0.0, // degrees per minute
      status: "normal", // [normal, warning, error]
      statusText: "Normal",
      timeCreated: "", // Delay in system
    },
    GNSS_0: {
      sog: 0.0, // units?
      cog: 0.0, // units?
      rot: 0.0, // degrees per minute
      status: "normal", // [normal, warning, error]
      statusText: "Normal",
      timeCreated: "", // Delay in system
    },
    MANUAL: {
      sog: 0.0, // knots
      cog: 0.0, // units?
      rot: 0.0, // degrees per minute
      status: "normal", // [normal, warning, error]
      statusText: "Normal",
      timeCreated: "", // Delay in system
    },
    SIM: {
      sog: 0.0, // knots
      cog: 80.0, // units?
      rot: 0.0, // degrees per minute
      status: "normal", // [normal, warning, error]
      statusText: "Normal",
      timeCreated: "", // Delay in system
    },
  },
})

// HEADING

export const OS_HEADING_SETTING = atom({
  key: "os_heading_stetting",
  default: {
    source: "SIM",
    status: "normal", // [normal, warning, error]
    statusText: "Normal",
    timeCreated: "", // Delay in system
  },
})

export const OS_HEADING = atom({
  key: "os_heading_state",
  default: {
    AIS: {
      heading: 0.0, // degrees
      heading_accuracy: 0.0,
      status: "normal", // [normal, warning, error]
      statusText: "Normal",
      timeCreated: "", // Delay in system
    },
    GNSS_0: {
      heading: 0.0, // degrees
      heading_accuracy: 0.0,
      status: "normal", // [normal, warning, error]
      statusText: "Normal",
      timeCreated: "", // Delay in system
    },
    DEVICE: {
      heading: 0.0, // degrees
      heading_accuracy: 0.0,
      status: "normal", // [normal, warning, error]
      statusText: "Normal",
      timeCreated: "", // Delay in system
    },
    MANUAL: {
      heading: 0.0, // degrees
      heading_accuracy: 0.0,
      status: "normal", // [normal, warning, error]
      statusText: "Normal",
      timeCreated: "", // Delay in system
    },
    SIM: {
      heading: 80.0, // degrees
      heading_accuracy: 0.0,
      status: "normal", // [normal, warning, error]
      statusText: "Normal",
      timeCreated: "", // Delay in system
    },
  },
})

// LIDAR

export const lidarStateAtom = atom({
  key: "lidar_state",
  default: {
    type: "lidar",
    mqttMessageCount: 0,
    timeDataLogged: "",
    delaySec: 0,
    connected: false,
  },
})

export const lidarObservationAtom = atom({
  key: "lidar_observation_state",
  default: [],
})

// RADAR

export const OS_RADAR_0 = atom({
  key: "radar_observation_state_0",
  default: [],
})

export const OS_RADAR_0_SWEEP = atom({
  key: "radar_observation_state_0_sweep",
  default: [],
})

export const OS_RADAR_1 = atom({
  key: "radar_observation_state_1",
  default: [],
})

export const OS_RADAR_1_SWEEP = atom({
  key: "radar_observation_state_1_sweep",
  default: [],
})

export const AtomShoreRadarSetting = atom({
  key: "atom_shore_radar_setting",
  default: { range_change: 145 },
})

export const AtomOSRadarSetting = atom({
  key: "atom_OS_radar_setting",
  default: { range_change: 50 },
})

export const AtomShoreRadarObservation = atom({
  key: "atom_shore_radar_observation",
  default: [],
})

export const AtomShoreRadar_1 = atom({
  key: "atom_shore_radar_1",
  default: [],
})

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
    timeCreated: "", // Delay in system
  },
})

export const OS_WIND = atom({
  key: "os_wind_state",
  default: {
    WIND_0: {
      wind_angle: 0,
      wind_speed: 0.0,
      reference_angel: "R",
      status: "normal", // [normal, warning, error]
      statusText: "A", // A NMEA?
      timeCreated: "", // Delay in system
    },
  },
})

export const ATOM_OS_THRUSTERS = atom({
  key: "atom_os_thrusters",
  default: {
    THRUSTER_0: {
      setPower: 0,
      actPower: 0,
      thrust: 0,
      status: "normal", // [normal, warning, error]
      statusText: "Normal",
      timeUpdated: "", // Delay in system
    },
    THRUSTER_1: {
      setPower: 0,
      actPower: 0,
      thrust: 0.0,
      status: "normal", // [normal, warning, error]
      statusText: "Normal",
      timeUpdated: "", // Delay in system
    },
  },
})

//
export const ATOM_OS_ENGINES = atom({
  key: "atom_os_engines",
  default: {
    ENGINE_0: {
      setPower: 0, // -100 to 100 --> displayed as %
      actPower: 0, // -100 to 100 --> displayed as %
      status: "normal", // [normal, warning, error]
      statusText: "Normal",
      timeUpdated: "", // Delay in system
    },
    ENGINE_1: {
      setPower: 0,
      actPower: 0,
      status: "normal", // [normal, warning, error]
      statusText: "Normal",
      timeUpdated: "", // Delay in system
    },
  },
})

export const ATOM_OS_RUDDERS = atom({
  key: "atom_os_rudders",
  default: {
    RUDDER_0: {
      setAngle: 0,
      actAngle: 0,
      status: "normal", // [normal, warning, error]
      statusText: "Normal",
      timeUpdated: "", // Delay in system
      maxAngle: 60,
    },
    RUDDER_1: {
      setAngle: 0,
      actAngle: 0,
      status: "normal", // [normal, warning, error]
      statusText: "Normal",
      timeUpdated: "", // Delay in system
      maxAngle: 60,
    },
  },
})

export const ATOM_OS_COMMAND = atom({
  key: "atom_os_command",
  default: {
    guiInCommand: false,
    unitInCommand: "Nobody knows",
  },
})

// -----------------------------------------------------------
// Data Flow
// -----------------------------------------------------------

// KEELSON

export const atomKeelsonConnectionState = atom({
  key: "atom_keelson_connection_state",
  default: false,
})

export const ATOM_KEELSON_KEYEXP_MANAGED = atom({
  key: "atom_keelson_key_expression_managed",
  default: {},
})

export const ATOM_KEELSON_KEYEXP_UNMANAGED = atom({
  key: "atom_keelson_key_expression_unmanaged",
  default: {},
})

export const atom_OS_AZIMUTH_LEFT = atom({
  key: "atomOS_AZIMUTH",
  default: {
    vertical: 0,
    horizontal: 0,
  },
})

/* eslint-disable */
export const atomKeelsonService = atom({
  key: "atom_keelson_services",
  default: {
    host: "http://localhost:8000",
    subscriptionKey: "/PONTOS/**",
    defaultHosts: ["http://localhost:8000"],
  },
})
/* eslint-enable */

export const atomKeelsonConONOFF = atom({
  key: "atom_keelson_onoff",
  default: false,
})

// MQTT

export const atomMQTTConONOFF = atom({
  key: "atom_mqtt_onoff",
  default: false,
})

/* eslint-disable */
export const atomMQTTservice = atom({
  key: "atom_mqtt_services",
  default: {
    host: "wss://crowsnest.mo.ri.se:443/mqtt",
    username: process.env.REACT_APP_MQTT_USERNAME ? process.env.REACT_APP_MQTT_USERNAME : "",
    password: process.env.REACT_APP_MQTT_PASSWORD ? process.env.REACT_APP_MQTT_PASSWORD : "",
    defaultHosts: ["wss://crowsnest.mo.ri.se:443/mqtt", "ws://localhost:80/mqtt"],
  },
})
/* eslint-enable */

export const atomMQTTconnectionState = atom({
  key: "atom_mqtt_connection_state",
  default: false,
})

export const atomMQTTtopics = atom({
  key: "atom_mqtt_topics",
  default: {},
})

export const atomMQTTtopicsUnhandled = atom({
  key: "atom_mqtt_topics_unhandled",
  default: {},
})

// Device
export const atomDeviceConnectionState = atom({
  key: "atom_device_connection_state",
  default: false,
})

//
//
// HW monitoring

export const atomHWlog = atom({
  key: "atom_hw_log",
  default: {},
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
})

export const actionStateAtom = atom({
  key: "action_state",
  default: {
    ruderSETps: 0,
    ruderSETsb: 0,
  },
})

export const targetsAIS = atom({
  key: "targets_ais",
  default: [],
})

export const ownShipDataAtom = atom({
  key: "own_ship_data",
  default: {
    loa: 200, // length over all
    woa: 30, // width over all
  },
})

// Route Editor Right Click Menu
export const atomRouteEditorRightClickMenu = atom({
  key: "route_editor_right_click_menu",
  default: { xPos: 0, yPos: 0, showMenu: false },
})

// PONTOS

export const atomPontosVesselList = atom({
  key: "atom_pontos_vessel_list",
  default: [
    {
      vessel_id: "example_vessel",
    },
    {
      vessel_id: "imo_7522148",
      name: "Linda",
      imo: 7522148,
      mmsi: 265549760,
      vessel_type: "roadferry",
      route: "Nordöleden (Ökerö)",
      company: "Färjerederiet",
    },
    {
      vessel_id: "imo_7932018",
      name: "Ada",
      imo: 7932018,
      mmsi: 265522210,
      vessel_type: "roadferry",
      route: "Hönöleden (Hönö)",
      company: "Färjerederiet",
    },
    {
      vessel_id: "imo_7943354",
      name: "Capella",
      imo: 7943354,
      mmsi: 265725450,
      vessel_type: "ferry",
      route: "Norrfjärden - Holmön (Holmön)",
      company: "Färjerederiet",
    },
    {
      vessel_id: "imo_8602713",
      name: "Buro",
      imo: 8602713,
      mmsi: 265513810,
      vessel_type: "ferry",
      route: "Björkö",
      company: "",
    },
    {
      vessel_id: "imo_8612055",
      name: "Marie",
      imo: 8612055,
      mmsi: 265522240,
      vessel_type: "roadferry",
      route: "Hönöleden (Hönö)",
      company: "Färjerederiet",
    },
    {
      vessel_id: "imo_8804440",
      name: "Yxlan",
      imo: 8804440,
      mmsi: 265546920,
      vessel_type: "roadferry",
      route: "Karlskrona - Aspö (Aspö)",
      company: "Färjerederiet",
    },
    {
      vessel_id: "imo_8816900",
      name: "Ebba Brahe",
      imo: 8816900,
      mmsi: 265523890,
      vessel_type: "roadferry",
      route: "Gränna - Visingsö (Gränna)",
      company: "Färjerederiet",
    },
    {
      vessel_id: "imo_9007116",
      name: "Tycho Brahe",
      imo: 9007116,
      mmsi: 219230000,
      vessel_type: "roadferry",
      route: "Helsingborg - Helsingör (Helsingborg)",
      company: "Scandlines",
    },

    {
      vessel_id: "imo_9007128",
      name: "AURORA AF HELSINGBORG",
      imo: 9007128,
      mmsi: 265041000,
      vessel_type: "roadferry",
      route: "Helsingborg - Helsingör (Helsingborg)",
      company: "Scandlines",
    },
    {
      vessel_id: "imo_9150030",
      name: "HAMLET",
      imo: 9150030,
      mmsi: 219622000,
      vessel_type: "roadferry",
      route: "Helsingborg - Helsingör (Helsingborg)",
      company: "Scandlines",
    },
    {
      vessel_id: "mmsi_265546940",
      name: "MERKURIUS",
      imo: 0,
      mmsi: 265546940,
      vessel_type: "roadferry",
      route: "Furusund",
      company: "Färjerederiet",
    },
    {
      vessel_id: "mmsi_265558290",
      name: "FRAGANCIA",
      imo: 0,
      mmsi: 265558290,
      vessel_type: "roadferry",
      route: "Oxdjupet",
      company: "Färjerederiet",
    },
    {
      vessel_id: "mmsi_265585310",
      name: "JUPITER",
      imo: 0,
      mmsi: 265585310,
      vessel_type: "roadferry",
      route: "Vaxholm",
      company: "Färjerederiet",
    },
    {
      vessel_id: "name_SD401Fredrika",
      name: "Fredrika",
      imo: 0,
      mmsi: 0,
      vessel_type: "fishing",
      route: "",
      company: "",
    },
    {
      vessel_id: "name_froja",
      name: "Fröja",
      imo: 0,
      mmsi: 0,
      vessel_type: "roadferry",
      route: "Isöleden (Isö)",
      company: "Färjerederiet",
    },
    {
      vessel_id: "name_sedna",
      name: "Sedna",
      imo: 0,
      mmsi: 0,
      vessel_type: "roadferry",
      route: "Vinöleden i Hjälmaren",
      company: "Färjerederiet",
    },
    {
      vessel_id: "name_skidbladner",
      name: "Skidbladner",
      imo: 0,
      mmsi: 0,
      vessel_type: "roadferry",
      route: "Håkansta och Norderön",
      company: "Färjerederiet",
    },
  ],
})

// -----------------------------------------------------------
// Simulator data

// Route Editor Right Click Menu
export const ATOM_SIM_STATE = atom({
  key: "atom_sim_state",
  default: { updateMilSec: 100, milSecElapsed: 0, state: "STOPPED", runTimeSpeedUp: 1 },
})

export const ATOM_SIM_ACTIVE_MODELS = atom({
  key: "atom_sim_active_models",
  default: "bulk_small",
})

export const ATOM_SIM_SHIP_MODELS = atom({
  key: "atom_sim_ship_models",
  default: {
    bulk_small: {
      id: "bulk_small",
      name: "Bulk small",
      length: 100,
      width: 10,
      height: 10,
      draught: 5,
      picture: null,
      icon: null,
      engine_newton: 1500,
      mass_kg: 3000000,
      resistance: 6500,
    },
    bulk_medium: {
      id: "bulk_medium",
      name: "Bulk medium",
      length: 100,
      width: 10,
      height: 10,
      draught: 5,
      picture: null,
      icon: null,
      engine_newton: 2000,
      mass_kg: 5000000,
      resistance: 7500,
    },
    bulk_large: {
      id: "bulk_large",
      name: "Bulk large",
      length: 100,
      width: 10,
      height: 10,
      draught: 5,
      picture: null,
      icon: null,
      engine_newton: 3000,
      mass_kg: 8000000,
      resistance: 9500,
    },
    road_ferry: {
      id: "road_ferry",
      name: "Road ferry",
      length: 80,
      width: 15,
      height: 12,
      draught: 3,
      picture: null,
      icon: null,
      engine_newton: 3000,
      mass_kg: 4000000,
      resistance: 7000,
    },
  },
})

//  SAIL CONTROLL

export const ATOM_SAIL_CONTROL = atom({
  key: "sail_control",
  default: {
    coupledSteeringMode: 0,
    sheetingMode: 1,
    variableThrustMode: 0, // 0=activated, 1=deactivated
    variableThrustSetPct: 0.0,
    variableThrustActualPct: 0.0,
  },
})

export const ATOM_SAILS = atom({
  key: "sails",
  default: {
    sail_1: {
      isActiveMode: 0,
      sheetingAngleActualDeg: 45.0,
      sheetingAngleSetDeg: 50.0,
      windApparentAngleDeg: 30.0,
      windApparentSpeedMs: 5.0,
      windTrueAngleDeg: 55.0,
      windTrueSpeedMs: 8.0,
    },
    sail_2: {
      isActiveMode: 0,
      sheetingAngleActualDeg: 45.0,
      sheetingAngleSetDeg: 50.0,
      windApparentAngleDeg: 30.0,
      windApparentSpeedMs: 5.0,
      windTrueAngleDeg: 55.0,
      windTrueSpeedMs: 8.0,
    },
    sail_3: {
      isActiveMode: 0,
      sheetingAngleActualDeg: 45.0,
      sheetingAngleSetDeg: 50.0,
      windApparentAngleDeg: 30.0,
      windApparentSpeedMs: 5.0,
      windTrueAngleDeg: 55.0,
      windTrueSpeedMs: 8.0,
    },
    sail_4: {
      isActiveMode: 0,
      sheetingAngleActualDeg: 45.0,
      sheetingAngleSetDeg: 50.0,
      windApparentAngleDeg: 30.0,
      windApparentSpeedMs: 5.0,
      windTrueAngleDeg: 55.0,
      windTrueSpeedMs: 8.0,
    },
    sail_5: {
      isActiveMode: 0,
      sheetingAngleActualDeg: 45.0,
      sheetingAngleSetDeg: 50.0,
      windApparentAngleDeg: 30.0,
      windApparentSpeedMs: 5.0,
      windTrueAngleDeg: 55.0,
      windTrueSpeedMs: 8.0,
    },
    sail_6: {
      isActiveMode: 0,
      sheetingAngleActualDeg: 45.0,
      sheetingAngleSetDeg: 50.0,
      windApparentAngleDeg: 30.0,
      windApparentSpeedMs: 5.0,
      windTrueAngleDeg: 55.0,
      windTrueSpeedMs: 8.0,
    },
  },
})
