import React from "react";
import BearingRateTarget from "./BearingRateTarget";

/**
 * 
 * @param {object} targetList { relBearings: length equals to time interval}  
 * @returns 
 */
function AppBearingRate({
  targetList,
  updateFrequencyMIN,
  maxTimeMIN,
  rangeSETlong,
  rangeSETshort,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1534"
      height="1065"
      viewBox="0 0 1534 1065"
      style={{ width: "100%" }}
    >
      {/* Blur */}
      <defs>
        <filter
          id="_0"
          width="47"
          height="84"
          x="744"
          y="0"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="_0-2"
          width="47"
          height="84"
          x="744"
          y="981"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-2" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-2" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="_90"
          width="69"
          height="76"
          x="1089"
          y="8"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-3" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-3" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="_90-2"
          width="69"
          height="76"
          x="1093"
          y="981"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-4" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-4" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="_45"
          width="59"
          height="64"
          x="918"
          y="20"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-5" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-5" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="_45-2"
          width="59"
          height="64"
          x="919"
          y="981"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-6" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-6" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="_135"
          width="79"
          height="64"
          x="1268"
          y="20"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-7" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-7" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="_135-2"
          width="79"
          height="64"
          x="1268"
          y="981"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-8" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-8" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="_45-3"
          width="59"
          height="64"
          x="558"
          y="20"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-9" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-9" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="_45-4"
          width="59"
          height="64"
          x="558"
          y="981"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-10" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-10" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="_135-3"
          width="79"
          height="64"
          x="189"
          y="20"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-11" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-11" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="_135-4"
          width="79"
          height="64"
          x="189"
          y="981"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-12" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-12" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="_180"
          width="94"
          height="76"
          x="1440"
          y="8"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-13" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-13" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="_180-2"
          width="94"
          height="76"
          x="1440"
          y="981"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-14" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-14" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="_180-3"
          width="94"
          height="76"
          x="0"
          y="8"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-15" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-15" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="_180-4"
          width="94"
          height="76"
          x="0"
          y="981"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-16" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-16" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="_90-3"
          width="69"
          height="76"
          x="373"
          y="8"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-17" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-17" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="_90-4"
          width="69"
          height="76"
          x="373"
          y="981"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-18" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-18" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="_112.5"
          width="65"
          height="42"
          x="1185"
          y="42"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-19" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-19" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="_112.5-2"
          width="65"
          height="42"
          x="1185"
          y="981"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-20" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-20" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="_112.5-3"
          width="65"
          height="42"
          x="284"
          y="36"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-21" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-21" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="_112.5-4"
          width="65"
          height="42"
          x="286"
          y="981"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-22" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-22" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="rectangle"
          width="126"
          height="121"
          x="704"
          y="78"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-23" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-23" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="text"
          width="116"
          height="109"
          x="709"
          y="84"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-24" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-24" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="tg-path"
          width="24"
          height="534.792"
          x="755"
          y="178"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-25" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-25" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
      </defs>

      <g id="BearingRateGraph" transform="translate(-193 -11)">


          
        <g id="range">
          <path
            id="range-top"
            fill="#ec8800"
            d="M0 0H1440V2H0z"
            transform="translate(240.5 95)"
          />

          <path
            id="range-mid"
            fill="rgba(236,136,0,0.25)"
            d="M0 0H1440V100H0z"
            transform={
              "translate(240.5 95) scale(1," +
              rangeSETshort / rangeSETlong +
              ")"
            }
            style={{
              transformOrigin: "top",
              transformBox: "fill-box",
            }}
          />

          <path
            id="range-low"
            fill="rgba(236,136,0,0.1)"
            d="M0 0H1440V100H0z"
            transform="translate(240.5 95) scale(1,1)"
            style={{
              transformOrigin: "top",
              transformBox: "fill-box",
            }}
          />

          <text
            id="distance-short"
            fill="rgba(236,136,0,0.75)"
            fontFamily="Roboto-Bold, Roboto"
            fontSize="22"
            fontWeight="700"
            transform="translate(1605 120)"
          >
            <tspan x="70" y="0" textAnchor="end">
              {rangeSETshort.toFixed(1) + " nm"}
            </tspan>
          </text>
          <text
            id="distance-long"
            fill="rgba(236,136,0,0.5)"
            fontFamily="Roboto-Bold, Roboto"
            fontSize="22"
            fontWeight="700"
            transform="translate(1592 189)"
          >
            <tspan x="80" y="0" textAnchor="end">
              {rangeSETlong.toFixed(1) + " nm"}
            </tspan>
          </text>
        </g>

        <g id="time-scale" fill="none" stroke="#707070">
          <path
            id="time-line-3"
            strokeDasharray="4"
            strokeWidth="2"
            d="M0 0L1440 0"
            transform="translate(240.5 797)"
          ></path>
          <path
            id="time-line-2"
            strokeDasharray="4"
            strokeWidth="2"
            d="M0 0L1440 0"
            transform="translate(240 597)"
          ></path>
          <path
            id="time-line-1"
            strokeDasharray="4"
            strokeWidth="2"
            d="M0 0L1440 0"
            transform="translate(240 397)"
          ></path>
          <path
            id="time-line-top"
            strokeWidth="4"
            d="M0 0L1440 2"
            transform="translate(240 195)"
          ></path>
        </g>

        <g id="bearing">
          <g id="bearing-numbers">
            <g filter="url(#_0)" transform="translate(193 11)">
              <text
                id="_0-3"
                fill="#fff"
                data-name="0"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="50"
                fontWeight="700"
                transform="translate(753 58)"
              >
                <tspan x="0" y="0">
                  0
                </tspan>
              </text>
            </g>
            <g filter="url(#_0-2)" transform="translate(193 11)">
              <text
                id="_0-4"
                fill="#fff"
                data-name="0"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="50"
                fontWeight="700"
                transform="translate(753 1039)"
              >
                <tspan x="0" y="0">
                  0
                </tspan>
              </text>
            </g>
            <g filter="url(#_90)" transform="translate(193 11)">
              <text
                id="_90-5"
                fill="#1fb948"
                data-name="90"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="44"
                fontWeight="700"
                transform="translate(1098 60)"
              >
                <tspan x="0" y="0">
                  90
                </tspan>
              </text>
            </g>
            <g filter="url(#_90-2)" transform="translate(193 11)">
              <text
                id="_90-6"
                fill="#1fb948"
                data-name="90"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="44"
                fontWeight="700"
                transform="translate(1102 1033)"
              >
                <tspan x="0" y="0">
                  90
                </tspan>
              </text>
            </g>
            <g filter="url(#_45)" transform="translate(193 11)">
              <text
                id="_45-5"
                fill="#1fb948"
                data-name="45"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="35"
                fontWeight="700"
                transform="translate(927 63)"
              >
                <tspan x="0" y="0">
                  45
                </tspan>
              </text>
            </g>
            <g filter="url(#_45-2)" transform="translate(193 11)">
              <text
                id="_45-6"
                fill="#1fb948"
                data-name="45"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="35"
                fontWeight="700"
                transform="translate(928 1024)"
              >
                <tspan x="0" y="0">
                  45
                </tspan>
              </text>
            </g>
            <g filter="url(#_135)" transform="translate(193 11)">
              <text
                id="_135-5"
                fill="#1fb948"
                data-name="135"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="35"
                fontWeight="700"
                transform="translate(1277 63)"
              >
                <tspan x="0" y="0">
                  135
                </tspan>
              </text>
            </g>
            <g filter="url(#_135-2)" transform="translate(193 11)">
              <text
                id="_135-6"
                fill="#1fb948"
                data-name="135"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="35"
                fontWeight="700"
                transform="translate(1277 1024)"
              >
                <tspan x="0" y="0">
                  135
                </tspan>
              </text>
            </g>
            <g filter="url(#_45-3)" transform="translate(193 11)">
              <text
                id="_45-7"
                fill="#e93629"
                data-name="45"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="35"
                fontWeight="700"
                transform="translate(567 63)"
              >
                <tspan x="0" y="0">
                  45
                </tspan>
              </text>
            </g>
            <g filter="url(#_45-4)" transform="translate(193 11)">
              <text
                id="_45-8"
                fill="#e93629"
                data-name="45"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="35"
                fontWeight="700"
                transform="translate(567 1024)"
              >
                <tspan x="0" y="0">
                  45
                </tspan>
              </text>
            </g>
            <g filter="url(#_135-3)" transform="translate(193 11)">
              <text
                id="_135-7"
                fill="#e93629"
                data-name="135"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="35"
                fontWeight="700"
                transform="translate(198 63)"
              >
                <tspan x="0" y="0">
                  135
                </tspan>
              </text>
            </g>
            <g filter="url(#_135-4)" transform="translate(193 11)">
              <text
                id="_135-8"
                fill="#e93629"
                data-name="135"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="35"
                fontWeight="700"
                transform="translate(198 1024)"
              >
                <tspan x="0" y="0">
                  135
                </tspan>
              </text>
            </g>
            <g filter="url(#_180)" transform="translate(193 11)">
              <text
                id="_180-5"
                fill="#1fb948"
                data-name="180"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="44"
                fontWeight="700"
                transform="translate(1449 60)"
              >
                <tspan x="0" y="0">
                  180
                </tspan>
              </text>
            </g>
            <g filter="url(#_180-2)" transform="translate(193 11)">
              <text
                id="_180-6"
                fill="#1fb948"
                data-name="180"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="44"
                fontWeight="700"
                transform="translate(1449 1033)"
              >
                <tspan x="0" y="0">
                  180
                </tspan>
              </text>
            </g>
            <g filter="url(#_180-3)" transform="translate(193 11)">
              <text
                id="_180-7"
                fill="#e93629"
                data-name="180"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="44"
                fontWeight="700"
                transform="translate(9 60)"
              >
                <tspan x="0" y="0">
                  180
                </tspan>
              </text>
            </g>
            <g filter="url(#_180-4)" transform="translate(193 11)">
              <text
                id="_180-8"
                fill="#e93629"
                data-name="180"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="44"
                fontWeight="700"
                transform="translate(9 1033)"
              >
                <tspan x="0" y="0">
                  180
                </tspan>
              </text>
            </g>
            <g filter="url(#_90-3)" transform="translate(193 11)">
              <text
                id="_90-7"
                fill="#e93629"
                data-name="90"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="44"
                fontWeight="700"
                transform="translate(382 60)"
              >
                <tspan x="0" y="0">
                  90
                </tspan>
              </text>
            </g>
            <g filter="url(#_90-4)" transform="translate(193 11)">
              <text
                id="_90-8"
                fill="#e93629"
                data-name="90"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="44"
                fontWeight="700"
                transform="translate(382 1033)"
              >
                <tspan x="0" y="0">
                  90
                </tspan>
              </text>
            </g>
            <g filter="url(#_112.5)" transform="translate(193 11)">
              <text
                id="_112.5-5"
                fill="#1fb948"
                data-name="112.5"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="18"
                fontWeight="700"
                transform="translate(1194 67)"
              >
                <tspan x="0" y="0">
                  112.5
                </tspan>
              </text>
            </g>
            <g filter="url(#_112.5-2)" transform="translate(193 11)">
              <text
                id="_112.5-6"
                fill="#1fb948"
                data-name="112.5"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="18"
                fontWeight="700"
                transform="translate(1194 1006)"
              >
                <tspan x="0" y="0">
                  112.5
                </tspan>
              </text>
            </g>
            <g filter="url(#_112.5-3)" transform="translate(193 11)">
              <text
                id="_112.5-7"
                fill="#e93629"
                data-name="112.5"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="18"
                fontWeight="700"
                transform="translate(293 61)"
              >
                <tspan x="0" y="0">
                  112.5
                </tspan>
              </text>
            </g>
            <g filter="url(#_112.5-4)" transform="translate(193 11)">
              <text
                id="_112.5-8"
                fill="#e93629"
                data-name="112.5"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="18"
                fontWeight="700"
                transform="translate(295 1006)"
              >
                <tspan x="0" y="0">
                  112.5
                </tspan>
              </text>
            </g>
          </g>
          <g id="bearing-line" fill="none" strokeLinecap="round">
            <path
              id="Line_459"
              stroke="#707070"
              strokeWidth="3"
              d="M0 0L0 915.5"
              data-name="Line 459"
              transform="translate(960.5 82.5)"
            ></path>
            <path
              id="Line_460"
              stroke="#707070"
              strokeWidth="2"
              d="M0 0L0 915.5"
              data-name="Line 460"
              transform="translate(1320 82.5)"
            ></path>
            <path
              id="Line_461"
              stroke="#707070"
              strokeWidth="4"
              d="M0 0L0 915.5"
              data-name="Line 461"
              transform="translate(1680 82.5)"
            ></path>
            <path
              id="Line_463"
              stroke="rgba(0,218,51,0.8)"
              strokeWidth="1"
              d="M0 0L0 915.5"
              data-name="Line 463"
              transform="translate(1410 82.5)"
            ></path>
            <path
              id="Line_454"
              stroke="#707070"
              strokeWidth="4"
              d="M0 0L0 915.5"
              data-name="Line 454"
              transform="translate(240 82.5)"
            ></path>
            <path
              id="Line_458"
              stroke="#707070"
              strokeWidth="2"
              d="M0 0L0 915.5"
              data-name="Line 458"
              transform="translate(600.5 82.5)"
            ></path>
            <path
              id="Line_465"
              stroke="#707070"
              strokeWidth="1"
              d="M7 0L0 915.5"
              data-name="Line 465"
              transform="translate(414.5 82.5)"
            ></path>
            <path
              id="Line_467"
              stroke="#707070"
              strokeWidth="1"
              d="M0 0L0 915.5"
              data-name="Line 467"
              transform="translate(780 82.5)"
            ></path>
            <path
              id="Line_468"
              stroke="#707070"
              strokeWidth="1"
              d="M0 0L0 915.5"
              data-name="Line 468"
              transform="translate(1140.5 82.5)"
            ></path>
            <path
              id="Line_469"
              stroke="#707070"
              strokeWidth="1"
              d="M0 0L0 915.5"
              data-name="Line 469"
              transform="translate(1500 82.5)"
            ></path>
            <path
              id="Path_315"
              stroke="rgba(233,54,41,0.8)"
              strokeWidth="2"
              d="M511 82.5V998"
              data-name="Path 315"
            ></path>
          </g>
        </g>

        <g
          id="time-labels"
          fill="rgba(255,255,255,0.7)"
          fontFamily="Roboto-Regular, Roboto"
          fontSize="28"
        >
          <text id="Now" transform="translate(249 227)">
            <tspan x="0" y="0">
              Now
            </tspan>
          </text>

          <text
            id="time-top"
            data-name="5 min"
            transform="translate(249 427.5)"
          >
            <tspan x="0" y="0">
              {(maxTimeMIN / 4).toFixed(1) + " min"}
            </tspan>
          </text>

          <text
            id="time-mid"
            data-name="10 min"
            transform="translate(249 627.5)"
          >
            <tspan x="0" y="0">
              {(maxTimeMIN / 2).toFixed(1) + " min"}
            </tspan>
          </text>

          <text
            id="time-bottom"
            data-name="15 min"
            transform="translate(251.5 828.5)"
          >
            <tspan x="0" y="0">
              {((maxTimeMIN / 4) * 3).toFixed(1) + " min"}
            </tspan>
          </text>
        </g>

        {targetList.map((obj, index) => {
          return <BearingRateTarget key={index+"target"} obj={obj} updateFrequencyMIN={updateFrequencyMIN} maxTimeMIN={maxTimeMIN} rangeSETlong={rangeSETlong} />;
        })}
      </g>
    </svg>
  );
}

export default AppBearingRate;
