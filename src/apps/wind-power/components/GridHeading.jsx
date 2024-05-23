import React from "react"
import { styled } from "@mui/material/styles"
import { Stack, Typography } from "@mui/material"

const StyledStack = styled(Stack)`
  height: 45px;
  padding: 0.3rem 1rem;
  border-bottom: 1px solid var(--border-divider-color);
`

const StyledTypography = styled(Typography)`
  color: var(--element-neutral-color);
  font-weight: 600;
  line-height: 1.5rem;
  letter-spacing: 0.075rem;
  text-transform: uppercase;
`

export default function GridHeading({ heading, actionButton }) {
  return (
    <StyledStack direction="row" alignItems="center" justifyContent="space-between">
      <StyledTypography variant="p">{heading}</StyledTypography>
      {actionButton}
    </StyledStack>
  )
}
