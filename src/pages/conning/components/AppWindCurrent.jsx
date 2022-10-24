/*
  Wind and Current indictor 
  ----------------------------------
  Input props: 
    heading: (int) 0 to 359 degrees 
    windSpeedTrue={0}
    windSpeedDistribution={0}
    windSpeedRel={0}
    windDirTrue={0}
    windDirRel={0}
    currentSpeedTrue={0}
    currentSpeedDistribution={0}
    currentSpeedRel={0}
    currentDirTrue={0}
    currentDirRel={0}
*/

import React, { useState, useEffect } from "react";

export default function AppWindCurrent(props) {
  const [windPathLength, setWindPathLength] = useState(null);
  const [windPathCover, setWindPathCover] = useState(0);
  const [windPathDir, setWindPathDir] = useState(0);
  const [currentPathLength, setCurrentPathLength] = useState(null);
  const [currentPathCover, setCurrentPathCover] = useState(0);
  const [currentPathDir, setCurrentPathDir] = useState(0);

  useEffect(() => {
    // Calc wind circle area parameters
    let windAreaVar = calcRingCoverArea(
      windPathLength,
      props.windDirDistribution
    );
    setWindPathCover(windAreaVar);
    let windAreaStartPoint = calcPathStartPoint(
      props.windDirTrue,
      props.windDirDistribution
    );
    setWindPathDir(windAreaStartPoint);

    // Calc current circle area parameters

    let currentAreaVar = calcRingCoverArea(
      currentPathLength,
      props.currentDirDistribution
    );
    setCurrentPathCover(currentAreaVar);
    let currentAreaStartPoint = calcPathStartPoint(
      props.currentDirTrue,
      props.currentDirDistribution
    );
    setCurrentPathDir(currentAreaStartPoint);
  }, [props, windPathLength, currentPathLength]);

  const calcRingCoverArea = (pathLength, distrubution) => {
    let oneDegPx = pathLength / 360;
    let coverPx = (360 - distrubution) * oneDegPx;
    return coverPx;
  };

  const calcPathStartPoint = (forceDir, distrubution) => {
    return forceDir - distrubution / 2;
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="449"
      height="334"
      viewBox="0 0 449 334"
      style={{ width: "100%", padding: "0.5rem" }}
    >
      <g id="AppWindAndCurrent" transform="translate(-1444 -98)">
        {/* Ship symbol */}
        <g
          id="ShipSymbol"
          fill="#404a50"
          transform={"rotate(" + props.heading + ")"}
          style={{
            transformOrigin: "center",
            transformBox: "fill-box",
          }}
        >
          <path
            d="M30.723 134.138c-.45 0-.938-.027-1.454-.057a32.05 32.05 0 00-1.838-.067l-19.756.001c-.238 0-.473.002-.705.003l-.66.003c-1.864 0-3.027-.14-3.83-.876-1-.919-1.487-2.884-1.487-6.008l.005-88.402c0-3.861.646-8.183 1.92-12.844a73.489 73.489 0 014.64-12.36c1.767-3.66 3.752-6.928 5.59-9.203C15.624 1.264 16.972 1.003 17.34 1c.381.01 1.777.287 4.306 3.272 1.892 2.234 3.923 5.43 5.72 9.002a69.357 69.357 0 014.768 12.29c1.313 4.694 1.98 9.126 1.984 13.171l-.005 89.499c0 2.552-.338 4.268-1.003 5.102-.462.578-1.13.803-2.387.803z"
            transform="translate(1658.007 202.505)"
          ></path>
          <path
            fill="#fff"
            d="M17.338 2c-.118.017-1.23.246-3.44 2.992-1.79 2.223-3.729 5.424-5.458 9.013a72.47 72.47 0 00-4.564 12.173c-1.246 4.567-1.878 8.791-1.878 12.557l-.005 88.402c0 3.474.632 4.784 1.163 5.27.56.514 1.58.614 3.154.614l.652-.003c.235-.001.473-.003.713-.003l19.756-.001c.67 0 1.293.035 1.895.07.501.027.975.054 1.397.054 1.167 0 1.433-.21 1.605-.427.293-.367.785-1.437.785-4.478l.005-89.498c-.003-3.954-.659-8.296-1.947-12.904a68.341 68.341 0 00-4.698-12.109c-1.762-3.503-3.748-6.63-5.59-8.804C18.92 2.6 17.687 2.033 17.338 2M17.348 0c5.42.097 17.753 21.19 17.77 38.734l-.005 89.5c0 8.394-3.44 6.78-7.682 6.78l-19.756.002c-4.243 0-7.683.517-7.682-7.878l.005-88.402C-.002 22.012 11.973 0 17.348 0z"
            transform="translate(1658.007 202.505)"
          ></path>
        </g>

        {/* Compass rose  */}
        <g id="WindCompassRose">
          <text
            id="N"
            fill="#fff"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="17"
            transform="translate(1669 177)"
          >
            <tspan x="0" y="0">
              N
            </tspan>
          </text>
          <text
            id="S"
            fill="#fff"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="17"
            transform="translate(1670 375)"
          >
            <tspan x="0" y="0">
              S
            </tspan>
          </text>
          <text
            id="SE"
            fill="rgba(255,255,255,0.52)"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="9"
            transform="translate(1740 347)"
          >
            <tspan x="0" y="0">
              SE
            </tspan>
          </text>
          <text
            id="SW"
            fill="rgba(255,255,255,0.52)"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="9"
            transform="translate(1598 347)"
          >
            <tspan x="0" y="0">
              SW
            </tspan>
          </text>
          <text
            id="NW"
            fill="rgba(255,255,255,0.52)"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="9"
            transform="translate(1598 199)"
          >
            <tspan x="0" y="0">
              NW
            </tspan>
          </text>
          <text
            id="NE"
            fill="rgba(255,255,255,0.52)"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="9"
            transform="translate(1740 199)"
          >
            <tspan x="0" y="0">
              NE
            </tspan>
          </text>
          <text
            id="W"
            fill="#fff"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="17"
            transform="translate(1569 278)"
          >
            <tspan x="0" y="0">
              W
            </tspan>
          </text>
          <text
            id="E"
            fill="#fff"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="17"
            transform="translate(1770 278)"
          >
            <tspan x="0" y="0">
              E
            </tspan>
          </text>
          <g
            id="Ellipse_6"
            fill="none"
            stroke="#707070"
            strokeWidth="1"
            data-name="Ellipse 6"
            transform="translate(1554 148)"
          >
            <circle cx="121.5" cy="121.5" r="121.5" stroke="none"></circle>
            <circle cx="121.5" cy="121.5" r="121"></circle>
          </g>
          <g
            id="Ellipse_7"
            fill="none"
            stroke="#707070"
            strokeWidth="1"
            data-name="Ellipse 7"
            transform="translate(1562 157)"
          >
            <circle cx="113" cy="113" r="113" stroke="none"></circle>
            <circle cx="113" cy="113" r="112.5"></circle>
          </g>
          <path
            id="Line_226"
            fill="none"
            stroke="#707070"
            strokeWidth="1"
            d="M0 0L0 9"
            data-name="Line 226"
            transform="translate(1675.5 148.5)"
          ></path>
          <path
            id="Line_227"
            fill="none"
            stroke="#707070"
            strokeWidth="1"
            d="M9.5 0L0 0"
            data-name="Line 227"
            transform="translate(1787.5 271.5)"
          ></path>
          <path
            id="Line_228"
            fill="none"
            stroke="#707070"
            strokeWidth="1"
            d="M0 0L8 0"
            data-name="Line 228"
            transform="translate(1554.5 271.5)"
          ></path>
          <path
            id="Line_242"
            fill="none"
            stroke="#707070"
            strokeWidth="1"
            d="M0 0L8 0"
            data-name="Line 242"
            transform="rotate(45 572.935 2011.197)"
          ></path>
          <path
            id="Line_243"
            fill="none"
            stroke="#707070"
            strokeWidth="1"
            d="M0 0L8 0"
            data-name="Line 243"
            transform="rotate(45 456.007 2293.63)"
          ></path>
          <path
            id="Line_241"
            fill="none"
            stroke="#707070"
            strokeWidth="1"
            d="M6.56 0L0 6.56"
            data-name="Line 241"
            transform="translate(1754.5 183.94)"
          ></path>
          <path
            id="Line_229"
            fill="none"
            stroke="#707070"
            strokeWidth="1"
            d="M0 0L0 8"
            data-name="Line 229"
            transform="translate(1675 382.5)"
          ></path>
          <path
            id="Line_239"
            fill="none"
            stroke="#707070"
            strokeWidth="1"
            d="M0 0L0 8"
            data-name="Line 239"
            transform="rotate(45 376.032 2100.757)"
          ></path>
          <g
            id="Ellipse_8"
            fill="none"
            stroke="#707070"
            strokeWidth="1"
            data-name="Ellipse 8"
            transform="translate(1562 157)"
          >
            <circle cx="113" cy="113" r="113" stroke="none"></circle>
            <circle cx="113" cy="113" r="112.5"></circle>
          </g>
        </g>

        {/* Current TEXT info */}
        <g id="CurrentText" fontFamily="Roboto-Regular, Roboto">
          <text
            id="CurrentDirRel"
            fill="rgba(51,187,255,0.58)"
            fontSize="23"
            transform="translate(1818 378)"
          >
            <tspan x="0" y="0">
              R{" "}
              {props.currentDirRel <= 99
                ? "0" + props.currentDirRel + "°"
                : props.currentDirRel + "°"}
            </tspan>
          </text>
          <text
            id="CurrentSpeedRel"
            fill="rgba(51,187,255,0.58)"
            fontSize="23"
            transform="translate(1444 378)"
          >
            <tspan x="0" y="0">
              R {props.currentSpeedRel} kts
            </tspan>
          </text>
          <text
            id="CurrentSpeedTrue"
            fill="#3bf"
            fontSize="40"
            transform="translate(1444 422)"
          >
            <tspan x="0" y="0">
              {props.currentSpeedTrue} kts
            </tspan>
          </text>
          <text
            id="CurrentDirTrue"
            fill="#3bf"
            fontSize="40"
            transform="translate(1810 420)"
          >
            <tspan x="0" y="0">
              {props.currentDirTrue <= 99
                ? "0" + props.currentDirTrue + "°"
                : props.currentDirTrue + "°"}
            </tspan>
          </text>
          <text
            id="CurrentCategory"
            fill="rgba(255,255,255,0.35)"
            fontSize="15"
            transform="translate(1444 351)"
          >
            <tspan x="0" y="0">
              Current
            </tspan>
          </text>
        </g>

        {/* Wind TEXT info */}
        <g id="WindText" fontFamily="Roboto-Regular, Roboto">
          <text
            id="WindSpeedTrue"
            fill="#fff"
            fontSize="40"
            transform="translate(1444 151)"
            
          >
            <tspan x="0" y="0">
              {props.windSpeedTrue + " m/s"}
            </tspan>
          </text>
          <text
            id="WindSpeedRel"
            fill="rgba(255,255,255,0.58)"
            fontSize="23"
            transform="translate(1444 182)"
          >
            <tspan x="0" y="0">
              {"R " + props.windSpeedRel + " m/s"}
            </tspan>
          </text>
          <text
            id="WindDirRel"
            fill="rgba(255,255,255,0.58)"
            fontSize="23"
            transform="translate(1818 182)"
          >
            <tspan x="0" y="0">
              R{" "}
              {props.windSpeedRel <= 99
                ? "0" + props.windSpeedRel + "°"
                : props.windSpeedRel + "°"}
            </tspan>
          </text>
          <text
            id="WindDirTrue"
            fill="#fff"
            fontSize="40"
            transform="translate(1810 151)"
          >
            <tspan x="0" y="0">
              {props.windSpeedTrue <= 99
                ? "0" + props.windSpeedTrue + "°"
                : props.windSpeedTrue + "°"}
            </tspan>
          </text>
          <text
            id="WindCategory"
            fill="rgba(255,255,255,0.35)"
            fontSize="15"
            transform="translate(1447 112)"
          >
            <tspan x="0" y="0">
              Wind
            </tspan>
          </text>
        </g>

        {/* Current Arrow  */}
        <g
          id="CurrentRotArea"
          fill="none"
          transform={"rotate(" + props.currentDirTrue + ")"}
          style={{
            transformOrigin: "center",
            transformBox: "fill-box",
          }}
        >
          <g
            id="CurrentArrow"
            stroke="#3bf"
            strokeLinecap="round"
            strokeWidth="2"
            transform="translate(63.063 10.862)"
          >
            <path
              id="PathCurrentArrowPoint_2"
              d="M1604.5 115.049l7.753 10.127 8.247-10.127"
            ></path>
            <path
              id="PathCurrentArrowPoint_1"
              d="M1604.5 123.511l7.753 10.127 8.247-10.127"
            ></path>
            <path
              id="LineCurrentArrow"
              d="M0 0L0 19"
              transform="translate(1612.5 99.602)"
            ></path>
          </g>
          <g
            id="CurrentRot"
            stroke="rgba(112,112,112,0)"
            strokeWidth="1"
            transform="translate(1665 108)"
          >
            <path stroke="none" d="M0 0H21V322H0z"></path>
            <path d="M0.5 0.5H20.5V321.5H0.5z"></path>
          </g>
        </g>

        {/* Wind Arrow */}
        <g
          id="WindArrowArea"
          transform={"rotate(" + props.windDirTrue + ")"}
          style={{
            transformOrigin: "center",
            transformBox: "fill-box",
          }}
        >
          <g id="WindArrow" strokeLinecap="round">
            <path
              id="WindArrowBody"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              d="M0 0L0 25"
              transform="translate(1675.5 116.5)"
            ></path>
            <path
              id="WindForceFull_1"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              d="M1686.772 111.345L1675.5 116.6"
            ></path>
            <path
              id="WindForceFull_2"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              d="M1687.077 117.26L1676 122.425"
            ></path>
            <path
              id="WindForceHalft"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              d="M1681.582 125.645l-5.582 2.603"
            ></path>
            <g id="WindArrowPoint" fill="#fff">
              <path
                d="M6.764 8H3.236L5 4.472 6.764 8z"
                transform="rotate(180 840.25 73.25)"
              ></path>
              <path
                d="M5 0l5 10H0L5 0z"
                transform="rotate(180 840.25 73.25)"
              ></path>
            </g>
          </g>
          <g
            id="ArrowROT"
            fill="none"
            stroke="rgba(112,112,112,0)"
            strokeWidth="1"
            transform="translate(1662 109)"
          >
            <path stroke="none" d="M0 0H27V319H0z"></path>
            <path d="M0.5 0.5H26.5V318.5H0.5z"></path>
          </g>
        </g>

        {/* Wind Area */}
        <path
          id="WindPathArround"
          ref={(ref) => {
            if (ref) {
              setWindPathLength(ref.getTotalLength());
            }
          }}
          transform={"rotate(" + windPathDir + ")"}
          style={{
            strokeDasharray: windPathLength,
            strokeDashoffset: windPathCover,
            transformOrigin: "center",
            transformBox: "fill-box",
          }}
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="9"
          d="M1675.5 152.905c73.516 0 117.929 62.629 116.9 119.017s-45.334 114.619-117.3 114.619-115.822-59.686-116.753-114.871 43.637-118.765 117.153-118.765z"
        ></path>

        {/* Current Area */}
        <path
          id="CurrentPathArround"
          ref={(ref) => {
            if (ref) {
              setCurrentPathLength(ref.getTotalLength());
            }
          }}
          transform={"rotate(" + currentPathDir + ")"}
          style={{
            strokeDasharray: currentPathLength,
            strokeDashoffset: currentPathCover,
            transformOrigin: "center",
            transformBox: "fill-box",
          }}
          fill="none"
          stroke="rgba(51,187,255,0.5)"
          strokeWidth="9"
          d="M1675.5 152.905c73.516 0 117.929 62.629 116.9 119.017s-45.334 114.619-117.3 114.619-115.822-59.686-116.753-114.871 43.637-118.765 117.153-118.765z"
        ></path>
      </g>
    </svg>
  );
}
