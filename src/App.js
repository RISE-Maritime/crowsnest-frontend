import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
// Pages
import ROUTES from "./ROUTES.json";
import PageHome from "./pages/home";
import PageECDIS from "./pages/ECDIS";
import PageConning from "./pages/conning";
import PageDataFlow from "./pages/data-flow";
import PageRemoteControl from "./pages/remote-control";
import PageVesselSpinner from "./pages/vesselSpinner";

export default function App() {
  return (
    <>
      <RecoilRoot>
        <Router>
          <Switch>
            <Route exact path={ROUTES.HOME} component={PageHome} />
            <Route exact path={ROUTES.ECDIS} component={PageECDIS} />
            <Route exact path={ROUTES.CONNING} component={PageConning} />
            <Route exact path={ROUTES.DATA_FLOW} component={PageDataFlow} />
            <Route exact path={ROUTES.REMOTE_CONTROL} component={PageRemoteControl} />
            <Route exact path={ROUTES.PAGE1} component={PageVesselSpinner} />
            {/* <PrivateRoute exact path={ROUTES.PREPARESHIP} component={Prepareship} /> */}
          </Switch>
        </Router>
      </RecoilRoot>
    </>
  );
}
