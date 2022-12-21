import React, { useEffect, useState } from "react"
import mqtt from "precompiled-mqtt"
import {  useFormik } from "formik"
import * as yup from "yup"
import { Grid, TextField, Stack, Button } from "@mui/material"
import { wsMessageParser } from "../../../recoil/selectors"
import { atomMqttRemoteAccount, atomMqttRemoteState } from "../../../recoil/atoms"
import { useRecoilState, useSetRecoilState } from "recoil"

const validationSchema = yup.object({
  username: yup.string().required("Required"),
  password: yup.string().required("Required"),
})

const initialValuesManual = {
  username: "",
  password: "",
}

const initMqttOptions = {
  clientId: "crowsnest_app_" + Math.random(),
  connectTimeout: 4000,
  username: "",
  password: "",
  protocolVersion: 5,
}

const initMqttHost = "wss://crowsnest.mo.ri.se:443/mqtt"

export default function MqttBrokerLogin() {
  const [mqttRemoteAccount, setMqttRemoteAccount] = useRecoilState(atomMqttRemoteAccount)
  const [mqttState, setMqttState] = useRecoilState(atomMqttRemoteState)
  const [mqttOptions, setMqttOptions] = useState(initMqttOptions)
  const [mqttHost, setMqttHost] = useState(initMqttHost)
  const [client, setClient] = useState(null)
  const parseWsMessage = useSetRecoilState(wsMessageParser)

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        console.log("Connected to REMOTE MQTT broker!")
        client.subscribe("CROWSNEST/#", err => console.log(err))
        setMqttState({
          ...mqttState,
          connected: true,
        })
      })

      client.on("error", err => {
        console.log("Connection error REMOTE MQTT broker: " + err)
        formik.setFieldError("password", "Not able to connect to MQTT broker")
        client.end()
      })

      client.on("close", function () {
        console.log("Disconnected REMOTE MQTT broker")
        setMqttState({
          ...mqttState,
          connected: false,
        })
      })

      client.on("message", (topic, payload) => {
        console.log("Message received: ", topic, payload.toString())
        parseWsMessage({ topic: topic, payload: JSON.parse(payload.toString()) })
        // parseWsMessage({ topic: topic, payload: payload })
      })
    }
  }, [client])

  const mqttConnect = () => {
    mqttSubscribeRemote("CROWSNEST/#")
  }

  function mqttSubscribeRemote(topic) {
    client.subscribe(topic, err => console.log(err))
  }

  // Make to global function
  function mqttPublishRemote(topic, qos, payload) {
    payload = JSON.stringify(payload)

    client.publish(topic, payload, { qos }, error => {
      if (error) {
        console.log("Publish error: ", error)
      }
    })
  }

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        setMqttState({
          ...mqttState,
          connected: false,
          connectionStatus: "Disconnected",
        })
      })
    }
  }

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: initialValuesManual,
    onSubmit: values => {
      submitAndConnect(values)
    },
  })

  const submitAndConnect = values => {
    console.log(values)

    let newMqttOptions = {
      ...mqttOptions,
      username: values.username,
      password: values.password,
    }

    let initClient = mqtt.connect(mqttHost, newMqttOptions)
    
    // setMqttOptions(newMqttOptions)

    // setMqttRemoteAccount({
    //   ...mqttRemoteAccount,
    //   username: values.username,
    //   password: values.password,
    // })

    initClient.subscribe("CROWSNEST/#", err => console.log(err))

    // Making client global
    setClient(initClient)
    return values
  }

  return (
    <>
      {mqttState.connected === false ? (
        <div>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={1} justifyContent="center" alignItems="flex-start">
              <Grid item xs={5}>
                <TextField
                  id="username"
                  label="Username"
                  fullWidth
                  variant="filled"
                  size="small"
                  onChange={formik.handleChange}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>

              <Grid item xs={5}>
                <TextField
                  id="password"
                  label="Password"
                  fullWidth
                  variant="filled"
                  size="small"
                  sx={{ paddingRight: "0.2rem" }}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>

              <Grid item xs={2}>
                <Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={2} sx={{ width: "100%" }}>
                  <Button type="submit" variant="contained" color="success" sx={{ marginTop: "0.4rem" }}>
                    Submit
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </div>
      ) : (
        <Button variant="contained" color="error" onClick={mqttDisconnect}>
          Disconnect
        </Button>
      )}
    </>
  )
}
