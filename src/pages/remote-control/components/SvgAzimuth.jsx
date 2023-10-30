import React from "react"

/**
 * ## Azimuth controller (actual & set)
 *
 * SVG component
 *
 * @param {number} setEng (-100% to 100%)
 * @param {number} actEng (-100% to 100%)
 * @param {number} setAngle (-180° to 180°)
 * @param {number} actAngle (-180° to 180°)
 */
export default function SvgAzimuth({ setEng, actEng, setAngle, actAngle }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ height: "100%", width: "100%" }} fill="none" viewBox="0 0 495 493">
      <g id="azimtuh-tuch">
        <g id="watchface">
          <g id="frame">
            <g id="frame_2">
              <mask
                id="path-1-outside-1_20_2990"
                width="389"
                height="388"
                x="53.141"
                y="52.922"
                fill="#000"
                maskUnits="userSpaceOnUse"
              >
                <path fill="#fff" d="M53.141 52.922H442.141V440.922H53.141z"></path>
                <path
                  fillRule="evenodd"
                  d="M440.859 246.5c0 106.358-86.57 192.578-193.359 192.578-106.789 0-193.36-86.22-193.36-192.578S140.712 53.922 247.5 53.922c106.789 0 193.359 86.22 193.359 192.578zM247.5 415.969c93.975 0 170.156-75.874 170.156-169.469S341.475 77.031 247.5 77.031c-93.975 0-170.156 75.874-170.156 169.469S153.525 415.969 247.5 415.969z"
                  clipRule="evenodd"
                ></path>
              </mask>
              <path
                fill="#fff"
                fillRule="evenodd"
                d="M440.859 246.5c0 106.358-86.57 192.578-193.359 192.578-106.789 0-193.36-86.22-193.36-192.578S140.712 53.922 247.5 53.922c106.789 0 193.359 86.22 193.359 192.578zM247.5 415.969c93.975 0 170.156-75.874 170.156-169.469S341.475 77.031 247.5 77.031c-93.975 0-170.156 75.874-170.156 169.469S153.525 415.969 247.5 415.969z"
                clipRule="evenodd"
              ></path>
              <path
                fillRule="evenodd"
                stroke="#D9D9D9"
                strokeWidth="2"
                d="M440.859 246.5c0 106.358-86.57 192.578-193.359 192.578-106.789 0-193.36-86.22-193.36-192.578S140.712 53.922 247.5 53.922c106.789 0 193.359 86.22 193.359 192.578zM247.5 415.969c93.975 0 170.156-75.874 170.156-169.469S341.475 77.031 247.5 77.031c-93.975 0-170.156 75.874-170.156 169.469S153.525 415.969 247.5 415.969z"
                clipRule="evenodd"
                mask="url(#path-1-outside-1_20_2990)"
              ></path>
            </g>
          </g>
          <g id="tertiary-tick-marks">
            <path
              id="tick-marks"
              stroke="#707070"
              d="M307.019 83.629l2.646-7.24m24.847 20.008l3.867-6.672m20.981 23.999l4.972-5.901m16.478 27.265l5.925-4.951m11.474 29.699l6.698-3.852m6.121 31.234l7.268-2.635m.584 31.817l7.616-1.338m-4.973 31.434h7.735m-10.378 30.098l7.617 1.337m-15.468 27.844l7.267 2.634m-20.087 24.746l6.698 3.851m-24.097 20.897l5.925 4.952m-27.375 16.411l4.972 5.901m-29.82 11.429l3.867 6.671m-31.359 6.097l2.645 7.238m-31.946.58l1.343 7.586m-31.562-4.953v7.703m-30.219-10.337l-1.343 7.586m-27.958-15.405l-2.645 7.239m-24.847-20.005l-3.867 6.671m-20.981-23.998l-4.972 5.901m-16.478-27.264l-5.925 4.952m-11.474-29.699l-6.698 3.851m-6.122-31.234l-7.267 2.635m-.584-31.817l-7.617 1.338m4.974-31.434h-7.735m10.378-30.095l-7.616-1.338m15.467-27.843l-7.267-2.635M96.79 159.84l-6.698-3.852m24.097-20.897l-5.925-4.951m27.375-16.411l-4.972-5.901m29.82-11.428l-3.867-6.67m31.359-6.098l-2.645-7.238m31.946-.58l-1.343-7.586M247.5 73.18v-7.703m30.219 10.332l1.343-7.586"
            ></path>
          </g>
          <g id="secondary-tick-marks">
            <path
              id="tick-marks_2"
              stroke="#D9D9D9"
              d="M247.5 419.82v15.407M73.477 246.5h-15.47M247.5 73.18V57.773M421.523 246.5h15.469"
            ></path>
          </g>
          <g id="primary-tick-marks" stroke="#707070">
            <path id="tick-marks_3" d="M247.5 73.18V53.922m0 385.156V419.82M421.523 246.5h19.336m-386.718 0h19.336"></path>
            <path id="top-line" d="M247.5 53.922v23.11"></path>
          </g>
          <g id="labels">
            <g id="90labels">
              <text
                id="0"
                fill="#737373"
                xmlSpace="preserve"
                style={{ whiteSpace: "pre" }}
                fontFamily="Roboto"
                fontSize="12"
                fontWeight="600"
                letterSpacing="0"
              >
                <tspan x="243.066" y="20.656">
                  0
                </tspan>
              </text>
              <text
                id="180"
                fill="#737373"
                xmlSpace="preserve"
                style={{ whiteSpace: "pre" }}
                fontFamily="Roboto"
                fontSize="12"
                fontWeight="600"
                letterSpacing="0"
              >
                <tspan x="237.496" y="469.437">
                  180
                </tspan>
              </text>
              <text
                id="90"
                fill="#737373"
                xmlSpace="preserve"
                style={{ whiteSpace: "pre" }}
                fontFamily="Roboto"
                fontSize="12"
                fontWeight="600"
                letterSpacing="0"
              >
                <tspan x="464.727" y="246.047">
                  90
                </tspan>
              </text>
              <text
                id="-90"
                fill="#737373"
                xmlSpace="preserve"
                style={{ whiteSpace: "pre" }}
                fontFamily="Roboto"
                fontSize="12"
                fontWeight="600"
                letterSpacing="0"
              >
                <tspan x="14.199" y="251.656">
                  -90
                </tspan>
              </text>
              <path
                id="Ellipse 24"
                fill="#D9D9D9"
                fillOpacity="0.35"
                d="M416.895 247c0 93.336-75.888 169-169.5 169s-169.5-75.664-169.5-169 75.888-169 169.5-169 169.5 75.664 169.5 169z"
              ></path>
              <g id="box-set-angle">
                <circle id="Center" cx="4" cy="4" r="4" fill="#325B9A" transform="matrix(1 0 -.00405 1 243 242.498)"></circle>
                <g
                  id="SET-ANGLE"
                  filter="url(#filter0_d_20_2990)"
                  transform={"rotate(" + setAngle + ")"}
                  style={{
                    transformOrigin: "center",
                  }}
                >
                  <g id="set-arrow-angle">
                    <path
                      id="Vector 10"
                      fill="#F69400"
                      d="M266.379 43.875L266.304 26a3.015 3.015 0 00-3.012-3H230.13a2.985 2.985 0 00-2.988 3l.075 17.803c.004.965.472 1.87 1.257 2.434L247.649 60l17.585-13.76a2.984 2.984 0 001.145-2.365z"
                    ></path>
                  </g>
                  <text
                    id="azimut-angel"
                    fill="#fff"
                    fontFamily="Roboto"
                    fontSize="13"
                    fontWeight="600"
                    letterSpacing="0"
                    transform="translate(230 26)"
                    xmlSpace="preserve"
                    style={{ whiteSpace: "pre" }}
                    textAnchor="middle"
                  >
                    <tspan x="18" y="13.044">
                      {setAngle}°
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
          </g>
        </g>
        <g id="ENG-center">
          <g
            style={{
              transformOrigin: "center",
            }}
            transform={"rotate(" + actAngle + ")"}
          >
            <path
              id="power_dir_arrow"
              fill="#274C85"
              d="M291.85 104.377a.5.5 0 01-.351.857l-87.989.309a.5.5 0 01-.351-.855l44.346-43.853 44.345 43.542z"
            ></path>
            <text
              id="power_act_text"
              fill="#fff"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="600"
              letterSpacing="0"
              transform="translate(226 85)"
              xmlSpace="preserve"
              style={{ whiteSpace: "pre" }}
              textAnchor="middle"
            >
              <tspan x="22.013" y="13.432">
                {actEng}%
              </tspan>
            </text>
          </g>

          <g
            id="thruster"
            transform={"rotate(" + setAngle + ")"}
            style={{
              transformOrigin: "center",
            }}
          >
            <g id="Eng-Element" filter="url(#filter1_d_20_2990)">
              <rect
                width="280.914"
                height="91.482"
                fill="#fff"
                rx="2"
                shapeRendering="crispEdges"
                transform="matrix(0 1 -1 .0035 293 105.058)"
              ></rect>
              <g id="Tickmarks" fill="#707070" fillRule="evenodd" clipPath="url(#clip0_20_2990)" clipRule="evenodd">
                <path
                  id="Subtract"
                  d="M220.87 105.311l-7.037.025v1l7.037-.025v-1zm52.778-.185v1l7.037-.025v-1l-7.037.025zm-52.778 14.185l-7.037.025v1l7.037-.025v-1zm52.778.815v-1l7.037-.025v1l-7.037.025zm-52.778 13.185l-7.037.025v1l7.037-.025v-1zm52.778.815v-1l7.037-.025v1l-7.037.025zm-52.778 13.185l-7.037.025v1l7.037-.025v-1zm52.778.815v-1l7.037-.025v1l-7.037.025zm-52.778 13.185l-7.037.025v1l7.037-.025v-1zm52.778.815v-1l7.037-.025v1l-7.037.025zm-52.778 13.185l-7.037.025v1l7.037-.025v-1zm52.778.815v-1l7.037-.025v1l-7.037.025zm-52.778 13.185l-7.037.025v1l7.037-.025v-1zm52.778.815v-1l7.037-.025v1l-7.037.025zm-52.778 13.185l-7.037.025v1l7.037-.025v-1zm52.778.815v-1l7.037-.025v1l-7.037.025zm-52.778 13.185l-7.037.025v1l7.037-.025v-1zm52.778.815v-1l7.037-.025v1l-7.037.025zm-52.778 13.185l-7.037.025v1l7.037-.025v-1zm52.778.815v-1l7.037-.025v1l-7.037.025zm-52.778 13.185l-7.037.025v1l7.037-.025v-1zm52.778.815v-1l7.037-.025v1l-7.037.025zm-52.778 13.185l-7.037.025v1l7.037-.025v-1zm52.778.815v-1l7.037-.025v1l-7.037.025zm-52.778 13.185l-7.037.025v1l7.037-.025v-1zm52.778.815v-1l7.037-.025v1l-7.037.025zm-52.778 13.185l-7.037.025v1l7.037-.025v-1zm52.778.815v-1l7.037-.025v1l-7.037.025zm-52.778 13.185l-7.037.025v1l7.037-.025v-1zm52.778.815v-1l7.037-.025v1l-7.037.025zm-52.778 13.185l-7.037.025v1l7.037-.025v-1zm52.778.815v-1l7.037-.025v1l-7.037.025zm-52.778 13.185l-7.037.025v1l7.037-.025v-1zm52.778.815v-1l7.037-.025v1l-7.037.025zm-52.778 13.185l-7.037.025v1l7.037-.025v-1zm52.778.815v-1l7.037-.025v1l-7.037.025zm-52.778 13.185l-7.037.025v1l7.037-.025v-1zm52.778.815v-1l7.037-.025v1l-7.037.025zm-52.778 13.185l-7.037.025v1l7.037-.025v-1zm52.778.815v-1l7.037-.025v1l-7.037.025zm-52.778 13.185v.914l52.778-.185v-.914l7.037-.025v1l-66.852.235v-1l7.037-.025z"
                ></path>
                <path
                  id="Subtract_2"
                  d="M220.87 105.311l-14.074.049v1l14.074-.049v-1zm52.778-.185v1l14.074-.049v-1l-14.074.049zm-52.778 70.185l-14.074.049v1l14.074-.049v-1zm52.778.815v-1l14.074-.049v1l-14.074.049zm-52.778 69.185l-14.074.049v1l14.074-.049v-1zm52.778.815v-1l14.074-.049v1l-14.074.049zm-52.778 69.185l-14.074.049v1l14.074-.049v-1zm52.778.815v-1l14.074-.049v1l-14.074.049zm-52.778 69.185v.914l52.778-.185v-.914l14.074-.049v1l-80.926.283v-1l14.074-.049z"
                ></path>
              </g>
              <g id="Track" transform="matrix(0 1 -1 .0035 270.131 106.138)">
                <path fill="#F0F0F0" d="M-0.5 0.502H279.414V45.243H-0.5z"></path>
                <path stroke="#D9D9D9" d="M-0.5 0.502H279.414V45.243H-0.5z"></path>
              </g>
              <path
                id="eng-act-box"
                fill="#274C85"
                d="M0 0H139.952V42.222H0z"
                transform={"matrix(0 1 -1 .0035 268.37 246) scale(" + -actEng / 100 + ",1)"}
              ></path>
              <path id="center-line" stroke="#707070" d="M291.051 246.131l-87.964.309"></path>
              <rect
                width="278.914"
                height="89.482"
                x="-1"
                y="1.004"
                stroke="#F69400"
                strokeWidth="2"
                rx="1"
                shapeRendering="crispEdges"
                transform="matrix(0 1 -1 .0035 293.004 107.058)"
              ></rect>
            </g>

            <g id="SET-ENG" filter="url(#filter2_d_20_2990)" transform={"translate(0 " + (-setEng / 100) * 138 + ")"}>
              <g id="SET-ENF-LEFT">
                <path
                  id="set-eng-left-box"
                  fill="#F69400"
                  d="M203.203 258.186H175a3 3 0 01-3-3v-19a3 3 0 013-3h28.147a3 3 0 011.579.449L225 246.186l-20.308 11.605a3.004 3.004 0 01-1.489.395z"
                ></path>
                <text
                  id="set-eng-left-text"
                  fill="#fff"
                  fontFamily="Roboto"
                  fontSize="13"
                  fontWeight="600"
                  letterSpacing="0"
                  transform="translate(173 237)"
                  xmlSpace="preserve"
                  textAnchor="middle"
                >
                  <tspan x="20" y="13.044" style={{ textAlign: "center" }}>
                    {setEng}%
                  </tspan>
                </text>
              </g>
              <g id="SET-ENG-RIGHT">
                <path
                  id="set-eng-right-box"
                  fill="#F69400"
                  d="M290.797 258H319a3 3 0 003-3v-19a3 3 0 00-3-3h-28.146c-.558 0-1.105.156-1.579.449L269 246l20.309 11.605c.453.259.966.395 1.488.395z"
                ></path>
                <text
                  id="set-eng-right-text"
                  fill="#fff"
                  fontFamily="Roboto"
                  fontSize="13"
                  fontWeight="600"
                  letterSpacing="0"
                  transform="translate(287 236.814)"
                  xmlSpace="preserve"
                  style={{ whiteSpace: "pre" }}
                  textAnchor="middle"
                >
                  <tspan x="13" y="13.044">
                    {setEng}%
                  </tspan>
                </text>
              </g>
            </g>
          </g>
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_20_2990"
          width="47.237"
          height="45"
          x="223.142"
          y="23"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_20_2990"></feBlend>
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_20_2990" result="shape"></feBlend>
        </filter>
        <filter
          id="filter1_d_20_2990"
          width="99.482"
          height="289.235"
          x="197.518"
          y="105.058"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_20_2990"></feBlend>
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_20_2990" result="shape"></feBlend>
        </filter>
        <filter
          id="filter2_d_20_2990"
          width="158"
          height="33.186"
          x="168"
          y="233"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_20_2990"></feBlend>
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_20_2990" result="shape"></feBlend>
        </filter>
        <clipPath id="clip0_20_2990">
          <path fill="#fff" d="M0 0H277.403V84.445H0z" transform="matrix(0 1 -1 .0035 289.481 106.826)"></path>
        </clipPath>
      </defs>
    </svg>
  )
}
