import React from "react"
import { ButtonGroup, Button, Paper, Stack, Typography, Grid } from "@mui/material"
import { sailControlAction, sailAction } from "../../../recoil/selectors"
import { useSetRecoilState } from "recoil"
import GridHeading from "./GridHeading"
import { ObcButton } from "@oicl/openbridge-webcomponents-react/components/button/button"
import LabelledRadioButton from "./LabelledRadioButton"

export default function SailControl() {
  const newSailControlAction = useSetRecoilState(sailControlAction)
  const newSailAction = useSetRecoilState(sailAction)

  const makeQuerySailControl = () => {
    console.log("makeQuerySailControl")
    newSailControlAction({
      sheetingMode: 0, // (int) 1= manual, 2= automatic
      coupledSteeringMode: 0, // (int) 0=activated, 1=deactivated
      variableThrustMode: 0, // (int) 0=activated, 1=deactivated
      variableThrustSetPct: 0.4, // (float) 0.0 -> 1.0 = 0% -> 100%
    })
  }

  const makeQuerySails = () => {
    console.log("makeQuerySails")
    newSailAction({
      sailId: 0,
      isActiveMode: 0, // (int) 0=activated, 1=deactivated
      sheetingAngleSetDeg: 45, // # (float) -180 to 180 degrees
    })
  }

  return (
    <Paper>
      <GridHeading heading="Sheeting" actionButton={<LabelledRadioButton label="Use sheeting" checked={true} />} />

      <Stack direction="row" spacing={1} margin={2} justifyContent="space-between">
        <Stack direction="row" useFlexGap flexWrap="wrap">
          <Stack alignItems="center">
            <ObcButton checked={false} variant="check" onClick={() => console.log("hej")}>
              Automatic control
            </ObcButton>
            <Typography variant="body2">Relative to wind</Typography>
          </Stack>
          <Stack alignItems="center">
            <ObcButton checked={true} variant="check" onClick={() => console.log("hej")}>
              Manual control
            </ObcButton>
            <Typography variant="body2">Relative to ship</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={0} useFlexGap flexWrap="wrap">
          <ObcButton checked={false} variant="check" onClick={() => console.log("hej")}>
            Coupled sail steering
          </ObcButton>
          <ObcButton checked={true} variant="check" onClick={() => console.log("hej")}>
            Uncoupled sail steering
          </ObcButton>
        </Stack>
      </Stack>

      <Grid container direction="column" spacing={0} paddingLeft={2} paddingRight={2}>
        <Grid item sx={{ borderTop: "1px solid red", alignContent: "center" }} paddingTop={6} paddingBottom={6}>
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button>-10</Button>
            <Button>-5</Button>
            <Button>-1</Button>
            <Button>+1</Button>
            <Button>+5</Button>
            <Button>+10</Button>
          </ButtonGroup>
        </Grid>
        <Grid item sx={{ borderTop: "1px solid red", alignContent: "center" }} paddingTop={6} paddingBottom={6}>
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button>-10</Button>
            <Button>-5</Button>
            <Button>-1</Button>
            <Button>+1</Button>
            <Button>+5</Button>
            <Button>+10</Button>
          </ButtonGroup>
        </Grid>
        <Grid item sx={{ borderTop: "1px solid red", alignContent: "center" }} paddingTop={6} paddingBottom={6}>
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button>-10</Button>
            <Button>-5</Button>
            <Button>-1</Button>
            <Button>+1</Button>
            <Button>+5</Button>
            <Button>+10</Button>
          </ButtonGroup>
        </Grid>
        <Grid item sx={{ borderTop: "1px solid red", alignContent: "center" }} paddingTop={6} paddingBottom={6}>
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button>-10</Button>
            <Button>-5</Button>
            <Button>-1</Button>
            <Button>+1</Button>
            <Button>+5</Button>
            <Button>+10</Button>
          </ButtonGroup>
        </Grid>
        <Grid item sx={{ borderTop: "1px solid red", alignContent: "center" }} paddingTop={6} paddingBottom={6}>
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button>-10</Button>
            <Button>-5</Button>
            <Button>-1</Button>
            <Button>+1</Button>
            <Button>+5</Button>
            <Button>+10</Button>
          </ButtonGroup>
        </Grid>
        <Grid item sx={{ borderTop: "1px solid red", alignContent: "center" }} paddingTop={6} paddingBottom={6}>
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button>-10</Button>
            <Button>-5</Button>
            <Button>-1</Button>
            <Button>+1</Button>
            <Button>+5</Button>
            <Button>+10</Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      <div>
        <Button onClick={makeQuerySailControl}>TEST QUERY SAIL CONTROL</Button>
        <br />
        <Button onClick={makeQuerySails}>TEST QUERY SAILS</Button>
      </div>
    </Paper>
  )
}
