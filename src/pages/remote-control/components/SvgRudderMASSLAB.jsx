import React, { useState, useRef } from "react"
import Draggable from "react-draggable"

/**
 * ## Rudder controller (actual & set)
 *
 * SVG component
 *
 * @param {number} actAngle (degrees)
 * @param {number} setAngle (degrees)
 * @param {number} rudderID (used to identify the rudder)
 * @param {number} rudderNAME (name displayed to user)
 * @param {number} isTouchControl (size orange pointer)
 * @param {number} setRudders (atom set)
 * @param {number} rudders (atom value)
 */
export default function SvgRudderMASSLAB({
  actAngle,
  setAngle,
  rudderID,
  rudderNAME,
  isTouchControl,
  setRudders,
  rudders,
  maxAngle,
}) {
  const [rudderPathLength, setRudderPathLength] = useState(null)
  const [markerPos, setMarkerPos] = useState({ x: 0, y: 0 })

  const SVG_WIDTH = 837
  const SVG_WORK_WIDTH = 330
  const SVG_HEIGHT = 862
  const ROT_DEG = 62

  function handleStart(e, ui) {
    // console.log("START", e, ui)
  }

  const handleDrag = (e, ui) => {
    // console.log("DRAG", e, ui)
    const { x, y } = ui
    let newX = x // * (setAngle / maxAngle);
    let newY = -(0.0017 * Math.abs(x) ** 2)
    // console.log("newX", newX, "newY", newY)
    setMarkerPos({ x: newX, y: newY })
    setRudders({ id: rudderID, setAngle: Math.round((ui.x / SVG_WORK_WIDTH) * 60) })
    // console.log(Math.round((ui.x / SVG_WORK_WIDTH) * 60))
  }

  function handleStop(e, ui) {
    // console.log("sTOP", e, ui)
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="837"
      height="862"
      fill="none"
      viewBox="0 0 837 862"
      overflow="visible"
      style={{ marginTop: "-200px" }}
    >
      <g id="RUDDER-COMPONENT">
        <g id="port-stbd">
          <g id="port">
            <mask
              id="path-1-outside-1_51_6755"
              width="118"
              height="85"
              x="127.841"
              y="509.378"
              fill="#000"
              maskUnits="userSpaceOnUse"
            >
              <path fill="#fff" d="M127.841 509.378H245.841V594.3779999999999H127.841z"></path>
              <path d="M234.119 514.105c-1.31-2.523-4.458-3.49-6.921-2.068l-94.912 54.784c-2.273 1.312-3.113 4.182-1.87 6.493a327.036 327.036 0 0010.045 17.355c1.382 2.227 4.284 2.931 6.554 1.62l94.912-54.784c2.465-1.423 3.2-4.637 1.663-7.033a207.104 207.104 0 01-9.471-16.367z"></path>
            </mask>
            <path
              fill="#E16290"
              d="M234.119 514.105c-1.31-2.523-4.458-3.49-6.921-2.068l-94.912 54.784c-2.273 1.312-3.113 4.182-1.87 6.493a327.036 327.036 0 0010.045 17.355c1.382 2.227 4.284 2.931 6.554 1.62l94.912-54.784c2.465-1.423 3.2-4.637 1.663-7.033a207.104 207.104 0 01-9.471-16.367z"
            ></path>
            <path
              stroke="#E16290"
              strokeWidth="2"
              d="M234.119 514.105c-1.31-2.523-4.458-3.49-6.921-2.068l-94.912 54.784c-2.273 1.312-3.113 4.182-1.87 6.493a327.036 327.036 0 0010.045 17.355c1.382 2.227 4.284 2.931 6.554 1.62l94.912-54.784c2.465-1.423 3.2-4.637 1.663-7.033a207.104 207.104 0 01-9.471-16.367z"
              mask="url(#path-1-outside-1_51_6755)"
            ></path>
          </g>
          <g id="stbd">
            <mask
              id="path-2-outside-2_51_6755"
              width="117"
              height="85"
              x="591.608"
              y="509.378"
              fill="#000"
              maskUnits="userSpaceOnUse"
            >
              <path fill="#fff" d="M591.608 509.378H708.608V594.3779999999999H591.608z"></path>
              <path d="M689.985 592.289c2.27 1.311 5.172.607 6.554-1.62a327.036 327.036 0 0010.045-17.355c1.244-2.311.403-5.181-1.87-6.493l-94.912-54.784c-2.463-1.422-5.611-.455-6.921 2.068a207.104 207.104 0 01-9.471 16.367c-1.537 2.396-.802 5.61 1.663 7.033l94.912 54.784z"></path>
            </mask>
            <path
              fill="#359E85"
              d="M689.985 592.289c2.27 1.311 5.172.607 6.554-1.62a327.036 327.036 0 0010.045-17.355c1.244-2.311.403-5.181-1.87-6.493l-94.912-54.784c-2.463-1.422-5.611-.455-6.921 2.068a207.104 207.104 0 01-9.471 16.367c-1.537 2.396-.802 5.61 1.663 7.033l94.912 54.784z"
            ></path>
            <path
              stroke="#359E85"
              strokeWidth="2"
              d="M689.985 592.289c2.27 1.311 5.172.607 6.554-1.62a327.036 327.036 0 0010.045-17.355c1.244-2.311.403-5.181-1.87-6.493l-94.912-54.784c-2.463-1.422-5.611-.455-6.921 2.068a207.104 207.104 0 01-9.471 16.367c-1.537 2.396-.802 5.61 1.663 7.033l94.912 54.784z"
              mask="url(#path-2-outside-2_51_6755)"
            ></path>
          </g>
        </g>
        <g id="watchface">
          <g id="watchface_2">
            <g id="frame">
              <g id="Intersect">
                <mask
                  id="path-3-outside-3_51_6755"
                  width="568"
                  height="187"
                  x="134.452"
                  y="560.449"
                  fill="#000"
                  maskUnits="userSpaceOnUse"
                >
                  <path fill="#fff" d="M134.452 560.449H702.452V747.449H134.452z"></path>
                  <path
                    fillRule="evenodd"
                    d="M185.927 648.345a326.965 326.965 0 0069.097 53.337A327.012 327.012 0 00418.5 745.475l.689-.001a327.016 327.016 0 00162.788-43.792 326.927 326.927 0 00118.16-117.052 2.98 2.98 0 00-1.086-4.093l-31.338-18.088C617.962 648.415 524.987 706.25 418.5 706.25s-199.462-57.835-249.213-143.801l-31.338 18.088a2.98 2.98 0 00-1.086 4.093 326.843 326.843 0 0049.064 63.715z"
                    clipRule="evenodd"
                  ></path>
                </mask>
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M185.927 648.345a326.965 326.965 0 0069.097 53.337A327.012 327.012 0 00418.5 745.475l.689-.001a327.016 327.016 0 00162.788-43.792 326.927 326.927 0 00118.16-117.052 2.98 2.98 0 00-1.086-4.093l-31.338-18.088C617.962 648.415 524.987 706.25 418.5 706.25s-199.462-57.835-249.213-143.801l-31.338 18.088a2.98 2.98 0 00-1.086 4.093 326.843 326.843 0 0049.064 63.715z"
                  clipRule="evenodd"
                ></path>
                <path
                  fill="#D9D9D9"
                  d="M189.257 651.667l-.701.713.701-.713zm-3.33-3.322l-.712.703.712-.703zm69.097 53.337l-.5.866.5-.866zm162.787 43.792l-.002 1 .002-1zm1.378 0l.002 1-.002-1zm162.788-43.792l-.5-.866.5.866zm64.924-49.19l.698.715-.698-.715zm7.735-7.808l.722.692-.722-.692zm45.501-60.054l.861.508-.861-.508zm-1.086-4.093l-.5.867.5-.867zm-31.338-18.088l.5-.866-.865-.499-.5.864.865.501zm-498.426 0l.865-.501-.5-.864-.865.499.5.866zm-31.338 18.088l.5.867-.5-.867zm-1.086 4.093l.862-.508-.862.508zm53.095 66.324a334.41 334.41 0 01-3.32-3.312l-1.423 1.406a338.557 338.557 0 003.341 3.332l1.402-1.426zm65.565 49.862a325.952 325.952 0 01-65.565-49.862l-1.402 1.426a327.935 327.935 0 0065.968 50.168l.999-1.732zm162.29 43.658a326.014 326.014 0 01-162.29-43.658l-.999 1.732a328.001 328.001 0 00163.285 43.926l.004-2zm.687.001l-.687-.001-.004 2 .691.001v-2zm.687-.001l-.687.001v2l.691-.001-.004-2zm162.29-43.658a326.014 326.014 0 01-162.29 43.658l.004 2a328.005 328.005 0 00163.286-43.926l-1-1.732zm64.725-49.04a325.928 325.928 0 01-64.725 49.04l1 1.732a327.905 327.905 0 0065.122-49.341l-1.397-1.431zm7.712-7.784a325.31 325.31 0 01-7.712 7.784l1.397 1.431a329.252 329.252 0 007.759-7.831l-1.444-1.384zm45.362-59.87a325.88 325.88 0 01-45.362 59.87l1.444 1.384a327.834 327.834 0 0045.64-60.238l-1.722-1.016zm-.725-2.718a1.98 1.98 0 01.725 2.718l1.722 1.016a3.98 3.98 0 00-1.447-5.467l-1 1.733zm-31.338-18.089l31.338 18.089 1-1.733-31.338-18.088-1 1.732zM418.5 707.25c106.858 0 200.156-58.038 250.079-144.3l-1.731-1.002C617.268 647.617 524.615 705.25 418.5 705.25v2zm-250.079-144.3c49.923 86.262 143.221 144.3 250.079 144.3v-2c-106.115 0-198.768-57.633-248.348-143.302l-1.731 1.002zm-29.972 18.454l31.338-18.089-1-1.732-31.338 18.088 1 1.733zm-.724 2.718a1.978 1.978 0 01.724-2.718l-1-1.733a3.98 3.98 0 00-1.447 5.467l1.723-1.016zm48.913 63.52a325.856 325.856 0 01-48.913-63.52l-1.723 1.016a327.89 327.89 0 0049.213 63.91l1.423-1.406z"
                  mask="url(#path-3-outside-3_51_6755)"
                ></path>
              </g>
            </g>
            <g id="labels">
              <mask
                id="mask0_51_6755"
                style={{ maskType: "alpha" }}
                width="837"
                height="445"
                x="0"
                y="392"
                maskUnits="userSpaceOnUse"
              >
                <path id="mask" fill="#D9D9D9" d="M0 392.45H837V837H0z"></path>
              </mask>
              <g mask="url(#mask0_51_6755)">
                <g id="labels_2">
                  <g id="90deg">
                    <g id="LabelFrame">
                      <text
                        id="180"
                        fill="#9C9C9C"
                        xmlSpace="preserve"
                        style={{ whiteSpace: "pre" }}
                        fontFamily="Roboto"
                        fontSize="22"
                        fontWeight="500"
                        letterSpacing="0"
                      >
                        <tspan x="413.688" y="790.683">
                          0
                        </tspan>
                      </text>
                    </g>
                  </g>
                  <g id="60Â°">
                    <g id="LabelFrame_2">
                      <text
                        id="-30"
                        fill="#9C9C9C"
                        fontFamily="Roboto"
                        fontSize="22"
                        fontWeight="500"
                        letterSpacing="0"
                        transform="translate(219.174 723.425)"
                        xmlSpace="preserve"
                        style={{ whiteSpace: "pre" }}
                      >
                        <tspan x="0.365" y="20.536">
                          30
                        </tspan>
                      </text>
                    </g>
                    <g id="LabelFrame_3">
                      <text
                        id="60"
                        fill="#9C9C9C"
                        fontFamily="Roboto"
                        fontSize="22"
                        fontWeight="500"
                        letterSpacing="0"
                        transform="translate(722.896 589.673)"
                        xmlSpace="preserve"
                        style={{ whiteSpace: "pre" }}
                      >
                        <tspan x="0.41" y="20.536">
                          60
                        </tspan>
                      </text>
                    </g>
                  </g>
                  <g id="30Â°">
                    <g id="LabelFrame_4">
                      <text
                        id="-60"
                        fill="#9C9C9C"
                        fontFamily="Roboto"
                        fontSize="22"
                        fontWeight="500"
                        letterSpacing="0"
                        transform="translate(85.14 589.423)"
                        xmlSpace="preserve"
                        style={{ whiteSpace: "pre" }}
                      >
                        <tspan x="0.365" y="20.536">
                          60
                        </tspan>
                      </text>
                    </g>
                    <g id="LabelFrame_5">
                      <text
                        id="30"
                        fill="#737373"
                        fontFamily="Roboto"
                        fontSize="22"
                        fontWeight="500"
                        letterSpacing="0"
                        transform="translate(588.862 723.675)"
                        xmlSpace="preserve"
                        style={{ whiteSpace: "pre" }}
                      >
                        <tspan x="0.41" y="20.536">
                          30
                        </tspan>
                      </text>
                    </g>
                  </g>
                </g>
              </g>
            </g>
            <g id="tick-marks">
              <mask
                id="mask1_51_6755"
                style={{ maskType: "alpha" }}
                width="583"
                height="336"
                x="126"
                y="419"
                maskUnits="userSpaceOnUse"
              >
                <path
                  id="Subtract"
                  fill="#000"
                  fillRule="evenodd"
                  d="M126.859 586.947a379.18 379.18 0 00.502.865l-.502-.865zm581.918.359L418.5 419.754 128.227 587.312a335.723 335.723 0 00122.397 121.999 335.834 335.834 0 00335.759-.004 335.728 335.728 0 00122.394-122.001z"
                  clipRule="evenodd"
                ></path>
              </mask>
              <g mask="url(#mask1_51_6755)">
                <g id="secondary-tick-marks">
                  <path
                    id="tick-marks_2"
                    stroke="#707070"
                    strokeWidth="2"
                    d="M673.335 271.506l22.651-13.075M712.758 418.6h26.156m-65.579 147.093l22.651 13.075m-130.357 94.606l13.078 22.646M418.5 712.787v26.15m-147.129-65.563l-13.078 22.646m-94.628-130.326l-22.652 13.075m-16.771-160.166H98.086m65.579-147.096l-22.652-13.075m130.358-94.606l-13.078-22.646M418.5 124.412v-26.15m147.129 65.564l13.078-22.646"
                  ></path>
                </g>
                <g id="secondary-tick-marks-light">
                  <path
                    id="tick-marks_3"
                    stroke="#707070"
                    strokeOpacity="0.5"
                    strokeWidth="2"
                    d="M643.914 229.499l20.037-16.808m44.336 154.824l25.759-4.541m-39.034 156.244l24.578 8.943m-111.945 115.8l16.813 20.032m-154.861 44.325l4.542 25.753m-156.281-39.025l-8.946 24.573M193.086 607.7l-20.037 16.809m-44.336-154.821l-25.759 4.541m39.034-156.247l-24.579-8.943m111.946-115.8l-16.813-20.032m154.861-44.325l-4.542-25.753m156.281 39.025l8.946-24.573"
                  ></path>
                </g>
                <g id="secondary-tick-marks-light_2">
                  <path
                    id="tick-marks_4"
                    stroke="#707070"
                    strokeOpacity="0.5"
                    strokeWidth="2"
                    d="M607.645 193.239l16.813-20.032m70.554 144.775l24.578-8.944m-11.303 160.647l25.759 4.54M643.914 607.7l20.037 16.809m-144.809 70.537l8.946 24.573m-160.685-11.301l-4.542 25.753m-133.506-90.11l-16.813 20.032m-70.553-144.772l-24.579 8.944m11.303-160.65l-25.759-4.541M193.085 229.5l-20.037-16.809m144.81-70.537l-8.946-24.573m160.685 11.301l4.542-25.753"
                  ></path>
                </g>
                <g id="primary-tick-marks">
                  <path
                    id="tick-marks_5"
                    stroke="#707070"
                    strokeWidth="3"
                    d="M418.5 124.412V91.725m0 653.75v-32.688M712.758 418.6h32.695m-653.906 0h32.695"
                  ></path>
                </g>
                <path id="top-line" stroke="#333" strokeWidth="4" d="M419 706.25v39.225"></path>
              </g>
            </g>
          </g>
        </g>

        {/* SET MARKER */}

        <g
          id="setpoint"
          transform={"rotate(" + (-setAngle / maxAngle) * 62 + ")"}
          style={{
            transformOrigin: "center",
          }}
        >
          <g id="SET-MARKERS">
            <g id="triangle" filter="url(#filter0_d_51_6755)">
              <path
                fill="#F69400"
                d="M418.967 720l28.535 50.878c1.121 1.999-.324 4.467-2.617 4.467h-51.837c-2.292 0-3.738-2.468-2.616-4.467L418.967 720z"
              ></path>
            </g>

            {isTouchControl ? (
              <ellipse id="touch-circle" cx="419" cy="785.616" fill="#F69400" rx="33" ry="28.779"></ellipse>
            ) : null}
          </g>
        </g>

        {isTouchControl ? (
          <Draggable
            axis="x"
            bounds={{ left: -SVG_WORK_WIDTH, right: SVG_WORK_WIDTH }}
            onStart={handleStart}
            onDrag={handleDrag}
            onStop={handleStop}
            // disabled={true}
            grid={[SVG_WORK_WIDTH / maxAngle]}
            position={{ x: markerPos.x, y: markerPos.y }}
            // position={{ x: 300 * (setAngle / maxAngle) , y: 100 * -(setAngle / maxAngle)  }}
            // style={"rotate(" + (-setAngle / maxAngle) * 62 + ")"}
            // nodeRef={myRef}
          >
            <g
              id="setpoint"
              transform={"rotate(" + (-setAngle / maxAngle) * 62 + ")"}
              style={{
                transformOrigin: "center",
              }}
            >
              <g id="SET-MARKERS">
                {/* <g id="triangle" filter="url(#filter0_d_51_6755)">
                    <path
                      fill="#F69400"
                      d="M418.967 720l28.535 50.878c1.121 1.999-.324 4.467-2.617 4.467h-51.837c-2.292 0-3.738-2.468-2.616-4.467L418.967 720z"
                    ></path>
                  </g> */}

                <ellipse id="touch-circle" cx="419" cy="785.616" fill="#F6940000" rx="63" ry="58.779"></ellipse>
              </g>
            </g>
          </Draggable>
        ) : null}

        <g id="Rudder">
          <g id="rudder">
            <g id="bar-component">
              <g id="track">
                <mask
                  id="path-19-outside-4_51_6755"
                  width="499"
                  height="186"
                  x="169.159"
                  y="520.636"
                  fill="#000"
                  maskUnits="userSpaceOnUse"
                >
                  <path fill="#fff" d="M169.159 520.636H668.159V706.636H169.159z"></path>
                  <path d="M170.167 561.941c-.008.004-.01.014-.006.022C219.742 647.622 312.389 705.25 418.5 705.25c106.111 0 198.758-57.628 248.339-143.287.004-.008.002-.018-.006-.022l-68.09-39.302a.015.015 0 00-.022.006C562.739 584.806 495.504 626.626 418.5 626.626s-144.239-41.82-180.221-103.981a.015.015 0 00-.022-.006l-68.09 39.302z"></path>
                </mask>
                <path
                  fill="#F0F0F0"
                  d="M170.167 561.941c-.008.004-.01.014-.006.022C219.742 647.622 312.389 705.25 418.5 705.25c106.111 0 198.758-57.628 248.339-143.287.004-.008.002-.018-.006-.022l-68.09-39.302a.015.015 0 00-.022.006C562.739 584.806 495.504 626.626 418.5 626.626s-144.239-41.82-180.221-103.981a.015.015 0 00-.022-.006l-68.09 39.302z"
                ></path>
                <path
                  stroke="#D9D9D9"
                  strokeWidth="2"
                  d="M170.167 561.941c-.008.004-.01.014-.006.022C219.742 647.622 312.389 705.25 418.5 705.25c106.111 0 198.758-57.628 248.339-143.287.004-.008.002-.018-.006-.022l-68.09-39.302a.015.015 0 00-.022.006C562.739 584.806 495.504 626.626 418.5 626.626s-144.239-41.82-180.221-103.981a.015.015 0 00-.022-.006l-68.09 39.302z"
                  mask="url(#path-19-outside-4_51_6755)"
                ></path>
              </g>
              <g id="ACT-BOX" filter="url(#filter1_d_51_6755)">
                <g id="power_act_container">
                  <mask id="path-20-inside-5_51_6755" fill="#fff">
                    <path d="M349.066 502.472h140.986l17.015 34.341-17.015 34.341H349.066l-17.826-34.341 17.826-34.341z"></path>
                  </mask>
                  <path
                    fill="#274C85"
                    stroke="#fff"
                    strokeWidth="4"
                    d="M349.066 502.472h140.986l17.015 34.341-17.015 34.341H349.066l-17.826-34.341 17.826-34.341z"
                    mask="url(#path-20-inside-5_51_6755)"
                  ></path>
                </g>
                <text
                  id="power_act_text"
                  fill="#fff"
                  fontFamily="Roboto"
                  fontSize="50"
                  fontWeight="600"
                  letterSpacing="0"
                  transform="translate(350.231 510.714)"
                  xmlSpace="preserve"
                  style={{ whiteSpace: "pre" }}
                  textAnchor="middle"
                >
                  <tspan x="70" y="45.936">
                    {actAngle}°
                  </tspan>
                </text>
              </g>
              <g id="SET-BOX" filter="url(#filter2_d_51_6755)">
                <g id="thruster-set-container">
                  <mask id="path-22-inside-6_51_6755" fill="#fff">
                    <path d="M379.598 475h79.088l9.545 19.264-9.545 19.264h-79.088l-10-19.264 10-19.264z"></path>
                  </mask>
                  <path
                    fill="#F69400"
                    stroke="#fff"
                    strokeWidth="2"
                    d="M379.598 475h79.088l9.545 19.264-9.545 19.264h-79.088l-10-19.264 10-19.264z"
                    mask="url(#path-22-inside-6_51_6755)"
                  ></path>
                </g>
                <text
                  id="thruster-set-text"
                  fill="#fff"
                  fontFamily="Roboto"
                  fontSize="30"
                  fontWeight="600"
                  letterSpacing="0"
                  transform="translate(380.386 476.541)"
                  xmlSpace="preserve"
                  style={{ whiteSpace: "pre" }}
                  textAnchor="middle"
                >
                  <tspan x="40" y="27.977">
                    {setAngle}°
                  </tspan>
                </text>
              </g>
              <path
                id="line-SB"
                stroke="#274C85"
                style={{
                  strokeDasharray: rudderPathLength,
                  strokeDashoffset: actAngle < 0 ? rudderPathLength : rudderPathLength * (1 - actAngle / maxAngle),
                  transformOrigin: "center",
                  transformBox: "fill-box",
                }}
                ref={ref => {
                  if (ref) {
                    setRudderPathLength(ref.getTotalLength())
                  }
                }}
                strokeWidth="80"
                d="M418.5 665.5C519 664 593.5 609 632 542"
              ></path>
              <path
                id="line-PS"
                stroke="#274C85"
                style={{
                  strokeDasharray: rudderPathLength,
                  strokeDashoffset: actAngle > 0 ? rudderPathLength : rudderPathLength * (actAngle / maxAngle) - rudderPathLength,
                  transformOrigin: "center",
                  transformBox: "fill-box",
                }}
                strokeWidth="80"
                d="M418.5 665.5C318 664 243.5 609 205 542"
              ></path>
              <path id="zero-line" stroke="#274C85" strokeWidth="4" d="M419 705v-79"></path>
            </g>
          </g>
        </g>
        <text
          id="NAME-RUDDER"
          fill="#737373"
          xmlSpace="preserve"
          style={{ whiteSpace: "pre" }}
          fontFamily="Roboto"
          fontSize="32"
          fontWeight="600"
          letterSpacing="0"
        >
          <tspan x="350" y="840">
            {rudderNAME?.toUpperCase()}
          </tspan>
        </text>
      </g>
      <defs>
        <filter
          id="filter0_d_51_6755"
          width="65.846"
          height="63.345"
          x="386.232"
          y="720"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_51_6755"></feBlend>
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_51_6755" result="shape"></feBlend>
        </filter>
        <filter
          id="filter1_d_51_6755"
          width="183.827"
          height="76.682"
          x="327.24"
          y="502.472"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_51_6755"></feBlend>
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_51_6755" result="shape"></feBlend>
        </filter>
        <filter
          id="filter2_d_51_6755"
          width="106.633"
          height="46.528"
          x="365.598"
          y="475"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_51_6755"></feBlend>
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_51_6755" result="shape"></feBlend>
        </filter>
      </defs>
    </svg>
  )
}
