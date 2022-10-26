/*
  Device sensor connection   

*/
import React, { useEffect } from "react"
import {  useSetRecoilState } from "recoil"
import { setDeviceSensorData } from "../recoil/selectors"

var options = {
  enableHighAccuracy: true,
  timeout: 4000,
  maximumAge: 0,
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`)
}

export default function DeviceConnection() {
  const setDeviceSensors = useSetRecoilState(setDeviceSensorData)


  useEffect(() => {
    navigator.geolocation.watchPosition(success, error, options)
  }, [])

  function success(pos) {
    var crd = pos.coords
    let current_time = new Date()

    setDeviceSensors({
      latitude: crd.latitude,
      longitude: crd.longitude,
      accuracy: crd.accuracy,
      altitude: crd.altitude,
      altitudeAccuracy: crd.altitudeAccuracy,
      heading: crd.heading,
      speed: crd.speed,
      created: current_time,
    })
  }

  return <></>
}
