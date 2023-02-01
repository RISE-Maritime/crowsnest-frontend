import React, { useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { atomPlatforms, atomActivePlatform, appState, targetsAIS, OS_POSITION_SETTING } from "../../../recoil/atoms"
import { Grid, Button, Stack, Typography } from "@mui/material"
import styled from "styled-components"
import PlatformQuickDescription from "./PlatformQuickDescription"

import PicDevice from "../../../resources/platforms/devise.png"
import PicAis from "../../../resources/platforms/ais.png"

// Component styling
const Input = styled("input")({
  display: "none",
})

const BoxStyled = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 0.5rem 0rem;
  min-width: 98%;
`

export default function PickerExternalSensor() {
  const platforms = useRecoilValue(atomPlatforms)
  const [appObj, setAppObj] = useRecoilState(appState)
  const [activePlatform, setActivePlatform] = useRecoilState(atomActivePlatform)
  const [position_setting, set_position_setting] = useRecoilState(OS_POSITION_SETTING)
  const AIStargets = useRecoilValue(targetsAIS)

  const [aisFiltered, setAisFiltered] = useState([])
  const [AISmmsi, setAISmmsi] = useState({})

  const updateTargetList = () => {
    setAisFiltered(AIStargets)
  }

  // Activating platform as source
  const selectedPlatform = platform => {
    console.log(platform)
    setActivePlatform({
      ...activePlatform,
      ...platform,
      platformName: platform.name,
      activePlatformType: "PLATFORM",
      mmsi: platform.mmsi,
      imo: platform.imo,
    })
    setAppObj({
      ...appObj,
      activeVessel: platform.name,
    })
    set_position_setting({
      ...position_setting,
      source: platform.source_position,
    })
  }




  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ padding: "1rem" }}>
          Select external source
        </Typography>
      </Grid>

      <Grid item xs={12} sx={{ display: "grid", placeItems: "center" }}>
        {/* PLATFORMS */}
        <BoxStyled>
          <Typography variant="h5">Platforms</Typography>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ margin: "0.5rem" }}>
            {Object.values(platforms).map(platform => {
              return (
                <Button
                  color="secondary"
                  variant={platform.mmsi == activePlatform.mmsi ? "contained" : "outlined"}
                  key={platform.key}
                  onClick={() => selectedPlatform(platform)}
                >
                  {platform.name}
                </Button>
              )
            })}
          </Stack>
        </BoxStyled>
      </Grid>

      {/* Preview of selected viewpoint */}
      {/* <Grid item xs={4} sx={{ display: "grid", placeItems: "center" }}>
        <BoxStyled>
          <PlatformQuickDescription />
        </BoxStyled>
      </Grid> */}
    </Grid>
  )
}
