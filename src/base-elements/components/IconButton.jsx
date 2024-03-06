import React from "react"
import { IconButton as MuiIconButton } from "@mui/material"

// size: normal | large

export default function IconButton({ children, size, onClick }) {
  return (
    <MuiIconButton onClick={onClick} size={size === "normal" ? "medium" : "large"}>
      {children}
    </MuiIconButton>
  )
}
