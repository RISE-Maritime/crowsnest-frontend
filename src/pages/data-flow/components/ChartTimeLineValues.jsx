import React from "react";
import { Typography, Paper } from "@mui/material";
import { LineChart, Line,XAxis,YAxis, Tooltip, ResponsiveContainer } from "recharts";
import moment from "moment";

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
          <b> Ships</b>
          <br />
          {payload[0].payload.ships_count }
        </Typography>
      </Paper>
    );
  }
  return null;
};

export default function ChartTimeLineValues({data_list,valueName, currentValue}) {
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
        {valueName}
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{ fontSize: "0.9rem", margin: "0px", padding: "0px" }}
      >
        {currentValue}
      </Typography>

      <ResponsiveContainer width="98%" height={250}>
        <LineChart data={data_list}>
        <XAxis
            dataKey="time"
            domain={["auto", "auto"]}
            name="Time"
            tickFormatter={unixTime => moment(unixTime.toString()).format("H:mm")}
            // type="number"
          />
          <YAxis dataKey="ships_count" name="Count" />
          <Tooltip
            cursor={{ stroke: "red", strokeWidth: 2 }}
            content={<CustomTooltip />}
            allowEscapeViewBox={{ y: true }}
            animationEasing="linear"
          />
          <Line
            type="monotone"
            dataKey="ships_count"
            stroke="#33BBFF"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
