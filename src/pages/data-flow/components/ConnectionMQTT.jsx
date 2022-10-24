import React from "react"
import PropTypes from "prop-types"

import { Grid } from "@mui/material"
// Icons
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import { useRecoilValue } from "recoil"
import { atomMqttTopics, atomMqttTopicsUnhandled } from "../../../recoil/atoms"

export default function ConnectionMQTT({ connectionName, isConnected }) {
  let mqtt_tpoics = useRecoilValue(atomMqttTopics)
  let mqtt_tpoics_unhandled = useRecoilValue(atomMqttTopicsUnhandled)

  return (
    <Grid container>
      <Grid item xs={12}>
        <h1>{connectionName}</h1>
        <h2>
          Connected:
          {isConnected ? (
            <CheckIcon sx={{ fontSize: "2rem", color: "#2eb847" }} />
          ) : (
            <CloseIcon sx={{ fontSize: "2rem", color: "#9d1b1b" }} />
          )}
        </h2>
      </Grid>
      <Grid item xs={12}>
        <h1>Topics</h1>
        {Object.keys(mqtt_tpoics).map(topic => {
          return (
            <p key={"regeqrg" + topic}>
             <b> {topic}</b>
              <br />
              Received:  {mqtt_tpoics[topic]?.time_received.toLocaleString("sv-SV")}
              <br />
              Rec Timestamp: {mqtt_tpoics[topic]?.timestamp?.toLocaleString("sv-SV") }
              <br />
              Network delay: {mqtt_tpoics[topic]?.delay_calc ? ("-"+ mqtt_tpoics[topic]?.delay_calc+" sec"): ""} 
              <br />
              Message count: {mqtt_tpoics[topic]?.count}
            </p>
          )
        })}
            <h1>Unhandled Topics</h1>
        {Object.keys(mqtt_tpoics_unhandled).map(topic => {
          return (
            <p key={"rgeargae" + topic}>
              {topic} , {mqtt_tpoics_unhandled[topic]?.time_received.toLocaleString("sv-SV")}
              <br />
              {mqtt_tpoics_unhandled[topic]?.count}
            </p>
          )
        })}
      </Grid>
    </Grid>
  )
}

ConnectionMQTT.propTypes = {
  connectionName: PropTypes.string.isRequired,
  isConnected: PropTypes.bool,
}
