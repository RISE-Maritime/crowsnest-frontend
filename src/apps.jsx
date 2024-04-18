import React from "react"
import SettingsIcon from "@mui/icons-material/Settings"
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat"
import { Obi06Home as IconHome } from "@oicl/openbridge-webcomponents-react/icons/icon-06-home"
import { Obi06Ecdis as IconEcdis } from "@oicl/openbridge-webcomponents-react/icons/icon-06-ecdis"
import { Obi06Conning as IconConning } from "@oicl/openbridge-webcomponents-react/icons/icon-06-conning"
import { Obi13CameraOn as IconCameraOn } from "@oicl/openbridge-webcomponents-react/icons/icon-13-camera-on"
import { Obi10Autonomous as IconAutonomous } from "@oicl/openbridge-webcomponents-react/icons/icon-10-autonomous"
import { Obi07RoutePlanning as IconRoutePlanning } from "@oicl/openbridge-webcomponents-react/icons/icon-07-route-planning"
import { Obi07Erbl as IconErbl } from "@oicl/openbridge-webcomponents-react/icons/icon-07-erbl"
import { Obi03Info as IconInfo } from "@oicl/openbridge-webcomponents-react/icons/icon-03-info"
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import ROUTES from "./ROUTES.json"

export const APPS = [
  {
    href: ROUTES.HOME,

    icon: <IconHome size="24" slot="icon" />,
    leadingIcon: <HomeRoundedIcon slot="leading-icon" />,
    buttonIcon: <HomeRoundedIcon />,
    label: "Home",
  },
  {
    href: ROUTES.ECDIS,
    icon: <IconEcdis size="24" slot="icon" />,
    leadingIcon: <IconEcdis slot="leading-icon" />,
    buttonIcon: <IconEcdis />,
    label: "ECDIS",
    description: "Electronic Chart Display and Information System",
  },
  {
    href: ROUTES.BEARING_RATE,
    icon: <IconErbl size="24" slot="icon" />,
    leadingIcon: <IconErbl slot="leading-icon" />,
    buttonIcon: <IconErbl />,
    label: "BEARING",
    description: "Bearing rate chart for tracking targets",
  },
  {
    href: ROUTES.CONNING,
    icon: <IconConning size="24" slot="icon" />,
    leadingIcon: <IconConning slot="leading-icon" />,
    buttonIcon: <IconConning />,
    label: "CONNING",
    description: "Conning display for navigation",
  },
  {
    href: ROUTES.CAMERA_ARRAY,
    icon: <IconCameraOn size="24" slot="icon" />,
    leadingIcon: <IconCameraOn slot="leading-icon" />,
    buttonIcon: <IconCameraOn />,
    label: "E-LOOKOUT",
    description: "E-Lookout camera & FPV views for monitoring",
  },

  {
    href: ROUTES.REMOTE_CONTROL,
    icon: <IconAutonomous size="24" slot="icon" />,
    leadingIcon: <IconAutonomous slot="leading-icon" />,
    buttonIcon: <IconAutonomous />,
    label: "RC",
    description: "Remote control for autonomous navigation and override",
  },
  {
    href: ROUTES.ROUTE_EDITOR,
    icon: <IconRoutePlanning size="24" slot="icon" />,
    leadingIcon: <IconRoutePlanning slot="leading-icon" />,
    buttonIcon: <IconRoutePlanning />,
    label: "PLANNER",
    description: "Route and mission planning for navigation",
  },
]

export const APP_CONFIG = [
  {
    href: ROUTES.DATA_FLOW,
    icon: <InsightsRoundedIcon slot="icon" />,
    leadingIcon: <InsightsRoundedIcon slot="leading-icon" />,
    buttonIcon: <InsightsRoundedIcon />,
    label: "Data flow",
  },
  {
    href: ROUTES.CONFIGURATION,
    icon: <DirectionsBoatIcon slot="icon" />,
    leadingIcon: <DirectionsBoatIcon slot="leading-icon" />,
    buttonIcon: <DirectionsBoatIcon />,
    label: "OS configuration",
  },
  {
    href: ROUTES.SETTINGS,
    icon: <SettingsIcon slot="icon" />,
    leadingIcon: <SettingsIcon slot="leading-icon" />,
    buttonIcon: <SettingsIcon />,
    label: "APP Settings",
  },
]


export const PAGES_E_LOOKOUT = [
  {
    href: ROUTES.E_LOOKOUT,
    icon: <IconCameraOn slot="icon" />,
    leadingIcon: <IconCameraOn slot="leading-icon" />,
    buttonIcon: <IconCameraOn />,
    label: "Camera Lookout",
  },
  {
    href: ROUTES.CAMERA_STREAMS,
    icon: <IconInfo slot="icon" />,
    leadingIcon: <IconInfo slot="leading-icon" />,
    buttonIcon: <IconInfo />,
    label: "Camera Streams",
  },
  {
    href: ROUTES.LOOKOUT_360,
    icon: <IconInfo slot="icon" />,
    leadingIcon: <IconInfo slot="leading-icon" />,
    buttonIcon: <IconInfo />,
    label: "Lookout 360",
  },
  {
    href: ROUTES.CAMERA_ARRAY,
    icon: <IconInfo slot="icon" />,
    leadingIcon: <IconInfo slot="leading-icon" />,
    buttonIcon: <IconInfo />,
    label: "Camera Array",
  },
 
]


export const ROUTE_TO_LABEL = [...APPS, ...APP_CONFIG].reduce((acc, cur) => {
  acc[cur.href] = cur.label
  return acc
}, {})
