import React from "react"
import { Paper, Typography } from "@mui/material"
import { ObcWatch } from "@oicl/openbridge-webcomponents-react/navigation-instruments/watch/watch"
import SailPNG from "../../../resources/Sail.png"
import styled from "@emotion/styled"
import CardHeading from "../components/CardHeading"

const ShipOutline = styled.div`
  position: relative;
  margin: 1rem;
  padding: 3rem 2rem 2rem;
  border-radius: 50% 50% 0% 0% / 17% 17% 0% 0%;
  border: 1px solid red;
`

const SailWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`

const SailImageWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const SailImage = styled.img`
  transform: rotate(90deg);
  transition: transform 1s ease-in-out;

  &:hover {
    transform: rotate(0deg);
  }
`

export default function SailPositions() {
  return (
    <Paper>
      <CardHeading heading="Sail positions" />
      <ShipOutline>
        <SailWrapper>
          <ObcWatch />
          <SailImageWrapper>
            <SailImage src={SailPNG} />
          </SailImageWrapper>
        </SailWrapper>
        <SailWrapper>
          <ObcWatch />
          <SailImageWrapper>
            <SailImage src={SailPNG} />
          </SailImageWrapper>
        </SailWrapper>
        <SailWrapper>
          <ObcWatch />
          <SailImageWrapper>
            <SailImage src={SailPNG} />
          </SailImageWrapper>
        </SailWrapper>{" "}
        <SailWrapper>
          <ObcWatch />
          <SailImageWrapper>
            <SailImage src={SailPNG} />
          </SailImageWrapper>
        </SailWrapper>{" "}
        <SailWrapper>
          <ObcWatch />
          <SailImageWrapper>
            <SailImage src={SailPNG} />
          </SailImageWrapper>
        </SailWrapper>
        <SailWrapper>
          <ObcWatch />
          <SailImageWrapper>
            <SailImage src={SailPNG} />
          </SailImageWrapper>
        </SailWrapper>
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
      </ShipOutline>
    </Paper>
  )
}
