import React from "react"
import { styled } from "@mui/material/styles"
import { Typography } from "@mui/material"

const CardHeadingElement = styled(Typography)({
  display: "block",
  padding: "0.3rem 1rem",
  borderBottom: "1px solid var(--border-divider-color)",
  color: "var(--element-neutral-color)",
  fontWeight: "600",
  lineHeight: "1.5rem",
  letterSpacing: "0.075rem",
  textTransform: "uppercase",
})

export default function CardHeading({ heading }) {
  return <CardHeadingElement variant="p">{heading}</CardHeadingElement>
}
