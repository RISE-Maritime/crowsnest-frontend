import React, { useState } from "react"
import { Box } from "@mui/material"
import { ObcNavigationMenu as NavigationMenu } from "@oicl/openbridge-webcomponents-react/components/navigation-menu/navigation-menu"
import { ObcNavigationItem as NavigationItem } from "@oicl/openbridge-webcomponents-react/components/navigation-item/navigation-item"
import { Obi02ChevronRight as IconChevronRight } from "@oicl/openbridge-webcomponents-react/icons/icon-02-chevron-right"
import { Obi02ChevronLeft as IconChevronLeft } from "@oicl/openbridge-webcomponents-react/icons/icon-02-chevron-left"
import LogoCrowsnest from "../../resources/crowsnest.png"
import { APPS, APP_CONFIG, PAGES_E_LOOKOUT } from "../../apps"
import { ObcContextMenu as ContextMenu } from "@oicl/openbridge-webcomponents-react/components/context-menu/context-menu"
import { ObcIconButton as IconButton } from "@oicl/openbridge-webcomponents-react/components/icon-button/icon-button"
import { useNavigate } from "react-router-dom"

export default function LeftDrawer() {
  const navigate = useNavigate()
  const [isFullWidth, setIsFullWidth] = useState(false)

  const toggleWidth = () => {
    setIsFullWidth(!isFullWidth)
  }

  return (
    <>
      {isFullWidth ? (
        <Box sx={{ width: "15px", position: "fixed", height: "100%", zIndex: 900 }}>
          <NavigationMenu styles={{ width: "50px" }}>
            <NavigationItem slot="main" label={""} checked={false}></NavigationItem>

            <NavigationItem slot="main" label={""} checked={false} onClick={toggleWidth}>
              <IconChevronLeft size="24" slot="icon" />
            </NavigationItem>


            {window.location.pathname.includes("e_lookout") &&
              PAGES_E_LOOKOUT.map(app => (
                <NavigationItem
                slot="main"
                key={app.label}
                onClick={() => navigate(app.href)}
                label={app.label}
                checked={app.href === window.location.pathname}
              >
                {app.icon}
              </NavigationItem>
              ))}

      

            {/* {APPS.map(app => (
              <NavigationItem
                slot="main"
                key={app.label}
                onClick={() => navigate(app.href)}
                label={app.label}
                checked={app.href === window.location.pathname}
              >
                {app.icon}
              </NavigationItem>
            ))} */}

            {APP_CONFIG.map(cfg => (
              <NavigationItem
                slot="footer"
                key={cfg.label}
                onClick={() => navigate(cfg.href)}
                label={cfg.label}
                checked={cfg.href === window.location.pathname}
              >
                {cfg.icon}
              </NavigationItem>
            ))}
            <img slot="logo" src={LogoCrowsnest} height="80%" style={{ marginTop: "0.5rem", objectFit: "contain" }} />
          </NavigationMenu>
        </Box>
      ) : (
        <Box sx={{ width: "15px", position: "fixed", height: "100%", zIndex: 900 }}>
          <ContextMenu>
            {/* First for Empty space */}
            <IconButton />

            <IconButton variant="normal" size="regular" onClick={toggleWidth}>
              <IconChevronRight size="24" />
            </IconButton>

            {window.location.pathname.includes("e_lookout") &&
              PAGES_E_LOOKOUT.map(app => (
                <IconButton
                  activated={app.href === window.location.pathname}
                  onClick={() => navigate(app.href)}
                  key={app.label + "ksdhbf"}
                >
                  {app.buttonIcon}
                </IconButton>
              ))}

            {/* {APPS.map(app => (
              <IconButton
                activated={app.href === window.location.pathname}
                onClick={() => navigate(app.href)}
                key={app.label + "ksdhbf"}
              >
                {app.buttonIcon}
              </IconButton>
            ))} */}

            <hr style={{ borderColor: "var(--instrument-frame-primary-color)" }} />

            {APP_CONFIG.map(app => (
              <IconButton
                activated={app.href === window.location.pathname}
                onClick={() => navigate(app.href)}
                key={app.label + "regherhg"}
              >
                {app.buttonIcon}
              </IconButton>
            ))}
          </ContextMenu>
        </Box>
      )}
    </>
  );
}
