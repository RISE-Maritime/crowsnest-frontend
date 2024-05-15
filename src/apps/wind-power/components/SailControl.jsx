import React from "react"
import { Button, Paper, Stack, FormGroup, FormControlLabel, Checkbox, Radio, Typography } from "@mui/material"
import { sailControlAction, sailAction } from "../../../recoil/selectors"
import { useSetRecoilState } from "recoil"
import CardHeading from "./CardHeading"
import { ObcButton } from "@oicl/openbridge-webcomponents-react/components/button/button"

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
      <CardHeading heading="Sheeting" />

      <Stack direction="row" spacing={2} padding={1} useFlexGap flexWrap="wrap" justifyContent="space-between">
        <FormGroup>
          <FormControlLabel control={<Radio defaultChecked />} label="Use sheeting" />
        </FormGroup>

        <Stack direction="row" spacing={0} useFlexGap flexWrap="wrap">
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
      <Button onClick={makeQuerySailControl}>TEST QUERY SAIL CONTROL</Button>
      <br />
      <Button onClick={makeQuerySails}>TEST QUERY SAILS</Button>
    </Paper>
  )
}
