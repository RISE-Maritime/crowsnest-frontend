import React from "react"
import { Button as MuiButton, useTheme, styled } from "@mui/material"

export default function Button({ children, onClick }) {
  return (
    <MuiButton variant="contained" onClick={onClick}>
      {children}
    </MuiButton>
  )
}

const StyledButton = styled(MuiButton)`
  /* color: ${({ theme }) => theme.palette["container-backdrop-color"].johan}; */
`
