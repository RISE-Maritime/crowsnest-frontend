import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// Recoil
import { useRecoilValue } from "recoil"
import { appState } from "./recoil/atoms"
// Styling
import {
  responsiveFontSizes,
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from "@mui/material/styles"
import { componentOverrides } from "./themes/styleOverrides"
import CssBaseline from "@mui/material/CssBaseline"
import ROUTES from "./ROUTES.json"
// Pages
import BasePage from "./base-elements/BasePage"
import PageHome from "./pages/home"
import PageECDIS from "./pages/ECDIS"
import PageConning from "./pages/conning"
import PageDataFlow from "./pages/data-flow"
import PageRemoteControl from "./pages/remote-control"
import PageBearingRate from "./pages/bearing-rate"
import ELookout from "./pages/e-lookout"
import CameraStreams from "./pages/camera-streams"
import DeviceSensors from "./pages/device-sensors"
import PageSettings from "./pages/settings"
import PageConfiguration from "./pages/configuration"
import RouteEditor from "./pages/route-editor"

import Lookout360 from "./pages/lookout-360"
import "@oicl/openbridge-webcomponents/src/palettes/variables.css"

export default function App() {
  const app_state = useRecoilValue(appState)
  const usedTheme = extendTheme({
    ...componentOverrides,
  })

  document.documentElement.setAttribute("data-obc-theme", app_state.appActiveColorTheme)
  const theme = responsiveFontSizes(usedTheme)

  return (
    <>
      {/* <DeviceConnection /> */}

      <CssVarsProvider theme={theme}>
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
              <Route exact path={ROUTES.CAMERA_STREAMS} element={<CameraStreams />} />
              <Route exact path={ROUTES.DEVICE_SENSORS} element={<DeviceSensors />} />
              <Route exact path={ROUTES.REMOTE_CONTROL} element={<PageRemoteControl />} />
              <Route exact path={ROUTES.ROUTE_EDITOR} element={<RouteEditor />} />
              <Route exact path={ROUTES.LOOKOUT_360} element={<Lookout360 />} />
            </Routes>
          </BasePage>
        </Router>
      </CssVarsProvider>
    </>
  )
}
