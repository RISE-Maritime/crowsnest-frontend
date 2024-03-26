import React from "react"
import MapRoundedIcon from "@mui/icons-material/MapRounded"
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded"
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded"
import TrackChangesIcon from "@mui/icons-material/TrackChanges"
import VrpanoIcon from "@mui/icons-material/Vrpano"
import EdgesensorHighIcon from "@mui/icons-material/EdgesensorHigh"
import SettingsIcon from "@mui/icons-material/Settings"
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat"
import { Obi06Home as IconHome } from "@oicl/openbridge-webcomponents-react/icons/icon-06-home"
import { Obi06Ecdis as IconEcdis } from "@oicl/openbridge-webcomponents-react/icons/icon-06-ecdis"
import { Obi06Conning as IconConning } from "@oicl/openbridge-webcomponents-react/icons/icon-06-conning"
import { Obi13CameraOn as IconCameraOn } from "@oicl/openbridge-webcomponents-react/icons/icon-13-camera-on"
// 06-conning
import { Obi07RelativemotionVariant as IconRelativemotionVariant } from "@oicl/openbridge-webcomponents-react/icons/icon-07-relativemotion-variant"
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded"
import RouteIcon from "@mui/icons-material/Route"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import ROUTES from "./ROUTES.json"

export const APPS = [
  {
    href: ROUTES.HOME,

    icon: <IconHome size="24" slot="icon"/>,
    leadingIcon: <HomeRoundedIcon slot="leading-icon" />,
    label: "Home",
  },
  {
    href: ROUTES.ECDIS,
    icon: <IconEcdis size="24" slot="icon"/>,
    leadingIcon: <MapRoundedIcon slot="leading-icon" />,
    label: "ECDIS",
  },
  {
    href: ROUTES.BEARING_RATE,
    icon: <IconRelativemotionVariant size="24" slot="icon"/>,
    leadingIcon: <TrackChangesIcon slot="leading-icon" />,
    label: "BEARING",
  },
  {
    href: ROUTES.CONNING,
    icon: <IconConning size="24" slot="icon"/>,
    leadingIcon: <SpeedRoundedIcon slot="leading-icon" />,
    label: "Conning",
  },
  {
    href: ROUTES.E_LOOKOUT,
    icon: <IconCameraOn size="24" slot="icon"/>,
    leadingIcon: <VrpanoIcon slot="leading-icon" />,
    label: "E-lookout (Seahorse)",
  },
  {
    href: ROUTES.CAMERA_STREAMS,
    icon: <VrpanoIcon slot="icon" />,
    leadingIcon: <VrpanoIcon slot="leading-icon" />,
    label: "Camera Streams",
  },
  {
    href: ROUTES.LOOKOUT_360,
    icon: <VrpanoIcon slot="icon" />,
    leadingIcon: <VrpanoIcon slot="leading-icon" />,
    label: "Lookout 360",
  },
  {
    href: ROUTES.REMOTE_CONTROL,
    icon: <SportsEsportsRoundedIcon slot="icon" />,
    leadingIcon: <SportsEsportsRoundedIcon slot="leading-icon" />,
    label: "Remote Control",
  },
  {
    href: ROUTES.ROUTE_EDITOR,
    icon: <RouteIcon slot="icon" />,
    leadingIcon: <RouteIcon slot="leading-icon" />,
    label: "Route Editor",
  },
  {
    href: ROUTES.DEVICE_SENSORS,
    icon: <EdgesensorHighIcon slot="icon" />,
    leadingIcon: <EdgesensorHighIcon slot="leading-icon" />,
    label: "Device Sensors",
  },
]

export const APP_CONFIG = [
  {
    href: ROUTES.DATA_FLOW,
    icon: <InsightsRoundedIcon slot="icon" />,
    leadingIcon: <InsightsRoundedIcon slot="leading-icon" />,
    label: "Data flow",
  },
  {
    href: ROUTES.CONFIGURATION,
    icon: <DirectionsBoatIcon slot="icon" />,
    leadingIcon: <DirectionsBoatIcon slot="leading-icon" />,
    label: "OS configuration",
  },
  {
    href: ROUTES.SETTINGS,
    icon: <SettingsIcon slot="icon" />,
    leadingIcon: <SettingsIcon slot="leading-icon" />,
    label: "APP Settings",
  },
]

export const ROUTE_TO_LABEL = [...APPS, ...APP_CONFIG].reduce((acc, cur) => {
  acc[cur.href] = cur.label
  return acc
}, {})
