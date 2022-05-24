import React, { useEffect } from "react"
import mqtt from "precompiled-mqtt"
import { atom, useSetRecoilState, useRecoilState } from "recoil"
import { wsMessageParser } from "../recoil/selectors"

/* eslint-disable */
const host = process.env.REACT_APP_MQTT_BROKER_ADDRESS

const options = {
  clientId: "crowsnest_app_" + Math.random(),
  connectTimeout: 4000,
  username: process.env.REACT_APP_MQTT_USERNAME,
  password: process.env.REACT_APP_MQTT_PASSWORD,
  protocolVersion: 5,
}
/* eslint-enable */

let client = mqtt.connect(host, options)

export const mqttMessageAtom = atom({
  key: "mqtt_message",
  default: { topic: "", payload: null },
})

export const mqttStateAtom = atom({
  key: "mqtt_state",
  default: { connected: false },
})

export function mqttSubscribe(topic) {
  client.subscribe(topic, err => console.log(err))
}

export function mqttPublish(topic, qos, payload) {
  payload = JSON.stringify(payload)

  client.publish(topic, payload, { qos }, error => {
    if (error) {
      console.log("Publish error: ", error)
    }
  })
}

export default function MqttConnection() {
  const [mqttState, setMqttState] = useRecoilState(mqttStateAtom)
  const parseWsMessage = useSetRecoilState(wsMessageParser)

  useEffect(() => {

    client.on("connect", () => {
      console.log("Connected to MQTT broker!")
      setMqttState({
        ...mqttState,
        connected: true,
      })
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
      // parseWsMessage({ topic: topic, payload: JSON.parse(payload.toString()) })
      parseWsMessage({ topic: topic, payload: payload })
    })
  }, [])

  return <></>
}
