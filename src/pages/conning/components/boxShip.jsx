import React from "react";

export default function BoxShip(props) {
  return (
    <svg
      width="400"
      height="700"
      viewBox="0 0 564 968"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.337708 297.458C0.337708 147.479 202.159 0 282 0C361.841 0 563.662 142.48 563.662 297.458V944C563.662 957.255 552.917 968 539.662 968H24.3377C11.0829 968 0.337708 957.255 0.337708 944V297.458Z"
        fill={props.color || "#404040"}
      />
    </svg>
  );
}
