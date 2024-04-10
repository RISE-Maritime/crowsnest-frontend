import { selector } from "recoil"
import protobuf from "protobufjs"
import bundle from "../proto/bundle.json"
import ByteBuffer from "bytebuffer"
import { keepWithin360, calcPosFromBearingDistance } from "../utils"

// import { uncover, decodePayloadFromTypeName } from "@MO-RISE/keelson-js/dist"
import { uncover, decodePayloadFromTypeName } from "keelson-js/dist"

import {
  userState,
  observationsStateAtom,
  playbackState,
  targetsAIS,
  atomActivePlatform,
  lidarObservationAtom,
  atomRouteWaypoints,
  OS_POSITIONS,
  OS_VELOCITY,
  OS_HEADING,
  atomMQTTtopics,
  atomMQTTtopicsUnhandled,
  AtomShoreRadarObservation,
  AtomShoreRadar_1,
  OS_WIND,
  atomHWlog,
  OS_RADAR_0,
  OS_RADAR_0_SWEEP,
  OS_RADAR_1,
  OS_RADAR_1_SWEEP,
  ATOM_OS_RUDDERS,
  ATOM_OS_ENGINES,
  ATOM_OS_THRUSTERS,
  ATOM_KEELSON_KEYEXP_MANAGED,
  ATOM_KEELSON_KEYEXP_UNMANAGED,
  ATOM_SIM_STATE,
  ATOM_SIM_ACTIVE_MODELS,
  ATOM_SIM_SHIP_MODELS,
} from "./atoms"

export const selectUser = selector({
  key: "selectUser",
  get: ({ get }) => {
    // Try fetch from localStorage
    const savedUser = localStorage.getItem("user")
    if (savedUser !== null) {
      return JSON.parse(savedUser)
    }
    return get(userState)
  },
})

let AISlist = {}
let last = 0

//Setting own platform as AIS target
export const setPlatformAIS = selector({
  key: "ais_platform_setter",
  get: () => {
    return null
  },
  set: ({ set }, ais_target) => {
    console.log("SETTER: ", ais_target)

    set(atomActivePlatform, existingPlatform => ({
      ...existingPlatform,
      ...ais_target,
      activePlatformType: "AIS",
    }))
  },
})

/*
Parsing incoming messages from the Keelson
*/
export const protoParser = selector({
  key: "proto_parser",
  get: () => {
    return null
  },
  set: ({ get, set }, latestMsg) => {
    // Load the bundle.json file using protobufjs

    const root = protobuf.Root.fromJSON(bundle)
    let bytes = new Uint8Array(ByteBuffer.fromBase64(latestMsg.value).toArrayBuffer())
    let parsed = uncover(bytes)
    let received_at = parsed[0]
    let enclosed_at = parsed[1]
    let payload = parsed[2]

    const Envelope = root.lookupType("Envelope")
    const decodedEnvelope = Envelope.decode(bytes)
    const seconds = decodedEnvelope.enclosedAt.seconds
    const nanos = decodedEnvelope.enclosedAt.nanos
    const envelopeEncodedAtDate = new Date(seconds * 1000 + nanos / 1000000)



    switch (latestMsg.key) {
      case latestMsg.key.match(/^rise\/v0\/masslab\/data\/lever_position_pct\/arduino\/right\/azimuth\/vertical/)?.input: {
        console.log("RUDDER 0:", payload)
        let timeFloat = decodePayloadFromTypeName("keelson.primitives.TimestampedFloat", payload)
        console.log("RUDDER 0:", timeFloat.value, timeFloat.timestamp)

        let lastValue = get(ATOM_OS_RUDDERS)

        if (lastValue["RUDDER_0"].setAngle !== timeFloat.value) {
          set(ATOM_OS_RUDDERS, currentObj => ({
            ...currentObj,
            RUDDER_0: {
              ...currentObj["RUDDER_0"],
              setAngle: timeFloat.value,
            },
          }))
        }

        set(ATOM_KEELSON_KEYEXP_MANAGED, currentObj => ({
          ...currentObj,
          [latestMsg.key]: {
            time_received: new Date(),
            time_encoded: envelopeEncodedAtDate,
            count: currentObj[latestMsg.key]?.count ? currentObj[latestMsg.key].count + 1 : 1,
          },
        }))

        break
      }

      // RENGINE_0 (right)
      case latestMsg.key.match(/^rise\/masslab\/haddock\/masslab-5\/lever_position_pct\/arduino\/right\/azimuth\/horizontal/)
        ?.input: {
        const PrimitivesTimeFloat = root.lookupType("TimestampedFloat")
        const readable = PrimitivesTimeFloat.decode(decodedEnvelope.payload)

        console.log("ENGINE_0:", readable.value)
        let lastValue = get(ATOM_OS_ENGINES)

        if (lastValue["ENGINE_0"].setPower !== readable.value) {
          set(ATOM_OS_ENGINES, currentObj => ({
            ...currentObj,
            ENGINE_0: {
              ...currentObj["ENGINE_0"],
              setPower: readable.value,
            },
          }))
        }

        set(ATOM_KEELSON_KEYEXP_MANAGED, currentObj => ({
          ...currentObj,
          [latestMsg.key]: {
            time_received: new Date(),
            time_encoded: envelopeEncodedAtDate,
            count: currentObj[latestMsg.key]?.count ? currentObj[latestMsg.key].count + 1 : 1,
          },
        }))

        break
      }

      default: {
        set(ATOM_KEELSON_KEYEXP_UNMANAGED, currentObj => ({
          ...currentObj,
          [latestMsg.key]: {
            time_received: new Date(),
            time_encoded: envelopeEncodedAtDate,
            count: currentObj[latestMsg.key]?.count ? currentObj[latestMsg.key].count + 1 : 1,
          },
        }))
        break
      }
    }
  },
})

