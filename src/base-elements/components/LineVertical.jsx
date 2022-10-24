import React from "react"
import { useTheme } from "@mui/material/styles"

export default function LineVertical() {
  const theme = useTheme()

  return (
    <div
      style={{
        width: "0.2rem",
        height: "100%",
        minHeight: "2rem",
        maxWidth: "900px",
        backgroundColor: theme.palette.info.main,
        borderRadius: "1rem",
      }}
    />
  )
}
