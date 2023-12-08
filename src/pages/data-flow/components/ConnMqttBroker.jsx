import React, { useEffect, useState } from "react"
import mqtt from "precompiled-mqtt"
import { useFormik } from "formik"
import * as yup from "yup"
import { Grid, TextField, Button } from "@mui/material"
import { messageParser } from "../../../recoil/selectors"
import { atomMQTTconnectionState } from "../../../recoil/atoms"
import { useRecoilState, useSetRecoilState } from "recoil"

const validationSchema = yup.object({
  username: yup.string().required("Required"),
  password: yup.string().required("Required"),
})
/* eslint-disable */
const initFormValuesManual = {
  username: process.env.REACT_APP_MQTT_USERNAME ? process.env.REACT_APP_MQTT_USERNAME : "",
  password: process.env.REACT_APP_MQTT_PASSWORD ? process.env.REACT_APP_MQTT_PASSWORD : "",
  mqttRemoteHost: "wss://crowsnest.mo.ri.se:443/mqtt",
  subscribeTopic: "CROWSNEST/#",
}
/* eslint-enable */
const initMqttOptions = {
  clientId: "crowsnest_app_" + Math.random(),
  connectTimeout: 4000,
  username: "",
  password: "",
  protocolVersion: 5,
}

export default function MqttBrokerLogin() {
  const [mqttConState, setMqttConState] = useRecoilState(atomMQTTconnectionState)

  const [client, setClient] = useState(null)
  const parseWsMessage = useSetRecoilState(messageParser)

  useEffect(() => {

    if (client) {
      client.on("connect", () => {
        console.log("Connected to REMOTE MQTT broker!")
        client.subscribe("CROWSNEST/#", err => console.log(err))
        setMqttConState(true)
      })

      client.on("error", err => {
        console.log("Connection error REMOTE MQTT broker: " + err)
        formik.setFieldError("password", "Not able to connect to MQTT broker")
        client.end()
      })

      client.on("close", function () {
        console.log("Disconnected REMOTE MQTT broker")
        setMqttConState({
          ...mqttConState,
          connected: false,
        })
      })

      client.on("message", (topic, payload) => {
        // console.log("Message received: ", topic, payload.toString())
        parseWsMessage({ topic: topic, payload: JSON.parse(payload.toString()) })
      })
    }
  }, [client])

  // TODO: Make to global function
  // function mqttPublishRemote(topic, qos, payload) {
  //   payload = JSON.stringify(payload)
  //   client.publish(topic, payload, { qos }, error => {
  //     if (error) {
  //       console.log("Publish error: ", error)
  //     }
  //   })
  // }

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        setMqttConState(false)
      })
    }
  }

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: initFormValuesManual,
    onSubmit: values => {
      submitAndConnect(values)
    },
  })

  const submitAndConnect = values => {
    console.log("Connecting to REMOTE MQTT: ", values)
    let newMqttOptions = {
      ...initMqttOptions,
      username: values.username,
      password: values.password,
    }

    let initClient = mqtt.connect(values.mqttRemoteHost, newMqttOptions)

    initClient.subscribe("CROWSNEST/#", err => console.log(err))

    // Making client global
    setClient(initClient)
    return values
  }

  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1} justifyContent="center" alignItems="flex-start">
            <Grid item xs={12}>
              <TextField
                id="mqttRemoteHost"
                label="Host URL"
                fullWidth
                variant="filled"
                size="small"
                disabled={mqttConState ? true : false}
                defaultValue={formik.values.mqttRemoteHost}
                onChange={formik.handleChange}
                error={formik.touched.mqttRemoteHost && Boolean(formik.errors.mqttRemoteHost)}
                helperText={formik.touched.mqttRemoteHost && formik.errors.mqttRemoteHost}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="username"
                label="Username"
                fullWidth
                variant="filled"
                size="small"
                disabled={mqttConState ? true : false}
                defaultValue={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="password"
                label="Password"
                fullWidth
                variant="filled"
                size="small"
                type="password"
                disabled={mqttConState ? true : false}
                sx={{ paddingRight: "0.2rem" }}
                defaultValue={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="subscribeTopic"
                label="Subscribe Topic"
                fullWidth
                variant="filled"
                size="small"
                disabled={mqttConState ? true : false}
                sx={{ paddingRight: "0.2rem" }}
                defaultValue={formik.values.subscribeTopic}
                onChange={formik.handleChange}
                error={formik.touched.subscribeTopic && Boolean(formik.errors.subscribeTopic)}
                helperText={formik.touched.subscribeTopic && formik.errors.subscribeTopic}
              />
            </Grid>

            <Grid item xs={12}>
              {!mqttConState ? (
                <Button type="submit" variant="contained" color="success" fullWidth sx={{ marginTop: "0.4rem" }}>
                  Connect
                </Button>
              ) : (
                <Button variant="contained" color="error" fullWidth onClick={mqttDisconnect}>
                  Disconnect
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  )
}
