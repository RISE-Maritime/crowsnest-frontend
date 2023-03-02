import React from "react"
import { Paper } from "@mui/material"
import { Rnd } from "react-rnd"
import { useRecoilValue } from "recoil"
// Component
import AppWindCurrent from "../../../pages/conning/components/AppWindCurrent"
import { OS_HEADING_SETTING, OS_HEADING, OS_WIND_SETTING, OS_WIND, OS_VELOCITY, OS_VELOCITY_SETTING } from "../../../recoil/atoms"
import { calc_wind_speed_and_dir_true } from "../../../utils"


export default function FloatAppWind() {
  const { innerWidth: width, innerHeight: height } = window

  const osHeading = useRecoilValue(OS_HEADING)
  const osHeadingSetting = useRecoilValue(OS_HEADING_SETTING)
  const osWind = useRecoilValue(OS_WIND)
  const osWindSetting = useRecoilValue(OS_WIND_SETTING)
  const osVelocity = useRecoilValue(OS_VELOCITY)
  const osVelocitySetting = useRecoilValue(OS_VELOCITY_SETTING)

  const true_wind = calc_wind_speed_and_dir_true(
    // osHeading[osHeadingSetting.source]?.heading,
   45,
    osVelocity[osVelocitySetting.source]?.sog,
    osWind[osWindSetting.source]?.wind_speed,
    osWind[osWindSetting.source]?.wind_angle
  )


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
          sog={osVelocity[osVelocitySetting.source]?.sog}
          windSpeedRel={osWind[osWindSetting.source]?.wind_speed}
          windDirRel={osWind[osWindSetting.source]?.wind_angle}
          windSpeedTrue={true_wind.speed}
          windDirTrue={true_wind.direction}
          windDirDistribution={90}
          currentSpeedTrue={20}
          currentSpeedRel={10}
          currentDirTrue={50}
          currentDirRel={90}
          currentDirDistribution={40}
        />
      </Paper>
    </Rnd>
  )
}
