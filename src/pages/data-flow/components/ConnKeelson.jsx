import React, { useEffect, useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { Grid, TextField, Button } from "@mui/material"
import { wsMessageParser } from "../../../recoil/selectors"
import { atomKeelsonConnectionState } from "../../../recoil/atoms"
import { useRecoilState, useSetRecoilState } from "recoil"

const validationSchema = yup.object({
  host: yup.string().required("Required"),
  subscriptionKey: yup.string().required("Required"),
})
/* eslint-disable */
const initFormValuesManual = {
  host: "http://localhost:8000",
  subscriptionKey: "/PONTOS/**",
}
/* eslint-enable */

function parseMessage(e) {
  console.log("Received data: " + e.data)
}

export default function ConnKeelson() {
  const [keelsonConState, setKeelsonConState] = useRecoilState(atomKeelsonConnectionState)

  const [router, setRouter] = useState(null)
  // const parseMessage = useSetRecoilState(wsMessageParser)


  const disconnectKeelson = () => {
    console.log("Disconnecting from Keelson")
    if (router) {
      // TODO: Why is it connecting back again?
      console.log("Router found")
      router.removeEventListener("PUT", parseMessage)
      setKeelsonConState(false)
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
    console.log("Connecting to Keelson: ", values)

    // Connecting with Server Side Events to Keelson
    let URL = values.host + values.subscriptionKey
    console.log("🚀 ~ file: ConnKeelson.jsx:54 ~ submitAndConnect ~ URL:", URL)

    const routerCon = new EventSource(URL)

    routerCon.addEventListener("PUT", parseMessage, false)
    setRouter(routerCon)

    // Connected 
    setKeelsonConState(true)
    return values
  }

  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1} justifyContent="center" alignItems="flex-start">
            <Grid item xs={12}>
              <TextField
                id="host"
                label="Host URL"
                fullWidth
                variant="filled"
                size="small"
                disabled={keelsonConState ? true : false}
                defaultValue={formik.values.host}
                onChange={formik.handleChange}
                error={formik.touched.host && Boolean(formik.errors.host)}
                helperText={formik.touched.host && formik.errors.host}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="subscriptionKey"
                label="Subscribe Key"
                fullWidth
                variant="filled"
                size="small"
                disabled={keelsonConState ? true : false}
                sx={{ paddingRight: "0.2rem" }}
                defaultValue={formik.values.subscriptionKey}
                onChange={formik.handleChange}
                error={formik.touched.subscriptionKey && Boolean(formik.errors.subscriptionKey)}
                helperText={formik.touched.subscriptionKey && formik.errors.subscriptionKey}
              />
            </Grid>

            <Grid item xs={12}>
              {!keelsonConState ? (
                <Button type="submit" variant="contained" color="success" fullWidth sx={{ marginTop: "0.4rem" }}>
                  Connect
                </Button>
              ) : (
                <Button variant="contained" color="error" fullWidth onClick={disconnectKeelson}>
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
