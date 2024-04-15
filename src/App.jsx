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
// APPs
import BasePage from "./base-elements/BasePage"
import PageHome from "./apps/home"
import PageECDIS from "./apps/ECDIS"
import PageConning from "./apps/conning"
import PageDataFlow from "./apps/data-flow"
import PageRemoteControl from "./apps/remote-control"
import PageBearingRate from "./apps/bearing-rate"
import ELookout from "./apps/e-lookout"
import PageSettings from "./apps/settings"
import PageOSConfig from "./apps/os_config"
import RouteEditor from "./apps/route-editor"
import Lookout360 from "./apps/e-lookout/subpage_360"
import CameraStreams from "./apps/e-lookout/camera-streams"
import ELookoutCamArray from "./apps/e-lookout/camera-array"
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
              <Route exact path={ROUTES.CONFIGURATION} element={<PageOSConfig />} />
              <Route exact path={ROUTES.SETTINGS} element={<PageSettings />} />
             
              <Route exact path={ROUTES.E_LOOKOUT} element={<ELookout />} />
              <Route exact path={ROUTES.CAMERA_STREAMS} element={<CameraStreams />} />
              <Route exact path={ROUTES.LOOKOUT_360} element={<Lookout360 />} />
              <Route exact path={ROUTES.CAMERA_ARRAY} element={<ELookoutCamArray />} />
             
              <Route exact path={ROUTES.REMOTE_CONTROL} element={<PageRemoteControl />} />
              <Route exact path={ROUTES.ROUTE_EDITOR} element={<RouteEditor />} />
            </Routes>
          </BasePage>
        </Router>
      </CssVarsProvider>
    </>
  )
}
