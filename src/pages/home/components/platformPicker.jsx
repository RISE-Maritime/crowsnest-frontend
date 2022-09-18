import React, { useState } from "react"
import { atom, useRecoilState, useRecoilValue } from "recoil"
import { atomPlatforms, atomActivePlatform, appState, targetsAIS } from "../../../recoil/atoms"
import { useFormik } from "formik"
import * as yup from "yup"
import { Grid, TextField, Button, Stack, Typography, Autocomplete } from "@mui/material"
import styled from "styled-components"
import DefaultAisTargets from "./DefaultAisTargets"

import AutorenewIcon from "@mui/icons-material/Autorenew"
import PlatformQuickDescription from "./PlatformQuickDescription"

import PicDevice from "../../../resources/platforms/devise.png"

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

const validationSchema = yup.object({
  mmsi: yup.number("Enter MMSI number with 9 digits").min(8, "Enter more numbers").required("MMIS number is required"),
})

export default function PlatformPicker() {
  const [platforms, setPlatforms] = useRecoilState(atomPlatforms)
  const [appObj, setAppObj] = useRecoilState(appState)
  const [activePlatform, setActivePlatform] = useRecoilState(atomActivePlatform)
  const AIStargets = useRecoilValue(targetsAIS)

  const [aisFiltered, setAisFiltered] = useState([])

  // useEffect(() => {}, [])

  const updateTargetList = () => {
    console.log(AIStargets)
    setAisFiltered(AIStargets)
  }

  // Activating platform as source
  const selectedPlatform = platform => {
    console.log(platform)
    setActivePlatform({
      ...activePlatform,
      ...platform,
      activePlatformKey: platform.key,
      platformName: platform.name,
      activePlatformType: "PLATFORM",
      mmsi: platform.mmsi,
      imo: platform.imo,
    })
    setAppObj({
      ...appObj,
      activeVessel: platform.name,
    })
  }

  // Activating device as source
  const selectedDevice = () => {
    setActivePlatform({
      ...activePlatform,
      activePlatformKey: "device",
      platformName: "Own Device",
      activePlatformType: "DEVICE",
      mmsi: 0,
      imo: 0,
      picture: PicDevice,
    })
  }

  const formik = useFormik({
    initialValues: {
      mmsi: "",
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log("HERE:", values)
    },
  })

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ padding: "1rem" }}>
          Select own view source{" "}
        </Typography>
      </Grid>
      <Grid item xs={8} sx={{ display: "grid", placeItems: "center" }}>
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

          <form onSubmit={formik.handleSubmit}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ margin: "1rem" }}>
              <Autocomplete
                id="group"
                name="group"
                options={aisFiltered}
                onChange={(e, value) => {
                  formik.setFieldValue("mmsi", value.mmsi)
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
                    error={formik.touched.group && Boolean(formik.errors.group)}
                    helperText={formik.touched.group && formik.errors.group}
                  />
                )}
              />

              <Button color="secondary" variant="outlined" type="submit">
                Connect to MMSI
              </Button>
            </Stack>

            {/* Saved AIS targets */}
            <hr />
            <Typography variant="subtitle1">Saved AIS targets</Typography>
            <DefaultAisTargets aisFiltered={AIStargets} />
          </form>
        </BoxStyled>

        <BoxStyled>
          <Typography variant="h5">Devise</Typography>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ margin: "1rem" }}>
            <Button
              color="secondary"
              variant={"device" === activePlatform.activePlatformKey ? "contained" : "outlined"}
              onClick={selectedDevice}
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
