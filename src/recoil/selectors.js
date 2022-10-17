import { selector } from "recoil";
import {
  userState,
  observationsStateAtom,
  playbackState,
  targetsAIS,
  atomActivePlatform,
  lidarObservationAtom,
  radarObservationAtom,
  OS_POSITIONS,
  OS_VELOCITY,
  OS_HEADING
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
// let radarFrame = []
// let isInside = false
// let lastAzimute = -1
// let spokeCount = 0

// // Decode distances from spoke length and range metadata
// const decode_distances = (spoke_length, _range) => {
//   const step = _range / spoke_length
//   let distanceArr = []
//   for (let i = 1; i <= spoke_length; i++) {
//     distanceArr.push(i * step)
//   }
//   return distanceArr
// }

// // Decode azimuth from integer spoke_direction"
// const decode_azimuth = (spoke_direction) => {
//   return spoke_direction / 4096 * 360
// }



//Setting own platform as AIS target
export const setPlatformAIS = selector({
  key: "ais_platform_setter",
  get: () => {
    return null;
  },
  set: ({ set }, ais_target) => {

    console.log("SETTER: ", ais_target);

    set(atomActivePlatform, (existingPlatform) => ({
      ...existingPlatform,
      ...ais_target,
      activePlatformType: "AIS"
    }))

  }
})






export const wsMessageParser = selector({
  key: "websocket_latest_message",
  get: () => {
    return null;
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

        const date = new Date();
        if (date.getTime() - last > 1000) {  // 2000 = 2sec
          last = date.getTime();

          //  Update AIS targets list 
          set(targetsAIS, () => Object.values(AISlist))

          // Update OS AIS data sensor 
          const active_platform = get(atomActivePlatform)
          if (active_platform.mmsi in AISlist) {  // Check if OS exists
            const os_ais_data = AISlist[active_platform.mmsi]
            // console.log("os_ais_data", os_ais_data);


            set(atomActivePlatform, (currentObj) => ({
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

            set(OS_POSITIONS, (currentObj) => ({
              ...currentObj,
              AIS: {
                ...currentObj.AIS,
                latitude: os_ais_data.lat, // degrees 
                longitude: os_ais_data.lon,  // degrees
              }
            }))

            set(OS_VELOCITY, (currentObj) => ({
              ...currentObj,
              AIS: {
                ...currentObj.AIS,
                cog: os_ais_data.course, // degrees 
                sog: os_ais_data.speed, // knots 
                rot: os_ais_data.turn // degrees per minute 
              }
            }))

            set(OS_HEADING, (currentObj) => ({
              ...currentObj,
              AIS: {
                ...currentObj.AIS,
                heading: os_ais_data.heading, // degrees 
              }
            }))

          }

        }

        break;
      }

      case latestMessage.topic.match("CROWSNEST/" + MQTT_PLATFORM_ID + "/LIDAR/0/POINTCLOUD")?.input: {
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

        // console.log("delay", delay);

        set(playbackState, (existing) => ({
          ...existing,
          delaySec: delay,
          connected: true
        }));

        break;
      }

      case latestMessage.topic.match("CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/0/SWEEP")?.input: {
        // console.log(latestMessage.topic);
        // console.log(latestMessage.payload.message.toS);
        // let frameR = JSON.parse(latestMessage.payload.toString())
        let frameR = latestMessage.payload

        let radarFrame = []
        for (let i = 0; i < frameR.message.points.length; i++) {
          const radarPoint = {
            point: frameR.message.points[i],
            weight: frameR.message.weights[i],
            distance: Math.sqrt(Math.abs(frameR.message.points[i][0]) ** 2 + Math.abs(frameR.message.points[i][1]) ** 2)
          }
          radarFrame.push(radarPoint)
        }

        // console.log(radarFrame);

        set(radarObservationAtom, () => (
          radarFrame
        ));
        break;
      }

      // case latestMessage.topic.match(/^CROWSNEST\/LANDKRABBA\/RADAR\/0\/PROTOBUF/)?.input: {
      //   // console.log(latestMessage.topic);
      //   var message = messages.opendlv_proxy_RadarDetectionReading.deserializeBinary(new Uint8Array(latestMessage.payload))

      //   let arrPuls = message.getData()
      //   let range = message.getRange()
      //   let azimuth = decode_azimuth(message.getAzimuth())
      //   let distances = decode_distances(arrPuls.length, range)

      //   if (spokeCount % 2 === 0) {
      //     for (let i = 0; i < arrPuls.length; i++) {
      //       // Map from polar to cartesian coordinates
      //       let x = distances[i] * Math.cos(toRadians(azimuth))
      //       let y = distances[i] * Math.sin(toRadians(azimuth))
      //       let points = [x, y]
      //       const radarPoint = {
      //         point: points,
      //         weight: arrPuls[i],
      //         distance: distances[i]
      //       }
      //       radarFrame.push(radarPoint)
      //     }
      //   }

      //   spokeCount += 1

      //   if (azimuth < lastAzimute) {  // 2000
      //     set(radarObservationAtom, () => (
      //       radarFrame
      //     ));
      //     // console.log("frame", radarFrame);
      //     radarFrame = []
      //   }
      //   lastAzimute = azimuth
      //   break;
      // }

      case "/NTpro/playback":
        set(playbackState, (existing) => ({
          ...existing,
          ...latestMessage.payload.message,
        }));
        break;

      case "/NTpro/observations/rudder/1":
        set(observationsStateAtom, (existing) => ({
          ...existing,
          ruderACTps: latestMessage.payload.message.angle,
        }));
        break;

      case "/NTpro/observations/rudder/2":
        set(observationsStateAtom, (existing) => ({
          ...existing,
          ruderACTsb: latestMessage.payload.message.angle,
        }));
        break;

      case "/NTpro/observations/rot/1":
        set(observationsStateAtom, (existing) => ({
          ...existing,
          rot: latestMessage.payload.message.rot,
        }));
        break;

      case "/NTpro/observations/heading/1":
        set(observationsStateAtom, (existing) => ({
          ...existing,
          heading: latestMessage.payload.message.heading,
        }));
        break;

      case "/NTpro/observations/ground_velocity/1":
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





// Device Data 
export const setDeviceSensorData = selector({
  key: "set_device_sensor_data",
  get: () => {
    return null;
  },
  set: ({ set }, newValues) => {

    set(OS_POSITIONS, (currentObj) => ({
      ...currentObj,
      DEVISE: {
        latitude: newValues.latitude, // degrees 
        longitude: newValues.longitude,  // degrees
        accuracy: newValues.accuracy,
        altitude: newValues.altitude,
        altitudeAccuracy: newValues.altitudeAccuracy,
        status: "normal", // [normal, warning, error] 
        statusText: "Normal",
        timeCreated: newValues.created // Delay in system 
      },
    }))

    set(OS_VELOCITY, (currentObj) => ({
      ...currentObj,
      DEVISE: {
        sog: newValues.speed, // units? 
        cog: newValues.heading, // units?
        status: "normal", // [normal, warning, error] 
        statusText: "Normal",
        timeCreated: newValues.created // Delay in system 
      },
    }))

  }
})

