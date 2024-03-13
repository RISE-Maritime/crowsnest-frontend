import React from "react"
// Components
import { Box } from "@mui/material"
// Icons
import { ObcNavigationMenu as NavigationMenu } from "@oicl/openbridge-webcomponents-react/components/navigation-menu/navigation-menu"
import { ObcNavigationItem as NavigationItem } from "@oicl/openbridge-webcomponents-react/components/navigation-item/navigation-item"
import { APPS, APP_CONFIG } from "./apps"

export default function LeftDrawer(props) {
  return (
    <Box role="presentation" onClick={props.toggleDrawer(props.side, false)} onKeyDown={props.toggleDrawer(props.side, false)}>
      <NavigationMenu>
        {APPS.map(app => (
          <NavigationItem slot="main" key={app.label} href={app.href} label={app.label}>
            {app.icon}
          </NavigationItem>
        ))}
        {APP_CONFIG.map(cfg => (
          <NavigationItem slot="footer" key={cfg.label} href={cfg.href} label={cfg.label}>
            {cfg.icon}
          </NavigationItem>
        ))}
      </NavigationMenu>
    </Box>
  )
}
