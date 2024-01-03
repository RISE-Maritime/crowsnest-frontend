import React, { useState } from "react";
import { Paper } from "@mui/material";
import { Rnd } from "react-rnd";
import Playback from "../components/Playback";

export default function FloatAppWind() {
  const { innerWidth: width, innerHeight: height } = window;
  const [isDraggable, setIsDraggable] = useState(true);

  return (
    <Rnd
      default={{
        x: width * 0.1,
        y: height * 0.1,
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
        }}
      >
        <Playback setIsDraggable={setIsDraggable} isDraggable={isDraggable} />
      </Paper>
    </Rnd>
  );
}
