import React from "react"
import { styled } from "@mui/material/styles"
import { Stack, Typography } from "@mui/material"

const StyledStack = styled(Stack)`
  font-family: "Noto Sans";
  height: 45px;
  padding: 0 1rem;
  margin: 0 0.25rem;
  border-bottom: 1px solid var(--border-divider-color);
`

const StyledTypography = styled(Typography)`
  color: var(--element-neutral-color);
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1.5rem;
  letter-spacing: 0.075rem;
  text-transform: uppercase;
`

export default function ContainerHeading({ heading, actionButton }) {
  return (
    <StyledStack direction="row" alignItems="center" justifyContent="space-between">
      <StyledTypography variant="p">{heading}</StyledTypography>
      {actionButton}
    </StyledStack>
  )
}