export const messageParser = selector({
  key: "message_parser",
  get: () => {
    return null
  },
  set: ({ get, set }, latestMessage) => {
    const activPlatformObj = get(atomActivePlatform)
    const MQTT_PLATFORM_ID = activPlatformObj.MQTTpath

    switch (latestMessage.topic) {
      // AIS messages
      case latestMessage.topic.match(/^CROWSNEST\/EXTERNAL\/AIS/)?.input: {
        const incomming = latestMessage.payload.message

        AISlist[incomming.mmsi] = {
          shipname: "UNKNOWN",
          ...AISlist[incomming.mmsi],
          ...incomming,
        }

        const date = new Date()
        if (date.getTime() - last > 1000) {
          // 2000 = 2sec
          //  MQTT logger topics
          set(atomMQTTtopics, currentObj => ({
            ...currentObj,
            "CROWSNEST/EXTERNAL/AIS": {
              time_received: new Date(),
              count: currentObj["CROWSNEST/EXTERNAL/AIS"]?.count ? currentObj["CROWSNEST/EXTERNAL/AIS"].count + 1000 : 1000,
              list_ship_unique: currentObj["CROWSNEST/EXTERNAL/AIS"]?.list_ship_unique
                ? [
                    ...currentObj["CROWSNEST/EXTERNAL/AIS"].list_ship_unique,
                    { time: new Date(), ships_count: Object.keys(AISlist).length },
                  ]
                : [{ time: new Date(), ships_count: Object.keys(AISlist).length }],
            },
          }))

          last = date.getTime()

          //  Update AIS targets list
          set(targetsAIS, () => Object.values(AISlist))

          // Update OS AIS data sensor
          const active_platform = get(atomActivePlatform)
          if (active_platform.mmsi in AISlist) {
            // Check if OS exists
            const os_ais_data = AISlist[active_platform.mmsi]
            // console.log("os_ais_data", os_ais_data);

            set(atomActivePlatform, currentObj => ({
              ...currentObj,
              shipname: os_ais_data.shipname, // String
              destination: os_ais_data.destination, // String
              draught: os_ais_data.draught, // Meters
              imo: os_ais_data.imo, // Int
              mmsi: os_ais_data.mmsi, // Int
              operation_state: os_ais_data.maneuver, // TODO: define state accroding to AIS standard
              operation_state_s: os_ais_data.status, // TODO: define state accroding to AIS standard
              ship_type: os_ais_data.ship_type, // TODO: define state accroding to AIS standard
              to_bow: os_ais_data.to_bow,
              to_port: os_ais_data.to_port,
              to_starboard: os_ais_data.to_starboard,
              to_stern: os_ais_data.to_stern,
            }))

            set(OS_POSITIONS, currentObj => ({
              ...currentObj,
              AIS: {
                ...currentObj.AIS,
                latitude: os_ais_data.lat, // degrees
                longitude: os_ais_data.lon, // degrees
              },
            }))

            set(OS_VELOCITY, currentObj => ({
              ...currentObj,
              AIS: {
                ...currentObj.AIS,
                cog: os_ais_data.course, // degrees
                sog: os_ais_data.speed, // knots
                rot: os_ais_data.turn, // degrees per minute
              },
            }))

            set(OS_HEADING, currentObj => ({
              ...currentObj,
              AIS: {
                ...currentObj.AIS,
                heading: os_ais_data.heading, // degrees
              },
            }))
          }
        }

        break
      }

      case latestMessage.topic.match("CROWSNEST/" + MQTT_PLATFORM_ID + "/GNSS/0/JSON")?.input: {
        //  MQTT logger topics
        set(atomMQTTtopics, currentObj => ({
          ...currentObj,
          ["CROWSNEST/" + MQTT_PLATFORM_ID + "/GNSS"]: {
            time_received: new Date(),
            timestamp: new Date(latestMessage.payload.message.timestamp),
            delay_calc: Math.abs((new Date(latestMessage.payload.message.timestamp).getTime() - new Date().getTime()) / 1000),
            count: currentObj["CROWSNEST/" + MQTT_PLATFORM_ID + "/GNSS"]?.count
              ? currentObj["CROWSNEST/" + MQTT_PLATFORM_ID + "/GNSS"].count + 1
              : 1,
          },
        }))

        // console.log(latestMessage.topic);
        //   {
        //     "sent_at": "2022-10-20T16:04:13.209088+00:00",
        //     "message": {
        //         "timestamp": "2022-10-20T16:05:08.010000+00:00", (Kinda)
        //         "sog": 0.3,(DONE)
        //         "cog": 137.01,(DONE)
        //         "rot": 0,(DONE)
        //         "altitude": 3.89,(DONE)
        //         "gps_quality": 5,
        //         "num_satellites": 10,
        //         "longitude": 11.568426456,(DONE)
        //         "latitude": 57.425519807, (DONE)
        //         "heading": 168.96, (DONE)
        //         "roll": -55.93,
        //         "pitch": "",
        //         "roll_accuracy": 1.706,
        //         "heading_accuracy": 1.58, (DONE)
        //         "std_dev_altitude": 0.155,(DONE)
        //         "std_dev_longitude": 0.167,(DONE)
        //         "std_dev_latitude": 0.126(DONE)
        //     }
        // }
        // console.log(latestMessage.payload);

        set(OS_POSITIONS, currentObj => ({
          ...currentObj,
          GNSS_0: {
            ...currentObj.GNSS_0,
            timeCreated: latestMessage.payload.message.timestamp,
            latitude: latestMessage.payload.message.latitude, // degrees
            longitude: latestMessage.payload.message.longitude, // degrees
            altitude: latestMessage.payload.message.altitude,
            gps_quality: latestMessage.payload.message.gps_quality,
            std_dev_altitude: latestMessage.payload.message.std_dev_altitude,
            std_dev_longitude: latestMessage.payload.message.std_dev_longitude,
            std_dev_latitude: latestMessage.payload.message.std_dev_latitude,
          },
        }))

        set(OS_VELOCITY, currentObj => ({
          ...currentObj,
          GNSS_0: {
            ...currentObj.GNSS_0,
            cog: latestMessage.payload.message.cog, // degrees
            sog: latestMessage.payload.message.sog, // knots
            rot: latestMessage.payload.message.rot, // degrees per minute
            timeCreated: latestMessage.payload.message.timestamp,
          },
        }))

        set(OS_HEADING, currentObj => ({
          ...currentObj,
          GNSS_0: {
            ...currentObj.GNSS_0,
            timeCreated: latestMessage.payload.message.timestamp,
            heading: latestMessage.payload.message.heading, // degrees
            heading_accuracy: latestMessage.payload.message.heading_accuracy,
          },
        }))
        break
      }

      case latestMessage.topic.match("CROWSNEST/" + MQTT_PLATFORM_ID + "/WIND/0/JSON")?.input: {
        //  MQTT logger topics
        set(atomMQTTtopics, currentObj => ({
          ...currentObj,
          ["CROWSNEST/" + MQTT_PLATFORM_ID + "/WIND/0/JSON"]: {
            time_received: new Date(),
            timestamp: new Date(latestMessage.payload.message.timestamp),
            delay_calc: Math.abs((new Date(latestMessage.payload.message.timestamp).getTime() - new Date().getTime()) / 1000),
            count: currentObj["CROWSNEST/" + MQTT_PLATFORM_ID + "/WIND/0/JSON"]?.count
              ? currentObj["CROWSNEST/" + MQTT_PLATFORM_ID + "/WIND/0/JSON"].count + 1
              : 1,
          },
        }))

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

        set(OS_WIND, currentObj => ({
          ...currentObj,
          WIND_0: {
            ...currentObj.WIND_0,
            timeCreated: latestMessage.payload.message.timestamp,
            wind_angle:
              latestMessage.payload.message.wind_angle != null
                ? latestMessage.payload.message.wind_angle
                : currentObj.WIND_0.wind_angle,
            wind_speed: latestMessage.payload.message.wind_speed,
            reference_angel: latestMessage.payload.message.reference_angel,
            status: "normal", // [normal, warning, error]
            statusText: latestMessage.payload.message.status, // A NMEA?

            heading: latestMessage.payload.message.heading, // degrees
            heading_accuracy: latestMessage.payload.message.heading_accuracy,
          },
        }))
        break
      }

      case latestMessage.topic.match("CROWSNEST/" + MQTT_PLATFORM_ID + "/LIDAR/0/NUP")?.input: {
        //  MQTT logger topics
        set(atomMQTTtopics, currentObj => ({
          ...currentObj,
          ["CROWSNEST/" + MQTT_PLATFORM_ID + "/LIDAR"]: {
            time_received: new Date(),
            count: currentObj["CROWSNEST/" + MQTT_PLATFORM_ID + "/LIDAR"]?.count
              ? currentObj["CROWSNEST/" + MQTT_PLATFORM_ID + "/LIDAR"].count + 1
              : 1,
            timestamp: new Date(latestMessage.payload.message.sent_at),
            delay_calc: Math.abs((new Date(latestMessage.payload.sent_at).getTime() - new Date().getTime()) / 1000),
          },
        }))

        set(lidarObservationAtom, () => latestMessage.payload.message)
        break
      }

      case latestMessage.topic.match("CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/0/NUP")?.input: {
        //  MQTT logger topics
        set(atomMQTTtopics, currentObj => ({
          ...currentObj,
          ["CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/0/NUP"]: {
            time_received: new Date(),
            timestamp: new Date(latestMessage.payload.message.sent_at),
            delay_calc: Math.abs((new Date(latestMessage.payload.sent_at).getTime() - new Date().getTime()) / 1000),
            count: currentObj["CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/0/NUP"]?.count
              ? currentObj["CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/0/NUP"].count + 1
              : 1,
          },
        }))

        let frameR = latestMessage.payload
        let radarFrameList = []
        for (let i = 0; i < frameR.message.points.length; i++) {
          const radarPoint = {
            point: frameR.message.points[i],
            weight: frameR.message.weights[i],
            distance: Math.sqrt(Math.abs(frameR.message.points[i][0]) ** 2 + Math.abs(frameR.message.points[i][1]) ** 2),
          }
          radarFrameList.push(radarPoint)
        }
        set(OS_RADAR_0, () => radarFrameList)
        break
      }

      case latestMessage.topic.match("CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/0/SWEEP")?.input: {
        //  MQTT logger topics
        set(atomMQTTtopics, currentObj => ({
          ...currentObj,
          ["CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/0/SWEEP"]: {
            time_received: new Date(),
            timestamp: new Date(latestMessage.payload.message.sent_at),
            delay_calc: Math.abs((new Date(latestMessage.payload.sent_at).getTime() - new Date().getTime()) / 1000),
            count: currentObj["CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/0/SWEEP"]?.count
              ? currentObj["CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/0/SWEEP"].count + 1
              : 1,
          },
        }))

        let frameR = latestMessage.payload
        let radarFrameList = []
        for (let i = 0; i < frameR.message.points.length; i++) {
          const radarPoint = {
            point: frameR.message.points[i],
            weight: frameR.message.weights[i],
            distance: Math.sqrt(Math.abs(frameR.message.points[i][0]) ** 2 + Math.abs(frameR.message.points[i][1]) ** 2),
          }
          radarFrameList.push(radarPoint)
        }
        set(OS_RADAR_0_SWEEP, () => radarFrameList)
        break
      }

      case latestMessage.topic.match("CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/1/NUP")?.input: {
        //  MQTT logger topics
        set(atomMQTTtopics, currentObj => ({
          ...currentObj,
          ["CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/1/NUP"]: {
            time_received: new Date(),
            timestamp: new Date(latestMessage.payload.message.sent_at),
            delay_calc: Math.abs((new Date(latestMessage.payload.sent_at).getTime() - new Date().getTime()) / 1000),
            count: currentObj["CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/1/NUP"]?.count
              ? currentObj["CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/1/NUP"].count + 1
              : 1,
          },
        }))

        let frameR = latestMessage.payload
        let radarFrame = []
        for (let i = 0; i < frameR.message.points.length; i++) {
          const radarPoint = {
            point: frameR.message.points[i],
            weight: frameR.message.weights[i],
            distance: Math.sqrt(Math.abs(frameR.message.points[i][0]) ** 2 + Math.abs(frameR.message.points[i][1]) ** 2),
          }
          radarFrame.push(radarPoint)
        }
        set(OS_RADAR_1, () => radarFrame)
        break
      }

      case latestMessage.topic.match("CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/1/SWEEP")?.input: {
        //  MQTT logger topics
        set(atomMQTTtopics, currentObj => ({
          ...currentObj,
          ["CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/1/SWEEP"]: {
            time_received: new Date(),
            timestamp: new Date(latestMessage.payload.message.sent_at),
            delay_calc: Math.abs((new Date(latestMessage.payload.sent_at).getTime() - new Date().getTime()) / 1000),
            count: currentObj["CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/1/SWEEP"]?.count
              ? currentObj["CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/1/SWEEP"].count + 1
              : 1,
          },
        }))

        let frameR = latestMessage.payload
        let radarFrame = []
        for (let i = 0; i < frameR.message.points.length; i++) {
          const radarPoint = {
            point: frameR.message.points[i],
            weight: frameR.message.weights[i],
            distance: Math.sqrt(Math.abs(frameR.message.points[i][0]) ** 2 + Math.abs(frameR.message.points[i][1]) ** 2),
          }
          radarFrame.push(radarPoint)
        }
        set(OS_RADAR_1_SWEEP, () => radarFrame)
        break
      }

      case latestMessage.topic.match("CROWSNEST/LANDKRABBA/RADAR/0/SWEEP")?.input: {
        //  MQTT logger topics
        set(atomMQTTtopics, currentObj => ({
          ...currentObj,
          ["CROWSNEST/LANDKRABBA/RADAR/0/SWEEP"]: {
            time_received: new Date(),
            timestamp: new Date(latestMessage.payload.message.sent_at),
            delay_calc: Math.abs((new Date(latestMessage.payload.sent_at).getTime() - new Date().getTime()) / 1000),
            count: currentObj["CROWSNEST/LANDKRABBA/RADAR/0/SWEEP"]?.count
              ? currentObj["CROWSNEST/LANDKRABBA/RADAR/0/SWEEP"].count + 1
              : 1,
          },
        }))

        let frameR = latestMessage.payload
        let radarFrame = []
        for (let i = 0; i < frameR.message.points.length; i++) {
          const radarPoint = {
            point: frameR.message.points[i],
            weight: frameR.message.weights[i],
            distance: Math.sqrt(Math.abs(frameR.message.points[i][0]) ** 2 + Math.abs(frameR.message.points[i][1]) ** 2),
          }
          radarFrame.push(radarPoint)
        }

        set(AtomShoreRadarObservation, () => radarFrame)
        break
      }

      case latestMessage.topic.match("CROWSNEST/LANDKRABBA/RADAR/1/SWEEP")?.input: {
        //  MQTT logger topics
        set(atomMQTTtopics, currentObj => ({
          ...currentObj,
          ["CROWSNEST/LANDKRABBA/RADAR/1/SWEEP"]: {
            time_received: new Date(),
            timestamp: new Date(latestMessage.payload.message.sent_at),
            delay_calc: Math.abs((new Date(latestMessage.payload.sent_at).getTime() - new Date().getTime()) / 1000),
            count: currentObj["CROWSNEST/LANDKRABBA/RADAR/1/SWEEP"]?.count
              ? currentObj["CROWSNEST/LANDKRABBA/RADAR/1/SWEEP"].count + 1
              : 1,
          },
        }))

        let frameR = latestMessage.payload
        let radarFrame = []
        for (let i = 0; i < frameR.message.points.length; i++) {
          const radarPoint = {
            point: frameR.message.points[i],
            weight: frameR.message.weights[i],
            distance: Math.sqrt(Math.abs(frameR.message.points[i][0]) ** 2 + Math.abs(frameR.message.points[i][1]) ** 2),
          }
          radarFrame.push(radarPoint)
        }

        set(AtomShoreRadar_1, () => radarFrame)
        break
      }

      case latestMessage.topic.match(/CROWSNEST\/\w{1,55}..\/HW\/\d\/JSON/)?.input: {
        // case /CROWSNEST\/\w{1,55}\/HW/0/JSON/g.test(latestMessage.topic):{

        let sent_at = new Date(latestMessage.payload.sent_at)
        let network_delay = Math.abs((sent_at.getTime() - new Date().getTime()) / 1000)

        //  MQTT logger topics
        set(atomMQTTtopics, currentObj => ({
          ...currentObj,
          [latestMessage.topic]: {
            time_received: new Date(),
            timestamp: sent_at,
            delay_calc: network_delay,
            count: currentObj[latestMessage.topic]?.count ? currentObj[latestMessage.topic].count + 1 : 1,
          },
        }))

        let msg = latestMessage.payload.message

        // console.log(msg);

        //  Atom HW logger
        set(atomHWlog, currentObj => ({
          ...currentObj,
          [latestMessage.topic]: {
            received_at: new Date(),
            network_delay: network_delay,
            op_system: msg.op_system,
            sys_name: msg.sys_name,
            boot_time: msg.boot_time,
            ram_size: msg.ram_size,
            cpu_load_procreant: msg.cpu_load_procreant,
            cpu_load_trend: currentObj[latestMessage.topic]?.cpu_load_trend
              ? [...currentObj[latestMessage.topic].cpu_load_trend, { time: sent_at, load: msg.cpu_load_procreant }]
              : [{ time: sent_at, load: msg.cpu_load_procreant }],
            cpu_temp: msg.cpu_temp,
            cpu_temp_trend: currentObj[latestMessage.topic]?.cpu_temp_trend
              ? [...currentObj[latestMessage.topic].cpu_temp_trend, { time: sent_at, load: msg.cpu_temp }]
              : [{ time: sent_at, load: msg.cpu_temp }],
            ram_usage: msg.ram_usage,
            ram_usage_trend: currentObj[latestMessage.topic]?.ram_usage_trend
              ? [...currentObj[latestMessage.topic].ram_usage_trend, { time: sent_at, load: msg.ram_usage }]
              : [{ time: sent_at, load: msg.ram_usage }],
          },
        }))
        break
      }

      case "/NTpro/playback":
        set(playbackState, existing => ({
          ...existing,
          ...latestMessage.payload.message,
        }))
        break

      case "/NTpro/observations/rudder/1":
        set(observationsStateAtom, existing => ({
          ...existing,
          ruderACTps: latestMessage.payload.message.angle,
        }))
        break

      case "/NTpro/observations/rudder/2":
        set(observationsStateAtom, existing => ({
          ...existing,
          ruderACTsb: latestMessage.payload.message.angle,
        }))
        break

      case "/NTpro/observations/rot/1":
        set(observationsStateAtom, existing => ({
          ...existing,
          rot: latestMessage.payload.message.rot,
        }))
        break

      case "/NTpro/observations/heading/1":
        set(observationsStateAtom, existing => ({
          ...existing,
          heading: latestMessage.payload.message.heading,
        }))
        break

      case "/NTpro/observations/ground_velocity/1":
        set(observationsStateAtom, existing => ({
          ...existing,
          cog: latestMessage.payload.message.cog,
          sog: latestMessage.payload.message.sog,
          sogBow: latestMessage.payload.message.sog_transverse_bow,
          sogStern: latestMessage.payload.message.sog_transverse_stern,
        }))
        break

      default:
        //  MQTT logger topics
        set(atomMQTTtopicsUnhandled, currentObj => ({
          ...currentObj,
          [latestMessage.topic]: {
            time_received: new Date(),
            count: currentObj[latestMessage.topic]?.count ? currentObj[latestMessage.topic].count + 1 : 1,
          },
        }))
      // console.log("Unknown message of type " + latestMessage.topic);
      // console.log(latestMessage.payload.message);
    }
  },
})

