import React, { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// Recoil
import { useRecoilValue } from "recoil"
import { appState, atomMQTTConONOFF } from "./recoil/atoms"
// Styling
import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
// Pages
import ROUTES from "./ROUTES.json"
import BasePage from "./base-elements/BasePage"
import PageHome from "./pages/home"
import PageECDIS from "./pages/ECDIS"
import PageConning from "./pages/conning"
import PageDataFlow from "./pages/data-flow"
import PageRemoteControl from "./pages/remote-control"
import PageBearingRate from "./pages/bearing-rate"
import ELookout from "./pages/e-lookout"
import ELookoutV2 from "./pages/e-lookout-v2"
import DeviceSensors from "./pages/device-sensors"
import PageSettings from "./pages/settings"
import PageConfiguration from "./pages/configuration"
import RouteEditor from "./pages/route-editor"
// MQTT
import ConnectorMQTT from "./base-elements/ConnectorMQTT"
import { mqttSubscribeLOCAL } from "./base-elements/ConnectorMQTT"
import DeviceConnection from "./base-elements/DeviceConnection"
import ConnectorKeelson from "./base-elements/ConnectorKeelson"

export default function App() {
  const app_state = useRecoilValue(appState)
  // -----------------------------------------------------------
  // Global theme
  let theme = createTheme({
    palette: {
      mode: app_state.appActiveColorTheme, // dark or light (default)

      ...(app_state.appActiveColorTheme === "light"
        ? // Light pallette
          {
            primary: {
              main: "#1f2e47",
              light: "#66bb77",
              contrastText: "#ffffff",
            },
            secondary: {
              main: "#ed6432",
              contrast: "#33BBFF",
            },
            background: {
              default: "#e3e3e3",
            },
            error: {
              main: "#cb2e24",
            },
            warning: {
              main: "#eec937",
            },
            success: {
              main: "#14cc17",
            },
            info: {
              main: "#031e49",
            },
          }
        : // Dark pallette
          {
            primary: {
              main: "#2196f3",
              light: "#66bb77",
              contrastText: "#ffffff",
              port: "#E93629",
              starboard: "#1FB948",
            },
            secondary: {
              main: "#ed6432",
              dark: "#b84d27",
            },
            background: {
              default: "#333333",
            },
            error: {
              main: "#cb2e24",
            },
            warning: {
              main: "#eec937",
            },
            success: {
              main: "#11b014",
              contrastText: "#ffffff",
            },
            info: {
              main: "#2196f3",
            },
            text: {
              primary: "#fff",
            },
          }),
    },
  })

  theme = responsiveFontSizes(theme)

  const mqttONOFF = useRecoilValue(atomMQTTConONOFF)

  return (
    <>
      <DeviceConnection />

      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Router>
          <BasePage>
            <Routes>
              <Route exact path={ROUTES.HOME} element={<PageHome />} />
              <Route exact path={ROUTES.ECDIS} element={<PageECDIS />} />
              <Route exact path={ROUTES.BEARING_RATE} element={<PageBearingRate />} />
              <Route exact path={ROUTES.CONNING} element={<PageConning />} />
              <Route exact path={ROUTES.DATA_FLOW} element={<PageDataFlow />} />
              <Route exact path={ROUTES.CONFIGURATION} element={<PageConfiguration />} />
              <Route exact path={ROUTES.SETTINGS} element={<PageSettings />} />
              <Route exact path={ROUTES.E_LOOKOUT} element={<ELookout />} />
              <Route exact path={ROUTES.E_LOOKOUT_V2} element={<ELookoutV2 />} />
              <Route exact path={ROUTES.DEVICE_SENSORS} element={<DeviceSensors />} />
              <Route exact path={ROUTES.REMOTE_CONTROL} element={<PageRemoteControl />} />
              <Route exact path={ROUTES.ROUTE_EDITOR} element={<RouteEditor />} />
            </Routes>
          </BasePage>
        </Router>
      </ThemeProvider>
    </>
  )
}
