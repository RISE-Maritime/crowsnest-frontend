import React, {useContext} from "react"
import {Route, Redirect} from "react-router-dom"
import {AuthContext} from "./Auth";
import ROUTES from './ROUTES.json'
import PropTypes from 'prop-types'

export default function PrivateRoute({component: RouteComponent, ...rest}) {
  const {currentUser} = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={routeProps =>
        currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={ROUTES.HOME}/>
        )
      }
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired
}
