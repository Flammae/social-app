import React from "react";
import { Redirect, Route } from "react-router-dom";
import store from "../redux/store";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = store.getState().auth;
  console.log(authenticated);
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
