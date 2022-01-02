import React from "react";
import {
  Stack,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
export default function ShipPosition() {
  const [gps, setGps] = React.useState("GPS1");

  const handleChange = (event) => {
    setGps(event.target.value);
  };

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-end"
      sx={{ position: "absolute", top: 10, right: 10 }}
    >
      <div style={{ display: "flex" }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gps}
          label="Position"
          onChange={handleChange}
          size="small"
        >
          <MenuItem value={"GPS1"}>GPS 1</MenuItem>
          <MenuItem value={"GPS2"}>GPS 2</MenuItem>
          <MenuItem value={"GPS3"}>GPS 3</MenuItem>
        </Select>

        <Typography variant="h5" sx={{ paddingLeft: "2rem" }}>
          24° 55,22´ E
        </Typography>
      </div>
      <Typography variant="h5">124° 55,23´ W</Typography>
    </Stack>
  );
}
