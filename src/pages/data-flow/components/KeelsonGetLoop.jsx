import React, { useState, useEffect } from "react"
import axios from "axios"
import * as yup from "yup"
import { useFormik } from "formik"
import { Stack, TextField, Button, Typography } from "@mui/material"
import { atomKeelsonConnectionState } from "../../../recoil/atoms"
import { useRecoilValue } from "recoil"

export default function KeelsonGetLoop() {
  const [intervalVar, setIntervalVar] = useState(null)
  const [isStarted, setIsStarted] = useState(false)

  useEffect(() => {
    console.log("KeelsonGetLoop mounted")

    return () => {
      console.log("KeelsonGetLoop unmounted")
    }
  }, [])

  const validationSchema = yup.object({
    hostLoop: yup.string().required("Required"),
    keyExprLoop: yup.string().required("Required"),
  })

  /* eslint-disable */
  const initFormValuesManual = {
    // username: process.env.REACT_APP_MQTT_USERNAME ? process.env.REACT_APP_MQTT_USERNAME : "",
    // password: process.env.REACT_APP_MQTT_PASSWORD ? process.env.REACT_APP_MQTT_PASSWORD : "",
    hostLoop: "http://localhost:8000",
    keyExprLoop: "rise/masslab/**",
  }
  /* eslint-enable */

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: initFormValuesManual,
    onSubmit: values => {
      submitMsg(values)
    },
  })

  const submitMsg = values => {
    console.log("Submitted KEELSON LOOOP: ", values)

    const URL = values.hostLoop + "/" + values.keyExprLoop

    const interval = setInterval(() => {
      axios.get(URL).then(res => {
        let time = new Date()
        console.log("Loop Response: ", time, res)
      })
    }, 1000)

    setIntervalVar(interval)
    setIsStarted(true)
    // return values
  }

  function getLoop(URL) {
    console.log("Loop URL: ", URL)

    axios.get(URL).then(res => {
      console.log("Loop Response: ", res)
    })
  }

  function stopLoop() {
    console.log("Stopping loop")
    clearInterval(intervalVar)
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={1} sx={{ minWidth: "25vw" }}>
        <Typography variant="h5"> Keelson GET Looper </Typography>
        <TextField
          id="hostLoop"
          label="Host URL"
          fullWidth
          variant="filled"
          size="small"
          defaultValue={formik.values.hostLoop}
          onChange={formik.handleChange}
          error={formik.touched.hostLoop && Boolean(formik.errors.hostLoop)}
          helperText={formik.touched.hostLoop && formik.errors.hostLoop}
        />
        <TextField
          id="keyExprLoop"
          label="Key Expression & Variables"
          fullWidth
          variant="filled"
          size="small"
          defaultValue={formik.values.keyExprLoop}
          onChange={formik.handleChange}
          error={formik.touched.keyExprLoop && Boolean(formik.errors.keyExprLoop)}
          helperText={formik.touched.keyExprLoop && formik.errors.keyExprLoop}
        />

        {isStarted ? (
          <Button onClick={stopLoop} variant="contained" color="info" fullWidth sx={{ marginTop: "0.4rem" }}>
            Stop
          </Button>
        ) : (
          <Button type="submit" variant="contained" color="info" fullWidth sx={{ marginTop: "0.4rem" }}>
            Start
          </Button>
        )}
      </Stack>
    </form>
  )
}
