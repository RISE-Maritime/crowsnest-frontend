import React from "react"
import Draggable from "react-draggable"

/**
 * ## Bow thruster controller (actual & set)
 *
 * SVG component
 *
 * @param {number} setPower (-100% to 100%)
 * @param {number} actPower (-100% to 100%)
 * @param {number} thrusterID (used to identify the engine)
 * @param {number} thrusterNAME (name displayed to user)
 * @param {number} isTouchControl (size orange pointer)
 * @param {number} setThrusters (atom set)
 * @param {number} thrusters (atom value)
 */
export default function SvgBowThrustersMASSLAB({
  setPower,
  actPower,
  thrusterID,
  thrusterNAME,
  isTouchControl,
  setThrusters,
  thrusters,
}) {

  const SVG_WIDTH = 375

  function handleStart(e, ui) {
    // console.log("START", e, ui)
  }

  function handleDrag(e, ui) {
    // console.log("DRAG", e, ui)
  }

  function handleStop(e, ui) {
    // console.log("sTOP", e, ui)
    setThrusters({
      ...thrusters,
      [thrusterID]: {
        ...thrusters[thrusterID],
        setPower: Math.round((ui.x / SVG_WIDTH) * 100),
      },
    })
  }

  return (
    <div style={{  width: "100%", height: "96%" }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="776" height="279" fill="none" overflow="visible" viewBox="0 0 776 279">
        <g id="THRUSTER-COMPONENT">
          <g id="Thruster-Element" filter="url(#filter0_d_47_11488)">
            <g clipPath="url(#clip0_47_11488)">
              <path
                fill="#fff"
                d="M771.343 206.054a1.99 1.99 0 01-1.993 2H6.382a2.008 2.008 0 01-2.007-2L4.007 101c-.004-1.104.888-2 1.993-2h762.968c1.105 0 2.003.896 2.007 2l.368 105.054z"
              ></path>
              <g id="Tickmarks" clipPath="url(#clip1_47_11488)">
                <path
                  id="Subtract"
                  fill="#707070"
                  fillRule="evenodd"
                  d="M768.857 188.515l-.379-108.03h-3l.059 16.62h1.999l.259 73.814h-2l.062 17.596h3zm-38.27-91.41l-.059-16.62h-3l.059 16.62h3zm-2.742 73.814h3l.062 17.596h-3l-.062-17.596zm-35.208-73.814l-.059-16.62h-3l.059 16.62h3zm-2.742 73.814h3l.062 17.596h-3l-.062-17.596zm-35.208-73.814l-.059-16.62h-3l.059 16.62h3zm-2.742 73.814h3l.062 17.596h-3l-.062-17.596zm-35.208-73.814l-.059-16.62h-3l.059 16.62h3zm-2.742 73.814h3l.062 17.596h-3l-.062-17.596zm-35.208-73.814l-.059-16.62h-3l.059 16.62h3zm-2.742 73.814h3l.062 17.596h-3l-.062-17.596zm-35.208-73.814l-.059-16.62h-3l.059 16.62h3zm-2.742 73.814h3l.062 17.596h-3l-.062-17.596zm-35.208-73.814l-.059-16.62h-3l.059 16.62h3zm-2.741 73.814h3l.061 17.596h-3l-.061-17.596zm-35.209-73.814l-.059-16.62h-3l.059 16.62h3zm-2.742 73.814h3l.062 17.596h-3l-.062-17.596zm-35.208-73.814l-.059-16.62h-3l.059 16.62h3zm-2.742 73.814h3l.062 17.596h-3l-.062-17.596zm-35.208-73.814l-.059-16.62h-3l.059 16.62h3zm-2.742 73.814h3l.062 17.596h-3l-.062-17.596zm-35.208-73.814l-.059-16.62h-3l.059 16.62h3zm-2.742 73.814h3l.062 17.596h-3l-.062-17.596zm-35.208-73.814l-.059-16.62h-3l.059 16.62h3zm-2.742 73.814h3l.062 17.596h-3l-.062-17.596zm-35.208-73.814l-.059-16.62h-3l.059 16.62h3zm-2.742 73.814h3l.062 17.596h-3l-.062-17.596zm-35.208-73.814l-.059-16.62h-3l.059 16.62h3zm-2.742 73.814h3l.062 17.596h-3l-.062-17.596zm-35.208-73.814l-.059-16.62h-3l.059 16.62h3zm-2.742 73.814h3l.062 17.596h-3l-.062-17.596zm-35.208-73.814l-.059-16.62h-3l.059 16.62h3zm-2.742 73.814h3l.062 17.596h-3l-.062-17.596zm-35.208-73.814l-.059-16.62h-3l.059 16.62h3zm-2.742 73.814h3l.062 17.596h-3l-.062-17.596zM85.437 97.105l-.059-16.62h-3l.059 16.62h3zm-2.742 73.814h3l.062 17.596h-3l-.062-17.596zM47.487 97.105l-.059-16.62h-3l.059 16.62h3zm-2.742 73.814h3l.062 17.596h-3l-.062-17.596zM9.538 97.105l-.059-16.62h-3l.059 16.62h3zM6.795 170.92h3l.062 17.596h-3l-.062-17.596z"
                  clipRule="evenodd"
                ></path>
                <path
                  id="Subtract_2"
                  fill="#707070"
                  fillRule="evenodd"
                  d="M768.897 200.051l-.237-67.629h-1l.139 39.472h-2l.098 28.157h3zm-192.848-28.157h3l.098 28.157h-3l-.098-28.157zm-189.75 0h3l.098 28.157h-3l-.098-28.157zm-189.75 0h3l.098 28.156h-3l-.098-28.156zm-189.75 0h3l.098 28.156h-3L6.8 171.894z"
                  clipRule="evenodd"
                ></path>
                <path id="Vector 13" stroke="#9C9C9C" strokeLinecap="round" strokeWidth="2" d="M13 171h750"></path>
              </g>
              <path id="act-boc-background" fill="#F0F0F0" d="M12.345 98.828H762.5830000000001V170.279H12.345z"></path>

              {/* ACT BOX */}
              <path
                id="THRUSTER-ACT-BOX"
                transform={"scale(" + actPower / 100 + ",1)"}
                style={{
                  transformOrigin: "center",
                }}
                fill="#274C85"
                d="M763.064 170.279h-374.81L388.004 99h380v71.279z"
              ></path>

              <path id="center-line" stroke="#707070" strokeWidth="4" d="M388.156 209.604L388 99"></path>
              <g id="SIDE-COLORS">
                <path id="port-box" fill="#E16290" d="M3.612 101a2 2 0 012-2h6.724v109.054H5.612a2 2 0 01-2-2V101z"></path>
                <path
                  id="starbaord-box"
                  fill="#359E85"
                  d="M762.628 99h6.724a2 2 0 012 2v105.054a2 2 0 01-2 2h-6.724V99.001z"
                ></path>
              </g>
            </g>
          </g>
          <g id="ACT-BOX" filter="url(#filter1_d_47_11488)">
            <g id="power_act_container">
              <mask id="path-10-inside-1_47_11488" fill="#fff">
                <path d="M318.06 27.47h140.986l17.015 34.342-17.015 34.34H318.06l-17.825-34.34L318.06 27.47z"></path>
              </mask>
              <path
                fill="#274C85"
                stroke="#fff"
                strokeWidth="4"
                d="M318.06 27.47h140.986l17.015 34.342-17.015 34.34H318.06l-17.825-34.34L318.06 27.47z"
                mask="url(#path-10-inside-1_47_11488)"
              ></path>
            </g>
            <text
              id="power_act_text"
              fill="#fff"
              fontFamily="Roboto"
              fontSize="50"
              fontWeight="600"
              letterSpacing="0"
              transform="translate(319.225 35.713)"
              xmlSpace="preserve"
              style={{ whiteSpace: "pre" }}
              textAnchor="middle"
            >
              {/* ACT TEXT */}
              <tspan x="70" y="45.936">
                {actPower}%
              </tspan>
            </text>
          </g>
          <g id="SET-BOX" filter="url(#filter2_d_47_11488)">
            <g id="thruster-set-container">
              <mask id="path-12-inside-2_47_11488" fill="#fff">
                <path d="M348.597-.001h79.087l9.546 19.264-9.546 19.264h-79.087l-10-19.264 10-19.264z"></path>
              </mask>
              <path
                fill="#F69400"
                stroke="#fff"
                strokeWidth="2"
                d="M348.597-.001h79.087l9.546 19.264-9.546 19.264h-79.087l-10-19.264 10-19.264z"
                mask="url(#path-12-inside-2_47_11488)"
              ></path>
            </g>
            <text
              id="thruster-set-text"
              fill="#fff"
              fontFamily="Roboto"
              fontSize="30"
              fontWeight="600"
              letterSpacing="0"
              transform="translate(349.385 1.54)"
              xmlSpace="preserve"
              style={{ whiteSpace: "pre" }}
              textAnchor="middle"
            >
              {/* SET TEXT */}
              <tspan x="38" y="27.977">
                {setPower}%
              </tspan>
            </text>
          </g>
          <text
            id="NAME-THRUSTER"
            fill="#737373"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Roboto"
            fontSize="32"
            fontWeight="600"
            letterSpacing="0"
          >
            <tspan x="11" y="252.938">
              {thrusterNAME?.toUpperCase()}
            </tspan>
          </text>

          {/* SET MARKER */}
          <Draggable
            axis="x"
            bounds={{ left: -375, right: 375 }}
            onStart={handleStart}
            onDrag={handleDrag}
            onStop={handleStop}
            // disabled={true}
            grid={[3.75]}
            position={{ x: 375 * (setPower / 100), y: 0 }}
          >
            <g
              id="SET-MARKERS"
              transform={"translate(" + 375 * (setPower / 100) + " 0)"}
              style={{
                transformOrigin: "center",
              }}
            >
              <g id="triangle" filter="url(#filter3_d_47_11488)">
                <path
                  fill="#F69400"
                  d="M387.967 184l28.535 50.878c1.121 1.999-.324 4.467-2.617 4.467h-51.837c-2.292 0-3.738-2.468-2.616-4.467L387.967 184z"
                ></path>
              </g>

              {isTouchControl ? (
                <ellipse id="touch-circle" cx="388" cy="249.616" fill="#F69400" rx="33" ry="28.779"></ellipse>
              ) : null}
            </g>
          </Draggable>
        </g>
        <defs>
          <filter
            id="filter0_d_47_11488"
            width="775.351"
            height="117.054"
            x="0"
            y="99"
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
            <feOffset dy="4"></feOffset>
            <feGaussianBlur stdDeviation="2"></feGaussianBlur>
            <feComposite in2="hardAlpha" operator="out"></feComposite>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_47_11488"></feBlend>
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_47_11488" result="shape"></feBlend>
          </filter>
          <filter
            id="filter1_d_47_11488"
            width="183.827"
            height="76.682"
            x="296.235"
            y="27.471"
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
            <feOffset dy="4"></feOffset>
            <feGaussianBlur stdDeviation="2"></feGaussianBlur>
            <feComposite in2="hardAlpha" operator="out"></feComposite>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_47_11488"></feBlend>
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_47_11488" result="shape"></feBlend>
          </filter>
          <filter
            id="filter2_d_47_11488"
            width="106.633"
            height="46.528"
            x="334.597"
            y="-0.001"
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
            <feOffset dy="4"></feOffset>
            <feGaussianBlur stdDeviation="2"></feGaussianBlur>
            <feComposite in2="hardAlpha" operator="out"></feComposite>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_47_11488"></feBlend>
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_47_11488" result="shape"></feBlend>
          </filter>
          <filter
            id="filter3_d_47_11488"
            width="65.846"
            height="63.345"
            x="355.044"
            y="184"
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
            <feOffset dy="4"></feOffset>
            <feGaussianBlur stdDeviation="2"></feGaussianBlur>
            <feComposite in2="hardAlpha" operator="out"></feComposite>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_47_11488"></feBlend>
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_47_11488" result="shape"></feBlend>
          </filter>
          <clipPath id="clip0_47_11488">
            <path
              fill="#fff"
              d="M771.343 206.054a1.99 1.99 0 01-1.993 2H6.382a2.008 2.008 0 01-2.007-2L4.007 101c-.004-1.104.888-2 1.993-2h762.968c1.105 0 2.003.896 2.007 2l.368 105.054z"
            ></path>
          </clipPath>
          <clipPath id="clip1_47_11488">
            <path fill="#fff" d="M0 0H750.742V98.771H0z" transform="matrix(-1 0 -.0035 -1 763.153 202.108)"></path>
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}
