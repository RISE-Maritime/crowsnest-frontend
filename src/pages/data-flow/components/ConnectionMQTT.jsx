import React from "react"
import PropTypes from "prop-types"

import { Grid, Typography, Stack } from "@mui/material"
// Icons
import CheckIcon from "@mui/icons-material/CheckCircle"
import CloseIcon from "@mui/icons-material/Cancel"
import { useRecoilValue } from "recoil"
import { atomMqttTopics, atomMqttTopicsUnhandled } from "../../../recoil/atoms"
import MqttRemoteBrokerLogin from "./MqttRemoteBrokerLogin"

export default function ConnectionMQTT({ conn, connectionName, isConnected }) {
  let mqtt_topics = useRecoilValue(atomMqttTopics)
  let mqtt_topics_unhandled = useRecoilValue(atomMqttTopicsUnhandled)

  return (
    <Grid container>
      {/* Connection state indicator and Broker Login */}
      <Grid item xs={12}>
        <Stack direction={"row"} alignItems="center" justifyContent="space-between" >
          <Stack direction={"row"} alignItems="center">
            <Typography variant="h4" sx={{ marginRight: "1rem" }}>
              {connectionName}
            </Typography>

            {isConnected ? (
              <CheckIcon sx={{ fontSize: "2rem", color: "#2eb847" }} />
            ) : (
              <CloseIcon sx={{ fontSize: "2rem", color: "#9d1b1b" }} />
            )}
          </Stack>

          {conn === "REMOTE" && <MqttRemoteBrokerLogin />}
        </Stack>
      </Grid>

      {/* <Grid item xs={12}>
        <h1>Topics</h1>
        {Object.keys(mqtt_topics).map(topic => {
          return (
            <p key={"regeqrg" + topic}>
              <b> {topic}</b>
              <br />
              Received: {mqtt_topics[topic]?.time_received.toLocaleString("sv-SV")}
              <br />
              Rec Timestamp: {mqtt_topics[topic]?.timestamp?.toLocaleString("sv-SV")}
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
      </Grid> */}
    </Grid>
  )
}

ConnectionMQTT.propTypes = {
  connectionName: PropTypes.string.isRequired,
  isConnected: PropTypes.bool,
}
