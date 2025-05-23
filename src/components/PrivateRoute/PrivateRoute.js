import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    />
  );
}
