import React, { useEffect, useState } from "react";

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

export default function OwnDeviceFlow() {
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
    accuracy: 0,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
  });

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(success, error, options);
    navigator.geolocation.watchPosition(success, error, options);
  }, []);

  function success(pos) {
    var crd = pos.coords;
    console.log(pos);
    let current_time = new Date()

    setPosition({
      ...position,
      latitude: crd.latitude,
      longitude: crd.longitude,
      accuracy: crd.accuracy,
      altitude: crd.altitude,
      altitudeAccuracy: crd.altitudeAccuracy,
      heading: crd.heading,
      speed: crd.speed,
      created: current_time.toUTCString()
    });

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  return (
    <div>
      <h2>GNSS</h2>
      <p>
        Lat: {position.latitude}
        <br />
        Long: {position.longitude}
        <br />
        Accuracy: {position.accuracy}
        <br />
        Altitude: {position.altitude}
        <br />
        AltitudeAccuracy:{position.altitudeAccuracy}
        <br />
        Heading: {position.heading}
        <br />
        Speed: {position.speed}
        <br />
        Created: {position.created}
      </p>

      <p>
        Positioning sensor and camera with audio works on iOS but Sensor API do
        not work.
      </p>
    </div>
  );
}
