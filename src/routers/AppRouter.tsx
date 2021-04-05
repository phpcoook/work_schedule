import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import LoginView from "../views/Login/";
import ScheduleView from "../views/Schedule";
import NotFoundView from "../views/NotFound/";

const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginView} exact={true} />
        <PrivateRoute path="/schedule" component={ScheduleView} exact={true} />
        <Route component={NotFoundView}></Route>
      </Switch>
    </div>
  </Router>
);

export { AppRouter as default, history };
