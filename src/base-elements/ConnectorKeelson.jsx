import React, { useEffect, useState } from "react"
// Atoms
import { useRecoilValue } from "recoil"
import { atomKeelsonConONOFF } from "../recoil/atoms"

const sse = new EventSource("http://localhost:8000/PONTOS/**")

export default function ConnectorKeelson() {
  const onoff = useRecoilValue(atomKeelsonConONOFF)

  function getRealtimeData(data) {}
  useEffect(() => {
    if (onoff === true) {
      sse.addEventListener("PUT", getRealtimeData, false)
    } else {
      sse.removeEventListener("PUT", getRealtimeData)
    }
  }, [onoff])

  // useEffect(() => {
  //   console.log("Keelson ON/OFF: ", onoff)

  //   let source = new EventSource("http://localhost:8000/PONTOS/**")

  //   if (onoff === true) {
  //     console.log("Keelson ON")

  //     source.onmessage = e => getRealtimeData(JSON.parse(e.data));

  //     // source.onmessage = e => console.log(e.data)
  //     source.addEventListener(
  //       "PUT",
  //       function (e) {
  //         console.log("Received data: " + e.data)
  //       },
  //       false
  //     )

  //     source.onerror = () => {
  //       // error log here
  //       console.log("Error")
  //       // after logging, close the connection
  //       source.close();
  //     }

  //   } else {
  //     console.log("Keelson OFF")
  //     source.removeEventListener("PUT", function (e) {},  { passive: true })
  //     source.close()
  //   }
  // }, [onoff])

  return <></>
}
