import React, { useEffect, useState } from "react";

export default function AppShipSteering(props) {
  // ENG 1 & ENG 2
  const [eng1, setEng1] = useState(0.5);
  const [eng2, setEng2] = useState(0.5);
  const [eng1SET, setEng1SET] = useState(0.5);
  const [eng2SET, setEng2SET] = useState(0.5);

  // Rudder 1
  const [rud1pPathLength, setRud1pPathLength] = useState(null);
  const [rud1pPathCover, setRud1pPathCover] = useState(0);
  const [rud1sPathLength, setRud1sPathLength] = useState(null);
  const [rud1sPathCover, setRud1sPathCover] = useState(0);
  // Rudder 2
  const [rud2portPathLength, setRud2PortPathLength] = useState(null);
  const [rud2portPathCover, setRud2PortPathCover] = useState(0);
  const [rud2SbPathLength, setRud2SbPathLength] = useState(null);
  const [rud2SbPathCover, setRud2SbPathCover] = useState(0);

  useEffect(() => {
    // ENG 1
    setEng1(props.eng1ACT);
    setEng2(props.eng2ACT);
    setEng1SET(props.eng1SET);
    setEng2SET(props.eng2SET);

    // Rudder 1
    const [rud1CovP, rud1CovS] = rudderAngelValues(props.rud1ACT);
    setRud1pPathCover(rud1CovP);
    setRud1sPathCover(rud1CovS);

    // Rudder 2
    const [rud2CovP, rud2CovS] = rudderAngelValues(props.rud2ACT);
    setRud2PortPathCover(rud2CovP);
    setRud2SbPathCover(rud2CovS);
  }, [props]);

  const rudderAngelValues = (actVal) => {
    let pPath,
      sPath = 0;

    // Rudder over max value
    if (actVal > 35) {
      actVal = 35;
    } else if (actVal < -35) {
      actVal = -35;
    }

    // Port path
    if (actVal < 0) {
      // To port
      sPath = rud2SbPathLength;
      const rudDegPxP = rud2portPathLength / 35;
      pPath = rudDegPxP * (35 - actVal);
    } else {
      // To starboard
      pPath = rud2portPathLength;
      const rudDegPxS = rud2SbPathLength / 35;
      sPath = rudDegPxS * (35 - actVal);
    }

    return [pPath, sPath];
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="503"
      height="955.008"
      viewBox="0 0 503 955.008"
      style={{ height: "98%", width: "96%" }}
    >
      {/* Blurr */}
      <defs>
        <filter
          id="rudder_act_area_S"
          width="121.694"
          height="75.891"
          x="317"
          y="803.54"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="sudder_set_area_S"
          width="78.51"
          height="47.258"
          x="339"
          y="848.257"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-2" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-2" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="rudder_act_area_P"
          width="121.694"
          height="75.891"
          x="60"
          y="803.54"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-3" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-3" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="sudder_set_area_P"
          width="78.51"
          height="47.258"
          x="82"
          y="848.257"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-4" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-4" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="eng_avt_area_P"
          width="168.827"
          height="79.205"
          x="51.173"
          y="520.714"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-5" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-5" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="eng_avt_area_S"
          width="168.827"
          height="79.205"
          x="282"
          y="520.714"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-6" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-6" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="eng_set_area_P"
          width="67"
          height="41.361"
          x="101.673"
          y="506.456"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-7" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-7" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="eng_set_area_S"
          width="67"
          height="41.361"
          x="332.5"
          y="506.456"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-8" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-8" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="bow1_actBox"
          width="100.434"
          height="67.111"
          x="199.993"
          y="174.996"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-9" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-9" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="bow2_actBox"
          width="100.434"
          height="67.111"
          x="200.776"
          y="239.996"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-10" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-10" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="bow1_box"
          width="66.104"
          height="40.354"
          x="216.993"
          y="165.593"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-11" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-11" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="bow2_box"
          width="66.104"
          height="40.354"
          x="217.776"
          y="230.593"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-12" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-12" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
      </defs>

      <g id="SteeringCommands" transform="translate(-39 -91.893)">
        <g id="ShipOutline" fill="rgba(105,144,167,0.25)">
          <path
            d="M440.134 932.166c-6.844 0-14.02-.2-21.618-.412-8.235-.23-16.75-.468-25.547-.468H110.03c-3.371 0-6.742.012-10.003.023-3.283.01-6.384.021-9.51.021-12.015 0-24.668-.154-35.804-1.275-5.752-.579-10.77-1.368-15.34-2.413-4.987-1.14-9.307-2.553-13.207-4.317-8.46-3.827-14.619-9.215-18.828-16.472-2.237-3.857-3.944-8.33-5.073-13.291C1.094 888.412.5 882.54.5 876.112V276.539c0-14.234 2.523-29.922 7.498-46.63 4.683-15.726 11.56-32.447 20.444-49.698 16.55-32.146 39.822-65.723 67.298-97.1 13.048-14.901 26.714-28.923 40.617-41.677 13.896-12.748 27.722-23.946 41.095-33.285 13.67-9.547 26.601-16.961 38.432-22.036 12.305-5.279 23.267-7.955 32.582-7.955 9.413.083 20.525 2.747 33.023 7.917C293.56-8.931 306.744-1.68 320.672 7.629c13.714 9.165 27.86 20.128 42.046 32.584 14.298 12.554 28.314 26.343 41.66 40.986 28.326 31.08 52.261 64.505 69.217 96.664 9.163 17.377 16.262 34.337 21.1 50.408 5.148 17.103 7.774 33.343 7.805 48.27v607.328c0 5.23-.393 10.044-1.169 14.309-.752 4.135-1.89 7.899-3.382 11.185-1.44 3.168-3.26 6.009-5.414 8.444-2.067 2.335-4.52 4.389-7.293 6.103-5.147 3.182-11.586 5.362-19.684 6.663-6.761 1.087-14.84 1.593-25.424 1.593z"
            transform="translate(39 114.235)"
          ></path>
          <path
            fill="#707070"
            d="M248.457-21.342c-9.244.002-20.137 2.664-32.376 7.914-11.8 5.062-24.7 12.46-38.343 21.987-13.354 9.326-27.163 20.51-41.043 33.243-13.89 12.742-27.543 26.75-40.579 41.638-27.45 31.347-50.697 64.89-67.23 97-8.868 17.224-15.735 33.916-20.409 49.611C3.516 246.713 1 262.353 1 276.54v599.573c0 6.391.59 12.225 1.754 17.339 1.118 4.913 2.806 9.337 5.018 13.15 4.154 7.165 10.239 12.486 18.6 16.268 3.87 1.75 8.16 3.152 13.113 4.285 4.55 1.04 9.548 1.827 15.28 2.404 11.113 1.118 23.751 1.272 35.753 1.272 3.125 0 6.226-.01 9.509-.021 3.26-.011 6.632-.023 10.004-.023H392.97c8.804 0 17.323.238 25.561.468 7.595.212 14.768.412 21.604.412 10.557 0 18.61-.504 25.345-1.586 8.031-1.291 14.41-3.449 19.5-6.596 5.62-3.473 9.713-8.16 12.515-14.328 1.475-3.249 2.6-6.972 3.345-11.068.77-4.235 1.161-9.019 1.161-14.219V276.541c-.03-14.878-2.65-31.07-7.784-48.126-4.83-16.04-11.916-32.97-21.063-50.32-16.937-32.121-40.847-65.511-69.145-96.56-13.333-14.628-27.336-28.405-41.62-40.947-14.169-12.44-28.298-23.39-41.994-32.543-13.901-9.29-27.055-16.527-39.096-21.508-12.438-5.145-23.488-7.796-32.841-7.879m.009-1c77.628.689 254.278 174.895 254.534 298.881v607.33c0 59.325-49.263 47.917-110.031 47.917H110.03c-6.657 0-13.18.044-19.513.044C39.056 931.83 0 928.937 0 876.112V276.539C0 158.359 171.482-22.342 248.466-22.342z"
            transform="translate(39 114.235)"
          ></path>
        </g>
        {/* Steering mode TEXT */}
        <text
          id="STEERING_MODE"
          fill="#bacedd"
          fontFamily="Roboto-Regular, Roboto"
          fontSize="26"
          transform="translate(290 217)"
        >
          <tspan x="0" y="0" textAnchor="middle">
            {props.steeringMode}
          </tspan>
        </text>

        <g id="Rudders">
          <g id="rudder_S">
            <g id="text_numbers_S">
              <text
                id="_0"
                fill="#fff"
                data-name="0"
                fontFamily="Roboto-Regular, Roboto"
                fontSize="17"
                transform="translate(412 1038)"
              >
                <tspan x="0" y="0">
                  0
                </tspan>
              </text>
              <text
                id="_10"
                fill="#1fb948"
                data-name="10"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="16"
                fontWeight="700"
                transform="rotate(-20 3144.875 -760.78)"
              >
                <tspan x="0" y="0">
                  10
                </tspan>
              </text>
              <text
                id="_10-2"
                fill="#e93629"
                data-name="10"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="16"
                fontWeight="700"
                transform="rotate(17 -3249.657 1733.58)"
              >
                <tspan x="0" y="0">
                  10
                </tspan>
              </text>
              <text
                id="_20"
                fill="#e93629"
                data-name="20"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="16"
                fontWeight="700"
                transform="rotate(36 -1382.006 1016.043)"
              >
                <tspan x="0" y="0">
                  20
                </tspan>
              </text>
              <text
                id="_30"
                fill="#e93629"
                data-name="30"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="16"
                fontWeight="700"
                transform="rotate(50 -896.166 820.319)"
              >
                <tspan x="0" y="0">
                  30
                </tspan>
              </text>
              <text
                id="_20-2"
                fill="#1fb948"
                data-name="20"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="16"
                fontWeight="700"
                transform="rotate(-36 1804.143 -242.34)"
              >
                <tspan x="0" y="0">
                  20
                </tspan>
              </text>
              <text
                id="_30-2"
                fill="#1fb948"
                data-name="30"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="16"
                fontWeight="700"
                transform="rotate(-50 1319.286 -56.752)"
              >
                <tspan x="0" y="0">
                  30
                </tspan>
              </text>
            </g>
            <g filter="url(#rudder_act_area_S)" transform="translate(39 91.89)">
              <g
                id="rudder_act_area_S-2"
                fill="#404040"
                data-name="rudder_act_area_S"
              >
                <path
                  d="M28.717 102.646L1 93.917V8.576l27.716-7.54 28.175 7.543v85.335l-28.174 8.732z"
                  transform="rotate(90 -189.925 619.615)"
                ></path>
                <path
                  fill="#707070"
                  d="M28.718 2.072L2 9.34v83.844l26.719 8.415 27.172-8.422V9.347L28.718 2.071M28.714 0l29.177 7.811v86.84l-29.177 9.043L0 94.651V7.81L28.714 0z"
                  transform="rotate(90 -189.925 619.615)"
                ></path>
              </g>
            </g>
            <text
              id="rudder_ACT_S"
              fill={
                props.rud2ACT > 1
                  ? "#1fb948"
                  : props.rud2ACT < -1
                  ? "#e93629"
                  : "#fff"
              }
              fontFamily="Roboto-Regular, Roboto"
              fontSize="44"
              transform="translate(417 942)"
            >
              <tspan x="5" y="0" textAnchor="middle">
                {props.rud2ACT + "°"}
              </tspan>
            </text>
            <g filter="url(#sudder_set_area_S)" transform="translate(39 91.89)">
              <g
                id="sudder_set_area_S-2"
                fill="#ec8800"
                data-name="sudder_set_area_S"
              >
                <path
                  d="M30.093 28.259L1.12 25.7 1.005 3.046l28.933-2.04L59.39 3.231l.115 22.653-29.412 2.375z"
                  transform="translate(348 854.25)"
                ></path>
                <path
                  fill="#bf730a"
                  d="M29.935 2.009L2.01 3.977l.105 20.808 27.982 2.47L58.5 24.962l-.106-20.804-28.46-2.149M29.94.004l30.446 2.3.124 24.502-30.421 2.456L.125 26.617 0 2.114 29.94.004z"
                  transform="translate(348 854.25)"
                ></path>
              </g>
            </g>
            <text
              id="rudder_SET_S"
              fill="#fff"
              fontFamily="Roboto-Regular, Roboto"
              fontSize="20"
              transform="translate(417 968)"
            >
              <tspan x="2" y="0" textAnchor="middle">
                {props.rud2SET + "°"}
              </tspan>
            </text>
            <path
              id="Line_area_S"
              fill="none"
              stroke="rgba(112,112,112,0.51)"
              strokeWidth="28"
              d="M328 952s24.929 52 88 52 88-52 88-52"
            ></path>
            {/* Rudder 1 Port path */}
            <path
              id="Line_PS_ACT_S"
              fill="none"
              stroke="#e93629"
              strokeWidth="28"
              d="M328 952s24.929 52 88 52"
              ref={(ref) => {
                if (ref) {
                  setRud2PortPathLength(ref.getTotalLength());
                }
              }}
              style={{
                strokeDasharray: rud2portPathLength,
                strokeDashoffset: rud2portPathCover,
                transformOrigin: "center",
                transformBox: "fill-box",
              }}
            ></path>
            <path
              id="Line_SB_ACT_S"
              fill="none"
              stroke="#1fb948"
              strokeWidth="28"
              d="M416 1004c63.071 0 88-52 88-52"
              ref={(ref) => {
                if (ref) {
                  setRud2SbPathLength(ref.getTotalLength());
                }
              }}
              style={{
                strokeDasharray: rud2SbPathLength,
                strokeDashoffset: rud2SbPathCover,
                transformOrigin: "center",
                transformBox: "fill-box",
              }}
            ></path>
            <g
              id="RudderSetLine_S"
              fill="none"
              strokeLinecap="round"
              strokeWidth="5"
              transform={"rotate(" + -((62 / 35) * props.rud2SET) + ")"}
              style={{
                transformOrigin: "center",
                transformBox: "fill-box",
              }}
            >
              <path
                id="LineVisable_S"
                stroke="#ec8800"
                d="M0 0L0 33"
                transform="translate(416.5 987.5)"
              ></path>
              <path
                id="LineHiden_S"
                stroke="rgba(236,136,0,0)"
                d="M0 0L0 230"
                transform="translate(416.5 790.5)"
              ></path>
            </g>
          </g>
          <g id="rudder_P" transform="translate(-257)">
            <g id="text_numbers_P">
              <text
                id="_0-2"
                fill="#fff"
                data-name="0"
                fontFamily="Roboto-Regular, Roboto"
                fontSize="17"
                transform="translate(412 1038)"
              >
                <tspan x="0" y="0">
                  0
                </tspan>
              </text>
              <text
                id="_10-3"
                fill="#1fb948"
                data-name="10"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="16"
                fontWeight="700"
                transform="rotate(-20 3144.875 -760.78)"
              >
                <tspan x="0" y="0">
                  10
                </tspan>
              </text>
              <text
                id="_10-4"
                fill="#e93629"
                data-name="10"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="16"
                fontWeight="700"
                transform="rotate(17 -3249.657 1733.58)"
              >
                <tspan x="0" y="0">
                  10
                </tspan>
              </text>
              <text
                id="_20-3"
                fill="#e93629"
                data-name="20"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="16"
                fontWeight="700"
                transform="rotate(36 -1382.006 1016.043)"
              >
                <tspan x="0" y="0">
                  20
                </tspan>
              </text>
              <text
                id="_30-3"
                fill="#e93629"
                data-name="30"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="16"
                fontWeight="700"
                transform="rotate(50 -896.166 820.319)"
              >
                <tspan x="0" y="0">
                  30
                </tspan>
              </text>
              <text
                id="_20-4"
                fill="#1fb948"
                data-name="20"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="16"
                fontWeight="700"
                transform="rotate(-36 1804.143 -242.34)"
              >
                <tspan x="0" y="0">
                  20
                </tspan>
              </text>
              <text
                id="_30-4"
                fill="#1fb948"
                data-name="30"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="16"
                fontWeight="700"
                transform="rotate(-50 1319.286 -56.752)"
              >
                <tspan x="0" y="0">
                  30
                </tspan>
              </text>
            </g>
            <g
              filter="url(#rudder_act_area_P)"
              transform="translate(296 91.89)"
            >
              <g
                id="rudder_act_area_P-2"
                fill="#404040"
                data-name="rudder_act_area_P"
              >
                <path
                  d="M28.717 102.646L1 93.917V8.576l27.716-7.54 28.175 7.543v85.335l-28.174 8.732z"
                  transform="rotate(90 -318.425 491.115)"
                ></path>
                <path
                  fill="#707070"
                  d="M28.718 2.072L2 9.34v83.844l26.719 8.415 27.172-8.422V9.347L28.718 2.071M28.714 0l29.177 7.811v86.84l-29.177 9.043L0 94.651V7.81L28.714 0z"
                  transform="rotate(90 -318.425 491.115)"
                ></path>
              </g>
            </g>
            <text
              id="rudder_ACT_P"
              fill={
                props.rud1ACT > 1
                  ? "#1fb948"
                  : props.rud1ACT < -1
                  ? "#e93629"
                  : "#fff"
              }
              fontFamily="Roboto-Regular, Roboto"
              fontSize="44"
              transform="translate(417 942)"
            >
              <tspan x="5" y="0" textAnchor="middle">
                {props.rud1ACT + "°"}
              </tspan>
            </text>
            <g
              filter="url(#sudder_set_area_P)"
              transform="translate(296 91.89)"
            >
              <g
                id="sudder_set_area_P-2"
                fill="#ec8800"
                data-name="sudder_set_area_P"
              >
                <path
                  d="M30.093 28.259L1.12 25.7 1.005 3.046l28.933-2.04L59.39 3.231l.115 22.653-29.412 2.375z"
                  transform="translate(91 854.25)"
                ></path>
                <path
                  fill="#bf730a"
                  d="M29.935 2.009L2.01 3.977l.105 20.808 27.982 2.47L58.5 24.962l-.106-20.804-28.46-2.149M29.94.004l30.446 2.3.124 24.502-30.421 2.456L.125 26.617 0 2.114 29.94.004z"
                  transform="translate(91 854.25)"
                ></path>
              </g>
            </g>
            <text
              id="rudder_SET_P"
              fill="#fff"
              fontFamily="Roboto-Regular, Roboto"
              fontSize="20"
              transform="translate(417 968)"
            >
              <tspan x="2" y="0" textAnchor="middle">
                {props.rud1SET + "°"}
              </tspan>
            </text>
            <path
              id="Line_area_P"
              fill="none"
              stroke="rgba(112,112,112,0.51)"
              strokeWidth="28"
              d="M328 952s24.929 52 88 52 88-52 88-52"
            ></path>
            <path
              id="Line_PS_ACT_P"
              fill="none"
              stroke="#e93629"
              strokeWidth="28"
              d="M328 952s24.929 52 88 52"
              ref={(ref) => {
                if (ref) {
                  setRud1pPathLength(ref.getTotalLength());
                }
              }}
              style={{
                strokeDasharray: rud1pPathLength,
                strokeDashoffset: rud1pPathCover,
                transformOrigin: "center",
                transformBox: "fill-box",
              }}
            ></path>
            <path
              id="Line_SB_ACT_P"
              fill="none"
              stroke="#1fb948"
              strokeWidth="28"
              d="M416 1004c63.071 0 88-52 88-52"
              ref={(ref) => {
                if (ref) {
                  setRud1sPathLength(ref.getTotalLength());
                }
              }}
              style={{
                strokeDasharray: rud1sPathLength,
                strokeDashoffset: rud1sPathCover,
                transformOrigin: "center",
                transformBox: "fill-box",
              }}
            ></path>
            <g
              id="RudderSetLine_P"
              fill="none"
              strokeLinecap="round"
              strokeWidth="5"
              transform={"rotate(" + -((62 / 35) * props.rud1SET) + ")"}
              style={{
                transformOrigin: "center",
                transformBox: "fill-box",
              }}
            >
              <path
                id="LineVisable_P"
                stroke="#ec8800"
                d="M0 0L0 33"
                transform="translate(416.5 987.5)"
              ></path>
              <path
                id="LineHiden_P"
                stroke="rgba(236,136,0,0)"
                d="M0 0L0 230"
                transform="translate(416.5 790.5)"
              ></path>
            </g>
          </g>
        </g>

        <g id="Engine">
          <rect
            id="eng_p_area"
            width="134.192"
            height="461.785"
            fill="rgba(255,255,255,0.77)"
            rx="2"
            transform="translate(107.173 417.607)"
          ></rect>
          <rect
            id="eng_s_area"
            width="134.192"
            height="461.785"
            fill="rgba(255,255,255,0.77)"
            rx="2"
            transform="translate(338 417.607)"
          ></rect>
          <path
            id="engACT_bar_P_fwd"
            fill="#3bf"
            d="M2 0h130.192a2 2 0 012 2v203H0V2a2 2 0 012-2z"
            transform={
              "translate(107.173 417.607) scale(1," +
              (eng2 < 0 ? eng2 : 0) +
              ")"
            }
            style={{
              transformOrigin: "bottom",
              transformBox: "fill-box",
            }}
          ></path>
          <path
            id="engACT_bar_S_fwd"
            fill="#3bf"
            d="M2 0h130.192a2 2 0 012 2v203H0V2a2 2 0 012-2z"
            transform={
              "translate(338 417.607) scale(1," + (eng2 > 0 ? eng2 : 0) + ")"
            }
            style={{
              transformOrigin: "bottom",
              transformBox: "fill-box",
            }}
          ></path>
          <path
            id="engACT_bar_P_aft"
            fill="#3bf"
            d="M0 0h134.192v202.988a2 2 0 01-2 2H2a2 2 0 01-2-2V0z"
            transform={
              "translate(107.238 674.405) scale(1," +
              (eng1 < 0 ? Math.abs(eng1) : 0) +
              ")"
            }
            style={{
              transformOrigin: "top",
              transformBox: "fill-box",
            }}
          ></path>
          <path
            id="engACT_bar_S_aft"
            fill="#3bf"
            d="M0 0h134.192v202.988a2 2 0 01-2 2H2a2 2 0 01-2-2V0z"
            transform={
              "translate(338.065 674.405) scale(1," +
              (eng2 < 0 ? Math.abs(eng2) : 0) +
              ")"
            }
            style={{
              transformOrigin: "top",
              transformBox: "fill-box",
            }}
          ></path>
          <path
            id="engSET_bar_P_fwd"
            fill="#ec8800"
            d="M2 0h17.491a2 2 0 012 2v204H0V2a2 2 0 012-2z"
            transform={
              "translate(219.874 417.607) scale(1," +
              (eng1SET > 0 ? eng1SET : 0) +
              ")"
            }
            style={{
              transformOrigin: "bottom",
              transformBox: "fill-box",
            }}
          ></path>
          <path
            id="engSET_bar_S_fwd"
            fill="#ec8800"
            d="M2 0h17.491a2 2 0 012 2v203.284H0V2a2 2 0 012-2z"
            transform={
              "translate(338.065 417.607) scale(1," +
              (eng2SET > 0 ? eng2SET : 0) +
              ")"
            }
            style={{
              transformOrigin: "bottom",
              transformBox: "fill-box",
            }}
          ></path>
          <path
            id="engSET_bar_P_aft"
            fill="#ec8800"
            d="M0 0h21.491v202.988a2 2 0 01-2 2H2a2 2 0 01-2-2V0z"
            transform={
              "translate(219.874 674.405) scale(1," +
              (eng1SET < 0 ? Math.abs(eng1SET) : 0) +
              ")"
            }
            style={{
              transformOrigin: "top",
              transformBox: "fill-box",
            }}
          ></path>
          <path
            id="engSET_bar_S_aft"
            fill="#ec8800"
            d="M0 0h21.491v203.7a2 2 0 01-2 2H2a2 2 0 01-2-2V0z"
            transform={
              "translate(338.065 673.689) scale(1," +
              (eng2SET < 0 ? Math.abs(eng2SET) : 0) +
              ")"
            }
            style={{
              transformOrigin: "top",
              transformBox: "fill-box",
            }}
          ></path>
          <g filter="url(#eng_avt_area_P)" transform="translate(39 91.89)">
            <g id="eng_avt_area_P-2" fill="#404040" data-name="eng_avt_area_P">
              <path
                d="M74.811 57.254L1 51.986V2.584l73.811-4.53 75.016 4.531v49.4l-75.016 5.27z"
                transform="translate(60.17 529.66)"
              ></path>
              <path
                fill="#707070"
                d="M74.812-.945L2 3.525v47.53l72.812 5.197 74.015-5.2V3.528L74.812-.945m-.001-2.004l76.016 4.593v51.273l-76.016 5.34L0 52.917V1.644L74.81-2.95z"
                transform="translate(60.17 529.66)"
              ></path>
            </g>
          </g>
          <g filter="url(#eng_avt_area_S)" transform="translate(39 91.89)">
            <g id="eng_avt_area_S-2" fill="#404040" data-name="eng_avt_area_S">
              <path
                d="M74.811 57.254L1 51.986V2.584l73.811-4.53 75.016 4.531v49.4l-75.016 5.27z"
                transform="translate(291 529.66)"
              ></path>
              <path
                fill="#707070"
                d="M74.812-.945L2 3.525v47.53l72.812 5.197 74.015-5.2V3.528L74.812-.945m-.001-2.004l76.016 4.593v51.273l-76.016 5.34L0 52.917V1.644L74.81-2.95z"
                transform="translate(291 529.66)"
              ></path>
            </g>
          </g>
          <text
            id="engACT_P"
            fill="#fff"
            fontFamily="Roboto"
            fontSize="53"
            transform="translate(103.173 668.607)"
          >
            <tspan x="73" y="0" textAnchor="middle">
              {props.eng1ACT * 100}%
            </tspan>
          </text>
          <text
            id="engACT_S"
            fill="#fff"
            fontFamily="Roboto"
            fontSize="53"
            transform="translate(334 668.607)"
          >
            <tspan x="73" y="0" textAnchor="middle">
              {props.eng2ACT * 100}%
            </tspan>
          </text>
          <g
            id="eng_power_level_text"
            fill="#3bf"
            fontFamily="Roboto"
            fontSize="18"
          >
            <text
              id="_80_"
              data-name="80%"
              transform="translate(68.738 463.615)"
            >
              <tspan x="0" y="0">
                80%
              </tspan>
            </text>
            <text
              id="_80_2"
              data-name="80%"
              transform="translate(479.539 462.905)"
            >
              <tspan x="0" y="0">
                80%
              </tspan>
            </text>
            <text
              id="_80_3"
              data-name="80%"
              transform="translate(68.738 844.476)"
            >
              <tspan x="0" y="0">
                80%
              </tspan>
            </text>
            <text
              id="_80_4"
              data-name="80%"
              transform="translate(479.539 843.766)"
            >
              <tspan x="0" y="0">
                80%
              </tspan>
            </text>
            <text
              id="_60_"
              data-name="60%"
              transform="translate(68.738 504.633)"
            >
              <tspan x="0" y="0">
                60%
              </tspan>
            </text>
            <text
              id="_60_2"
              data-name="60%"
              transform="translate(479.539 503.922)"
            >
              <tspan x="0" y="0">
                60%
              </tspan>
            </text>
            <text
              id="_60_3"
              data-name="60%"
              transform="translate(68.738 803.857)"
            >
              <tspan x="0" y="0">
                60%
              </tspan>
            </text>
            <text
              id="_60_4"
              data-name="60%"
              transform="translate(479.539 803.147)"
            >
              <tspan x="0" y="0">
                60%
              </tspan>
            </text>
            <text
              id="_40_"
              data-name="40%"
              transform="translate(68.738 546.643)"
            >
              <tspan x="0" y="0">
                40%
              </tspan>
            </text>
            <text
              id="_40_2"
              data-name="40%"
              transform="translate(479.539 545.933)"
            >
              <tspan x="0" y="0">
                40%
              </tspan>
            </text>
            <text
              id="_40_3"
              data-name="40%"
              transform="translate(68.738 761.777)"
            >
              <tspan x="0" y="0">
                40%
              </tspan>
            </text>
            <text
              id="_40_4"
              data-name="40%"
              transform="translate(479.539 761.067)"
            >
              <tspan x="0" y="0">
                40%
              </tspan>
            </text>
            <text
              id="_20_"
              data-name="20%"
              transform="translate(68.738 587.261)"
            >
              <tspan x="0" y="0">
                20%
              </tspan>
            </text>
            <text
              id="_20_2"
              data-name="20%"
              transform="translate(479.539 586.551)"
            >
              <tspan x="0" y="0">
                20%
              </tspan>
            </text>
            <text
              id="_20_3"
              data-name="20%"
              transform="translate(68.738 721.159)"
            >
              <tspan x="0" y="0">
                20%
              </tspan>
            </text>
            <text
              id="_20_4"
              data-name="20%"
              transform="translate(479.539 720.449)"
            >
              <tspan x="0" y="0">
                20%
              </tspan>
            </text>
          </g>
          <g filter="url(#eng_set_area_P)" transform="translate(39 91.89)">
            <g id="eng_set_area_P-2" fill="#ec8800" data-name="eng_set_area_P">
              <path
                d="M24.37 22.361L1.095 20.335l-.09-17.714 23.237-1.615 23.661 1.762.092 17.712-23.627 1.881z"
                transform="translate(110.67 512.45)"
              ></path>
              <path
                fill="#bf730a"
                d="M24.24 2.009L2.01 3.554l.082 15.864 22.281 1.94 22.618-1.8-.082-15.861L24.24 2.009m.005-2.005L48.9 1.84l.1 19.563-24.634 1.962L.1 21.252.001 1.69 24.244.004z"
                transform="translate(110.67 512.45)"
              ></path>
            </g>
          </g>
          <g filter="url(#eng_set_area_S)" transform="translate(39 91.89)">
            <g id="eng_set_area_S-2" fill="#ec8800" data-name="eng_set_area_S">
              <path
                d="M24.37 22.361L1.095 20.335l-.09-17.714 23.237-1.615 23.661 1.762.092 17.712-23.627 1.881z"
                transform="translate(341.5 512.45)"
              ></path>
              <path
                fill="#bf730a"
                d="M24.24 2.009L2.01 3.554l.082 15.864 22.281 1.94 22.618-1.8-.082-15.861L24.24 2.009m.005-2.005L48.9 1.84l.1 19.563-24.634 1.962L.1 21.252.001 1.69 24.244.004z"
                transform="translate(341.5 512.45)"
              ></path>
            </g>
          </g>
          <text
            id="engSET_P"
            fill="#fff"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="16"
            transform="translate(154.673 622.033)"
          >
            <tspan x="16" y="0" textAnchor="middle">
              {props.eng1SET * 100}
            </tspan>
            <tspan x="32" y="0" fontSize="13">
              %
            </tspan>
          </text>
          <text
            id="engSET_S"
            fill="#fff"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="16"
            transform="translate(384.5 622.033)"
          >
            <tspan x="16" y="0" textAnchor="middle">
              {props.eng2SET * 100}
            </tspan>
            <tspan x="32" y="0" fontSize="13">
              %
            </tspan>
          </text>
          <g
            id="power_lines"
            fill="none"
            stroke="rgba(64,74,80,0.75)"
            strokeLinecap="round"
            strokeWidth="1"
          >
            <path
              id="Path_146"
              d="M111.673 458.615h125"
              data-name="Path 146"
            ></path>
            <path
              id="Path_164"
              d="M342.5 458.615h125"
              data-name="Path 164"
            ></path>
            <path
              id="Path_154"
              d="M111.834 715.83h125"
              data-name="Path 154"
            ></path>
            <path
              id="Path_158"
              d="M342.661 715.83h125"
              data-name="Path 158"
            ></path>
            <path
              id="Path_147"
              d="M110.012 499.633h125"
              data-name="Path 147"
            ></path>
            <path
              id="Path_163"
              d="M340.839 499.633h125"
              data-name="Path 163"
            ></path>
            <path
              id="Path_153"
              d="M112.173 756.847h125"
              data-name="Path 153"
            ></path>
            <path
              id="Path_157"
              d="M343 756.847h125"
              data-name="Path 157"
            ></path>
            <path
              id="Path_148"
              d="M110.012 541.643h125"
              data-name="Path 148"
            ></path>
            <path
              id="Path_162"
              d="M340.839 541.643h125"
              data-name="Path 162"
            ></path>
            <path
              id="Path_152"
              d="M112.173 798.857h125"
              data-name="Path 152"
            ></path>
            <path
              id="Path_156"
              d="M343 798.857h125"
              data-name="Path 156"
            ></path>
            <path
              id="Path_149"
              d="M110.012 582.261h125"
              data-name="Path 149"
            ></path>
            <path
              id="Path_161"
              d="M340.839 582.261h125"
              data-name="Path 161"
            ></path>
            <path
              id="Path_151"
              d="M112.173 839.476h125"
              data-name="Path 151"
            ></path>
            <path
              id="Path_155"
              d="M343 839.476h125"
              data-name="Path 155"
            ></path>
          </g>
        </g>
        <g id="BowThrusters" transform="translate(-3.007 4)">
          <g
            id="power_levels_text"
            fill="#3bf"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="14"
          >
            <text id="_60_5" data-name="60%" transform="translate(414.77 331)">
              <tspan x="0" y="0">
                60%
              </tspan>
            </text>
            <text id="_40_5" data-name="40%" transform="translate(185.272 331)">
              <tspan x="0" y="0">
                40%
              </tspan>
            </text>
            <text id="_80_5" data-name="80%" transform="translate(447.828 331)">
              <tspan x="0" y="0">
                80%
              </tspan>
            </text>
            <text id="_20_5" data-name="20%" transform="translate(217.949 331)">
              <tspan x="0" y="0">
                20%
              </tspan>
            </text>
            <text id="_40_6" data-name="40%" transform="translate(382.984 331)">
              <tspan x="0" y="0">
                40%
              </tspan>
            </text>
            <text id="_60_6" data-name="60%" transform="translate(152.595 331)">
              <tspan x="0" y="0">
                60%
              </tspan>
            </text>
            <text id="_20_6" data-name="20%" transform="translate(349.926 331)">
              <tspan x="0" y="0">
                20%
              </tspan>
            </text>
            <text id="_80_6" data-name="80%" transform="translate(120.148 331)">
              <tspan x="0" y="0">
                80%
              </tspan>
            </text>
          </g>
          <rect
            id="bow1_area"
            width="42"
            height="394.42"
            fill="rgba(255,255,255,0.77)"
            rx="2"
            transform="rotate(90 108.347 381.08)"
          ></rect>
          <rect
            id="bow2_area"
            width="42"
            height="394.42"
            fill="rgba(255,255,255,0.77)"
            rx="2"
            transform="rotate(90 76.238 413.972)"
          ></rect>
          <rect
            id="bow1_powerS"
            width="163.299"
            height="42"
            fill="#1fb948"
            rx="2"
            transform={
              "translate(326.128 272.734) scale(" +
              (props.bow1ACT > 0 ? Math.abs(props.bow1ACT) : 0) +
              ", 1)"
            }
            style={{
              transformOrigin: "left",
              transformBox: "fill-box",
            }}
          ></rect>
          <rect
            id="bow2_powerS"
            width="163.299"
            height="42"
            fill="#1fb948"
            rx="2"
            transform={
              "translate(326.911 337.734) scale(" +
              (props.bow2ACT > 0 ? Math.abs(props.bow2ACT) : 0) +
              ", 1)"
            }
            style={{
              transformOrigin: "left",
              transformBox: "fill-box",
            }}
          ></rect>
          <rect
            id="bow1_powerP"
            width="163.299"
            height="42"
            fill="#e93629"
            rx="2"
            transform={
              "translate(95.007 272.741) scale(" +
              (props.bow1ACT < 0 ? Math.abs(props.bow1ACT) : 0) +
              ", 1)"
            }
            style={{
              transformOrigin: "right",
              transformBox: "fill-box",
            }}
          ></rect>
          <rect
            id="bow2_powerP"
            width="163.299"
            height="42"
            fill="#e93629"
            rx="2"
            transform={
              "translate(95.79 337.741) scale(" +
              (props.bow2ACT < 0 ? Math.abs(props.bow2ACT) : 0) +
              ", 1)"
            }
            style={{
              transformOrigin: "right",
              transformBox: "fill-box",
            }}
          ></rect>
          <g
            id="BowPowerLineMakrings"
            fill="none"
            stroke="rgba(64,74,80,0.75)"
            strokeLinecap="round"
            strokeWidth="1"
          >
            <path
              id="Path_110"
              d="M391.427 312.741v-38"
              data-name="Path 110"
            ></path>
            <path
              id="Path_137"
              d="M392.21 377.5v-38"
              data-name="Path 137"
            ></path>
            <path
              id="Path_132"
              d="M161.386 312.67v-38"
              data-name="Path 132"
            ></path>
            <path
              id="Path_143"
              d="M162.169 377.5v-38"
              data-name="Path 143"
            ></path>
            <path
              id="Path_129"
              d="M423.427 312.741v-38"
              data-name="Path 129"
            ></path>
            <path
              id="Path_136"
              d="M424.21 377.5v-38"
              data-name="Path 136"
            ></path>
            <path
              id="Path_133"
              d="M193.386 312.67v-38"
              data-name="Path 133"
            ></path>
            <path
              id="Path_142"
              d="M194.169 377.5v-38"
              data-name="Path 142"
            ></path>
            <path
              id="Path_130"
              d="M456.427 312.67v-38"
              data-name="Path 130"
            ></path>
            <path
              id="Path_135"
              d="M457.21 377.5v-38"
              data-name="Path 135"
            ></path>
            <path
              id="Path_134"
              d="M226.386 312.598v-38"
              data-name="Path 134"
            ></path>
            <path
              id="Path_141"
              d="M227.169 377.5v-38"
              data-name="Path 141"
            ></path>
            <path
              id="Path_109"
              d="M358.614 312.67l.014-38"
              data-name="Path 109"
            ></path>
            <path
              id="Path_138"
              d="M359.397 377.5l.014-38"
              data-name="Path 138"
            ></path>
            <path
              id="Path_131"
              d="M128.573 312.598l.014-38"
              data-name="Path 131"
            ></path>
            <path
              id="Path_144"
              d="M129.356 377.5l.014-38"
              data-name="Path 144"
            ></path>
          </g>
          <rect
            id="bow1_setLineS"
            width="162.517"
            height="7.259"
            fill="#ec8800"
            rx="1"
            transform={
              "translate(326.911 272.741) scale(" +
              (props.bow1SET > 0 ? Math.abs(props.bow1SET) : 0) +
              ",1)"
            }
            style={{
              transformOrigin: "left",
              transformBox: "fill-box",
            }}
          ></rect>
          <rect
            id="bow2_setLineS"
            width="163.299"
            height="7.266"
            fill="#ec8800"
            rx="1"
            transform={
              "translate(326.911 337.734) scale(" +
              (props.bow2SET > 0 ? Math.abs(props.bow2SET) : 0) +
              ",1)"
            }
            style={{
              transformOrigin: "left",
              transformBox: "fill-box",
            }}
          ></rect>
          <rect
            id="bow1_setLineP"
            width="163.299"
            height="7.259"
            fill="#ec8800"
            rx="1"
            transform={
              "translate(95.007 272.741) scale(" +
              (props.bow1SET < 0 ? Math.abs(props.bow1SET) : 0) +
              ",1)"
            }
            style={{
              transformOrigin: "right",
              transformBox: "fill-box",
            }}
          ></rect>
          <rect
            id="bow2_setLineP"
            width="162.517"
            height="7.266"
            fill="#ec8800"
            rx="1"
            transform={
              "translate(95.79 337.734) scale(" +
              (props.bow2SET < 0 ? Math.abs(props.bow2SET) : 0) +
              ",1)"
            }
            style={{
              transformOrigin: "right",
              transformBox: "fill-box",
            }}
          ></rect>
          <g filter="url(#bow1_actBox)" transform="translate(42.01 87.89)">
            <g id="bow1_actBox-2" fill="#404040" data-name="bow1_actBox">
              <path
                d="M24.361 81.392L1 74.497V6.987l23.361-5.956 23.75 5.959v67.504l-23.75 6.898z"
                transform="rotate(90 55.215 236.215)"
              ></path>
              <path
                fill="#707070"
                d="M24.363 2.063L2 7.764V73.75l22.363 6.6 22.748-6.607V7.77L24.363 2.063M24.359 0l24.752 6.21v69.035l-24.752 7.19L0 75.244V6.21L24.359 0z"
                transform="rotate(90 55.215 236.215)"
              ></path>
            </g>
          </g>
          <g filter="url(#bow2_actBox)" transform="translate(42.01 87.89)">
            <g id="bow2_actBox-2" fill="#404040" data-name="bow2_actBox">
              <path
                d="M24.361 81.392L1 74.497V6.987l23.361-5.956 23.75 5.959v67.504l-23.75 6.898z"
                transform="rotate(90 23.105 269.105)"
              ></path>
              <path
                fill="#707070"
                d="M24.363 2.063L2 7.764V73.75l22.363 6.6 22.748-6.607V7.77L24.363 2.063M24.359 0l24.752 6.21v69.035l-24.752 7.19L0 75.244V6.21L24.359 0z"
                transform="rotate(90 23.105 269.105)"
              ></path>
            </g>
          </g>
          <text
            id="bow1_ACT"
            fill="#fff"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="29"
            transform="translate(259 308)"
            textAnchor="middle"
          >
            <tspan x="25" y="0">
              {Math.abs(props.bow1ACT * 100)}
            </tspan>
            <tspan x="58" y="0" fontSize="24">
              %
            </tspan>
          </text>
          <text
            id="bow2_ACT"
            fill="#fff"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="29"
            transform="translate(259.783 373)"
            textAnchor="middle"
          >
            <tspan x="25" y="0">
              {Math.abs(props.bow2ACT * 100)}
            </tspan>
            <tspan x="58" y="0" fontSize="24">
              %
            </tspan>
          </text>
          <g filter="url(#bow1_box)" transform="translate(42.01 87.89)">
            <g id="bow1_box-2" fill="#ec8800" data-name="bow1_box">
              <path
                d="M23.924 21.354l-22.83-1.937L1.005 2.55 23.8 1.006 47.01 2.691l.09 16.865-23.176 1.798z"
                transform="translate(225.99 171.59)"
              ></path>
              <path
                fill="#bf730a"
                d="M23.797 2.009L2.01 3.484l.08 15.014 21.837 1.853 22.167-1.72-.08-15.01L23.798 2.01m.005-2.005L48.005 1.76l.1 18.72-24.185 1.877L.1 20.337 0 1.615 23.802.004z"
                transform="translate(225.99 171.59)"
              ></path>
            </g>
          </g>
          <g filter="url(#bow2_box)" transform="translate(42.01 87.89)">
            <g id="bow2_box-2" fill="#ec8800" data-name="bow2_box">
              <path
                d="M23.924 21.354l-22.83-1.937L1.005 2.55 23.8 1.006 47.01 2.691l.09 16.865-23.176 1.798z"
                transform="translate(226.78 236.59)"
              ></path>
              <path
                fill="#bf730a"
                d="M23.797 2.009L2.01 3.484l.08 15.014 21.837 1.853 22.167-1.72-.08-15.01L23.798 2.01m.005-2.005L48.005 1.76l.1 18.72-24.185 1.877L.1 20.337 0 1.615 23.802.004z"
                transform="translate(226.78 236.59)"
              ></path>
            </g>
          </g>
          <text
            id="bow1_SET"
            fill="#fff"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="16"
            transform="translate(275 276.163)"
            textAnchor="middle"
          >
            <tspan x="14" y="0">
              {Math.abs(props.bow1SET * 100)}
            </tspan>
            <tspan x="34" y="0" fontSize="13">
              %
            </tspan>
          </text>
          <text
            id="bow2_SET"
            fill="#fff"
            fontFamily="Roboto-Regular, Roboto"
            fontSize="16"
            transform="translate(275.783 341.163)"
            textAnchor="middle"
          >
            <tspan x="14" y="0">
              {Math.abs(props.bow2SET * 100)}
            </tspan>
            <tspan x="34" y="0" fontSize="13">
              %
            </tspan>
          </text>
        </g>
      </g>
    </svg>
  );
}