// Device Data
export const setDeviceSensorData = selector({
  key: "set_device_sensor_data",
  get: () => {
    return null
  },
  set: ({ set }, newValues) => {
    set(OS_POSITIONS, currentObj => ({
      ...currentObj,
      DEVISCE: {
        latitude: newValues.latitude, // degrees
        longitude: newValues.longitude, // degrees
        accuracy: newValues.accuracy,
        altitude: newValues.altitude,
        altitudeAccuracy: newValues.altitudeAccuracy,
        status: "normal", // [normal, warning, error]
        statusText: "Normal",
        timeCreated: newValues.created, // Delay in system
      },
    }))

    set(OS_VELOCITY, currentObj => ({
      ...currentObj,
      DEVICE: {
        sog: newValues.speed, // units?
        cog: newValues.heading, // units?
        status: "normal", // [normal, warning, error]
        statusText: "Normal",
        timeCreated: newValues.created, // Delay in system
      },
    }))
  },
})

export const selectRoutePathList = selector({
  key: "route_path_list",
  get: ({ get }) => {
    const wps = get(atomRouteWaypoints)

    const transformedList = []
    for (let i = 0; i < wps.length; i++) {
      transformedList.push([wps[i].longitude, wps[i].latitude])
    }

    return [transformedList]
  },
})

