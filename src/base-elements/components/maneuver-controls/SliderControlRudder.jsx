import React from "react"
import { Slider } from "@mui/material"
import { styled } from "@mui/material/styles"
import SVGrudder from "./svg/SvgSliderRudder"
import { useRecoilState } from "recoil"
import { ATOM_OS_RUDDERS } from "../../../recoil/atoms.js"

const MySlider = styled(Slider)({
  color: "#ffffff00",
  width: "100%",
  padding: 0,

  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 35,
    height: 35,
    borderRadius: "50% 50% 50% 0%",
    border: "solid",
    borderColor: "#707070",
    backgroundColor: "#404040",

    transformOrigin: "center",
    transform: "translate(0%, 0%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(0%, -25%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
})

function valuetext(value) {
  return `${value}%`
}

export default function SliderControlRudder() {
  const [rudder, setRudder] = useRecoilState(ATOM_OS_RUDDERS)

  function onChangeRud(e) {
    // console.log("ENg change", e.target.value, ui)
    setRudder({
      ...rudder,
      ["RUDDER_0"]: {
        ...rudder["RUDDER_0"],
        setAngle: e.target.value,
      },
    })
  }

  return (
    <div style={{ position: "relative", width: "200px", height: "50px" }}>
      <SVGrudder />
      <MySlider
        orientation="horizontal"
        size="small"
        valueLabelDisplay="on"
        track={false}
        max={100}
        min={-100}
        defaultValue={0}
        valueLabelFormat={valuetext}
        value={rudder?.RUDDER_0?.setAngle}
        onChange={onChangeRud}
        sx={{ position: "absolute", left: "0" }}
      />
    </div>
  )
}
