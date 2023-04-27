import React, { useState } from "react"
import { atom, useRecoilState, useRecoilValue } from "recoil"
import { atomPlatforms, atomActivePlatform, appState, targetsAIS, OS_POSITION_SETTING } from "../../../recoil/atoms"
import { Grid, TextField, Button, Stack, Typography, Autocomplete } from "@mui/material"
import styled from "styled-components"
import DefaultAisTargets from "./DefaultAisTargets"

import AutorenewIcon from "@mui/icons-material/Autorenew"
import PlatformQuickDescription from "./PlatformQuickDescription"

import PicDevice from "../../../resources/platforms/devise.png"
import PicAis from "../../../resources/platforms/ais.png"

// Selected vessel profile
export const atomSelectedOwnShipDatSource = atom({
  key: "selected_own_ship_data_source",
  default: null,
})

// Selected vessel profile
export const atomSelectedVesselModel = atom({
  key: "selected_vessel_model",
  default: {
    imo: 1234567,
    mmsi: 230629000,
    name: "Ship Name",
    call_sign: "",
    loa: 100,
    beam: 15,
    vessel_type: "Unknown",
    dwt: 4000,
    gt: 2000,
  },
})

export const atomOwnShipData = atom({
  key: "own_ship_data_local",
  default: {
    externalTimestamp: "2020",
    sog: 0,
    cog: 0,
    heading: 0,
    latitude: 0,
    longitude: 0,
    draught: 0,
    destination: "",
    navStatus: 0,
  },
})

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

export default function PlatformPicker() {
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

  // Activating DEVICE as OS
  const setDeviceAsOS = () => {
    setActivePlatform({
      ...activePlatform,
      activePlatformType: "DEVICE",
      platformName: "Own Device",
      mmsi: 1000,
      imo: 1000,
      picture: PicDevice,
    })

    set_position_setting({
      ...position_setting,
      source: "DEVICE",
    })
  }

  // Activating AIS target as OS
  const connectAISmmsi = () => {
    // console.log(AISmmsi);

    setActivePlatform({
      ...activePlatform,
      platformName: AISmmsi.shipname,
      activePlatformType: "AIS",
      mmsi: AISmmsi.mmsi,
      picture: PicAis,
    })

    set_position_setting({
      ...position_setting,
      source: "AIS",
    })
  }

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ padding: "1rem" }}>
          Select own ship source
        </Typography>
      </Grid>
      <Grid item xs={8} sx={{ display: "grid", placeItems: "center" }}>
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

        <BoxStyled>
          <Stack direction="row">
            <Typography variant="h5">AIS ({aisFiltered.length} targets)</Typography>{" "}
            <Button onClick={updateTargetList}>
              <AutorenewIcon /> Update AIS List
            </Button>
          </Stack>

          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ margin: "1rem" }}>
            <Autocomplete
              id="group"
              name="group"
              options={aisFiltered}
              onChange={(e, value) => {
                setAISmmsi(value)
                console.log(value)
              }}
              getOptionLabel={option => option.shipname + " (" + option.mmsi + ")"}
              renderInput={params => (
                <TextField
                  sx={{ width: "18rem" }}
                  required
                  fullWidth
                  variant="standard"
                  {...params}
                  label="mmsi"
                  id="mmsi"
                  name="mmsi"
                />
              )}
            />

            <Button color="secondary" variant="outlined" onClick={connectAISmmsi}>
              Connect to MMSI
            </Button>
          </Stack>

          {/* Saved AIS targets */}
          <hr />
          <Typography variant="subtitle1">Saved AIS targets</Typography>
          <DefaultAisTargets aisFiltered={AIStargets} />
        </BoxStyled>

        <BoxStyled>
          <Typography variant="h5">Device</Typography>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ margin: "1rem" }}>
            <Button
              color="secondary"
              variant={"DEVICE" === activePlatform.activePlatformType ? "contained" : "outlined"}
              onClick={setDeviceAsOS}
            >
              Use device sensors as source
            </Button>
          </Stack>
        </BoxStyled>

        <BoxStyled>
          <Typography variant="h5">Replay log (Coming soon)</Typography>
          <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" />
            <Button variant="outlined" disabled={true} component="span" color="secondary">
              Upload file
            </Button>
          </label>
        </BoxStyled>
      </Grid>

      {/* Preview of selected viewpoint */}
      <Grid item xs={4} sx={{ display: "grid", placeItems: "center" }}>
        <BoxStyled>
          <PlatformQuickDescription />
        </BoxStyled>
      </Grid>
    </Grid>
  )
}
