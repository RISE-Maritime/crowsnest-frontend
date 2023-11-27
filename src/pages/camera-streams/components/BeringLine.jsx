import React from "react"

export default function BearingLine() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 75 851.758"
      style={{ position: "absolute", top: "-225px", left: "45%", height: "600px" }}
    >
      <defs>
        <filter id="_000" width="56" height="47" x="10" y="322" filterUnits="userSpaceOnUse">
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
      </defs>
      <path
        id="Line_459"
        fill="none"
        stroke="#707070"
        strokeLinecap="round"
        strokeWidth="3"
        d="M0 0L0 302.863"
        data-name="Line 459"
        transform="translate(37.5 1.5)"
      ></path>
      <g id="Group_77" data-name="Group 77" transform="translate(-863 -586)">
        <path id="Polygon_23" fill="#182267" d="M37.5 0L75 65H0z" data-name="Polygon 23" transform="translate(863 885)"></path>
        <g filter="url(#_000)" transform="translate(863 586)">
          <text
            id="_000-2"
            fill="#fff"
            data-name="0"
            fontFamily="Roboto-Bold, Roboto"
            fontSize="22"
            fontWeight="700"
            transform="translate(19 351)"
          >
            <tspan x="0" y="0">
              000
            </tspan>
          </text>
        </g>
      </g>
    </svg>
  )
}
