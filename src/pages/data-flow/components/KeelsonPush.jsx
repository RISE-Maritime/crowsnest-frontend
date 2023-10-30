import React from "react"
import axios from "axios"
import * as yup from "yup"
import { useFormik } from "formik"
import { Stack, TextField, Button, Typography } from "@mui/material"
import { atomKeelsonConnectionState } from "../../../recoil/atoms"
import { useRecoilValue } from "recoil"

export default function KeelsonPush() {
  const keelsonConnectionState = useRecoilValue(atomKeelsonConnectionState)
  const validationSchema = yup.object({
    hostPush: yup.string().required("Required"),
    keyExpr: yup.string().required("Required"),
    msg: yup.string().required("Required"),
  })

  /* eslint-disable */
  const initFormValuesManual = {
    // username: process.env.REACT_APP_MQTT_USERNAME ? process.env.REACT_APP_MQTT_USERNAME : "",
    // password: process.env.REACT_APP_MQTT_PASSWORD ? process.env.REACT_APP_MQTT_PASSWORD : "",
    hostPush: "http://localhost:8000",
    keyExpr: "TEST/msg",
    msg: "Keelson test message",
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
    console.log("Submitted KEELSON MSG: ", values)

    axios.put(values.hostPush + "/" + values.keyExpr, values.msg).then(res => {
      console.log("Response: ", res)
    })

    return values
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={1} sx={{ minWidth: "25vw" }}>
        <Typography variant="h5"> Keelson Push </Typography>
        <TextField
          id="hostPush"
          label="Host URL"
          fullWidth
          variant="filled"
          size="small"
          defaultValue={formik.values.hostPush}
          onChange={formik.handleChange}
          error={formik.touched.hostPush && Boolean(formik.errors.hostPush)}
          helperText={formik.touched.hostPush && formik.errors.hostPush}
        />
        <TextField
          id="keyExpr"
          label="Key Expression"
          fullWidth
          variant="filled"
          size="small"
          defaultValue={formik.values.keyExpr}
          onChange={formik.handleChange}
          error={formik.touched.keyExpr && Boolean(formik.errors.keyExpr)}
          helperText={formik.touched.keyExpr && formik.errors.keyExpr}
        />
        <TextField
          id="msg"
          label="Message"
          fullWidth
          variant="outlined"
          size="small"
          defaultValue={formik.values.msg}
          onChange={formik.handleChange}
          error={formik.touched.msg && Boolean(formik.errors.msg)}
          helperText={formik.touched.msg && formik.errors.msg}
        />
        <Button type="submit" variant="contained" color="info" fullWidth sx={{ marginTop: "0.4rem" }}>
          Push
        </Button>
      </Stack>
    </form>
  )
}
