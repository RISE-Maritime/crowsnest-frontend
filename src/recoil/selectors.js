import { selector } from "recoil";
import {
  userState,
  observationsStateAtom,
  playbackState,
  targetsAIS,
  atomActivePlatform,
  lidarObservationAtom,

  OS_POSITIONS,
  OS_VELOCITY,
  OS_HEADING,
  atomMqttTopics,
  atomMqttTopicsUnhandled,
  AtomShoreRadarObservation,
  AtomShoreRadar_1,
  OS_WIND,
  atomHWlog,
  OS_RADAR_0,
  OS_RADAR_1,
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
          //  MQTT logger topics 
          set(atomMqttTopics, (currentObj) => ({
            ...currentObj,
            "CROWSNEST/EXTERNAL/AIS": {
              time_received: new Date(),
              count: currentObj["CROWSNEST/EXTERNAL/AIS"]?.count ? currentObj["CROWSNEST/EXTERNAL/AIS"].count + 1000 : 1000,
              list_ship_unique: currentObj["CROWSNEST/EXTERNAL/AIS"]?.list_ship_unique ? [...currentObj["CROWSNEST/EXTERNAL/AIS"].list_ship_unique, { time: new Date(), ships_count: Object.keys(AISlist).length }] : [{ time: new Date(), ships_count: Object.keys(AISlist).length }]
            }
          }))

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

      case latestMessage.topic.match("CROWSNEST/" + MQTT_PLATFORM_ID + "/GNSS/0/JSON")?.input: {

        //  MQTT logger topics 
        set(atomMqttTopics, (currentObj) => ({
          ...currentObj,
          ["CROWSNEST/" + MQTT_PLATFORM_ID + "/GNSS"]: {
            time_received: new Date(),
            timestamp: new Date(latestMessage.payload.message.timestamp),
            delay_calc: Math.abs((new Date(latestMessage.payload.message.timestamp).getTime() - new Date().getTime()) / 1000),
            count: currentObj["CROWSNEST/" + MQTT_PLATFORM_ID + "/GNSS"]?.count ? currentObj["CROWSNEST/" + MQTT_PLATFORM_ID + "/GNSS"].count + 1 : 1
          }
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

        set(OS_POSITIONS, (currentObj) => ({
          ...currentObj,
          GNSS_0: {
            ...currentObj.GNSS_0,
            timeCreated: latestMessage.payload.message.timestamp,
            latitude: latestMessage.payload.message.latitude, // degrees 
            longitude: latestMessage.payload.message.longitude,  // degrees
            altitude: latestMessage.payload.message.altitude,
            gps_quality: latestMessage.payload.message.gps_quality,
            std_dev_altitude: latestMessage.payload.message.std_dev_altitude,
            std_dev_longitude: latestMessage.payload.message.std_dev_longitude,
            std_dev_latitude: latestMessage.payload.message.std_dev_latitude,

          }
        }))

        set(OS_VELOCITY, (currentObj) => ({
          ...currentObj,
          GNSS_0: {
            ...currentObj.GNSS_0,
            cog: latestMessage.payload.message.cog, // degrees 
            sog: latestMessage.payload.message.sog, // knots 
            rot: latestMessage.payload.message.rot, // degrees per minute
            timeCreated: latestMessage.payload.message.timestamp
          }
        }))

        set(OS_HEADING, (currentObj) => ({
          ...currentObj,
          GNSS_0: {
            ...currentObj.GNSS_0,
            timeCreated: latestMessage.payload.message.timestamp,
            heading: latestMessage.payload.message.heading, // degrees
            heading_accuracy: latestMessage.payload.message.heading_accuracy

          }
        }))
        break;
      }


      case latestMessage.topic.match("CROWSNEST/" + MQTT_PLATFORM_ID + "/WIND/0/JSON")?.input: {

        //  MQTT logger topics 
        set(atomMqttTopics, (currentObj) => ({
          ...currentObj,
          ["CROWSNEST/" + MQTT_PLATFORM_ID + "/WIND/0/JSON"]: {
            time_received: new Date(),
            timestamp: new Date(latestMessage.payload.message.timestamp),
            delay_calc: Math.abs((new Date(latestMessage.payload.message.timestamp).getTime() - new Date().getTime()) / 1000),
            count: currentObj["CROWSNEST/" + MQTT_PLATFORM_ID + "/WIND/0/JSON"]?.count ? currentObj["CROWSNEST/" + MQTT_PLATFORM_ID + "/WIND/0/JSON"].count + 1 : 1
          }
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

        set(OS_WIND, (currentObj) => ({
          ...currentObj,
          WIND_0: {
            ...currentObj.WIND_0,
            timeCreated: latestMessage.payload.message.timestamp,
            wind_angle: latestMessage.payload.message.wind_angle != null ? latestMessage.payload.message.wind_angle : currentObj.WIND_0.wind_angle,
            wind_speed: latestMessage.payload.message.wind_speed,
            reference_angel: latestMessage.payload.message.reference_angel,
            status: "normal", // [normal, warning, error] 
            statusText: latestMessage.payload.message.status, // A NMEA?

            heading: latestMessage.payload.message.heading, // degrees
            heading_accuracy: latestMessage.payload.message.heading_accuracy

          }
        }))
        break;
      }

      case latestMessage.topic.match("CROWSNEST/" + MQTT_PLATFORM_ID + "/LIDAR/0/NUP")?.input: {

        //  MQTT logger topics 
        set(atomMqttTopics, (currentObj) => ({
          ...currentObj,
          ["CROWSNEST/" + MQTT_PLATFORM_ID + "/LIDAR"]: {
            time_received: new Date(),
            count: currentObj["CROWSNEST/" + MQTT_PLATFORM_ID + "/LIDAR"]?.count ? currentObj["CROWSNEST/" + MQTT_PLATFORM_ID + "/LIDAR"].count + 1 : 1,
            timestamp: new Date(latestMessage.payload.message.sent_at),
            delay_calc: Math.abs((new Date(latestMessage.payload.sent_at).getTime() - new Date().getTime()) / 1000),

          }
        }))

        set(lidarObservationAtom, () => (
          latestMessage.payload.message
        ));
        break;
      }


      case latestMessage.topic.match("CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/0/NUP")?.input: {
        //  MQTT logger topics 
        set(atomMqttTopics, (currentObj) => ({
          ...currentObj,
          ["CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/0/NUP"]: {
            time_received: new Date(),
            timestamp: new Date(latestMessage.payload.message.sent_at),
            delay_calc: Math.abs((new Date(latestMessage.payload.sent_at).getTime() - new Date().getTime()) / 1000),
            count: currentObj["CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/0/NUP"]?.count ? currentObj["CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/0/NUP"].count + 1 : 1

          }
        }))

        let frameR = latestMessage.payload
        let radarFrameList = []
        for (let i = 0; i < frameR.message.points.length; i++) {
          const radarPoint = {
            point: frameR.message.points[i],
            weight: frameR.message.weights[i],
            distance: Math.sqrt(Math.abs(frameR.message.points[i][0]) ** 2 + Math.abs(frameR.message.points[i][1]) ** 2)
          }
          radarFrameList.push(radarPoint)
        }
        set(OS_RADAR_0, () => (
          radarFrameList
        ));
        break;
      }

      case latestMessage.topic.match("CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/1/NUP")?.input: {
        //  MQTT logger topics 
        set(atomMqttTopics, (currentObj) => ({
          ...currentObj,
          ["CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/1/NUP"]: {
            time_received: new Date(),
            timestamp: new Date(latestMessage.payload.message.sent_at),
            delay_calc: Math.abs((new Date(latestMessage.payload.sent_at).getTime() - new Date().getTime()) / 1000),
            count: currentObj["CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/1/NUP"]?.count ? currentObj["CROWSNEST/" + MQTT_PLATFORM_ID + "/RADAR/1/NUP"].count + 1 : 1
          }
        }))

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
        set(OS_RADAR_1, () => (
          radarFrame
        ));
        break;
      }


      case latestMessage.topic.match("CROWSNEST/LANDKRABBA/RADAR/0/SWEEP")?.input: {
        //  MQTT logger topics 
        set(atomMqttTopics, (currentObj) => ({
          ...currentObj,
          ["CROWSNEST/LANDKRABBA/RADAR/0/SWEEP"]: {
            time_received: new Date(),
            timestamp: new Date(latestMessage.payload.message.sent_at),
            delay_calc: Math.abs((new Date(latestMessage.payload.sent_at).getTime() - new Date().getTime()) / 1000),
            count: currentObj["CROWSNEST/LANDKRABBA/RADAR/0/SWEEP"]?.count ? currentObj["CROWSNEST/LANDKRABBA/RADAR/0/SWEEP"].count + 1 : 1

          }
        }))

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

        set(AtomShoreRadarObservation, () => (
          radarFrame
        ));
        break;
      }



      case latestMessage.topic.match("CROWSNEST/LANDKRABBA/RADAR/1/SWEEP")?.input: {
        //  MQTT logger topics 
        set(atomMqttTopics, (currentObj) => ({
          ...currentObj,
          ["CROWSNEST/LANDKRABBA/RADAR/1/SWEEP"]: {
            time_received: new Date(),
            timestamp: new Date(latestMessage.payload.message.sent_at),
            delay_calc: Math.abs((new Date(latestMessage.payload.sent_at).getTime() - new Date().getTime()) / 1000),
            count: currentObj["CROWSNEST/LANDKRABBA/RADAR/1/SWEEP"]?.count ? currentObj["CROWSNEST/LANDKRABBA/RADAR/1/SWEEP"].count + 1 : 1

          }
        }))

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

        set(AtomShoreRadar_1, () => (
          radarFrame
        ));
        break;
      }

      case latestMessage.topic.match(/CROWSNEST\/\w{1,55}..\/HW\/0\/JSON/)?.input: {
        // case /CROWSNEST\/\w{1,55}\/HW/0/JSON/g.test(latestMessage.topic):{

        let sent_at = new Date(latestMessage.payload.sent_at)
        let network_delay = Math.abs((sent_at.getTime() - new Date().getTime()) / 1000)

        //  MQTT logger topics 
        set(atomMqttTopics, (currentObj) => ({
          ...currentObj,
          [latestMessage.topic]: {
            time_received: new Date(),
            timestamp: sent_at,
            delay_calc: network_delay,
            count: currentObj[latestMessage.topic]?.count ? currentObj[latestMessage.topic].count + 1 : 1

          }
        }))

        let msg = latestMessage.payload.message


        // console.log(msg);


        //  Atom HW logger 
        set(atomHWlog, (currentObj) => ({
          ...currentObj,
          [latestMessage.topic]: {
            "received_at": new Date(),
            "network_delay": network_delay,
            "op_system": msg.op_system,
            "sys_name": msg.sys_name,
            "boot_time": msg.boot_time,
            "ram_size": msg.ram_size,
            "cpu_load_procreant": msg.cpu_load_procreant,
            "cpu_load_trend": currentObj[latestMessage.topic]?.cpu_load_trend ? [...currentObj[latestMessage.topic].cpu_load_trend, { time: sent_at, load: msg.cpu_load_procreant }] : [{ time: sent_at, load: msg.cpu_load_procreant }],
            "cpu_temp": msg.cpu_temp,
            "cpu_temp_trend": currentObj[latestMessage.topic]?.cpu_temp_trend ? [...currentObj[latestMessage.topic].cpu_temp_trend, { time: sent_at, load: msg.cpu_temp }] : [{ time: sent_at, load: msg.cpu_temp }],
            "ram_usage": msg.ram_usage,
            "ram_usage_trend": currentObj[latestMessage.topic]?.ram_usage_trend ? [...currentObj[latestMessage.topic].ram_usage_trend, { time: sent_at, load: msg.ram_usage }] : [{ time: sent_at, load: msg.ram_usage }]

          }
        }))
        break;
      }





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
        //  MQTT logger topics 
        set(atomMqttTopicsUnhandled, (currentObj) => ({
          ...currentObj,
          [latestMessage.topic]: {
            time_received: new Date(),
            count: currentObj[latestMessage.topic]?.count ? currentObj[latestMessage.topic].count + 1 : 1
          }
        }))
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

