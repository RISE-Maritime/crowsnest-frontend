import React, { useState } from "react"
import { Paper, Stack, IconButton } from "@mui/material"
import { Rnd } from "react-rnd"
import SliderControlThruster from "../components/maneuver-controls/SliderControlThruster"
import SliderControlRudder from "../components/maneuver-controls/SliderControlRudder"
import SliderControlEng from "../components/maneuver-controls/SliderControlEng"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import LockIcon from "@mui/icons-material/Lock"

export default function FloatAppWind() {
  const { innerWidth: width, innerHeight: height,  } = window
  const pageHeight = document.documentElement.scrollHeight
  const scrollPosition = window.scrollY;
  const [isDraggable, setIsDraggable] = useState(true)

  const toggleDraggable = () => {
    setIsDraggable(!isDraggable)
  }

  return (
    <Rnd
      default={{
        x: width * 0.05,
        y: scrollPosition + 50,
      }}
      style={{ zIndex: "10000" }}
      disableDragging={!isDraggable}
    >
      <Paper
        sx={{
          width: "100%",
          minWidth: "20vw",
          height: "100%",
          opacity: "0.7",
          padding: "1rem",
        }}
      >
        {isDraggable ? (
          <IconButton onClick={toggleDraggable} sx={{ height: 35, width: 35 }}>
            <LockOpenIcon />
          </IconButton>
        ) : (
          <IconButton onClick={toggleDraggable} sx={{ height: 35, width: 35 }}>
            <LockIcon />
          </IconButton>
        )}

        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ paddingTop: "1rem" }}>
          <SliderControlThruster />
          <SliderControlEng />
          <br />
          <SliderControlRudder />
        </Stack>
      </Paper>
    </Rnd>
  )
}
