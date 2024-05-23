import React from "react"
import styled from "@emotion/styled"
import { ButtonGroup, Button, Slider, Grid } from "@mui/material"

const Wrapper = styled.div`
  border-top: 1px solid var(--border-divider-color);
  padding: 2rem 1rem;
`

export default function SailControlButtonSlider({ disabled }) {
  const marks = [
    {
      value: -180,
      label: "-180°",
    },
    {
      value: -90,
      label: "-90°",
    },
    {
      value: 0,
      label: "0°",
    },
    {
      value: 90,
      label: "90°",
    },
    {
      value: 180,
      label: "180°",
    },
  ]

  return (
    <Grid
      container
      direction="row"
      padding={4}
      justifyContent="space-between"
      alignItems="center"
      sx={{ height: "9rem", borderTop: "1px solid var(--border-divider-color)" }}
    >
      <Grid item xs={6}>
        <ButtonGroup variant="outlined" disabled={disabled}>
          <Button>-10</Button>
          <Button>-5</Button>
          <Button>-1</Button>
          <Button>+1</Button>
          <Button>+5</Button>
          <Button>+10</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={6}>
        <Slider min={-180} max={180} valueLabelDisplay="auto" marks={marks} step={10} defaultValue={0} track={false} />
      </Grid>
    </Grid>
  )
}
