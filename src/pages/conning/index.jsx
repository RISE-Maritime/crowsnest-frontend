import React, { useEffect } from "react";
import { Grid, Box, Stack, Slider } from "@mui/material";
import { atomOwnShipData } from "../home/components/vesselPicker";
import { useRecoilValue } from "recoil";
// Components
import Pointer from "./components/pointer";
import TopBar from "./components/topBar";



export default function Conning() {
  const ownShipData = useRecoilValue(atomOwnShipData);

  useEffect(() => {
    return () => {};
  }, [ownShipData]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <TopBar />
      </Grid>
      <Grid item xs={4} sx={{ display: "grid", placeItems: "center", height: "80vh" }}>
        <h1>Power management</h1>
        <h3>Thruster</h3>
        <h3>Engine</h3>
        <h3>Rudder</h3>
        <Pointer direction={value} />
        <Box sx={{ width: 200 }}>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <Slider aria-label="Volume" value={value} onChange={handleChange} />
          </Stack>
        </Box>
      </Grid>{" "}
      <Grid item xs={4} sx={{ display: "grid", placeItems: "center", height: "80vh" }}>
        <h1>Heading: {ownShipData.heading}</h1>
        <h1>ROT</h1>
        <h3>SOG {ownShipData.sog}</h3>
        <h3>COG {ownShipData.cog}</h3>
        <h3>SOG BOW</h3>
        <h3>SOG STEEN</h3>
      </Grid>{" "}
      <Grid item xs={4} sx={{ display: "grid", placeItems: "center", height: "80vh" }}>
        <h1>Wind</h1>
        <h1>Current</h1>
        <h1>Roll / Heel</h1>
      </Grid>
    </Grid>
  );
}
