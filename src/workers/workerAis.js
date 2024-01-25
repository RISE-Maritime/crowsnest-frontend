import mqtt from "precompiled-mqtt"

const mqttOptions = {
  clientId: "crowsnest_app_" + Math.random(),
  connectTimeout: 4000,
  protocolVersion: 5,
}
const mqttHost = "wss://crowsnest.mo.ri.se:443/mqtt"
var ports = [] // Array to hold connected ports
let mqttConnection = null
const targetsBuffer = {}
const sendTargetsInterval = 2500 // Interval to send messages (in milliseconds)
const handleOldMessagesInterval = 10000
const deleteOldMessagesAt = 60000
const flagOldMessagesAt = 30000

function sendTargets() {
  const targetsArray = Object.values(targetsBuffer).sort((a, b) => a.mmsi - b.mmsi)
  ports.forEach(port => {
    port.postMessage({ type: "ais", payload: targetsArray })
  })
}

function sendError(error) {
  ports.forEach(port => {
    port.postMessage({ type: "error", payload: error })
  })
}

function handleOldMessages() {
  const currentTime = Date.now()
  Object.keys(targetsBuffer).forEach(mmsi => {
    const message = targetsBuffer[mmsi]
    const messageAge = currentTime - new Date(message.sent_at).getTime()

    // Change the color to red if the message is old, but not old enough to delete
    if (messageAge > flagOldMessagesAt && messageAge <= deleteOldMessagesAt) {
      targetsBuffer[mmsi].color = [219, 63, 55, 250]
    }

    // Delete the message is so old it should be deleted
    if (messageAge > deleteOldMessagesAt) {
      delete targetsBuffer[mmsi]
    }
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

        // Set timestamp
        //message['timestamp'] = Date(message.sent_at).getTime()

        if (targetsBuffer[message.mmsi]) {
          // Merge the new message into the existing message
          targetsBuffer[message.mmsi] = { ...targetsBuffer[message.mmsi], ...message }
        } else {
          // No existing message, simply add the new one
          targetsBuffer[message.mmsi] = message
        }
      }
    })

    setInterval(sendTargets, sendTargetsInterval)
    setInterval(handleOldMessages, handleOldMessagesInterval)
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
  }
  port.start()
  MqttConnectionManagement()
}
