import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { useRecoilValue } from "recoil";
import { clickInfoAtom } from "./SeaChart";
import { vesselTargetsAtom } from "./SeaChart";
import {formatTime} from '../../../utils.js'
import PositionStatusSmall from "./PositionStatusSmall";
import MapCursorInfo from "./MapCursorInfo";
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

// Humm

  return (
    <Grid container sx={{height: "100%"}}>
      <Grid item xs={12} >
        <PositionStatusSmall/>
      </Grid>
      <Grid item xs={12} >
        <MapCursorInfo/>
      </Grid>

    
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
    </Grid>
  );
}
   