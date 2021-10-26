import React, { useEffect } from "react";
import { Box } from "@mui/material";
//import { atomOwnShipData } from "../../home/components/vesselPicker";
import { useRecoilValue } from "recoil";
import { clickInfoAtom } from "../../../base-elements/SeaChart";
import { vesselTargetsAtom } from "../../../base-elements/SeaChart";
import {formatTime} from '../../../utils.js'
export default function StatusSideBar() {
  
  const vesselTargets = useRecoilValue(vesselTargetsAtom)
  const clickInfo = useRecoilValue(clickInfoAtom)
  const [mmsi, setMmsi] = React.useState(null)
  const [vesselAisData, setVesselAisData] = React.useState(null)

  useEffect(()=>{
    setVesselAisData(vesselTargets[mmsi])
  },[vesselTargets])

  useEffect(()=>{
    clickInfo && setMmsi(clickInfo.mmsi)
  },[clickInfo])



  return (
    <Box>
      {vesselAisData && <>
        <h2>Data coming</h2>
        <h3>MMSI {mmsi}</h3>
        <h3>Name: {vesselAisData.shipname}</h3>
        <h3>Timestamp: {formatTime(vesselAisData.timestamp)}</h3>
        <h3>HDG: {vesselAisData.heading}</h3>
        <h3>SOG {vesselAisData.sog.toFixed(1)}</h3>
        <h3>COG {vesselAisData.cog.toFixed(1)}</h3>
        <h3>Lat {vesselAisData.lat.toFixed(3)}</h3>
        <h3>Lon {vesselAisData.lon.toFixed(3)}</h3>
        <h3>Draught {vesselAisData.draught.toFixed(2)}</h3>
        <h3>Destination {vesselAisData.destination}</h3>
        <h3>NavStatus {vesselAisData.navStatus}</h3>
        </>
        }
    </Box>
  );
}
      /*
      <h3>TIME {ownShipData.externalTimestamp}</h3>
      <h3>Heading {ownShipData.heading}</h3>
      <h3>SOG {ownShipData.sog.toFixed(1)}</h3>
      <h3>COG {ownShipData.cog.toFixed(1)}</h3>
      <h3>Lat {ownShipData.latitude.toFixed(3)}</h3>
      <h3>Long {ownShipData.longitude.toFixed(3)}</h3>
      <h3>Draught {ownShipData.draught.toFixed(2)}</h3>
      <h3>Destination {ownShipData.destination}</h3>
      <h3>NavStatus {ownShipData.navStatus}</h3>
      */