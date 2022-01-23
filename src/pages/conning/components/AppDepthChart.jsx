import React from "react";
import { Typography, Stack, Paper } from "@mui/material";
import {
  AreaChart,
  YAxis,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
} from "recharts";

const data = [
  {
    name: "0.75nm",
    depthLog: [17, 20],
    depthENC: [15, 20],
    draft: 6,
  },
  {
    name: "0.75nm",
    depthLog: [18, 20],
    depthENC: [15, 20],
    draft: 6,
  },
  {
    name: "0.5nm",
    depthLog: [13, 20],
    depthENC: [10, 20],
    draft: 6,
  },
  {
    name: "0.25nm",
    depthLog: [12, 20],
    depthENC: [10, 20],
    draft: 6,
  },
  {
    name: "Now",
    depthLog: [9, 20],
    depthENC: [10, 20],
    draft: 6,
  },
  {
    name: "Pred 0.25",
    depthLog: [],
    depthENC: [8, 20],
    draft: 6,
  },
];

const CustomTooltip = ({ active, payload }) => {
  // console.log(payload);
  if (active && payload && payload.length) {
    return (
      <Paper sx={{ padding: "0.5rem" }}>
        <Typography variant="subtitle1">
          <b> {payload[0].payload.name}</b>
        </Typography>
        <Typography variant="subtitle1" color={"#E93629"}>
          Draft{" "}
          {payload[0].payload.draft ? payload[0].payload.draft + " m" : ""}
        </Typography>
        <Typography variant="subtitle1" color={"#fff"}>
          ENC{" "}
          {payload[0].payload.depthENC
            ? payload[0].payload.depthENC[0] + " m"
            : ""}
        </Typography>
        <Typography variant="subtitle1" color={"#33BBFF"}>
          LOG{" "}
          {payload[0].payload.depthLog
            ? payload[0].payload.depthLog[0] + " m"
            : ""}
        </Typography>
      </Paper>
    );
  }
  return null;
};

export default function AppDepthChart() {
  return (
    <div>
      <Stack
        direction={"row"}
        alignContent={"center"}
        justifyContent={"center"}
        marginTop={2}
      >
        <Typography
          sx={{ fontSize: "1rem", color: "#33BBFF", paddingLeft: "1rem" }}
        >
          LOG 8.0m
        </Typography>
        <Typography
          sx={{ fontSize: "1rem", color: "#fff", paddingLeft: "1rem" }}
        >
          ENC 10.0m
        </Typography>
        <Typography
          sx={{ fontSize: "1rem", color: "#E93629", paddingLeft: "1rem" }}
        >
          Draft 6.0m
        </Typography>
      </Stack>
      <ResponsiveContainer width="98%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 22, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorLog" x1="0" y1="0" x2="0" y2="1">
              <stop offset="50%" stopColor="#33BBFF" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#33BBFF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorENC" x1="0" y1="0" x2="0" y2="1">
              <stop offset="25%" stopColor="#fff" stopOpacity={0.65} />
              <stop offset="95%" stopColor="#fff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.8)" />
          <YAxis width={25} reversed={true} stroke="rgba(255, 255, 255, 0.8)" />
          <CartesianGrid stroke="#ffffff10" />
          <Tooltip
            animationEasing="ease-out"
            allowEscapeViewBox={{ y: true }}
            content={<CustomTooltip />}
          />

          <Area
            type="monotone"
            dataKey="depthENC"
            stroke="#33BBFF00"
            fillOpacity={1}
            fill="url(#colorENC)"
          />
          <Area
            type="monotone"
            dataKey="depthLog"
            stroke="#33BBFF00"
            fillOpacity={1}
            fill="url(#colorLog)"
          />
          <Area
            type="monotone"
            dataKey="draft"
            stroke="#E93629"
            strokeWidth={3}
            fillOpacity={0}
            text="draft"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