export const selSetRudder = selector({
  key: "sel_set_rudder",
  get: () => {
    return null
  },
  set: ({ set }, newRudderVal) => {
    const root = protobuf.Root.fromJSON(bundle)
    const Envelope = root.lookupType("Envelope")
    const PrimitivesTimeFloat = root.lookupType("TimestampedFloat")

    const dataToSend = {
      timestamp: new Date(),
      value: newRudderVal.setAngle + 0.0,
    }

    var errMsg = PrimitivesTimeFloat.verify(dataToSend)
    if (errMsg) throw Error(errMsg)
    const payloadOne = PrimitivesTimeFloat.create(dataToSend)
    const payload = PrimitivesTimeFloat.encode(payloadOne).finish()

    var errMsgEnvelope = Envelope.verify({
      enclosed_at: new Date(),
      payload: payload,
    })
    if (errMsgEnvelope) throw Error(errMsgEnvelope)

    const messStart = Envelope.create({
      enclosed_at: new Date(),
      payload: payload,
    })
    const message = Envelope.encode(messStart).finish()

    var Http = new XMLHttpRequest()
    Http.open("PUT", "http://localhost:8000/rise/crowsnest/gui/demo-user/rudder_order_deg/rudder_0", true)
    Http.setRequestHeader("Content-Type", "application/octet-stream")
    Http.send(message)

    set(ATOM_OS_RUDDERS, currentObj => ({
      ...currentObj,
      [newRudderVal.id]: {
        ...currentObj[newRudderVal.id],
        setAngle: newRudderVal.setAngle,
      },
    }))
  },
})

