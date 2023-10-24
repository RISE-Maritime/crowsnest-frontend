import React, { useState, useRef } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { Grid, TextField, Button } from "@mui/material"
import { messageParser, protoParser } from "../../../recoil/selectors"
import { atomKeelsonConnectionState } from "../../../recoil/atoms"
import { useRecoilState, useSetRecoilState } from "recoil"
import protobuf from "protobufjs"
// import jsonDescriptor from "../../../proto/bundle.json"
import awesome from "../../../proto/awesome.proto"
import envelope from "../../../proto/envelope.proto"
import primitives from "../../../proto/primitives.proto"
import ByteBuffer from "bytebuffer"

const validationSchema = yup.object({
  hostSub: yup.string().required("Required"),
  subscriptionKey: yup.string().required("Required"),
})

/* eslint-disable */
const initFormValuesManual = {
  // hostSub: "http://10.10.7.2:8000",
  hostSub: "http://localhost:8000",
  subscriptionKey: "**",
}
/* eslint-enable */

function throttle(callback, delay) {
  let timeoutId = null
  let lastExecTime = 0

  return function (...args) {
    const elapsedTime = Date.now() - lastExecTime

    const execute = () => {
      lastExecTime = Date.now()
      callback.apply(this, args)
    }

    if (elapsedTime >= delay) {
      execute()
    } else {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(execute, delay - elapsedTime)
    }
  }
}

export default function ConnKeelson() {
  const [keelsonConState, setKeelsonConState] = useRecoilState(atomKeelsonConnectionState)
  // const [router, setRouter] = useState(null)
  let router = useRef(null)
  // const parseKeyMsg = useSetRecoilState(messageParser)

  const parseKeelsonMsg = useSetRecoilState(protoParser)

  // const parseMessage = throttle(function (e) {
  //   // key & value
  //   let msg = JSON.parse(e.data)

  //   // console.log("Received data: " + msg.key)
  //   // console.log("Received data: " + atob(msg.value)) // atob() decodes base64

  //   let bytes = new Uint8Array(ByteBuffer.fromBase64(msg.value).toArrayBuffer())

  //   protobuf.load(envelope, function (err, root) {
  //     if (err) throw err

  //     // Get a reference to your message type
  //     const Envelope = root.lookupType("core.Envelope")

  //     // Decode the buffer back into a message
  //     const decodedMessage = Envelope.decode(bytes)
  //     console.log(decodedMessage)

  //     protobuf.load(primitives, function (err, root) {
  //       // Get a reference to your message type
  //       const PrimitivesTimeFloat = root.lookupType("brefv.primitives.TimestampedFloat")

  //       const readable = PrimitivesTimeFloat.decode(decodedMessage.payload)
  //       console.log("readable", readable)
  //     })
  //   })

  //   protobuf.load(awesome, function (err, root) {
  //     if (err) throw err

  //     // Get a reference to your message type
  //     const AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage")
  //     // Create a new message instance
  //     const message = AwesomeMessage.create({
  //       awesomeField: "value1",
  //     })

  //     // Encode the message as a buffer
  //     const buffer = AwesomeMessage.encode(message).finish()

  //     // Decode the buffer back into a message
  //     const decodedMessage = AwesomeMessage.decode(buffer)
  //     console.log(decodedMessage)
  //   })

  //   // parseKeyMsg({ topic: msg.key, payload: msg.value })
  // }, 1000)

  function parseMessage(e) {
    // Parsing Zenoh (key & value)
    let msg = JSON.parse(e.data)
    let bytes = new Uint8Array(ByteBuffer.fromBase64(msg.value).toArrayBuffer())
    let keyExpression = msg.key

   
    protobuf.load(envelope, function (err, root) {
      if (err) throw err

      // Get a reference to your message type
      const Envelope = root.lookupType("core.Envelope")

      // Decode the buffer back into a message
      const decodedMessage = Envelope.decode(bytes)

      

      protobuf.load(primitives, function (err, root) {
        // Get a reference to your message type
        const PrimitivesTimeFloat = root.lookupType("brefv.primitives.TimestampedFloat")

        const readable = PrimitivesTimeFloat.decode(decodedMessage.payload)
        parseKeelsonMsg({keyExpression: keyExpression, payload: readable})
        // console.log("readable", readable)
      })

    })

    // protobuf.load(awesome, function (err, root) {
    //   if (err) throw err

    //   // Get a reference to your message type
    //   const AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage")
    //   // Create a new message instance
    //   const message = AwesomeMessage.create({
    //     awesomeField: "value1",
    //   })

    //   // Encode the message as a buffer
    //   const buffer = AwesomeMessage.encode(message).finish()

    //   // Decode the buffer back into a message
    //   const decodedMessage = AwesomeMessage.decode(buffer)
    //   // console.log(decodedMessage)
    // })
  }

  const disconnectKeelson = () => {
    console.log("Disconnecting from Keelson")
    if (router) {
      // TODO: Why is it connecting back again?
      console.log("Trying to disconnect...")
      router.current.removeEventListener("PUT", parseMessage, false)
      console.log("DISCONNECTED")
      setKeelsonConState(false)
    }
  }

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: initFormValuesManual,
    onSubmit: values => {
      console.log("PRESSED SUBMIT")
      submitAndConnect(values)
    },
  })

  const submitAndConnect = values => {
    console.log("Connecting to Keelson: ", values)

    // Connecting with Server Side Events to Keelson
    let URL = values.hostSub + "/" + values.subscriptionKey
    console.log("🚀 ~ file: ConnKeelson.jsx:54 ~ submitAndConnect ~ URL:", URL)

    router.current = new EventSource(URL)

    router.current.addEventListener("PUT", parseMessage, false)

    // Connected
    setKeelsonConState(true)
    return values
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1} justifyContent="center" alignItems="flex-start">
          <Grid item xs={12}>
            <TextField
              id="hostSub"
              label="Host URL"
              fullWidth
              variant="filled"
              size="small"
              disabled={keelsonConState ? true : false}
              defaultValue={formik.values.hostSub}
              onChange={formik.handleChange}
              error={formik.touched.hostSub && Boolean(formik.errors.hostSub)}
              helperText={formik.touched.hostSub && formik.errors.hostSub}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="subscriptionKey"
              label="Key Expression"
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
              <Button type="submit" variant="contained" color="info" fullWidth sx={{ marginTop: "0.4rem" }}>
                Connect
              </Button>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </form>
      {keelsonConState ? (
        <Button variant="contained" color="error" fullWidth onClick={disconnectKeelson}>
          Disconnect
        </Button>
      ) : (
        <></>
      )}
    </div>
  )
}
