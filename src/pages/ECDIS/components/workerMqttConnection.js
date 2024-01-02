import mqtt from "precompiled-mqtt"

var ports = [] // Array to hold connected ports

const mqttHost = "wss://crowsnest.mo.ri.se:443/mqtt"
const mqttOptions = {
  clientId: "crowsnest_app_" + Math.random(),
  connectTimeout: 4000,
  username: "luisdummy",
  password: "dummy",
  protocolVersion: 5,
}

let mqttConnection = null

// mqttConnection.on("message", (topic, payload) => {
//   ports.forEach(port => {
//     port.postMessage(topic)
//   })
// })

// mqttConnection.error("error", error => {
//   ports.forEach(port => {
//     port.postMessage(("error", error))
//   })
// })

function MqttConnectionManagement() {
  if (mqttConnection) {
    mqttConnection.on("message", (topic, payload) => {
      ports.forEach(port => {
        port.postMessage(topic)
      })
    })
  }
}

self.onconnect = e => {
  if (!mqttConnection) {
    mqttConnection = mqtt.connect(mqttHost, mqttOptions)
    mqttConnection.subscribe("CROWSNEST/#", err => console.log(err))
  }
  const port = e.ports[0]
  ports.push(port)
  port.start()
  MqttConnectionManagement()
  port.postMessage("The number of connections is " + ports.length)
  port.postMessage(mqttConnection.username)
}
