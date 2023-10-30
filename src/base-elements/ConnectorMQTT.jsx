import React, { useEffect, useState } from "react"
import mqtt from "precompiled-mqtt"
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil"
import { wsMessageParser } from "../recoil/selectors"
import { atomMQTTConONOFF, atomMQTTconnectionState } from "../recoil/atoms"

/* eslint-disable */
// const host = process.env.REACT_APP_MQTT_BROKER_ADDRESS
const host = "ws://localhost:80/mqtt"

const options = {
  clientId: "crowsnest_app_" + Math.random(),
  connectTimeout: 4000,
  username: process.env.REACT_APP_MQTT_USERNAME,
  // password: process.env.REACT_APP_MQTT_PASSWORD,
  protocolVersion: 5,
}
/* eslint-enable */

// var client = mqtt.connect(host, options)

//  function mqttSubscribeLOCAL(topic) {
//   client.subscribe(topic, err => {
//     if (err) {
//       console.log(topic, err)
//     }
//   })
// }

// export function mqttPublishLOCAL(topic, qos, payload) {
//   payload = JSON.stringify(payload)

//   client.publish(topic, payload, { qos }, error => {
//     if (error) {
//       console.log("Publish error: ", error)
//     }
//   })
// }

export default function MqttConnectionLOCAL() {
  const [client, setClient] = useState(mqtt.connect(host, options))
  const [mqttState, setMqttState] = useRecoilState(atomMQTTconnectionState)
  const parseWsMessage = useSetRecoilState(wsMessageParser)

  useEffect(() => {
    console.log("MqttConnection STARTING...")

    function mqttSubscribeLOCAL(topic) {
      client.subscribe(topic, err => {
        if (err) {
          console.log(topic, err)
        }
      })
    }

    if (client) {
      mqttSubscribeLOCAL("CROWSNEST/#")

      client.on("connect", () => {
        console.log("Connected to LOCAL MQTT broker!")
        setMqttState(true)
      })

      client.on("error", err => {
        console.log("Connection error: " + err)
        client.end()
      })

      client.on("close", function () {
        console.log("Disconnected")
        setMqttState({
          ...mqttState,
          connected: false,
        })
      })

      client.on("message", (topic, payload) => {
        parseWsMessage({ topic: topic, payload: JSON.parse(payload.toString()) })
        // parseWsMessage({ topic: topic, payload: payload })
      })
    }

    return () => {
      console.log("MqttConnectionLOCAL unmounting")
      client.end()
      client.remove
    }
  }, [])

  return <></>
}
