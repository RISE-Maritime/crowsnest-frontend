import React from "react"
import { Typography, Paper } from "@mui/material"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import moment from "moment"


const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Paper sx={{ padding: "0.5rem" }}>
        <Typography variant="subtitle1">{payload[0].payload.load}</Typography>
      </Paper>
    )
  }
  return null
}

export default function ChartTimeLineValues({ data_list, valueName, currentValue, valueUnit }) {
  return (
    <div style={{ width: "25%", position: "relative" }}>
      <ResponsiveContainer width={"100%"} height={250}>
        <LineChart data={data_list}>
          <XAxis
            dataKey="time"
            domain={["auto", "auto"]}
            name="Time"
            tickFormatter={timestamp => moment(timestamp).format("H:mm")}
            // type="number"
          />
          <YAxis dataKey="load" name="Count" domain={[0, 100]} />
          <Tooltip
            cursor={{ stroke: "red", strokeWidth: 2 }}
            content={<CustomTooltip />}
            allowEscapeViewBox={{ y: true }}
            animationEasing="linear"
          />
          <Line type="monotone" dataKey="load" stroke="#33BBFF" strokeWidth={2} dot={false} />
          <CartesianGrid strokeDasharray="3 3" />
        </LineChart>
      </ResponsiveContainer>
      <div style={{ position: "absolute", top: "-1.1rem", right: "5%" }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontSize: "1rem",
            margin: "0px",
            padding: "0px",
            color: "rgba(255, 255, 255, 0.5)",
          }}
        >
          {valueName + " "}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontSize: "1.2rem", margin: "0px", padding: "0px" , textAlign: "right"}}>
          {currentValue?.toFixed(1) + valueUnit} 
        </Typography>
      </div>
    </div>
  )
}
