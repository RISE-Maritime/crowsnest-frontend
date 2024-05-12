import React, { useEffect, useState } from "react";

function diff(num1, num2) {
  if (num1 > num2) {
    return num1 - num2;
  } else {
    return num2 - num1;
  }
}

export default function BearingRateTarget({
  obj,
  maxTimeMIN,
  updateFrequencyMIN,
  rangeSETlong,
}) {
  const [boxPos, setBoxPos] = useState(0);
  const [bearingPath, setBearingPath] = useState("");

  useEffect(() => {
    //   Set box position
    setBoxPos((710 / 180) * obj.relBearings[0]);

    let steps = maxTimeMIN * updateFrequencyMIN;
    let stepLength = 800 / steps;

    let path = "M ";
    let prevX = 0;

    obj.relBearings.map((relB, index) => {
      let cordX = (1438 / 360) * (relB + 180) + 48;
      let cordY = stepLength * index + 187;
      if (diff(prevX, cordX) > 1150) {
        path = path + " M " + cordX + " " + cordY + ", ";
      } else {
        path = path + cordX + " " + cordY + ", ";
      }
      prevX = cordX;
    });
    console.log(path);
    setBearingPath(path);
  }, [obj]);

  return (
    <g id="TG" transform="translate(-112 -21)">
      {/* Target box (maxPort:-710, mid: 0, maxSB:710 ) */}
      <g
        id="tg-info"
        transform={
          "translate(" +
          boxPos +
          " 0) scale(" +
          (1 - obj.distance / rangeSETlong) +
          "," +
          (1 - obj.distance / rangeSETlong) +
          ")"
        }
        style={{
          transformOrigin: "bottom",
          transformBox: "fill-box",
        }}
      >
        <g
          filter="url(#rectangle)"
          transform="translate(427.646 9.032) translate(-122.65 22.97)"
        >
          <g
            id="rectangle-2"
            fill={obj.distanceClosing ? "#3bf" : "#00000000"}
            stroke="#3bf"
            strokeLinecap="round"
            strokeWidth="6"
            data-name="rectangle"
            transform="translate(713 84)"
          >
            <rect width="108" height="103" stroke="none" rx="6"></rect>
            <rect width="102" height="97" x="3" y="3" fill="none" rx="3"></rect>
          </g>
        </g>
        <g
          filter="url(#text)"
          transform="translate(427.646 9.032) translate(-122.65 22.97)"
        >
          {obj.distanceClosing ? (
            <text
              id="text-2"
              fill="#fff"
              data-name="text"
              fontFamily="Roboto-Regular, Roboto"
              fontSize="27"
              transform="translate(767 116)"
            >
              <tspan x="0" y="0" textAnchor="middle">
                {obj.tgName}
              </tspan>
              <tspan x="0" y="29" textAnchor="middle">
                {obj.cpa.toFixed(1) + "nm"}
              </tspan>
              <tspan x="0" y="58" textAnchor="middle">
                {obj.tcpa.toFixed(1) + "min"}
              </tspan>
            </text>
          ) : (
            <text
              id="text-2"
              fill="#fff"
              data-name="text"
              fontFamily="Roboto-Regular, Roboto"
              fontSize="27"
              transform="translate(767 116)"
            >
              <tspan x="0" y="29" textAnchor="middle">
                {obj.tgName}
              </tspan>
            </text>
          )}
        </g>
      </g>

      {/* PATH / Bearing history
      minX: 48
      midX: 767
      maxX: 1485
      minY: 187
      midY: 
      maxY: 987
      
      */}
      <g transform="translate(305 32)">
        <path
          id="tg-path-2"
          fill="none"
          stroke="#3bf"
          strokeLinecap="round"
          strokeWidth="6"
          d={bearingPath}
          data-name="tg-path"
        />
      </g>
    </g>
  );
}
