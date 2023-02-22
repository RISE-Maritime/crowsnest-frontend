import React from "react";
import { Paper } from "@mui/material";
import { Rnd } from "react-rnd";
import { useRecoilValue } from "recoil";
// Component
import AppWindCurrent from "../../../pages/conning/components/AppWindCurrent";
import {
  OS_HEADING_SETTING,
  OS_HEADING,
  OS_WIND_SETTING,
  OS_WIND
} from "../../../recoil/atoms";

export default function FloatAppWind() {
  const { innerWidth: width, innerHeight: height } = window;

  const osHeading = useRecoilValue(OS_HEADING)
  const osHeadingSetting = useRecoilValue(OS_HEADING_SETTING)
  const osWind = useRecoilValue(OS_WIND)
  const osWindSetting = useRecoilValue(OS_WIND_SETTING)

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
           heading={osHeading[osHeadingSetting.source]?.heading}
          windSpeedTrue={10}
          windSpeedRel={osWind[osWindSetting.source]?.wind_speed}
          windDirTrue={270}
          windDirRel={osWind[osWindSetting.source]?.wind_angle}
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
