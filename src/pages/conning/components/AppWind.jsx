import React, { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { useSpring, animated, config } from "react-spring";

function Icon() {
  const [degCover, setDegCover] = useState(180);
  const [pathL, setPathL] = useState(null);
  const [pathCover, setPathCover] = useState(0);

  useEffect(() => {
    outRing();
  }, [pathL]);

  const outRing = () => {
    let oneDegPx = pathL / 360;
    let coverPx = (360 - degCover) * oneDegPx;

    setPathCover(coverPx);
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="245"
      height="261.512"
      viewBox="0 0 245 261.512"
    >
      <circle
        cx="122.5"
        cy="122.5"
        r="122.5"
        fill="#2e366f"
        data-name="Ellipse 9"
        transform="translate(0 16.512)"
        style={{}}
      ></circle>

      <path
        fill="#d11919"
        d="M33.872 11.277L72.281 181.8H0L33.872 11.277z"
        data-name="Path 74"
        transform="translate(86 42.235) rotate(310)"
        style={{
          transformOrigin: "center",
          transformBox: "fill-box",
        }}
      ></path>

      <g
        data-name="Group 2"
        transform="translate(-1507 -96) rotate(30)"
        style={{
          transformOrigin: "center",
          transformBox: "fill-box",
        }}
      >
        <g
          fill="rgba(255,255,255,0)"
          stroke="#707070"
          strokeWidth="1"
          data-name="Rectangle 75"
          transform="translate(1616 96)"
        >
          <path stroke="none" d="M0 0H28V275H0z"></path>
          <path fill="none" d="M0.5 0.5H27.5V274.5H0.5z"></path>
        </g>
        <path
          fill="#3f7d00"
          d="M12.887 27.789L27.5 11.277H0l12.887 16.512z"
          data-name="Path 75"
          transform="translate(1616.5 85.211)"
        ></path>
      </g>


      <path
        ref={(ref) => {
          if (ref) {
            setPathL(ref.getTotalLength());
            console.log(ref.getTotalLength());
          }
        }}
        fill="none"
        stroke="#57b236"
        strokeWidth="9"
        d="M133.695 9.883c10.9-.61 126.282-4.4 124.824 129.878S140.364 261.938 133.695 263.267 14.942 265.483 5.047 136.935 122.795 10.493 133.695 9.883z"
        data-name="Path 76"
        transform="rotate(270)"
        style={{
          strokeDasharray: pathL,
          strokeDashoffset: pathCover,
          transformOrigin: "center",
          transformBox: "fill-box",
        }}
      ></path>
    </svg>
  );
}

export default Icon;