export const selSetEngine = selector({
  key: "sel_set_engine",
  get: () => {
    return null
  },
  set: ({ set }, newEngVal) => {
    const root = protobuf.Root.fromJSON(bundle)
    const Envelope = root.lookupType("Envelope")
    const PrimitivesTimeFloat = root.lookupType("TimestampedFloat")

    const dataToSend = {
      timestamp: new Date(),
      value: newEngVal.setPower,
    }

    var errMsg = PrimitivesTimeFloat.verify(dataToSend)
    if (errMsg) throw Error(errMsg)
    const payloadOne = PrimitivesTimeFloat.create(dataToSend)
    const payload = PrimitivesTimeFloat.encode(payloadOne).finish()

    var errMsgEnvelope = Envelope.verify({
      enclosed_at: new Date(),
      payload: payload,
    })
    if (errMsgEnvelope) throw Error(errMsgEnvelope)

    const messStart = Envelope.create({
      enclosed_at: new Date(),
      payload: payload,
    })
    const message = Envelope.encode(messStart).finish()

    var Http = new XMLHttpRequest()
    Http.open("PUT", "http://localhost:8000/rise/crowsnest/gui/demo-user/engine_power_set/engine_0", true)
    Http.setRequestHeader("Content-Type", "application/octet-stream")
    Http.send(message)

    set(ATOM_OS_ENGINES, currentObj => ({
      ...currentObj,
      [newEngVal.id]: {
        ...currentObj[newEngVal.id],
        setPower: newEngVal.setPower,
      },
    }))
  },
})

