import React from "react"
import { useRecoilState } from "recoil"
import { ATOM_SIM_SHIP_MODELS, ATOM_SIM_ACTIVE_MODELS } from "../../../recoil/atoms"
import { Grid, Button, Stack } from "@mui/material"

export default function SimShipModelSelector() {
  const [simShipModels, setSimShipModels] = useRecoilState(ATOM_SIM_SHIP_MODELS)
  const [simActiveModels, setSimActiveModels] = useRecoilState(ATOM_SIM_ACTIVE_MODELS)

  function selectSimShipModel(simShipModel) {
    setSimActiveModels(simShipModel.id)

    // setSimShipModels(prevSimShipModels => {
    //   return {
    //     ...prevSimShipModels,
    //     [simShipModel.id]: {
    //       ...prevSimShipModels[simShipModel.id],
    //       isActive: true,
    //     },
    //   }
    // })
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <h2>Ship Models</h2>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {Object.values(simShipModels).map((simShipModel, index) => {
            return (
              <Button
                key={index}
                variant="contained"
                color={simActiveModels === simShipModel.id ? "success" : "primary"}
                onClick={() => selectSimShipModel(simShipModel)}
              >
                {simShipModel.name}
              </Button>
            )
          })}
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <h2>Ship Info</h2>
        <p>
          <b>Name:</b> {simShipModels[simActiveModels].name}
          <br />
          <br />
          <b>Engine:</b> {simShipModels[simActiveModels].engine_newton}
          <br />
          <b>Mass:</b> {simShipModels[simActiveModels].mass_kg}kg
          <br />
          <b>Resistance:</b> {simShipModels[simActiveModels].resistance}
        </p>
      </Grid>
    </Grid>
  )
}
