import React, { useState } from "react"
import GpsFixedIcon from "@mui/icons-material/GpsFixed"
import GpsNotFixedIcon from "@mui/icons-material/GpsNotFixed"
import GpsOffIcon from "@mui/icons-material/GpsOff"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import EditRoundedIcon from "@mui/icons-material/EditRounded"
import { Button, Typography, Stack, FormControl, TextField, Select, MenuItem, Grid, IconButton, InputLabel } from "@mui/material"
import { OS_POSITIONS, OS_POSITION_SETTING } from "../../../recoil/atoms"
import { useRecoilState } from "recoil"
import { formatLatitude, formatLongitude } from "../../../utils"
import { Formik, Form } from "formik"
import * as yup from "yup"

yup.setLocale({
  number: {
    typeError: "test",
    min: "Deve ser maior que ${min}",
  },
})

const validationSchema = yup.object({
  latDeg: yup.number().typeError("A number").max(90, "Max 90°").min(-90, "Min -90°").integer("No decimals").required("Required"),
  latMin: yup.number().typeError("A number").max(60, "Max 60").min(0, "Min 0").required("Required"),
  longDeg: yup
    .number()
    .typeError("A number")
    .max(180, "Max 180°")
    .min(-180, "Min -180°")
    .integer("No decimals")
    .required("Required"),
  longMin: yup.number().typeError("A number").max(60, "Max 60").min(0, "Min 0").required("Required"),
})

export default function PositionStatusSmall() {
  const [osPos, setOsPos] = useRecoilState(OS_POSITIONS)
  const [posSetting, setPosSetting] = useRecoilState(OS_POSITION_SETTING)
  const [viewManualPosInput, setViewManualPosInput] = useState(false)

  const handleChangeGNSSsource = event => {
    const newPosSource = event.target.value
    setPosSetting({
      ...posSetting,
      source: newPosSource,
    })
  }

  const toggleManualPosInput = () => {
    setViewManualPosInput(!viewManualPosInput)
  }

  const initialValuesManual = {
    latDeg: null,
    latMin: null,
    longDeg: null,
    longMin: null,
  }

  /**
   * Set manual position
   * @param {*} values
   */
  const submitManualPos = values => {
    let lat = Number(Number(values.latDeg) + values.latMin / 60)
    let long = Number(Number(values.longDeg) + values.longMin / 60)

    setOsPos({
      ...osPos,
      MANUAL: {
        ...osPos.MANUAL,
        latitude: lat,
        longitude: long,
      },
    })
  }

  const closePosInput = () => {
    setViewManualPosInput(false)
  }

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ marginTop: "0.5rem", padding: "0.5rem" }}>
        <GpsFixedIcon />
        <Stack direction="column" justifyContent="center" alignItems="flex-end">
          <Typography variant="caption">{formatLatitude(osPos[posSetting.source]?.latitude)} </Typography>
          <Typography variant="caption"> {formatLongitude(osPos[posSetting.source]?.longitude)}</Typography>
        </Stack>
        {posSetting.source === "MANUAL" ? (
          <IconButton size="small" onClick={toggleManualPosInput}>
            <EditRoundedIcon size="small" color="info" />
          </IconButton>
        ) : null}

        <FormControl variant="outlined" size="small" sx={{ minWidth: "3rem" }}>
          <InputLabel id="select-gnss-source-label">Position</InputLabel>
          <Select
            labelId="select-gnss-source-label"
            id="select-gnss-source"
            value={posSetting.source}
            onChange={handleChangeGNSSsource}
            label="Position"
            sx={{fontSize: "0.8rem"}}
          >
            {Object.keys(osPos).map(osPoskey => {
              return (
                <MenuItem key={"jhv" + osPoskey} value={osPoskey}>
                  {osPoskey}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Stack>

      {viewManualPosInput ? (
        <div>
          <Formik initialValues={initialValuesManual} onSubmit={submitManualPos} validationSchema={validationSchema}>
            {({ handleChange, values, setFieldValue, touched, errors }) => {
              return (
                <Form>
                  <Grid container spacing={1} justifyContent="center" alignItems="center">
                    <Grid item xs={2}>
                      <Typography variant="h4" align="center">
                        φ
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        id="latDeg"
                        label="Degrees"
                        fullWidth
                        variant="filled"
                        size="small"
                        onChange={handleChange}
                        error={touched.latDeg && Boolean(errors.latDeg)}
                        helperText={touched.latDeg && errors.latDeg}
                      />
                    </Grid>

                    <Grid item xs={5}>
                      <TextField
                        id="latMin"
                        label="Minutes"
                        fullWidth
                        variant="filled"
                        size="small"
                        sx={{ paddingRight: "0.2rem" }}
                        onChange={handleChange}
                        error={touched.latMin && Boolean(errors.latMin)}
                        helperText={touched.latMin && errors.latMin}
                      />
                    </Grid>

                    <Grid item xs={2}>
                      <Typography variant="h4" align="center">
                        λ
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        id="longDeg"
                        label="Degrees"
                        fullWidth
                        variant="filled"
                        size="small"
                        onChange={handleChange}
                        error={touched.longDeg && Boolean(errors.longDeg)}
                        helperText={touched.longDeg && errors.longDeg}
                      />
                    </Grid>

                    <Grid item xs={5}>
                      <TextField
                        id="longMin"
                        label="Minutes"
                        fullWidth
                        variant="filled"
                        size="small"
                        sx={{ paddingRight: "0.2rem" }}
                        onChange={handleChange}
                        error={touched.longMin && Boolean(errors.longMin)}
                        helperText={touched.longMin && errors.longMin}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ width: "100%" }}>
                        <Button color="error" variant="contained" onClick={closePosInput}>
                          <CloseRoundedIcon />
                        </Button>
                        <Button type="submit" variant="contained" color="success">
                          Set position
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Form>
              )
            }}
          </Formik>
        </div>
      ) : null}
    </>
  )
}
