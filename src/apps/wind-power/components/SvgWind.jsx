import React from 'react'

export default function SvgWind({windAngle}) {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="156"
    fill="none"
    viewBox="0 0 20 156"
    style={{transform: "rotate("+windAngle+"deg)"}}
     
  >
    <g stroke="#000">
      <path
        strokeWidth="2"
        d="M10 14.784V2.167m0 12.617l4-4.588m-4 4.588l-4-4.588"
      ></path>
      {/* <path d="M0.5 0.5H19.5V155.5H0.5z"></path> */}
    </g>
  </svg>
  )
}
