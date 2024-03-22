import React, { useState } from "react"
import axios from "axios"
import * as yup from "yup"
import { useFormik } from "formik"
import { Stack, TextField, Typography } from "@mui/material"
import { useSetRecoilState } from "recoil"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import StopIcon from "@mui/icons-material/Stop"
import { protoParser } from "../../../recoil/selectors"
import { ObcButton as Button } from "@oicl/openbridge-webcomponents-react/components/button/button"

export default function KeelsonGetLoop() {
  const [intervalVar, setIntervalVar] = useState(null)
  const [isStarted, setIsStarted] = useState(false)
  const protoDecoder = useSetRecoilState(protoParser)

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
    // keyExprLoop: "**",
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
    console.log("Submit", values)

    const URL = values.hostLoop + "/" + values.keyExprLoop

    const interval = setInterval(() => {
      axios.get(URL).then(res => {
        // let time = new Date()
        // console.log("Loop Response: ", time, res)

        res.data.forEach(element => {
          // console.log("For Each : ", element)
          protoDecoder(element)
        })
      })
    }, 1000)

    setIntervalVar(interval)
    setIsStarted(true)
    // return values
  }

  function stopLoop() {
    console.log("Stopping loop")
    clearInterval(intervalVar)
    setIsStarted(false)
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={1} sx={{ minWidth: "20vw", height: "100%" }} justifyContent="space-between">
        <Stack spacing={1}>
          <Typography sx={{ paddingBottom: "0.5rem" }} variant="h5">
            Keelson GET Looper
          </Typography>
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
        </Stack>

        {isStarted ? null : (
          <Button onClick={formik.handleSubmit} fullWidth>
            <PlayArrowIcon slot="leading-icon" />
            Start
          </Button>
        )}
        {isStarted ? (
          <Button onClick={stopLoop} fullWidth>
            <StopIcon slot="leading-icon" />
            Stop
          </Button>
        ) : null}
      </Stack>
    </form>
  )
}
