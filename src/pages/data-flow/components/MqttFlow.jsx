import React from "react"
import { Grid, Typography } from "@mui/material"
import { useRecoilValue } from "recoil"
import { atomMQTTtopics, atomMQTTtopicsUnhandled } from "../../../recoil/atoms"

export default function MqttFlow() {
  let mqtt_topics = useRecoilValue(atomMQTTtopics)
  let mqtt_topics_unhandled = useRecoilValue(atomMQTTtopicsUnhandled)

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h3">MQTT flow</Typography>
        <hr />

        <Typography variant="h4">Managed Topics</Typography>
        {Object.keys(mqtt_topics).length === 0 && <p>No managed Topics</p>}

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

        <Typography variant="h4">Unmanaged Topics</Typography>
        {Object.keys(mqtt_topics).length === 0 && <p>No managed Topics</p>}

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
