import React from "react";
import { Paper,Button } from "@mui/material";
import { Rnd } from "react-rnd";

export default function FloatApp() {
  const { innerWidth: width, innerHeight: height } = window;
  console.log("HERE", width, height);
  return (
    <Rnd
      default={{
        x: width * 0.1,
        y: height * 0.1,
      }}
      style={{ zIndex: "10000" }}
    >
      <Paper
        sx={{
          width: "100%",
          height: "100%",
          padding: "0.5rem",
        }}
      >
        <div>Drag from here</div>
        <div>Drag from here</div>
        <div>Drag from here</div>
        <div>Drag from here</div>
        <div>Drag from here</div> <div>Drag from here</div>
        <div>Drag from here</div>
        <Button>Hello</Button>
      </Paper>
    </Rnd>
  );
}
