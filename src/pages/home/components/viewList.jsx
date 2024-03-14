import React from "react"
import ROUTES from "../../../ROUTES.json"
import { styled } from "@mui/material/styles"
import { Grid, Typography } from "@mui/material"
import ViewListItem from "./viewListItem"
// Icons
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded"
import MapRoundedIcon from "@mui/icons-material/MapRounded"
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded"
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded"
import TrackChangesRoundedIcon from "@mui/icons-material/TrackChangesRounded"
import VrpanoIcon from "@mui/icons-material/Vrpano"
import SettingsIcon from "@mui/icons-material/Settings"
import RouteIcon from "@mui/icons-material/Route"

const GridCenter = styled(Grid)(() => ({
  display: "grid",
  placeItems: "center",
  borderTop: "4px solid var(--border-divider-color)",
}))

export default function viewList() {
  return (
    <GridCenter>
      <Typography variant="h4" component="h2" mt={4} mb={4}>
        Applications list
      </Typography>
      <Grid container spacing={2} alignContent="flex-start">
        <ViewListItem routeLink={ROUTES.ECDIS} viewName={" ECDIS"} icon={<MapRoundedIcon slot="leading-icon" />} />

        <ViewListItem routeLink={ROUTES.CONNING} viewName={"Conning"} icon={<SpeedRoundedIcon slot="leading-icon" />} />

        <ViewListItem routeLink={ROUTES.E_LOOKOUT} viewName={"E-Lookout"} icon={<VrpanoIcon slot="leading-icon" />} />

        <ViewListItem routeLink={ROUTES.CAMERA_STREAMS} viewName={"Camera Streams"} icon={<VrpanoIcon slot="leading-icon" />} />

        <ViewListItem routeLink={ROUTES.LOOKOUT_360} viewName={"Lookout 360"} icon={<VrpanoIcon slot="leading-icon" />} />

        <ViewListItem
          routeLink={ROUTES.BEARING_RATE}
          viewName={" Bearing Rate"}
          icon={<TrackChangesRoundedIcon slot="leading-icon" />}
        />

        <ViewListItem
          routeLink={ROUTES.REMOTE_CONTROL}
          viewName={"Remote control"}
          icon={<SportsEsportsRoundedIcon slot="leading-icon" />}
        />

        <ViewListItem routeLink={ROUTES.ROUTE_EDITOR} viewName={"Route Editor"} icon={<RouteIcon slot="leading-icon" />} />

        <ViewListItem routeLink={ROUTES.DATA_FLOW} viewName={"Data Flow"} icon={<InsightsRoundedIcon slot="leading-icon" />} />

        <ViewListItem routeLink={ROUTES.SETTINGS} viewName={"Settings"} icon={<SettingsIcon slot="leading-icon" />} />
      </Grid>
    </GridCenter>
  )
}
