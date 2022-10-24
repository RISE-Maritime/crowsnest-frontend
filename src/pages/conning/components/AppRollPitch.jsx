import React from "react";

export default function AppRollPitch(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="438.5"
      height="203"
      viewBox="0 0 438.5 183"
      style={{ width: "98%" }}
    >
      <g id="MotionData" transform="translate(-1456.5 -897)">
        <g id="TrimData">
          <text
            fill="#3bf"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="18"
            transform="translate(1569 914)"
          >
            <tspan x="0" y="0">
              Pitch
            </tspan>
          </text>
          <text
            fill="#3bf"
            data-name="0m"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="26"
            transform="translate(1548 1073)"
            textAnchor="middle"
          >
            <tspan x="40" y="0">
              {props.pitchACT.toFixed(2)}m
            </tspan>
          </text>
          <text
            fill="#ec8800"
            data-name="0m"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="11"
            transform="translate(1571 1048)"
            textAnchor="middle"
          >
            <tspan x="20" y="0">
              {props.pitchSET.toFixed(2)}m
            </tspan>
          </text>
          <text
            fill="rgba(255,255,255,0.35)"
            data-name="-.15m"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="12"
            transform="translate(1498 1072)"
            textAnchor="middle"
          >
            <tspan x="18" y="0">
              {props.pitchACTmin.toFixed(2)}m
            </tspan>
          </text>
          <text
            fill="rgba(255,255,255,0.35)"
            data-name="-.15m"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="12"
            transform="translate(1640 1072)"
            textAnchor="middle"
          >
            <tspan x="18" y="0">
              {props.pitchACTmax.toFixed(2)}m
            </tspan>
          </text>
          <text
            fill="rgba(255,255,255,0.35)"
            data-name="Min (30min)"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="6"
            transform="translate(1501 1059)"
          >
            <tspan x="0" y="0">
              Min (30min)
            </tspan>
          </text>
          <text
            fill="rgba(255,255,255,0.35)"
            data-name="Max (30min)"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="6"
            transform="translate(1642 1059)"
          >
            <tspan x="0" y="0">
              Max (30min)
            </tspan>
          </text>
          <g id="VesselModelTrim" transform="translate(-16.344 -13.612)">
            <g
              id="VesselSide"
              transform={"rotate(" + props.pitchACTangle + ")"}
              style={{
                transformOrigin: "center",
                transformBox: "fill-box",
              }}
            >
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1722.147 1008.793l-4.842.7-4.631.657-4.437.618-3.765.515-3.06.411-2.829.374-3.059.4-2.833.36-2.682.335-2.764.337-2.527.3-2.644.308-2.489.283-2.237.248-2.561.277-2.315.243-2.184.223-3.2.317-2.634.251-3.366.308-3.637.318-4.611.383-1.96.156-3.019.231-4.618.335-2.992.2-2.477.162-4.176.259-1.883.111-3.043.172-4.5.237-3.439.17-5.031.231-3.168.135-2.334.1"
                data-name="Path 186"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1475.337 1010.471s13.5.1 16.344.1c3.418-8.13 15.141-13.52 16.847-14.075h60.37l-.137-.6"
                data-name="Path 187"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1684.322 989.586h0l37.64.279a.854.854 0 01.279.049l8.651 3.042a.858.858 0 01.571.739l.3 3.614a.841.841 0 01-.121.516c-1.749 2.853-19.7 30.072-70.409 34.112h-.078c-37.2-.169-157.175.081-168.466.106a.854.854 0 01-.855-.859v-17.507a.859.859 0 00-.847-.859l-15.65-.214s-2.232-1.014 0-2.133"
                data-name="Path 188"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1684.322 989.586c-26.788-16.339-29.548-12.762-49.862-14.515a.862.862 0 01-.583-1.419l8.5-12.09a.859.859 0 00-.383-1.378s-7.738-3.179-7.8-3.184c-7.926-.76-34.222-2.6-42.826-3.42a.839.839 0 01-.575-.31l-10.441-12.732a.858.858 0 00-.679-.314l-3.659.063a.859.859 0 00-.819 1.067l2.222 8.933a.859.859 0 01-.364.927l-7.539 4.91a.864.864 0 00-.355.477l-1.536 5.212a.86.86 0 00.012.521l4 11.651a.871.871 0 01.039.394l-2.9 21.552v-.038"
                data-name="Path 189"
              ></path>
              <path
                fill="#676767"
                stroke="#707070"
                strokeWidth="1"
                d="M112.183 0L0 3.881"
                data-name="Line 293"
                transform="translate(1543.07 1006.245)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M112.183 0L0 3.881"
                data-name="Line 294"
                transform="translate(1543.07 1006.245)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="2"
                d="M0 0L36.116 0"
                data-name="Line 295"
                transform="translate(1695.339 994.461)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M0 0L36.116 0"
                data-name="Line 296"
                transform="translate(1695.339 994.461)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="2"
                d="M0 2.245L57.71 0"
                data-name="Line 297"
                transform="translate(1587.53 994.462)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M0 2.245L57.71 0"
                data-name="Line 298"
                transform="translate(1587.53 994.462)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="2"
                d="M18.924 0L0 0"
                data-name="Line 299"
                transform="translate(1568.781 996.59)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18.924 0L0 0"
                data-name="Line 300"
                transform="translate(1568.781 996.59)"
              ></path>
              <path
                fill="#676767"
                stroke="#707070"
                strokeWidth="1"
                d="M1654.776 1004.35q18.486-.073 36.965-.63"
                data-name="Path 192"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1654.776 1004.35q18.486-.073 36.965-.63"
                data-name="Path 193"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1653.559 1006.245q18.486-.073 36.965-.63"
                data-name="Path 311"
              ></path>
              <path
                fill="#676767"
                stroke="#707070"
                strokeWidth="1"
                d="M111.862 0L0 3.999"
                data-name="Line 301"
                transform="translate(1542.914 1004.35)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M111.862 0L0 3.999"
                data-name="Line 302"
                transform="translate(1542.914 1004.35)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1609.16 961.123a.954.954 0 00-.871 1.02v9.821a.955.955 0 00.871 1.021h7.847a.956.956 0 00.871-1.021v-9.825a.955.955 0 00-.871-1.02z"
                data-name="Path 195"
              ></path>
              <path
                fill="none"
                stroke="#707070"
                strokeWidth="1"
                d="M1596.842 961.122a.954.954 0 00-.871 1.02v9.821a.955.955 0 00.871 1.021h7.846a.956.956 0 00.872-1.021v-9.82a.955.955 0 00-.872-1.02z"
                data-name="Path 196"
              ></path>
              <path
                fill="none"
                stroke="#707070"
                strokeWidth="1"
                d="M1631.142 972.361l6.254-8.849a1.528 1.528 0 00-.331-2.1 1.448 1.448 0 00-.863-.286h-14.16a1.49 1.49 0 00-1.473 1.506v8.849a1.49 1.49 0 001.473 1.506h7.9a1.462 1.462 0 001.194-.624"
                data-name="Path 202"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1631.142 972.361l6.254-8.849a1.528 1.528 0 00-.331-2.1 1.448 1.448 0 00-.863-.286h-14.16a1.49 1.49 0 00-1.473 1.506v8.849a1.49 1.49 0 001.473 1.506h7.9a1.462 1.462 0 001.2-.626z"
                data-name="Path 203"
              ></path>
              <path
                fill="none"
                d="M166.724 27.831h-9.135a1.49 1.49 0 00-1.473 1.506 1.556 1.556 0 00.041.353l2.088 8.849a1.48 1.48 0 001.431 1.153h7.047a1.49 1.49 0 001.473-1.506v-8.849a1.49 1.49 0 00-1.472-1.506z"
                data-name="Path 205"
                transform="translate(1424.76 933.292)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1592.377 961.123h-9.135a.966.966 0 00-.9 1.02 1.15 1.15 0 00.025.24l2.087 9.821a.931.931 0 00.874.781h7.047a.966.966 0 00.9-1.02v-9.822a.966.966 0 00-.898-1.02z"
                data-name="Path 207"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="2"
                d="M50.1 0L0 0"
                data-name="Line 311"
                transform="translate(1645.239 994.461)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M50.1 0L0 0"
                data-name="Line 312"
                transform="translate(1645.239 994.461)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1586.623 979.925v.889h.267v-.888"
                data-name="Path 217"
              ></path>
              <path
                fill="#676767"
                stroke="#707070"
                strokeWidth="1"
                d="M1575.493 979.209l55.715-.018z"
                data-name="Path 218"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M0 0.017L55.715 0"
                data-name="Line 313"
                transform="translate(1575.49 979.192)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1624.332 979.92v.889h.267v-.888"
                data-name="Path 219"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1604.87 979.92v.889h.267v-.888"
                data-name="Path 220"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1544.883 976.982h-32.6c-2.968 0-3.552 19.414-3.552 19.414"
                data-name="Path 221"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M0 0L0 18.838"
                data-name="Line 314"
                transform="translate(1523.616 977.343)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M0 0L0 18.838"
                data-name="Line 315"
                transform="translate(1523.616 977.343)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1720.687 989.468s-16.466-12.417-22.354-12.417c-1.427 0-5.065-.028-9.757-.069"
                data-name="Path 222"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M0 0L0 12.504"
                data-name="Line 317"
                transform="translate(1688.414 976.991)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeWidth="1"
                d="M1544.882 976.982v19.2"
                data-name="Path 310"
              ></path>
              <circle
                cx="6.082"
                cy="6.082"
                r="6.082"
                fill="#676767"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                data-name="Ellipse 18"
                transform="translate(1684.017 994.905)"
              ></circle>
              <circle
                cx="6.082"
                cy="6.082"
                r="6.082"
                fill="#676767"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                data-name="Ellipse 19"
                transform="translate(1666.149 995.346)"
              ></circle>
              <circle
                cx="6.082"
                cy="6.082"
                r="6.082"
                fill="#676767"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                data-name="Ellipse 20"
                transform="translate(1634.537 996.447)"
              ></circle>
              <circle
                cx="6.082"
                cy="6.082"
                r="6.082"
                fill="#676767"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                data-name="Ellipse 21"
                transform="translate(1610.075 997.988)"
              ></circle>
            </g>
            <path
              fill="none"
              stroke="#ec8800"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="6"
              d="M1677.713 1020.251h-184.174"
              transform={"rotate(" + props.pitchSET + ")"}
              style={{
                transformOrigin: "center",
                transformBox: "fill-box",
              }}
            ></path>
            <path
              fill="none"
              stroke="#3bf"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M1703.796 1020.251h-229.452"
            ></path>
          </g>
        </g>
        <g>
          <text
            fill="#3bf"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="19"
            transform="translate(1803 915)"
          >
            <tspan x="0" y="0">
              Roll
            </tspan>
          </text>
          <text
            fill="#ec8800"
            data-name="-0.00°"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="11"
            transform="translate(1804 1048)"
            textAnchor="middle"
          >
            <tspan x="18" y="0">
              {props.rollSET.toFixed(2)}°
            </tspan>
          </text>
          <text
            fill="#3bf"
            data-name="-0.15°"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="26"
            transform="translate(1785 1073)"
            textAnchor="middle"
          >
            <tspan x="35" y="0">
              {props.rollACT.toFixed(2)}°
            </tspan>
          </text>
          <text
            fill="rgba(255,255,255,0.35)"
            data-name="-0.15°"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="12"
            transform="translate(1745 1073)"
            textAnchor="middle"
            >
              <tspan x="18" y="0">
                {props.rollACTmin.toFixed(2)}°
            </tspan>
          </text>
          <text
            fill="rgba(255,255,255,0.35)"
            data-name="-0.15°"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="12"
            transform="translate(1862 1073)"
            textAnchor="middle"
            >
              <tspan x="15" y="0">
                {props.rollACTmax.toFixed(2)}°
            </tspan>
          </text>
          <text
            fill="rgba(255,255,255,0.35)"
            data-name="Min (30min)"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="6"
            transform="translate(1744 1058)"
          >
            <tspan x="0" y="0">
              Min (30min)
            </tspan>
          </text>
          <text
            fill="rgba(255,255,255,0.35)"
            data-name="Max (30min)"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="6"
            transform="translate(1861 1059)"
          >
            <tspan x="0" y="0">
              Max (30min)
            </tspan>
          </text>
          <g transform="translate(1 -7)">
            <g         transform={"rotate(" + props.rollACT + ")"}
              style={{
                transformOrigin: "center",
                transformBox: "fill-box",
              }}>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M1832.719 934.089a4.055 4.055 0 00-3.674-2.341"
                data-name="Path 227"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1832.719 934.089a4.055 4.055 0 00-3.674-2.341"
                data-name="Path 228"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M0 0L0 6.351"
                data-name="Line 320"
                transform="translate(1831.286 935.529)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M0 0L0 6.351"
                data-name="Line 321"
                transform="translate(1831.286 935.529)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M1831.286 935.529a2.163 2.163 0 00-2.241-2.161"
                data-name="Path 229"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1831.286 935.529a2.163 2.163 0 00-2.241-2.161"
                data-name="Path 230"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M0 1.014L0 0"
                data-name="Line 322"
                transform="translate(1842.571 954.244)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M0 1.014L0 0"
                data-name="Line 323"
                transform="translate(1842.571 954.244)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M0 1.343L14.83 0"
                data-name="Line 324"
                transform="translate(1825.018 948.673)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M0 1.343L14.83 0"
                data-name="Line 325"
                transform="translate(1825.018 948.673)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M0 0L9.852 20.156"
                data-name="Line 326"
                transform="translate(1832.719 934.088)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M0 0L9.852 20.156"
                data-name="Line 327"
                transform="translate(1832.719 934.088)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M0 0.005L12.044 0"
                data-name="Line 328"
                transform="translate(1804.957 933.365)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M0 0.005L12.044 0"
                data-name="Line 329"
                transform="translate(1804.957 933.365)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M0 0L12.044 0"
                data-name="Line 330"
                transform="translate(1804.957 931.748)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M0 0L12.044 0"
                data-name="Line 331"
                transform="translate(1804.957 931.748)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M0 0L0 6.351"
                data-name="Line 332"
                transform="translate(1802.716 935.529)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M0 0L0 6.351"
                data-name="Line 333"
                transform="translate(1802.716 935.529)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M1804.957 933.369a2.163 2.163 0 00-2.241 2.16"
                data-name="Path 231"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1804.957 933.369a2.163 2.163 0 00-2.241 2.16"
                data-name="Path 232"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M1804.957 931.748a4.054 4.054 0 00-3.674 2.341"
                data-name="Path 233"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1804.957 931.748a4.054 4.054 0 00-3.674 2.341"
                data-name="Path 234"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M0 0L19.527 0"
                data-name="Line 334"
                transform="translate(1797.475 941.881)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M0 0L19.527 0"
                data-name="Line 335"
                transform="translate(1797.475 941.881)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M0 0L8.018 0"
                data-name="Line 336"
                transform="translate(1808.982 950.017)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M0 0L8.018 0"
                data-name="Line 337"
                transform="translate(1808.982 950.017)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M0 0.915L0 0"
                data-name="Line 338"
                transform="translate(1791.43 954.342)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M0 0.915L0 0"
                data-name="Line 339"
                transform="translate(1791.43 954.342)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M1791.472 954.161a.4.4 0 00-.041.178"
                data-name="Path 235"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1791.472 954.161a.4.4 0 00-.041.178"
                data-name="Path 236"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M14.83 1.343L0 0"
                data-name="Line 340"
                transform="translate(1794.153 948.673)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M14.83 1.343L0 0"
                data-name="Line 341"
                transform="translate(1794.153 948.673)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M0 0L25.57 0"
                data-name="Line 342"
                transform="translate(1791.43 955.258)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M0 0L25.57 0"
                data-name="Line 343"
                transform="translate(1791.43 955.258)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M9.813 0L0 20.076"
                data-name="Line 344"
                transform="translate(1791.471 934.088)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M9.813 0L0 20.076"
                data-name="Line 345"
                transform="translate(1791.471 934.088)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M8.018 0L0 0"
                data-name="Line 346"
                transform="translate(1817.001 950.017)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M8.018 0L0 0"
                data-name="Line 347"
                transform="translate(1817.001 950.017)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M25.57 0L0 0"
                data-name="Line 349"
                transform="translate(1817 955.221)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M12.045 0.005L0 0"
                data-name="Line 350"
                transform="translate(1817.001 933.365)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M12.045 0.005L0 0"
                data-name="Line 351"
                transform="translate(1817.001 933.365)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M12.045 0L0 0"
                data-name="Line 352"
                transform="translate(1817.001 931.748)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M12.045 0L0 0"
                data-name="Line 353"
                transform="translate(1817.001 931.748)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M19.527 0L0 0"
                data-name="Line 354"
                transform="translate(1817.002 941.881)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M19.527 0L0 0"
                data-name="Line 355"
                transform="translate(1817.002 941.881)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M1838.857 946.646a433.066 433.066 0 00-43.714 0"
                data-name="Path 237"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1838.857 946.646a433.066 433.066 0 00-43.714 0"
                data-name="Path 238"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M1855.488 987.037a.203.203 0 000-.406"
                data-name="Path 239"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1855.488 987.037a.203.203 0 000-.406"
                data-name="Path 240"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M1.712 3.67L0 0"
                data-name="Line 356"
                transform="translate(1855.581 987.014)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1.712 3.67L0 0"
                data-name="Line 357"
                transform="translate(1855.581 987.014)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M0 0L0 0.507"
                data-name="Line 358"
                transform="translate(1857.292 990.684)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M0 0L0 0.507"
                data-name="Line 359"
                transform="translate(1857.292 990.684)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M0 0L13.153 0"
                data-name="Line 360"
                transform="translate(1842.334 986.631)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M0 0L13.153 0"
                data-name="Line 361"
                transform="translate(1842.334 986.631)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M1857.525 994.213c-.005.387-.005.812-.033 1.2"
                data-name="Path 241"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1857.525 994.213c-.005.387-.005.812-.033 1.2"
                data-name="Path 242"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M1857.492 995.412a31.389 31.389 0 01-.056 4.329"
                data-name="Path 243"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1857.492 995.412a31.389 31.389 0 01-.056 4.329"
                data-name="Path 244"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1857.292 994.231a1.521 1.521 0 000-3.04"
                data-name="Path 245"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M0 0L2.432 0"
                data-name="Line 362"
                transform="translate(1851.86 1023.557)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M0 0L2.432 0"
                data-name="Line 363"
                transform="translate(1851.86 1023.557)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M34.86 11.714L0 0"
                data-name="Line 364"
                transform="translate(1782.141 1023.557)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M34.86 11.714L0 0"
                data-name="Line 365"
                transform="translate(1782.141 1023.557)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M0 11.714L34.859 0"
                data-name="Line 366"
                transform="translate(1817 1023.557)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M0 11.714L34.859 0"
                data-name="Line 367"
                transform="translate(1817 1023.557)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M1854.291 1023.557q1.594-11.906 3.145-23.816"
                data-name="Path 246"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1854.291 1023.557q1.594-11.906 3.145-23.816"
                data-name="Path 247"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M1.076 31.373L0 0"
                data-name="Line 368"
                transform="translate(1841.258 955.258)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1.076 31.373L0 0"
                data-name="Line 369"
                transform="translate(1841.258 955.258)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M0 31.373L1.075 0"
                data-name="Line 370"
                transform="translate(1791.667 955.258)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M0 31.373L1.075 0"
                data-name="Line 371"
                transform="translate(1791.667 955.258)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M0 0L0 0.507"
                data-name="Line 372"
                transform="translate(1776.709 990.684)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M0 0L0 0.507"
                data-name="Line 373"
                transform="translate(1776.709 990.684)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M0 3.67L1.712 0"
                data-name="Line 374"
                transform="translate(1776.709 987.014)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M0 3.67L1.712 0"
                data-name="Line 375"
                transform="translate(1776.709 987.014)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M1778.513 986.631a.203.203 0 000 .406"
                data-name="Path 248"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1778.513 986.631a.203.203 0 000 .406"
                data-name="Path 249"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M1776.509 995.412a31.248 31.248 0 00.055 4.327"
                data-name="Path 250"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1776.509 995.412a31.248 31.248 0 00.055 4.327"
                data-name="Path 251"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M1776.477 994.213c.005.387.005.812.033 1.2"
                data-name="Path 252"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1776.477 994.213c.005.387.005.812.033 1.2"
                data-name="Path 253"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1776.708 994.231a1.521 1.521 0 010-3.04h80.584"
                data-name="Path 254"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M1776.564 999.741q1.551 11.911 3.145 23.816"
                data-name="Path 255"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1776.564 999.741q1.551 11.911 3.145 23.816"
                data-name="Path 256"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M13.153 0L0 0"
                data-name="Line 376"
                transform="translate(1778.513 986.631)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M13.153 0L0 0"
                data-name="Line 377"
                transform="translate(1778.513 986.631)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M2.432 0L0 0"
                data-name="Line 378"
                transform="translate(1779.709 1023.557)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M2.432 0L0 0"
                data-name="Line 379"
                transform="translate(1779.709 1023.557)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M0 0L24.728 0"
                data-name="Line 448"
                transform="translate(1792.272 971.954)"
              ></path>
              <path
                fill="none"
                stroke="#676767"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M24.728 0L0 0"
                data-name="Line 449"
                transform="translate(1817.068 971.954)"
              ></path>
              <path
                stroke="#707070"
                strokeWidth="1"
                d="M1816.999 1038.311h0z"
                data-name="Path 308"
              ></path>
              <path
                d="M1 100.776z"
                data-name="Path 309"
                transform="translate(1769.656 917.176)"
              ></path>
              <g
                fill="none"
                stroke="#707070"
                strokeLinejoin="round"
                strokeWidth="1"
                data-name="Rectangle 95"
                transform="translate(1828 958)"
              >
                <rect width="12" height="12" stroke="none" rx="1"></rect>
                <rect width="11" height="11" x="0.5" y="0.5" rx="0.5"></rect>
              </g>
              <g
                fill="none"
                stroke="#707070"
                strokeLinejoin="round"
                strokeWidth="1"
                data-name="Rectangle 97"
                transform="translate(1794 958)"
              >
                <rect width="13" height="12" stroke="none" rx="1"></rect>
                <rect width="12" height="11" x="0.5" y="0.5" rx="0.5"></rect>
              </g>
              <g
                fill="none"
                stroke="#707070"
                strokeLinejoin="round"
                strokeWidth="1"
                data-name="Rectangle 96"
                transform="translate(1809 958)"
              >
                <rect width="18" height="12" stroke="none" rx="1"></rect>
                <rect width="17" height="11" x="0.5" y="0.5" rx="0.5"></rect>
              </g>
            </g>
            <path
              fill="none"
              stroke="#ec8800"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="6"
              d="M1856.268 1014.418h-78"
              transform={"rotate(" + props.rollACT + ")"}
              style={{
                transformOrigin: "center",
                transformBox: "fill-box",
              }}
            ></path>
            <path
              fill="none"
              stroke="#3bf"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M1862.521 1014.418H1772"
              data-name="WaterLine"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
}
