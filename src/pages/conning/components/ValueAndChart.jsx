import React from "react";
import { Typography, Paper } from "@mui/material";
import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "-6H",
    tmp: -2,
  },
  {
    name: "-5H",
    tmp: 10,
  },
  {
    name: "-4H",
    tmp: 8,
  },
  {
    name: "-3H",
    tmp: 7,
  },
  {
    name: "-2H",
    tmp: 11,
  },
  {
    name: "-1H",
    tmp: 12,
  },
  {
    name: "Now",
    tmp: 11,
  },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Paper sx={{ padding: "0.5rem" }}>
        <Typography variant="subtitle1">
          <b> {payload[0].payload.name}</b>
          <br />
          {payload[0].value + " "}°C
        </Typography>
      </Paper>
    );
  }
  return null;
};

export default function ValueAndChart(props) {
  return (
    <>
      <Typography
        variant="subtitle2"
        sx={{
          fontSize: "0.9rem",
          margin: "0px",
          padding: "0px",
          color: "rgba(255, 255, 255, 0.5)",
        }}
      >
        {props.valueName}
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{ fontSize: "0.9rem", margin: "0px", padding: "0px" }}
      >
        {props.currentValue}
      </Typography>

      <ResponsiveContainer width="98%" height={50}>
        <LineChart data={data}>
          <Tooltip
            cursor={{ stroke: "red", strokeWidth: 2 }}
            content={<CustomTooltip />}
            allowEscapeViewBox={{ y: true }}
            animationEasing="linear"
          />
          <Line
            type="monotone"
            dataKey="tmp"
            stroke="#33BBFF"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
