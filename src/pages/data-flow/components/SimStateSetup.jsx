import React, { useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { Typography, Grid, TextField, Button } from "@mui/material"
import { useRecoilValue, useRecoilState } from "recoil"
import { OS_POSITIONS, OS_HEADING, OS_VELOCITY, ATOM_OS_RUDDERS, ATOM_OS_ENGINES, ATOM_SIM_STATE } from "../../../recoil/atoms"
import RestartAltIcon from "@mui/icons-material/RestartAlt"

const validationSchema = yup.object({
  latitude: yup.number().required("Required"),
  longitude: yup.number().required("Required"),
})

export default function SimStateSetup({ restartSim }) {
  const [osHeading, setOsHeading] = useRecoilState(OS_HEADING)
  const [osVelocity, setOsVelocity] = useRecoilState(OS_VELOCITY)
  const [osRudder, setOsRudder] = useRecoilState(ATOM_OS_RUDDERS)
  const [osEng, setOsEng] = useRecoilState(ATOM_OS_ENGINES)
  const [osPositions, setOsPositions] = useRecoilState(OS_POSITIONS)
  const simState = useRecoilValue(ATOM_SIM_STATE)

  // Form handling -------------------------------------------------------------

  const initFormValuesManual = {
    latitude: 57.683,
    longitude: 11.84,
    heading: 80,
    sog: 0,
    cog: 80,
    rot: 0,
    rudder: 0,
    engine: 0,
  }

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: initFormValuesManual,
    onSubmit: values => {
      submitAndUpdateSimulationState(values)
    },
    onReset: values => {
      console.log("Resetting form")
      formik.setValues(initFormValuesManual)
      restartSim()

      setOsPositions({
        ...osPositions,
        SIM: {
          ...osPositions.SIM,
          latitude: initFormValuesManual.latitude,
          longitude: initFormValuesManual.longitude,
        },
      })

      setOsHeading({
        ...osHeading,
        SIM: {
          ...osHeading.SIM,
          heading: initFormValuesManual.heading,
        },
      })

      setOsVelocity({
        ...osVelocity,
        SIM: {
          ...osVelocity.SIM,
          sog: initFormValuesManual.sog,
          cog: initFormValuesManual.cog,
          rot: initFormValuesManual.rot,
        },
      })

      setOsRudder({
        ...osRudder,
        RUDDER_0: {
          ...osRudder.RUDDER_0,
          setAngle: initFormValuesManual.rudder,
        },
      })

      setOsEng({
        ...osEng,
        ENGINE_0: {
          ...osEng.ENGINE_0,
          setPower: initFormValuesManual.engine,
        },
      })
    },
  })

  const submitAndUpdateSimulationState = values => {
    console.log("Form values: ", values)

    setOsPositions({
      ...osPositions,
      SIM: {
        ...osPositions.SIM,
        latitude: Number(values.latitude),
        longitude: Number(values.longitude),
      },
    })

    setOsHeading({
      ...osHeading,
      SIM: {
        ...osHeading.SIM,
        heading: Number(values.heading),
      },
    })

    setOsVelocity({
      ...osVelocity,
      SIM: {
        ...osVelocity.SIM,
        sog: Number(values.sog),
        cog: Number(values.cog),
        rot: Number(values.rot),
      },
    })

    setOsRudder({
      ...osRudder,
      RUDDER_0: {
        ...osRudder.RUDDER_0,
        setAngle: Number(values.rudder),
      },
    })

    setOsEng({
      ...osEng,
      ENGINE_0: {
        ...osEng.ENGINE_0,
        setPower: Number(values.engine),
      },
    })

    return values
  }

  useEffect(() => {
    formik.setFieldValue("longitude", osPositions.SIM?.longitude)
  }, [osPositions.SIM?.latitude])
  useEffect(() => {
    formik.setFieldValue("latitude", osPositions.SIM?.latitude)
  }, [osPositions.SIM?.latitude])
  useEffect(() => {
    formik.setFieldValue("heading", osHeading.SIM?.heading)
  }, [osHeading.SIM?.heading])
  useEffect(() => {
    formik.setFieldValue("sog", osVelocity.SIM?.sog)
  }, [osVelocity.SIM?.sog])
  useEffect(() => {
    formik.setFieldValue("cog", osVelocity.SIM?.cog)
  }, [osVelocity.SIM?.cog])
  useEffect(() => {
    formik.setFieldValue("rot", osVelocity.SIM?.rot)
  }, [osVelocity.SIM?.rot])
  useEffect(() => {
    formik.setFieldValue("rudder", osRudder.RUDDER_0?.setAngle)
  }, [osRudder.RUDDER_0?.setAngle])
  useEffect(() => {
    formik.setFieldValue("engine", osEng.ENGINE_0?.setPower)
  }, [osEng.ENGINE_0?.setPower])

  return (
    <div style={{paddingRight: "1rem"}}> 
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1} justifyContent="center" alignItems="flex-start">
          <Grid item xs={12}>
            <Typography variant="h6">
              <b> Own Ship State </b>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="latitude"
              label="Latitude (°)"
              fullWidth
              variant="filled"
              size="small"
              disabled={simState.state === "RUNNING"}
              defaultValue={formik.values.latitude}
              value={formik.values.latitude}
              onChange={formik.handleChange}
              error={formik.touched.latitude && Boolean(formik.errors.latitude)}
              helperText={formik.touched.latitude && formik.errors.latitude}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="longitude"
              label="Longitude (°)"
              fullWidth
              variant="filled"
              size="small"
              disabled={simState.state === "RUNNING"}
              defaultValue={formik.values.longitude}
              value={formik.values.longitude}
              onChange={formik.handleChange}
              error={formik.touched.longitude && Boolean(formik.errors.longitude)}
              helperText={formik.touched.longitude && formik.errors.longitude}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="heading"
              label="Heading (°)"
              fullWidth
              variant="filled"
              size="small"
              disabled={simState.state === "RUNNING"}
              defaultValue={formik.values.heading}
              value={formik.values.heading}
              onChange={formik.handleChange}
              error={formik.touched.heading && Boolean(formik.errors.heading)}
              helperText={formik.touched.heading && formik.errors.heading}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="sog"
              label="SOG (kts)"
              fullWidth
              variant="filled"
              size="small"
              disabled={simState.state === "RUNNING"}
              defaultValue={formik.values.sog}
              value={formik.values.sog}
              onChange={formik.handleChange}
              error={formik.touched.sog && Boolean(formik.errors.sog)}
              helperText={formik.touched.sog && formik.errors.sog}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="cog"
              label="COG (°)"
              fullWidth
              variant="filled"
              size="small"
              disabled={simState.state === "RUNNING"}
              defaultValue={formik.values.cog}
              value={formik.values.cog}
              onChange={formik.handleChange}
              error={formik.touched.cog && Boolean(formik.errors.cog)}
              helperText={formik.touched.cog && formik.errors.cog}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="rot"
              label="ROT (°/min)"
              fullWidth
              variant="filled"
              size="small"
              disabled={simState.state === "RUNNING"}
              defaultValue={formik.values.rot}
              value={formik.values.rot}
              onChange={formik.handleChange}
              error={formik.touched.rot && Boolean(formik.errors.rot)}
              helperText={formik.touched.rot && formik.errors.rot}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="rudder"
              label="Rudder (%)"
              fullWidth
              variant="filled"
              size="small"
              disabled={simState.state === "RUNNING"}
              defaultValue={formik.values.rudder}
              value={formik.values.rudder}
              onChange={formik.handleChange}
              error={formik.touched.rudder && Boolean(formik.errors.rudder)}
              helperText={formik.touched.rudder && formik.errors.rudder}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="engine"
              label="Engine (%)"
              fullWidth
              variant="filled"
              size="small"
              disabled={simState.state === "RUNNING"}
              defaultValue={formik.values.engine}
              value={formik.values.engine}
              onChange={formik.handleChange}
              error={formik.touched.engine && Boolean(formik.errors.engine)}
              helperText={formik.touched.engine && formik.errors.engine}
            />
          </Grid>

          <Grid item xs={9}>
            <Button variant="contained" color="primary" type="submit" disabled={simState.state === "RUNNING"} fullWidth={true}>
              Update Simulation State
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="error"
              onClick={formik.resetForm}
              disabled={simState.state === "RUNNING"}
              fullWidth={true}
            >
              <RestartAltIcon />
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