export const selSetThruster = selector({
  key: "sel_set_thruster",
  get: () => {
    return null
  },
  set: ({ set }, newThrusterVal) => {
    const root = protobuf.Root.fromJSON(bundle)
    const Envelope = root.lookupType("Envelope")
    const PrimitivesTimeFloat = root.lookupType("TimestampedFloat")

    const dataToSend = {
      timestamp: new Date(),
      value: newThrusterVal.setPower,
    }

    var errMsg = PrimitivesTimeFloat.verify(dataToSend)
    if (errMsg) throw Error(errMsg)
    const payloadOne = PrimitivesTimeFloat.create(dataToSend)
    const payload = PrimitivesTimeFloat.encode(payloadOne).finish()

    var errMsgEnvelope = Envelope.verify({
      enclosed_at: new Date(),
      payload: payload,
    })
    if (errMsgEnvelope) throw Error(errMsgEnvelope)

    const messStart = Envelope.create({
      enclosed_at: new Date(),
      payload: payload,
    })
    const message = Envelope.encode(messStart).finish()

    var Http = new XMLHttpRequest()
    Http.open("PUT", "http://localhost:8000/rise/crowsnest/gui/demo-user/engine_power_set/engine_0", true)
    Http.setRequestHeader("Content-Type", "application/octet-stream")
    Http.send(message)

    set(ATOM_OS_THRUSTERS, currentObj => ({
      ...currentObj,
      [newThrusterVal.id]: {
        ...currentObj[newThrusterVal.id],
        setPower: newThrusterVal.setPower,
      },
    }))
  },
})

