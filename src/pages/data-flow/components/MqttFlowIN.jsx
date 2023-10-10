import React from "react"
import { Grid } from "@mui/material"
import { useRecoilValue } from "recoil"
import { atomMQTTtopics, atomMQTTtopicsUnhandled } from "../../../recoil/atoms"

export default function MqttFlowIN() {
  let mqtt_topics = useRecoilValue(atomMQTTtopics)
  let mqtt_topics_unhandled = useRecoilValue(atomMQTTtopicsUnhandled)

  return (
    <Grid container>
      <Grid item xs={12}>
        <h1>MQTT flow in:</h1>
        {Object.keys(mqtt_topics).map(topic => {
          return (
            <p key={"regeqrg" + topic}>
              <b> {topic}</b>
              <br />
              Received: {mqtt_topics[topic]?.time_received.toLocaleString("sv-SV")}
              <br />
              Network delay: {mqtt_topics[topic]?.delay_calc ? "-" + mqtt_topics[topic]?.delay_calc + " sec" : ""}
              <br />
              Message count: {mqtt_topics[topic]?.count}
            </p>
          )
        })}
        <h1>Unhandled Topics</h1>
        {Object.keys(mqtt_topics_unhandled).map(topic => {
          return (
            <p key={"rgeargae" + topic}>
              {topic} , {mqtt_topics_unhandled[topic]?.time_received.toLocaleString("sv-SV")}
              <br />
              {mqtt_topics_unhandled[topic]?.count}
            </p>
          )
        })}
      </Grid>
    </Grid>
  )
}
