import React from "react";
import { Paper } from "@mui/material";
import { Rnd } from "react-rnd";
// Component
import AppWindCurrent from "../../../pages/conning/components/AppWindCurrent";

export default function FloatAppWind() {
  const { innerWidth: width, innerHeight: height } = window;

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
        }}
      >
        <AppWindCurrent
          heading={45}
          windSpeedTrue={10}
          windSpeedRel={20}
          windDirTrue={270}
          windDirRel={180}
          windDirDistribution={90}
          currentSpeedTrue={20}
          currentSpeedRel={10}
          currentDirTrue={50}
          currentDirRel={90}
          currentDirDistribution={40}
        />
      </Paper>
    </Rnd>
  );
}
