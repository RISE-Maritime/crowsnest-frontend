import React from "react";
// Open Bridge
import "openbridge-web-components";
// import "openbridge-css"
import "openbridge-css/dist/css/openbridge.css";

export default function OpenBridge() {
  return (
    <div>
      <ob-hdg-small
        courseOverGround={55}
        heading={60}
        northUp=""
        style={{
          height: 64,
          width: 64,
        }}
      />

      <ob-rot-flat-bar-large
        label=""
        portStarboard=""
        rateOfTurn={15}
        style={{
          height: 56,
          width: 512,
        }}
      />

      <ob-rudder-large
        clipAngle={90}
        rudderAngle={20}
        rudderSetPointAngle={0}
        showPortStarboard=""
        showSetPoint=""
        style={{
          height: 512,
          width: 512,
        }}
      />
    </div>
  );
}
