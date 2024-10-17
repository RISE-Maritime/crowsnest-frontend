import React from "react"
import { styled } from "@mui/material/styles"
import { Stack, Typography, Grid, Select, FormControl, InputLabel, MenuItem } from "@mui/material"
import { useRecoilState, useRecoilValue } from "recoil"
import { OS_POSITION_SETTING, OS_VELOCITY_SETTING, OS_VELOCITY, OS_HEADING, OS_HEADING_SETTING } from "../../../recoil/atoms"
import Paper from "@mui/material/Paper"
import ContainerHeading from "../../../base-elements/components/ContainerHeading"
import PositionStatusSmall from "./PositionStatusSmall"
import { ObcInstrumentField } from "@oicl/openbridge-webcomponents-react/navigation-instruments/instrument-field/instrument-field"
import { ObcWatch } from "@oicl/openbridge-webcomponents-react/navigation-instruments/watch/watch"

function handleDataField(data, field) {
  if (data !== undefined && data !== null) {
    return data[field] !== null && data[field] !== undefined ? data[field].toString() : 0
  } else {
    return 0
  }
}

const StyledPaper = styled(Paper)`
  height: 100%;
`

const StyledGridContainer = styled(Grid)`
  padding: 0.5rem;
  margin-bottom: 0.5rem;

  &:not(:first-child) {
    border-top: 1px solid var(--border-divider-color);
  }
`
/* TODO: Move DataFieldRow to a separate component */
const Tag = styled(Typography)`
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem;
  color: var(--instrument-regular-secondary-color);
`

const SubTag = styled(Typography)`
  display: block;
  font-size: 0.75rem;
`

/* TODO: Add support for individual "ObcWatches/Graphs" and Selects */
const DataFieldRow = ({ value, tag, subtag }) => {
  const [selectValue, setSelectValue] = React.useState("")

  const handleSelectChange = event => {
    setSelectValue(event.target.value)
  }

  return (
    <Stack direction="row" justifyContent="space-between">
      <div style={{ width: "25%" }}>
        <ObcWatch />
      </div>
      <Stack direction="row" spacing={1}>
        <ObcInstrumentField hasSetpoint={false} degree={true} value={value} tag="" />
        <Tag>
          {tag}
          {subtag && <SubTag component="span">{subtag}</SubTag>}
        </Tag>
      </Stack>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="select-standard-label">Label</InputLabel>
        <Select
          labelId="select-standard-label"
          id="select-standard"
          value={selectValue}
          onChange={handleSelectChange}
          label="Label"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  )
}

export default function OsInfo({ data, identifier }) {
  return (
    <StyledPaper>
      <ContainerHeading heading="Own ship" />
      <StyledGridContainer container spacing={1}>
        <Grid item xs={12}>
          <DataFieldRow value={handleDataField(data[identifier], "heading")} tag="HGD" />
        </Grid>

        <Grid item xs={12}>
          <DataFieldRow value={handleDataField(data[identifier], "course")} tag="COG" />
        </Grid>

        <Grid item xs={12}>
          <DataFieldRow value={handleDataField(data[identifier], "rate")} tag="ROT" subtag="/min" />
        </Grid>
      </StyledGridContainer>

      <StyledGridContainer container spacing={1}>
        <Grid item xs={12}>
          {/* TODO: Missing value */}
          <DataFieldRow value={handleDataField(data[identifier], "speed")} tag="STW" subtag="kn" />
        </Grid>
        <Grid item xs={12}>
          {/* TODO: Missing value */}
          <DataFieldRow value={handleDataField(data[identifier], "speed")} tag="SOG" />
        </Grid>
        <Grid item xs={12}>
          {/* TODO: Missing value */}
          <DataFieldRow value={handleDataField(data[identifier], "speed")} tag="DPTH" subtag="m" />
        </Grid>
      </StyledGridContainer>

      <StyledGridContainer container spacing={1}>
        <Grid item xs={12}>
          <PositionStatusSmall />
        </Grid>
      </StyledGridContainer>
    </StyledPaper>
  )
}
