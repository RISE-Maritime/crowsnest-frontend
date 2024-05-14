import React from 'react'
import { Stack, TextField } from "@mui/material"
import * as yup from "yup"
import { useFormik } from "formik"
import axios from "axios"
import { useSetRecoilState } from "recoil"
import { protoParser } from "../../../recoil/selectors"

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

export default function RouterConnector() {

  const protoDecoder = useSetRecoilState(protoParser)

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



    if (Array.isArray(res.data)) {
          res.data.forEach(element => {
              protoDecoder(element)
            })
        }

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
    <div>
      <Stack> 
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
</Stack>
    </div>
  )
}
