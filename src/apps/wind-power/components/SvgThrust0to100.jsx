import React from "react"
import Draggable from "react-draggable"

/**
 * ## Engine controller (actual & set)
 *
 * SVG component
 *
 * @param {number} setPower (-100% to 100%)
 * @param {number} actPower (-100% to 100%)
 * @param {string} thrusterID (used to identify the thruster)
 * @param {string} thrusterNAME (name displayed to user)
 * @param {boolean} isTouchControl (size orange pointer)
 * @param {boolean} setEngines (atom set)
 * @param {boolean} engines (atom value)
 */
export default function SvgThrust0to100({ setPower, actPower, isTouchControl, setSailControl }) {
  const SVG_HEIGHT = 345

  // function handleStart(e, ui) {
  //   // console.log("START", e, ui)
  // }

  // function handleDrag(e, ui) {
  //   // console.log("DRAG", e, ui)
  // }

  function handleStop(e, ui) {
    setSailControl(prevState => {
      return {
        ...prevState,
        variableThrustSetPct: Math.round(((-ui.y + SVG_HEIGHT) / (SVG_HEIGHT * 2)) * 100) / 100,
      }
    })
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="380"
      height="850"
      fill="none"
      viewBox="0 0 380 850"
      overflow="visible"
      style={{ marginTop: "-6rem" }}
    >
      <g>
        <g>
          <g>
            <rect
              width="694.162"
              height="226.555"
              fill="#fff"
              rx="2"
              shapeRendering="crispEdges"
              transform="matrix(0 1 -1 .0035 303.427 137.573)"
              overflow="visible"
            ></rect>
            <g fill="#707070" fillRule="evenodd" clipPath="url(#clip0_47_11689)" clipRule="evenodd">
              <path d="M272.929 136.679l-165.558.581v3l17.427-.061v-2l130.704-.458v2l17.427-.062v-3zm-148.131 35.17l-17.427.061v3l17.427-.061v-3zm130.704 2.542v-3l17.427-.062v3l-17.427.062zm-130.704 32.108l-17.427.061v3l17.427-.061v-3zm130.704 2.542v-3l17.427-.062v3l-17.427.062zm-130.704 32.108l-17.427.061v3l17.427-.061v-3zm130.704 2.542v-3l17.427-.062v3l-17.427.062zm-130.704 32.108l-17.427.061v3l17.427-.061v-3zm130.704 2.542v-3l17.427-.062v3l-17.427.062zm-130.704 32.108l-17.427.061v3l17.427-.061v-3zm130.704 2.542v-3l17.427-.062v3l-17.427.062zm-130.704 32.108l-17.427.061v3l17.427-.061v-3zm130.704 2.542v-3l17.427-.062v3l-17.427.062zm-130.704 32.108l-17.427.061v3l17.427-.061v-3zm130.704 2.542v-3l17.427-.062v3l-17.427.062zm-130.704 32.108l-17.427.061v3l17.427-.061v-3zm130.704 2.542v-3l17.427-.062v3l-17.427.062zm-130.704 32.108l-17.427.061v3l17.427-.061v-3zm130.704 2.542v-3l17.427-.062v3l-17.427.062zm-130.704 32.108l-17.427.061v3l17.427-.061v-3zm130.704 2.542v-3l17.427-.062v3l-17.427.062zm-130.704 32.108l-17.427.061v3l17.427-.061v-3zm130.704 2.542v-3l17.427-.062v3l-17.427.062zm-130.704 32.108l-17.427.061v3l17.427-.061v-3zm130.704 2.542v-3l17.427-.062v3l-17.427.062zm-130.704 32.108l-17.427.061v3l17.427-.061v-3zm130.704 2.542v-3l17.427-.062v3l-17.427.062zm-130.704 32.108l-17.427.061v3l17.427-.061v-3zm130.704 2.542v-3l17.427-.062v3l-17.427.062zm-130.704 32.108l-17.427.061v3l17.427-.061v-3zm130.704 2.542v-3l17.427-.062v3l-17.427.062zm-130.704 32.108l-17.427.061v3l17.427-.061v-3zm130.704 2.542v-3l17.427-.062v3l-17.427.062zm-130.704 32.108l-17.427.061v3l17.427-.061v-3zm130.704 2.542v-3l17.427-.062v3l-17.427.062zm-130.704 32.108l-17.427.061v3l17.427-.061v-3zm130.704 2.542v-3l17.427-.062v3l-17.427.062zm-130.704 32.108l-17.427.061v3l17.427-.061v-3zm130.704 2.542v-3l17.427-.062v3l-17.427.062zm-130.704 32.108v2.161l130.704-.458v-2.161l17.427-.062v3l-165.558.581v-3l17.427-.061z"></path>
              <path d="M290.357 136.618l-200.413.703v3l34.855-.122v-2l130.703-.458v2l34.855-.123v-3zM124.799 310.449l-34.855.122v3l34.855-.122v-3zm130.703 2.542v-3l34.855-.123v3l-34.855.123zM124.799 483.699l-34.855.122v3l34.855-.122v-3zm130.703 2.542v-3l34.855-.123v3l-34.855.123zM124.799 656.949l-34.855.122v3l34.855-.122v-3zm130.703 2.542v-3l34.855-.123v3l-34.855.123zM124.799 830.199v2.162l130.703-.459v-2.161l34.855-.123v3l-200.413.703v-3l34.855-.122z"></path>
            </g>
            <g transform="matrix(0 1 -1 .0035 246.545 139.051)">
              <path fill="#F0F0F0" d="M-0.5 0.502H692.662V112.779H-0.5z"></path>
              <path stroke="#D9D9D9" d="M-0.5 0.502H692.662V112.779H-0.5z"></path>
            </g>
            {/* ACT BOX */}
            <path
              fill="#274C85"
              d="M0 0H345.831V104.564H0z"
              transform={"matrix(0 1 -1 .0035 242.432 486) scale(" + -actPower / 100 + ",1)"}
            ></path>
            <path stroke="#707070" strokeWidth="2" d="M245.559 486.702l-111.254.001"></path>

            <Draggable
              axis="y"
              bounds={{ top: -345, bottom: 345 }}
              // onStart={handleStart}
              // onDrag={handleDrag}
              onStop={handleStop}
              // disabled={true}
              grid={[3.45, 3.45]}
              position={{ y: SVG_HEIGHT * ((-setPower * 2) / 100 + 1), x: 0 }}
            >
              <g>
                <g id="SET-MARKERS">
                  <g>
                    <path
                      fill="var(--instrument-enhanced-secondary-color)"
                      d="M246.177 486.372l62.403-33.916c1.999-1.087 4.433.36 4.433 2.635v62.556c0 2.275-2.434 3.722-4.433 2.636l-62.403-33.911z"
                    ></path>
                  </g>
                  {isTouchControl ? (
                    <path
                      fill="var(--instrument-enhanced-secondary-color)"
                      d="M309.975 452.066l61.822-.002a4 4 0 014 4v60.609a4 4 0 01-4 4l-61.822.003v-68.61z"
                    ></path>
                  ) : null}
                </g>

                <g>
                  <g>
                    <path
                      fill="var(--instrument-enhanced-secondary-color)"
                      d="M133.773 486.371l-62.402 33.917c-2 1.087-4.433-.36-4.433-2.635v-62.557c0-2.275 2.434-3.722 4.433-2.636l62.402 33.911z"
                    ></path>
                  </g>
                  {isTouchControl ? (
                    <path
                      fill="var(--instrument-enhanced-secondary-color)"
                      d="M69.976 520.677l-61.822.003a4 4 0 01-4-4v-60.61a4 4 0 014-4l61.822-.003v68.61z"
                    ></path>
                  ) : null}
                </g>
              </g>
            </Draggable>
          </g>
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_47_11689"
          width="379.644"
          height="703.037"
          x="0.154"
          y="137.573"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_47_11689"></feBlend>
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_47_11689" result="shape"></feBlend>
        </filter>

        <clipPath id="clip0_47_11689">
          <path fill="#fff" d="M0 0H685.485V209.127H0z" transform="matrix(0 1 -1 .0035 294.713 141.942)"></path>
        </clipPath>
      </defs>
    </svg>
  )
}
