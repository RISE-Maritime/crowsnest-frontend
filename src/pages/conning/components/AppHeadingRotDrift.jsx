import React, { useEffect, useState } from "react";
import { formatDirection } from "../../../utils";

export default function AppHeadingRotDrift(props) {
  const [HDG, setHDG] = useState(0.0);
  const [portRotPathLength, setPortRotPathLength] = useState(null);
  const [portRotPathCover, setPortRotPathCover] = useState(0);
  const [sbRotPathLength, setSbRotPathLength] = useState(null);
  const [sbRotPathCover, setSbRotPathCover] = useState(0);

  const [compassRoseValues, setCompassRoseValues] = useState({
    P10: "000",
    P20: "000",
    P30: "000",
    P40: "000",
    P50: "000",
    P60: "000",
    P70: "000",
    P80: "000",
    P90: "000",
    S10: "000",
    S20: "000",
    S30: "000",
    S40: "000",
    S50: "000",
    S60: "000",
    S70: "000",
    S80: "000",
    S90: "000",
  });
  useEffect(() => {
    const compRoseVal = calcHeadingArr(props.heading);
    setCompassRoseValues(compRoseVal);
    setHDG(props.heading);

    // Set port ROT indicator
    let [portSetVal, sbSetVal] = rotIndicatorValues(props.rot);
    setPortRotPathCover(portSetVal);
    setSbRotPathCover(sbSetVal);
  }, [ props ]);

  const rotIndicatorValues = (rotVal) => {
    // IF ROT value is bigger then visualization expects
    if (props.rotMax < rotVal) {
      rotVal = props.rotMax;
    } else if (-props.rotMax > rotVal) {
      rotVal = -props.rotMax;
    }

    // Starboard ROT
    if (rotVal > 0) {
      const sbStep = sbRotPathLength / props.rotMax;
      const setSB = sbStep * (props.rotMax - rotVal);

      return [-portRotPathLength, setSB];
    } else {
      // Port ROT
      const portStep = portRotPathLength / props.rotMax;
      const setPort = portStep * (props.rotMax - rotVal);

      return [setPort, -sbRotPathLength];
    }
  };

  /**
   * Calculating compass rose values
   * @param {float} heading
   * @returns {obj} compass rose values
   */
  const calcHeadingArr = (heading) => {
    return {
      ...compassRoseValues,
      P10: formatDirection(Math.ceil((heading + 1) / 10) * 10 - 20),
      P20: formatDirection(Math.ceil((heading + 1) / 10) * 10 - 30),
      P30: formatDirection(Math.ceil((heading + 1) / 10) * 10 - 40),
      P40: formatDirection(Math.ceil((heading + 1) / 10) * 10 - 50),
      P50: formatDirection(Math.ceil((heading + 1) / 10) * 10 - 60),
      P60: formatDirection(Math.ceil((heading + 1) / 10) * 10 - 70),
      P70: formatDirection(Math.ceil((heading + 1) / 10) * 10 - 80),
      P80: formatDirection(Math.ceil((heading + 1) / 10) * 10 - 90),
      P90: formatDirection(Math.ceil((heading + 1) / 10) * 10 - 100),

      S10: formatDirection(Math.ceil((heading + 1) / 10) * 10),
      S20: formatDirection(Math.ceil((heading + 1) / 10) * 10 + 10),
      S30: formatDirection(Math.ceil((heading + 1) / 10) * 10 + 20),
      S40: formatDirection(Math.ceil((heading + 1) / 10) * 10 + 30),
      S50: formatDirection(Math.ceil((heading + 1) / 10) * 10 + 40),
      S60: formatDirection(Math.ceil((heading + 1) / 10) * 10 + 50),
      S70: formatDirection(Math.ceil((heading + 1) / 10) * 10 + 60),
      S80: formatDirection(Math.ceil((heading + 1) / 10) * 10 + 70),
      S90: formatDirection(Math.ceil((heading + 1) / 10) * 10 + 80),
    };
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="721.76"
      height="162.275"
      viewBox="0 0 721.76 180"
      style={{ height: "98%", width: "100%" }}
    >
      {/* Drift angle*/}
      <g>
        {props.driftTo === "port" ? (
          <path
            data-name="drift path 100"
            d="M294.999 146.143a2 2 0 0 1 0-3.62l25.13-11.807a2 2 0 0 1 2.85 1.81v23.614a2 2 0 0 1-2.85 1.81Z"
            fill="rgba(189,75,52,0.5)"
            opacity={0.6}
          />
        ) : (
          ""
        )}

        {props.driftTo === "starboard" ? (
          <path
            data-name="Polygon 16"
            d="M427.394 142.322a2 2 0 0 1 0 3.62l-25.13 11.807a2 2 0 0 1-2.85-1.81v-23.614a2 2 0 0 1 2.85-1.81Z"
            fill="rgba(31,185,72,0.5)"
            opacity={0.6}
          />
        ) : (
          ""
        )}
        <text
          id="drift-angle-text"
          transform="translate(332.414 154.633)"
          fill="rgba(255,255,255,0.65)"
          fontSize={29}
          fontFamily="Roboto-Regular, Roboto"
          opacity={0.6}
        >
          <tspan x="30" y="0" textAnchor="middle">
            {props.drift + "°"}
          </tspan>
        </text>
        <text
          data-name="Drift"
          transform="translate(332.914 128.633)"
          fill="rgba(255,255,255,0.65)"
          fontSize={7}
          fontFamily="Roboto-Regular, Roboto"
          opacity={0.6}
        >
          <tspan x={0} y={0}>
            {"Drift "}
          </tspan>
        </text>
      </g>

      {/* Compass rose*/}
      <g>
        <text
          id="S10"
          transform="rotate(5.13 -582 5130)"
          fill="#aaa"
          fontSize={11}
          fontFamily="Roboto-Regular, Roboto"
        >
          <tspan x={0} y={0}>
            {compassRoseValues.S10}
          </tspan>
        </text>

        <text
          id="S20"
          transform="rotate(7 -372.592 4010.075)"
          fill="#aaa"
          fontSize={11}
          fontFamily="Roboto-Regular, Roboto"
        >
          <tspan x={0} y={0}>
            {compassRoseValues.S20}
          </tspan>
        </text>
        <text
          id="S30"
          transform="rotate(9 -243.758 3308.479)"
          fill="#aaa"
          fontSize={11}
          fontFamily="Roboto-Regular, Roboto"
        >
          <tspan x={0} y={0}>
            {compassRoseValues.S30}
          </tspan>
        </text>
        <text
          id="S40"
          transform="rotate(11 -163.28 2864.492)"
          fill="#aaa"
          fontSize={11}
          fontFamily="Roboto-Regular, Roboto"
        >
          <tspan x={0} y={0}>
            {compassRoseValues.S40}
          </tspan>
        </text>
        <text
          transform="rotate(13 -103.727 2558.239)"
          fill="#aaa"
          fontSize={11}
          fontFamily="Roboto-Regular, Roboto"
        >
          <tspan x={0} y={0}>
            {compassRoseValues.S50}
          </tspan>
        </text>
        <text
          transform="rotate(14.98 -65.747 2327.307)"
          fill="#aaa"
          fontSize={11}
          fontFamily="Roboto-Regular, Roboto"
        >
          <tspan x={0} y={0}>
            {compassRoseValues.S60}
          </tspan>
        </text>
        <text
          transform="rotate(17 -31.463 2157.831)"
          fill="#aaa"
          fontSize={11}
          fontFamily="Roboto-Regular, Roboto"
        >
          <tspan x={0} y={0}>
            {compassRoseValues.S70}
          </tspan>
        </text>
        <text
          transform="rotate(19.01 -6.986 2021.541)"
          fill="#aaa"
          fontSize={11}
          fontFamily="Roboto-Regular, Roboto"
        >
          <tspan x={0} y={0}>
            {compassRoseValues.S80}
          </tspan>
        </text>
        <text
          transform="rotate(19.01 -20.156 2107.014)"
          fill="#aaa"
          fontSize={11}
          fontFamily="Roboto-Regular, Roboto"
        >
          <tspan x={0} y={0}>
            {compassRoseValues.S90}
          </tspan>
        </text>
        <path
          d="M9.441 108.811s149.8-61.942 356.912-60.63c110.245.7 222.279 15.541 345.8 60.63"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          strokeWidth={2}
        />

        <text
          transform="rotate(-5.13 958.104 -2755.018)"
          fill="#aaa"
          fontSize={11}
          fontFamily="Roboto-Regular, Roboto"
        >
          <tspan x={0} y={0}>
            {compassRoseValues.P10}
          </tspan>
        </text>

        <text
          transform="rotate(-7 745.797 -1762.14)"
          fill="#aaa"
          fontSize={11}
          fontFamily="Roboto-Regular, Roboto"
        >
          <tspan x={0} y={0}>
            {compassRoseValues.P20}
          </tspan>
        </text>
        <text
          transform="rotate(-9 616.706 -1177.351)"
          fill="#aaa"
          fontSize={11}
          fontFamily="Roboto-Regular, Roboto"
        >
          <tspan x={0} y={0}>
            {compassRoseValues.P30}
          </tspan>
        </text>
        <text
          transform="rotate(-11 536.058 -801.98)"
          fill="#aaa"
          fontSize={11}
          fontFamily="Roboto-Regular, Roboto"
        >
          <tspan x={0} y={0}>
            {compassRoseValues.P40}
          </tspan>
        </text>
        <text
          transform="rotate(-13 480.782 -539.853)"
          fill="#aaa"
          fontSize={11}
          fontFamily="Roboto-Regular, Roboto"
        >
          <tspan x={0} y={0}>
            {compassRoseValues.P50}
          </tspan>
        </text>
        <text
          transform="rotate(-14.98 436.596 -348.895)"
          fill="#aaa"
          fontSize={11}
          fontFamily="Roboto-Regular, Roboto"
        >
          <tspan x={0} y={0}>
            {compassRoseValues.P60}
          </tspan>
        </text>
        <text
          transform="rotate(-17 403.986 -204.396)"
          fill="#aaa"
          fontSize={11}
          fontFamily="Roboto-Regular, Roboto"
        >
          <tspan x={0} y={0}>
            {compassRoseValues.P70}
          </tspan>
        </text>
        <text
          transform="rotate(-19.01 376.235 -85.734)"
          fill="#aaa"
          fontSize={11}
          fontFamily="Roboto-Regular, Roboto"
        >
          <tspan x={0} y={0}>
            {compassRoseValues.P80}
          </tspan>
        </text>
        <text
          transform="rotate(-19.01 389.406 -.264)"
          fill="#aaa"
          fontSize={11}
          fontFamily="Roboto-Regular, Roboto"
        >
          <tspan x={0} y={0}>
            {compassRoseValues.P90}
          </tspan>
        </text>

        <path
          d="M2.59 92.875s155.379-60.675 360.8-59.4c109.348.679 233.293 15.509 355.81 59.4"
          fill="none"
          stroke="rgba(112,112,112,0.64)"
          strokeLinecap="round"
          strokeWidth={4}
        />
        <path
          data-name="Path 90"
          d="m66.576 90.511 1.628 4.728"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
        />
        <path
          data-name="Path 92"
          d="m94.998 81.634 1.462 4.782"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
        />
        <path
          data-name="Path 94"
          d="m124.336 74.305 1.295 4.83"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          strokeWidth={1.00012}
        />
        <path
          data-name="Path 93"
          d="m109.908 78.205 2.59 9.66"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          strokeWidth={1.00012}
        />
        <path
          data-name="Line 260"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          d="m257.572 52.662.87 9.96"
          strokeWidth={0.99979}
        />
        <path
          data-name="Line 258"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          d="m227.397 56.83 1.219 9.926"
        />
        <path
          data-name="Line 259"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          d="m242.397 54.997.609 4.963"
        />
        <path
          data-name="Line 261"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          d="m272.002 57.487-.435-4.98"
          strokeWidth={0.99979}
        />
        <path
          data-name="Line 256"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          d="m198.224 60.144 1.564 9.877"
        />
        <path
          data-name="Line 257"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          d="m212.224 58.642.782 4.938"
        />
        <path
          data-name="Line 254"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          d="m168.052 65.922 1.908 9.816"
        />
        <path
          data-name="Line 255"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          d="m183.052 62.58.954 4.908"
        />
        <path
          data-name="Line 252"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          d="m138.517 72.02 2.25 9.744"
        />
        <path
          data-name="Line 253"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          d="m153.517 68.488 1.125 4.872"
        />
        <path
          data-name="Path 91"
          d="m80.741 85.976 2.924 9.563"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
        />
        <path
          data-name="Path 89"
          d="m51.575 95.03 3.256 9.455"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
        />
        <path
          data-name="Path 87"
          d="m23.494 104.034 3.42 9.397"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
        />
        <path
          data-name="Path 88"
          d="m37.494 99.335 1.71 4.698"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
        />
        <path
          data-name="Line 262"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          d="m467.526 53.519-.87 9.96"
          strokeWidth={0.99979}
        />
        <path
          data-name="Line 263"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          d="m497.699 56.689-1.219 9.925"
        />
        <path
          data-name="Line 264"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          d="m482.699 54.855-.61 4.963"
        />
        <path
          data-name="Line 265"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          d="m454.989 53.51-.435 4.98"
          strokeWidth={0.99979}
        />
        <path
          data-name="Line 266"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          d="m526.872 60.003-1.564 9.877"
        />
        <path
          data-name="Line 267"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          d="m512.872 58.5-.782 4.938"
        />
        <path
          data-name="Line 268"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          d="m557.044 65.781-1.908 9.816"
        />
        <path
          data-name="Line 269"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          d="m542.044 63.438-.954 4.908"
        />
        <path
          data-name="Line 270"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          d="m586.579 71.879-2.25 9.744"
        />
        <path
          data-name="Line 271"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          d="m571.579 68.347-1.125 4.872"
        />
        <path
          data-name="Path 101"
          d="m615.187 79.064-2.59 9.66"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          strokeWidth={1.00012}
        />
        <path
          data-name="Path 102"
          d="m600.76 75.164-1.295 4.83"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          strokeWidth={1.00012}
        />
        <path
          data-name="Path 103"
          d="m644.355 86.834-2.924 9.563"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
        />
        <path
          data-name="Path 104"
          d="m630.099 82.493-1.462 4.782"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
        />
        <path
          data-name="Path 105"
          d="m673.521 95.888-3.26 9.46"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          strokeWidth={1.0006}
        />
        <path
          data-name="Path 106"
          d="m658.521 91.37-1.63 4.73"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          strokeWidth={1.0006}
        />
        <path
          data-name="Path 107"
          d="m701.603 104.893-3.42 9.397"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
        />
        <path
          data-name="Path 108"
          d="m687.603 100.194-1.71 4.698"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
        />
        <path
          d="M23.489 139.434s144.56-60.591 344.418-59.309c106.386.683 214.5 15.2 333.7 59.309"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          strokeWidth={2}
        />
      </g>

      {/* ROT indicator */}
      <path
        d="M29.141 149.7s112.746-44.685 269.04-55.058"
        fill="none"
        stroke="#e93629"
        strokeWidth={23}
        ref={(ref) => {
          if (ref) {
            setPortRotPathLength(ref.getTotalLength());
          }
        }}
        style={{
          strokeDasharray: portRotPathLength,
          strokeDashoffset: portRotPathCover,
          transformOrigin: "center",
          transformBox: "fill-box",
        }}
      />
      <path
        d="M430.224 94.12c84.58 5.416 173.221 21.478 267.233 56.605"
        fill="none"
        stroke="#1fb948"
        strokeWidth={23}
        ref={(ref) => {
          if (ref) {
            setSbRotPathLength(ref.getTotalLength());
          }
        }}
        style={{
          strokeDasharray: sbRotPathLength,
          strokeDashoffset: sbRotPathCover,
          transformOrigin: "center",
          transformBox: "fill-box",
        }}
      />

      <g fill="#333">
        <path d="M435.616 86.731H290.739c-3.089 0-4.912-.077-6.461-1.651-.847-.861-1.583-2.173-2.25-4.01-.71-1.958-1.367-4.58-2.01-8.018l-6.975-49.715v-.007l-.002-.006c-.536-3.2-.594-6.01-.174-8.351.373-2.075 1.12-3.787 2.223-5.09 2.036-2.405 4.804-2.91 6.767-2.91h164.741c1.946 0 4.667.483 6.58 2.786 1.062 1.277 1.761 2.982 2.079 5.066.358 2.356.23 5.212-.38 8.49l-8.77 49.723c-1.398 6.604-2.672 10.168-4.26 11.916-1.505 1.658-3.358 1.777-6.231 1.777Z" />
        <path
          d="M281.857 7.473c-1.858 0-4.473.474-6.385 2.733-1.045 1.235-1.756 2.868-2.113 4.855-.41 2.286-.351 5.038.175 8.18l.004.026 6.973 49.704c1.21 6.462 2.481 10.09 4.123 11.758 1.41 1.432 3.15 1.502 6.105 1.502h144.877c2.988 0 4.54-.159 5.861-1.613 1.523-1.677 2.761-5.17 4.14-11.675l8.769-49.72c.6-3.222.727-6.023.376-8.323-.303-1.993-.966-3.615-1.968-4.822-1.79-2.153-4.357-2.605-6.196-2.605H281.857m0-1h164.741c5.844 0 11.164 4.084 8.77 16.933l-8.77 49.727c-2.883 13.622-5.139 14.098-10.982 14.098H290.739c-5.843 0-8.599-.103-11.215-14.098l-6.976-49.727c-2.118-12.643 3.465-16.933 9.309-16.933Z"
          fill="#707070"
        />
      </g>
      <path
        d="M32.843 161.096s138.619-57.921 338.466-56.589c106.381.708 201.2 12.692 322.042 57.126"
        fill="none"
        stroke="#707070"
        strokeLinecap="round"
      />
      <text
        transform="rotate(-5.13 1500 -2630)"
        fill="rgba(255,255,255,0.65)"
        fontSize={11}
        fontFamily="Roboto-Regular, Roboto"
      >
        <tspan x={0} y={0}>
          {"20"}
        </tspan>
      </text>
      <text
        transform="rotate(5.13 -1130 5350.74)"
        fill="rgba(255,255,255,0.65)"
        fontSize={11}
        fontFamily="Roboto-Regular, Roboto"
      >
        <tspan x={0} y={0}>
          {"20"}
        </tspan>
      </text>
      <text
        transform="rotate(-9 930 -1120)"
        fill="rgba(255,255,255,0.65)"
        fontSize={11}
        fontFamily="Roboto-Regular, Roboto"
      >
        <tspan x={0} y={0}>
          {"40"}
        </tspan>
      </text>
      <text
        transform="rotate(9 -557.27 3414.867)"
        fill="rgba(255,255,255,0.65)"
        fontSize={11}
        fontFamily="Roboto-Regular, Roboto"
      >
        <tspan x={0} y={0}>
          {"40"}
        </tspan>
      </text>
      <text
        transform="rotate(-11 804.72 -635.321)"
        fill="rgba(255,255,255,0.65)"
        fontSize={11}
        fontFamily="Roboto-Regular, Roboto"
      >
        <tspan x={0} y={0}>
          {"60"}
        </tspan>
      </text>
      <text
        transform="rotate(11 -439.662 3082.134)"
        fill="rgba(255,255,255,0.65)"
        fontSize={11}
        fontFamily="Roboto-Regular, Roboto"
      >
        <tspan x={0} y={0}>
          {"60"}
        </tspan>
      </text>
      <text
        transform="rotate(-14.98 632.256 -238.858)"
        fill="rgba(255,255,255,0.65)"
        fontSize={11}
        fontFamily="Roboto-Regular, Roboto"
      >
        <tspan x={0} y={0}>
          {"80"}
        </tspan>
      </text>
      <text
        transform="rotate(14.98 -268.53 2466.58)"
        fill="rgba(255,255,255,0.65)"
        fontSize={11}
        fontFamily="Roboto-Regular, Roboto"
      >
        <tspan x={0} y={0}>
          {"80"}
        </tspan>
      </text>
      <g transform="translate(297.648 75.597)" fill="#333" stroke="#707070">
        <rect width={133} height={35.634} rx={6} stroke="none" />
        <rect
          x={0.5}
          y={0.5}
          width={132}
          height={34.634}
          rx={5.5}
          fill="none"
        />
      </g>

      {/* ROT value */}
      <g>
        <text
          data-name="999min"
          transform="translate(325.09 106)"
          fill="rgba(255,255,255,0.77)"
          fontSize={32}
          fontFamily="Roboto-Regular, Roboto"
          textAnchor="middle"
        >
          <tspan x={25} y={0}>
            {props.rot}
          </tspan>
          <tspan x={67} y={0} fontSize={18.666} baselineShift={10}>
            {"°/ "}
          </tspan>
          <tspan x={85} y={0} fontSize={16.916} baselineShift={9}>
            {"min"}
          </tspan>
        </text>
        <text
          transform="translate(301.09 84)"
          fill="rgba(255,255,255,0.65)"
          fontSize={6}
          fontFamily="Roboto-Regular, Roboto"
          opacity={0.6}
        >
          <tspan x={0} y={0}>
            {"ROT"}
          </tspan>
        </text>
      </g>

      {/* Heading value */}
      <g>
        <text
          transform="translate(278.09 15)"
          fill="rgba(255,255,255,0.65)"
          fontSize={6}
          fontFamily="Roboto-Regular, Roboto"
          opacity={0.6}
        >
          <tspan x={0} y={0}>
            {"HDG"}
          </tspan>
        </text>
        <text
          transform="translate(300.09 66)"
          fill="#fff"
          fontSize={55}
          fontFamily="Roboto-Regular, Roboto"
        >
          <tspan x={"65"} y={0} textAnchor="middle">
            {HDG.toFixed(1) + "°"}
          </tspan>
        </text>
      </g>
    </svg>
  );
}
