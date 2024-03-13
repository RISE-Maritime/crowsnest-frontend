import React from "react"
import MapRoundedIcon from "@mui/icons-material/MapRounded"
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded"
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded"
import TrackChangesIcon from "@mui/icons-material/TrackChanges"
import VrpanoIcon from "@mui/icons-material/Vrpano"
import EdgesensorHighIcon from "@mui/icons-material/EdgesensorHigh"
import SettingsIcon from "@mui/icons-material/Settings"
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat"

import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded"
import RouteIcon from "@mui/icons-material/Route"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import ROUTES from "../../ROUTES.json"

export const APPS = [
  {
    href: ROUTES.HOME,
    icon: <HomeRoundedIcon slot="icon" />,
    label: "Home",
  },
  {
    href: ROUTES.ECDIS,
    icon: <MapRoundedIcon slot="icon" />,
    label: "ECDIS",
  },
  {
    href: ROUTES.BEARING_RATE,
    icon: <TrackChangesIcon slot="icon" />,
    label: "Bearing Rate",
  },
  {
    href: ROUTES.CONNING,
    icon: <SpeedRoundedIcon slot="icon" />,
    label: "Conning",
  },
  {
    href: ROUTES.E_LOOKOUT,
    icon: <VrpanoIcon slot="icon" />,
    label: "E-lookout (Seahorse)",
  },
  {
    href: ROUTES.CAMERA_STREAMS,
    icon: <VrpanoIcon slot="icon" />,
    label: "Camera Streams",
  },
  {
    href: ROUTES.LOOKOUT_360,
    icon: <VrpanoIcon slot="icon" />,
    label: "Lookout 360",
  },
  {
    href: ROUTES.REMOTE_CONTROL,
    icon: <SportsEsportsRoundedIcon slot="icon" />,
    label: "Remote Control",
  },
  {
    href: ROUTES.ROUTE_EDITOR,
    icon: <RouteIcon slot="icon" />,
    label: "Route Editor",
  },
  {
    href: ROUTES.DEVICE_SENSORS,
    icon: <EdgesensorHighIcon slot="icon" />,
    label: "Device Sensors",
  },
]

export const APP_CONFIG = [
  {
    href: ROUTES.DATA_FLOW,
    icon: <InsightsRoundedIcon slot="icon" />,
    label: "Data flow",
  },
  {
    href: ROUTES.CONFIGURATION,
    icon: <DirectionsBoatIcon slot="icon" />,
    label: "OS configuration",
  },
  {
    href: ROUTES.SETTINGS,
    icon: <SettingsIcon slot="icon" />,
    label: "APP Settings",
  },
]

export const ROUTE_TO_LABEL = [...APPS, ...APP_CONFIG].reduce((acc, cur) => {
  acc[cur.href] = cur.label
  return acc
}, {})
