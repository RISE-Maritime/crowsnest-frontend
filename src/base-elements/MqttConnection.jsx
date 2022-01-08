import React from "react";
import mqtt from "mqtt";
import { atom, useSetRecoilState } from "recoil";

/* eslint-disable */
const host = process.env.REACT_APP_MQTT_BROKER_ADDRESS;

const options = {
  clientId: "crowsnest_" + Math.random().toString(16).substr(2, 8),
  reconnectPeriod: 1000,
  username: process.env.REACT_APP_MQTT_USERNAME,
  password: process.env.REACT_APP_MQTT_PASSWORD,
};
/* eslint-enable */

let client = mqtt.connect(host, options);

export const mqttMessageAtom = atom({
  key: "mqtt_message",
  default: { topic: "", payload: null },
});

export function mqttSubscribe(topic) {
  client.subscribe(topic, (err) => console.log(err));
}

export default function MqttConnection() {
  const setMqttMessage = useSetRecoilState(mqttMessageAtom);

  React.useEffect(() => {
    client.on("connect", () => {
      console.log("Connected to MQTT broker!");
    });
    client.on("error", (err) => {
      console.log("Connection error: " + err);
      client.end();
    });
    client.on("message", (topic, payload) => {
      console.log("Here", topic, payload);
      setMqttMessage({ topic: topic, payload: payload });
    });
  }, []);
  return <></>;
}
