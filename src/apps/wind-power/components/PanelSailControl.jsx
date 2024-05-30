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

export default function PanelSailControl() {
  const setSailControlAction = useSetRecoilState(sailControlAction)
  const [sailControl, setSailControl] = useRecoilState(ATOM_SAIL_CONTROL)

  const onSelectSheeting = () => {
    setSailControl(prevState => {
      return {
        ...prevState,
        variableThrustMode: 0,
      }
    })
    setSailControlAction({ variableThrustMode: 0 })
  }

  const onSelectAutomatic = () => {
    setSailControl(prevState => {
      return {
        ...prevState,
        sheetingMode: 2,
      }
    })
    setSailControlAction({ sheetingMode: 2 })
  }

  const onSelectManual = () => {
    setSailControl(prevState => {
      return {
        ...prevState,
        sheetingMode: 1,
      }
    })
    setSailControlAction({ sheetingMode: 1 })
  }

  const onSelectCoupled = () => {
    setSailControl(prevState => {
      return {
        ...prevState,
        coupledSteeringMode: 1,
      }
    })
    setSailControlAction({ coupledSteeringMode: 1 })
  }

  const onSelectUnCoupled = () => {
    setSailControl(prevState => {
      return {
        ...prevState,
        coupledSteeringMode: 0,
      }
    })
    setSailControlAction({ coupledSteeringMode: 0 })
  }

  return (
    <Paper sx={{ height: "100%" }}>
      <GridHeading
        heading="Sheeting"
        actionButton={
          <LabelledRadioButton
            label="Use sheeting"
            checked={sailControl.variableThrustMode === 0 ? true : false}
            onSelect={onSelectSheeting}
          />
        }
      />

      <div style={{ opacity: sailControl.variableThrustMode === 0 ? "100%" : "10%" }}>
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
            <ObcButton checked={sailControl.coupledSteeringMode === 1 ? true : false} variant="check" onClick={onSelectCoupled}>
              <NoWrap>Coupled sail steering</NoWrap>
            </ObcButton>
            <ObcButton checked={sailControl.coupledSteeringMode === 0 ? true : false} variant="check" onClick={onSelectUnCoupled}>
              <NoWrap>Uncoupled sail steering</NoWrap>
            </ObcButton>
          </Stack>
        </Stack>
      </div>

      <Stack direction="column" spacing={0} paddingLeft={2} paddingRight={2} justifyContent={"space-between"}>
        <SailControlButtonSlider sailId={"0"} disabled={sailControl.variableThrustMode === 0 ? false : true} />
        <SailControlButtonSlider
          sailId={"1"}
          disabled={sailControl.variableThrustMode === 0 && sailControl.coupledSteeringMode === 0 ? false : true}
        />
        <SailControlButtonSlider
          sailId={"2"}
          disabled={sailControl.variableThrustMode === 0 && sailControl.coupledSteeringMode === 0 ? false : true}
        />
        <SailControlButtonSlider
          sailId={"3"}
          disabled={sailControl.variableThrustMode === 0 && sailControl.coupledSteeringMode === 0 ? false : true}
        />
        <SailControlButtonSlider
          sailId={"4"}
          disabled={sailControl.variableThrustMode === 0 && sailControl.coupledSteeringMode === 0 ? false : true}
        />
        <SailControlButtonSlider
          sailId={"5"}
          disabled={sailControl.variableThrustMode === 0 && sailControl.coupledSteeringMode === 0 ? false : true}
        />
      </Stack>
    </Paper>
  )
}
