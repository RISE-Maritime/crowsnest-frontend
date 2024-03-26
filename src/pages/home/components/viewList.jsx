import React from "react"
import { APPS, APP_CONFIG } from "../../../apps"
import { styled } from "@mui/material/styles"
import { Grid, Typography } from "@mui/material"
import ViewListItem from "./ViewListItem"

const GridCenter = styled(Grid)(() => ({
  display: "grid",
  placeItems: "center",
  border: "1px solid var(--border-divider-color)",
  backgroundColor: "var(--container-section-color)",
  padding: "2rem",
  borderRadius: "0.5rem",
}))

export default function viewList() {
  return (
    <GridCenter>
      <Typography variant="h4" component="h2" mb={4}>
        Applications list
      </Typography>

      <Grid container spacing={2} alignContent="flex-start">
        {APPS.slice(1).map(app => (
          <ViewListItem key={app.href} routeLink={app.href} viewName={app.label} icon={app.leadingIcon} />
        ))}
        {APP_CONFIG.map(app => (
          <ViewListItem key={app.href} routeLink={app.href} viewName={app.label} icon={app.leadingIcon} />
        ))}
      </Grid>
    </GridCenter>
  )
}
