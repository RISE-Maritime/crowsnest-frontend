import React from "react"
import moment from "moment"
import { Typography, Grid, Paper, Stack } from "@mui/material"

export default function CardSystemInfo({ op_system, boot_time, received_at, network_delay, ram_size }) {
  return (
    <Paper sx={{ width: "18rem", padding: "0.5rem" }}>
      <Typography variant="body1">
        Operating system: {op_system}
        <br />
        Boot time: {moment(boot_time).format("Y-MM-DD HH:mm")}
        <br />
        Last message: {moment(received_at).format("Y-MM-DD HH:mm")}
        <br />
        Network delay: -{network_delay}sec
        <br />
        RAM: {ram_size}
        <br />
      </Typography>
    </Paper>
  )
}
