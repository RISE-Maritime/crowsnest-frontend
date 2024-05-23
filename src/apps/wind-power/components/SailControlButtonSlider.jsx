import React from "react"
import styled from "@emotion/styled"
import { ButtonGroup, Button, Stack } from "@mui/material"

const Wrapper = styled.div`
  border-top: 1px solid var(--border-divider-color);
  padding: 2rem 1rem;
`

export default function SailControlButtonSlider({ disabled }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ height: "9rem", borderTop: "1px solid var(--border-divider-color)" }}
    >
      <ButtonGroup variant="outlined" disabled={disabled}>
        <Button>-10</Button>
        <Button>-5</Button>
        <Button>-1</Button>
        <Button>+1</Button>
        <Button>+5</Button>
        <Button>+10</Button>
      </ButtonGroup>
      Slider
    </Stack>
  )
}
