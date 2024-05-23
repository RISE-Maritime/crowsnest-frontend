import React from "react"
import { Paper, Typography, Grid, Stack } from "@mui/material"
import { ObcWatch } from "@oicl/openbridge-webcomponents-react/navigation-instruments/watch/watch"
import SailPNG from "../../../resources/Sail.png"
import styled from "@emotion/styled"
import GridHeading from "./GridHeading"
import { ObcInstrumentField } from "@oicl/openbridge-webcomponents-react/navigation-instruments/instrument-field/instrument-field"
import SvgWind from "./SvgWind"
import { ATOM_SAILS, ATOM_SAIL_CONTROL } from "../../../recoil/atoms"
import { useRecoilValue } from "recoil"

const ShipOutline = styled.div`
  position: relative;
  padding: 3rem 2rem 2rem;
  border-radius: 50% 50% 0% 0% / 17% 17% 0% 0%;
  border: 3px solid var(--border-outline-color);
  width: 205px;
`

const SailWrapper = styled.div`
  position: relative;
`

const SailImageWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const WindImageWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const SailImage = styled.img`
  transform: rotate(${props => props.angle}deg);
  transition: transform 1s ease-in-out;
  max-height: 100px;
  width: auto;

  &:hover {
    transform: rotate(90deg);
  }
`

export default function SailPositions() {
  let sails = useRecoilValue(ATOM_SAILS)
  let sailControl = useRecoilValue(ATOM_SAIL_CONTROL)

  return (
    <Paper sx={{ height: "100%" }}>
      <GridHeading heading="Sail positions" />

      <Grid container paddingY={1} paddingX={2}>
        <Grid item xs={6}>
          <ShipOutline>
            <SailWrapper>
              <ObcWatch />
              <SailImageWrapper>
                <SailImage src={SailPNG} angle={sails.sail_1.sheetingAngleActualDeg} />
              </SailImageWrapper>
              <WindImageWrapper>
                <SvgWind windAngle={sails.sail_1.windTrueAngleDeg} />
              </WindImageWrapper>
            </SailWrapper>
            <SailWrapper>
              <ObcWatch />
              <SailImageWrapper>
                <SailImage src={SailPNG} angle={sails.sail_1.sheetingAngleActualDeg}/>
              </SailImageWrapper>
              <WindImageWrapper>
                <SvgWind windAngle={sails.sail_2.windTrueAngleDeg} />
              </WindImageWrapper>
            </SailWrapper>
            <SailWrapper>
              <ObcWatch />
              <SailImageWrapper>
                <SailImage src={SailPNG} angle={sails.sail_1.sheetingAngleActualDeg} />
              </SailImageWrapper>
              <WindImageWrapper>
                <SvgWind windAngle={sails.sail_3.windTrueAngleDeg} />
              </WindImageWrapper>
            </SailWrapper>
            <SailWrapper>
              <ObcWatch />
              <SailImageWrapper>
                <SailImage src={SailPNG} angle={sails.sail_1.sheetingAngleActualDeg}/>
              </SailImageWrapper>
              <WindImageWrapper>
                <SvgWind windAngle={sails.sail_4.windTrueAngleDeg} />
              </WindImageWrapper>
            </SailWrapper>
            <SailWrapper>
              <ObcWatch />
              <SailImageWrapper>
                <SailImage src={SailPNG} angle={sails.sail_1.sheetingAngleActualDeg}/>
              </SailImageWrapper>
              <WindImageWrapper>
                <SvgWind windAngle={sails.sail_5.windTrueAngleDeg} />
              </WindImageWrapper>
            </SailWrapper>
            <SailWrapper>
              <ObcWatch />
              <SailImageWrapper>
                <SailImage src={SailPNG} angle={sails.sail_1.sheetingAngleActualDeg}/>
              </SailImageWrapper>
              <WindImageWrapper>
                <SvgWind windAngle={sails.sail_6.windTrueAngleDeg} />
              </WindImageWrapper>
            </SailWrapper>

            {sailControl.variableThrustMode === 0 ? (
              <>
                <Typography
                  variant="p"
                  sx={{ position: "absolute", top: "1rem", left: "50%", transform: "translateX(-50%)", fontWeight: "600" }}
                >
                  0°
                </Typography>
                <Typography
                  variant="p"
                  sx={{ position: "absolute", top: "50%", left: "1rem", transform: "translateY(-50%)", fontWeight: "600" }}
                >
                  -90°
                </Typography>
                <Typography
                  variant="p"
                  sx={{ position: "absolute", top: "50%", right: "1rem", transform: "translateY(-50%)", fontWeight: "600" }}
                >
                  90°
                </Typography>
                <Typography
                  variant="p"
                  sx={{ position: "absolute", bottom: "1rem", left: "50%", transform: "translateX(-50%)", fontWeight: "600" }}
                >
                  180°
                </Typography>
              </>
            ) : null}
          </ShipOutline>
        </Grid>
        <Grid item xs paddingTop={9}>
          <Stack justifyContent="space-around" sx={{ height: "100%" }} alignItems="center">
            <ObcInstrumentField hasSetpoint={true} setpoint={sails.sail_1.sheetingAngleSetDeg} degree value={sails.sail_1.sheetingAngleActualDeg} tag="Angle" />
            <ObcInstrumentField hasSetpoint={true} setpoint={sails.sail_2.sheetingAngleSetDeg} degree value={sails.sail_2.sheetingAngleActualDeg} tag="Angle" />
            <ObcInstrumentField hasSetpoint={true} setpoint={sails.sail_3.sheetingAngleSetDeg} degree value={sails.sail_3.sheetingAngleActualDeg} tag="Angle" />
            <ObcInstrumentField hasSetpoint={true} setpoint={sails.sail_4.sheetingAngleSetDeg} degree value={sails.sail_4.sheetingAngleActualDeg} tag="Angle" />
            <ObcInstrumentField hasSetpoint={true} setpoint={sails.sail_5.sheetingAngleSetDeg} degree value={sails.sail_5.sheetingAngleActualDeg} tag="Angle" />
            <ObcInstrumentField hasSetpoint={true} setpoint={sails.sail_6.sheetingAngleSetDeg} degree value={sails.sail_6.sheetingAngleActualDeg} tag="Angle" />
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  )
}
