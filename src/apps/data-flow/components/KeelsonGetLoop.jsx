import React, { useState } from "react"
import axios from "axios"
import * as yup from "yup"
import { useFormik } from "formik"
import { Stack, TextField } from "@mui/material"
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
    hostLoop: process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL ? process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL : "http://localhost:8000",
    keyExprLoop: process.env.REACT_APP_ZENOH_BASE_KEYEXP ? process.env.REACT_APP_ZENOH_BASE_KEYEXP : "rise/v0/masslab/**",
  }
  /* eslint-enable */

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: initFormValuesManual,
    onSubmit: values => {
      console.log("PRESSED SUBMIT")
      submitMsg(values)
    },
  })

  const submitMsg = values => {
    const URL = values.hostLoop + "/" + values.keyExprLoop

    const interval = setInterval(() => {
      axios.get(URL).then(res => {

        console.log("GET LOOP RESPONSE", res.data);


    if (Array.isArray(res.data)) {
          res.data.forEach(element => {
              protoDecoder(element)
            })
        }

      }).catch(error => {
        console.error("Failed to get frame:", error)
      })
    }, 1000)

    setIntervalVar(interval)
    setIsStarted(true)
  }

  function stopLoop() {
    clearInterval(intervalVar)
    setIsStarted(false)
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={1} sx={{ minWidth: "20vw", height: "100%" }} justifyContent="space-between">
        <Stack spacing={1}>
          <h3 >
            GET Looper
          </h3>
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
