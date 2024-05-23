import React from "react"
import styled from "@emotion/styled"
import { Paper, Stack, Typography } from "@mui/material"
import { sailControlAction, sailAction } from "../../../recoil/selectors"
import { ATOM_SAIL_CONTROL } from "../../../recoil/atoms"
import { useSetRecoilState, useRecoilState } from "recoil"
import GridHeading from "./GridHeading"
import { ObcButton } from "@oicl/openbridge-webcomponents-react/components/button/button"
import LabelledRadioButton from "./LabelledRadioButton"
import SailControlButtonSlider from "./SailControlButtonSlider"

const NoWrap = styled.span`
  white-space: nowrap;
`

export default function SailControl() {
  const newSailControlAction = useSetRecoilState(sailControlAction)
  const newSailAction = useSetRecoilState(sailAction)
  const [sailControl, setSailControl] = useRecoilState(ATOM_SAIL_CONTROL)

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

  const onSelectSheeting = () => {
    setSailControl(prevState => {
      return {
        ...prevState,
        variableThrustMode: 1,
      }
    })
  }

  const onSelectAutomatic = () => {
    setSailControl(prevState => {
      return {
        ...prevState,
        sheetingMode: prevState.sheetingMode === 2 ? 1 : 2,
      }
    })
  }

  const onSelectManual = () => {
    setSailControl(prevState => {
      return {
        ...prevState,
        sheetingMode: prevState.sheetingMode === 2 ? 1 : 2,
      }
    })
  }

  const onSelectCoupled = () => {
    setSailControl(prevState => {
      return {
        ...prevState,
        coupledSteeringMode: prevState.coupledSteeringMode === 0 ? 1 : 0,
      }
    })
  }

  
  const onSelectUnCoupled = () => {
    setSailControl(prevState => {
      return {
        ...prevState,
        coupledSteeringMode: prevState.coupledSteeringMode === 1 ? 0 : 1,
      }
    })
  }

  return (
    <Paper sx={{ height: "100%" }}>
      <GridHeading
        heading="Sheeting"
        actionButton={
          <LabelledRadioButton
            label="Use sheeting"
            checked={sailControl.variableThrustMode === 1 ? true : false}
            onSelect={onSelectSheeting}
          />
        }
      />

        <div style={{ opacity: sailControl.variableThrustMode === 1 ? "100%" : "10%" }}>
      <Stack direction="row" spacing={1} margin={2} justifyContent="space-between">
        <Stack direction="row" useFlexGap flexWrap="nowrap">
          <Stack alignItems="center">
            <ObcButton checked={sailControl.sheetingMode === 2 ? true : false} variant="check" onClick={onSelectAutomatic}>
              <NoWrap>Automatic control</NoWrap>
            </ObcButton>
            <Typography variant="body2">Relative to wind</Typography>
          </Stack>
          <Stack alignItems="center">
            <ObcButton checked={sailControl.sheetingMode === 1 ? true : false} variant="check" onClick={onSelectManual}>
              <NoWrap>Manual control</NoWrap>
            </ObcButton>
            <Typography variant="body2">Relative to ship</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={0} useFlexGap flexWrap="nowrap">
          <ObcButton  checked={sailControl.coupledSteeringMode === 0 ? true : false} variant="check" onClick={onSelectCoupled}>
            <NoWrap>Coupled sail steering</NoWrap>
          </ObcButton>
          <ObcButton checked={sailControl.coupledSteeringMode === 1 ? true : false} variant="check" onClick={onSelectUnCoupled}>
            <NoWrap>Uncoupled sail steering</NoWrap>
          </ObcButton>
        </Stack>
      </Stack>
      </div>

      <Stack direction="column" spacing={0} paddingLeft={2} paddingRight={2} justifyContent={"space-between"}>
        <SailControlButtonSlider disabled={sailControl.variableThrustMode === 1 ? false : true} />
        <SailControlButtonSlider disabled={(sailControl.variableThrustMode === 1 ) && (sailControl.coupledSteeringMode === 1) ? false : true} />
        <SailControlButtonSlider disabled={(sailControl.variableThrustMode === 1 ) && (sailControl.coupledSteeringMode === 1) ? false : true} />
        <SailControlButtonSlider disabled={(sailControl.variableThrustMode === 1 ) && (sailControl.coupledSteeringMode === 1) ? false : true} />
        <SailControlButtonSlider disabled={(sailControl.variableThrustMode === 1 ) && (sailControl.coupledSteeringMode === 1) ? false : true} />
        <SailControlButtonSlider disabled={(sailControl.variableThrustMode === 1 ) && (sailControl.coupledSteeringMode === 1) ? false : true} />
      </Stack>

    </Paper>
  )
}