export const updateSimState = selector({
  key: "update_sim_state",
  get: () => {
    return null
  },
  set: ({ set, get }, intervalMilSec) => {
    const shipModel = {
      speed_min: -10.0, // knots
      speed_max: 25.0, // knots
      rot_max: 120, // degrees per minute
    }

    // Getting current state
    const os_eng = get(ATOM_OS_ENGINES)
    const os_rud = get(ATOM_OS_RUDDERS)
    // const os_thr = get(ATOM_OS_THRUSTERS)
    const os_vel = get(OS_VELOCITY)
    const os_head = get(OS_HEADING)
    const os_pos = get(OS_POSITIONS)
    const active_model = get(ATOM_SIM_ACTIVE_MODELS)
    const ship_models = get(ATOM_SIM_SHIP_MODELS)

    // Values to be updated
    let new_sog = 0
    let new_rot = 0
    let new_cog = 0
    let new_heading = 0

    const engNewton = ship_models[active_model].engine_newton // Newton
    let massa = ship_models[active_model].mass_kg // kg
    const resistance = ship_models[active_model].resistance // constant resistance

    // Calc new SOG
    let os_cur_eng = os_eng["ENGINE_0"].setPower
    let old_sog = os_vel.SIM.sog * 0.5144
    let T = os_cur_eng * engNewton // Newton
    let R = resistance * old_sog ** 2
    let acc = (T - R) / massa
    let new_ms = acc * (intervalMilSec / 1000) + old_sog
    new_sog = new_ms / 0.5144

    // Calc new ROT
    let os_cur_rudAng = os_rud.RUDDER_0.setAngle
    new_rot = os_cur_rudAng * (shipModel.rot_max / 100)

    // Calc new Heading
    let os_cur_haed = os_head.SIM.heading
    let rot_interval = (new_rot / 60) * (intervalMilSec / 1000)
    new_heading = keepWithin360(rot_interval + os_cur_haed)

    // Calc new COG
    if (new_sog >= 0) {
      new_cog = new_heading
    } else {
      new_cog = keepWithin360(new_heading - 180)
    }

    // Calc new Position
    let os_cur_lat = os_pos.SIM.latitude
    let os_cur_long = os_pos.SIM.longitude
    let distance_traveled = (Math.abs(new_sog) / 3600) * (intervalMilSec / 1000)
    let new_pos = calcPosFromBearingDistance(os_cur_lat, os_cur_long, new_cog, distance_traveled, "nm")
    let new_lon = new_pos[0]
    let new_lat = new_pos[1]

    // Setting new ship state
    set(OS_POSITIONS, currentObj => ({
      ...currentObj,
      SIM: {
        ...currentObj.SIM,
        latitude: new_lat, // degrees
        longitude: new_lon, // degrees
      },
    }))

    set(OS_VELOCITY, currentObj => ({
      ...currentObj,
      SIM: {
        ...currentObj.SIM,
        cog: new_cog, // degrees
        sog: new_sog, // knots
        rot: new_rot, // knots
      },
    }))

    set(OS_HEADING, currentObj => ({
      ...currentObj,
      SIM: {
        ...currentObj.SIM,
        heading: new_heading, // degrees
      },
    }))

    set(ATOM_SIM_STATE, currentObj => ({
      ...currentObj,
      milSecElapsed: currentObj.milSecElapsed + intervalMilSec,
    }))
  },
})
