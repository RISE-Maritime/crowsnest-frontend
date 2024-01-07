import mqtt from "precompiled-mqtt"

const mqttOptions = {
  clientId: "crowsnest_app_" + Math.random(),
  connectTimeout: 4000,
  protocolVersion: 5,
}
const mqttHost = "wss://crowsnest.mo.ri.se:443/mqtt"
var ports = [] // Array to hold connected ports
let monitoredAisVessel = []
let mqttConnection = null

function sendError(error) {
  ports.forEach(port => {
    port.postMessage({ type: "error", payload: error })
  })
}

function CreateMqttConnection(credentials) {
  mqttConnection = mqtt.connect(mqttHost, { ...mqttOptions, ...credentials }, error => {
    error && sendError(error)
  })
  mqttConnection.subscribe("CROWSNEST/EXTERNAL/AIS/SJOFARTSVERKET/+/1", error => {
    error && sendError(error)
  })
  mqttConnection.subscribe("CROWSNEST/EXTERNAL/AIS/SJOFARTSVERKET/+/2", error => {
    error && sendError(error)
  })
  mqttConnection.subscribe("CROWSNEST/EXTERNAL/AIS/SJOFARTSVERKET/+/3", error => {
    error && sendError(error)
  })
  mqttConnection.subscribe("CROWSNEST/EXTERNAL/AIS/SJOFARTSVERKET/+/8", error => {
    error && sendError(error)
  })
  mqttConnection.subscribe("CROWSNEST/EXTERNAL/AIS/SJOFARTSVERKET/+/5", error => {
    error && sendError(error)
  })
}

function MqttConnectionManagement() {
  if (mqttConnection) {
    mqttConnection.on("message", (topic, payload) => {
      let message
      let newDate

      // Parse the message
      try {
        message = JSON.parse(payload)
      } catch (e) {
        sendError("Error parsing message payload")
        return
      }
      if ("mmsi" in message.message) {
        message = { sent_at: message.sent_at, ...message.message }
        if (monitoredAisVessel.includes(message.mmsi)) {
          // Position report timestamp
          if (message.msg_type !== 5) {
            newDate = new Date(message.sent_at)
            message["position_report_timestamp"] = newDate.getTime() / 1000
          }

          // Approximate course if missing
          if (!("course" in message)) {
            message["course"] = message.heading
          }

          // Determine color
          if (message.speed === 0.0) {
            message["color"] = [193, 99, 219, 250]
          } else {
            message["color"] = [70, 219, 110, 250]
          }

          ports.forEach(port => {
            port.postMessage({ type: "ais", payload: message })
          })
        }
      }
    })
  }
}

self.onconnect = e => {
  const port = e.ports[0]
  ports.push(port)

  port.onmessage = e => {
    if (e.data.type === "mqtt_credentials") {
      CreateMqttConnection(e.data.payload)
      MqttConnectionManagement()
    }
    if (e.data.type === "add_ais_mmsi") {
      monitoredAisVessel.push(e.data.identifier)
    }
  }
  port.start()
  MqttConnectionManagement()
}
