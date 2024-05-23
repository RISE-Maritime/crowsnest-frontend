import React from "react"
import { styled } from "@mui/material/styles"
import { FormGroup, FormControlLabel, Radio } from "@mui/material"

// Styled to match Open Brigde: Check button as much as possible


const StyledFormGroup = styled(FormGroup)`
  justify-content: center;
`

const StyledFormControlLabel = styled(FormControlLabel)`
  height: 2.125rem;
  padding: 0 0.75rem 0 0rem;
  margin: 0;
  background-color: var(--normal-enabled-background-color);
  border: 1px solid var(--normal-enabled-border-color);
  border-radius: 0.375rem;
  white-space: nowrap;

  .Mui-checked + .MuiFormControlLabel-label {
    font-weight: 600;
  }
`

export default function LabelledRadioButton({ label, checked, onSelect }) {
  return (
    <StyledFormGroup>
      <StyledFormControlLabel control={<Radio checked={checked} onClick={onSelect}/>} label={label} />
    </StyledFormGroup>
  )
}
