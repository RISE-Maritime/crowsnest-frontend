import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import StatusSideBar from "./components/statusSideBar";
import SeaChart, {vesselTargetsAtom} from "../../base-elements/SeaChart";
import TopBar from "./components/topBar";
import MqttConnection, {mqttMessageAtom, mqttSubscribe} from "../../base-elements/MqttConnection";
import { useSetRecoilState, useRecoilValue } from "recoil";



let targets = {}
let last = 0

function MqttMessageParser() {
  const mqttMessage = useRecoilValue(mqttMessageAtom);
  const setVesselTargets = useSetRecoilState(vesselTargetsAtom);

  useEffect(() => {
    if (mqttMessage.topic.includes('AIS')) {
      const vessel = JSON.parse(mqttMessage.payload.toString())
     // console.log('first')
      //console.log(targets)
      targets = {...targets}
      targets[vessel.mmsi] = vessel
      //console.log('second')
      //console.log(targets)
      const date = new Date()
      if (date.getTime() - last > 2000) {
        last = date.getTime();
        setVesselTargets(targets)
      }
    } else {
      console.log("Received MQTT message with topic " + mqttMessage.topic);
    }
  });

  return <></>;
}



export default function Ecdis() {

  React.useEffect(()=>{
    //mqttSubscribe('CROWSNEST/AIS/SJOFARTSVERKET/265177000')
    //mqttSubscribe('CROWSNEST/AIS/SJOFARTSVERKET/265514130')
    mqttSubscribe('CROWSNEST/AIS/SJOFARTSVERKET/#')
  },[])

  return <>
    <MqttConnection />
    <MqttMessageParser />
    <Grid container>
      <Grid item xs={12}>
        <TopBar />
      </Grid>
      <Grid item xs={10} sx={{ display: "grid", placeItems: "center", position: 'relative', height: '93vh'}} >
        <SeaChart />
      </Grid>
      <Grid item xs={2} sx={{ display: "grid", placeItems: "center", position: 'relative', height: '93vh'}} >
        <StatusSideBar/>
     
      </Grid>
    </Grid>
  </>;
}
