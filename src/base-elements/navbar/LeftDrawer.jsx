import React, { useState } from "react"
// Components
import { Box } from "@mui/material"
// Icons
import { ObcNavigationMenu as NavigationMenu } from "@oicl/openbridge-webcomponents-react/components/navigation-menu/navigation-menu"
import { ObcNavigationItem as NavigationItem } from "@oicl/openbridge-webcomponents-react/components/navigation-item/navigation-item"
import { Obi02ChevronRight as IconChevronRight } from "@oicl/openbridge-webcomponents-react/icons/icon-02-chevron-right"

import { APPS, APP_CONFIG } from "../../apps"

export default function LeftDrawer({ toggleDrawer, side, isOpen }) {
  const [isFullWidth, setIsFullWidth] = useState("3rem")

  const toggleWidth = () => {
    console.log("toggleWidth", isFullWidth)
    setIsFullWidth(isFullWidth == "3rem" ? "15rem" : "3rem")
  }

  return (
    <Box  style={{ width: "50px", position: "fixed", height: "100%", zIndex: 900 }}>
 
      <NavigationMenu>
        <NavigationItem slot="main" label={""} checked={false} >
          {/* Just for top space */}
        </NavigationItem>

        {/* Width control */}
        <NavigationItem slot="main" label={""} checked={false} onClick={toggleWidth}>
          <IconChevronRight size="24" slot="icon" />
        </NavigationItem>

        {APPS.map(app => (
          <NavigationItem
            slot="main"
            key={app.label}
            href={app.href}
            label={app.label}
            checked={app.href === window.location.pathname}
          >
            {app.icon}
          </NavigationItem>
        ))}
        {APP_CONFIG.map(cfg => (
          <NavigationItem
            slot="footer"
            key={cfg.label}
            href={cfg.href}
            label={cfg.label}
            checked={cfg.href === window.location.pathname}
          >
            {cfg.icon}
          </NavigationItem>
        ))}
      </NavigationMenu>
     
    </Box>
  )
}
