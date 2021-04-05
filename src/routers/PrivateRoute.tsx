import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
// import Header from '../components/Header/header.component';

const PrivateRoute = (props: RouteProps) => {
  const isAuthenticated = useSelector(
    (state: RootStateOrAny) => !!state.auth.user_id
  );
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      component={(props: any) =>
        isAuthenticated ? (
          <div>
            {/* <Header /> */}
            <Component {...props} />
          </div>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export { PrivateRoute as default };
