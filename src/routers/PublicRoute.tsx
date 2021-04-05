import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const PublicRoute = (props: RouteProps) => {
  const isAuthenticated = useSelector(
    (state: RootStateOrAny) => !!state.auth.user_id
  );
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      component={(props: any) =>
        isAuthenticated ? (
          <Redirect to="/schedule" />
        ) : (
          <div>
            <Component {...props} />
          </div>
        )
      }
    />
  );
};

export { PublicRoute as default };
