import React from "react"
import axios from "axios"
import * as yup from "yup"
import { useFormik } from "formik"
import { Stack, TextField, Typography } from "@mui/material"
import { ObcButton as Button } from "@oicl/openbridge-webcomponents-react/components/button/button"

export default function KeelsonQueryable() {
  const validationSchema = yup.object({
    host: yup.string().required("Required"),
    keyExprVar: yup.string().required("Required"),
  })

  /* eslint-disable */
  const initFormValuesManual = {
    // username: process.env.REACT_APP_MQTT_USERNAME ? process.env.REACT_APP_MQTT_USERNAME : "",
    // password: process.env.REACT_APP_MQTT_PASSWORD ? process.env.REACT_APP_MQTT_PASSWORD : "",
    host: "http://localhost:8000",
    keyExprVar: "TEST/query",
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
    console.log("Submitted Queryable to KEELSON: ", values)

    axios
      .get(values.host + "/" + values.keyExprVar, { test: "body_msg" })
      .then(res => {
        console.log("Queryable Response: ", res)
      })
      .catch(err => {
        console.log("Queryable Error: ", err)
      })

    // return values
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={1} sx={{ minWidth: "20vw", height: "100%" }} justifyContent="space-between">
        <Stack spacing={1}>
          <Typography sx={{ paddingBottom: "0.5rem" }} variant="h5">
            Keelson Queryable / GET
          </Typography>
          <TextField
            id="host"
            label="Host URL"
            fullWidth
            variant="filled"
            size="small"
            defaultValue={formik.values.host}
            onChange={formik.handleChange}
            error={formik.touched.host && Boolean(formik.errors.host)}
            helperText={formik.touched.host && formik.errors.host}
          />
          <TextField
            id="keyExprVar"
            label="Key Expression & Variables"
            fullWidth
            variant="filled"
            size="small"
            defaultValue={formik.values.keyExprVar}
            onChange={formik.handleChange}
            error={formik.touched.keyExprVar && Boolean(formik.errors.keyExprVar)}
            helperText={formik.touched.keyExprVar && formik.errors.keyExprVar}
          />
        </Stack>

        <Button onClick={formik.handleSubmit} fullWidth>
          Request
        </Button>
      </Stack>
    </form>
  )
}
