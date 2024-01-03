import mqtt from "precompiled-mqtt"

const mqttOptions = {
  clientId: "crowsnest_app_" + Math.random(),
  connectTimeout: 4000,
  username: "luisdummy",
  password: "dummy",
  protocolVersion: 5,
}

const mqttHost = "wss://crowsnest.mo.ri.se:443/mqtt"

var ports = [] // Array to hold connected ports
let mqttConnection = null
const messageBuffer = {} // Buffer to store messages
const sendInterval = 2500 // Interval to send messages (in milliseconds)

function sendBufferedMessages() {
  const bufferArray = Object.values(messageBuffer).sort((a, b) => a.mmsi - b.mmsi)
  ports.forEach(port => {
    port.postMessage(bufferArray)
  })
}

function MqttConnectionManagement() {
  if (mqttConnection) {
    mqttConnection.on("message", (topic, payload) => {
      // Assuming payload is a JSON string that includes an 'mmsi' property
      let message
      try {
        message = JSON.parse(payload)
      } catch (e) {
        console.error("Error parsing payload:", e)
        return
      }

      if (message && message.message.mmsi) {
        message = { sent_at: message.sent_at, ...message.message }
        // Approximate course over ground

        messageBuffer[message.mmsi] = message
      }
    })

    // Set interval to send buffered messages
    setInterval(sendBufferedMessages, sendInterval)
  }
}

self.onconnect = e => {
  if (!mqttConnection) {
    mqttConnection = mqtt.connect(mqttHost, mqttOptions)
    mqttConnection.subscribe("CROWSNEST/EXTERNAL/AIS/SJOFARTSVERKET/+/1", err => console.log(err))
    mqttConnection.subscribe("CROWSNEST/EXTERNAL/AIS/SJOFARTSVERKET/+/8", err => console.log(err))
    mqttConnection.subscribe("CROWSNEST/EXTERNAL/AIS/SJOFARTSVERKET/+/5", err => console.log(err))
  }
  const port = e.ports[0]
  ports.push(port)
  port.start()
  MqttConnectionManagement()
  port.postMessage("The number of connections is " + ports.length)
  port.postMessage(mqttConnection.username)
}
