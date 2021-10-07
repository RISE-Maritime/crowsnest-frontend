import React from "react";
import { Box } from "@mui/material";
import { atomOwnShipData } from "../../home/components/vesselPicker";
import { useRecoilState } from "recoil";

export default function StatusSideBar() {
  const [ownShipData, setOwnShipData] = useRecoilState(atomOwnShipData);
  return (
    <Box>
      <h2>Data coming</h2>
      <h3>TIME {ownShipData.externalTimestamp}</h3>
      <h3>Heading {ownShipData.heading}</h3>
      <h3>SOG {ownShipData.sog.toFixed(1)}</h3>
      <h3>COG {ownShipData.cog.toFixed(1)}</h3>
      <h3>Lat {ownShipData.latitude.toFixed(3)}</h3>
      <h3>Long {ownShipData.longitude.toFixed(3)}</h3>
      <h3>Draught {ownShipData.draught.toFixed(2)}</h3>
      <h3>Destination {ownShipData.destination}</h3>
      <h3>NavStatus {ownShipData.navStatus}</h3>
    </Box>
  );
}
