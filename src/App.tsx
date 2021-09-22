import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./Components";
import {
  DashboardAdd,
  DashboardView,
  Groupbuy,
  Landing,
  GroupbuyView,
} from "./Pages";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute path="/dashboard-add">
            <Route path="/dashboard-add">
              <DashboardAdd />
            </Route>
          </PrivateRoute>

          <PrivateRoute path="/dashboard-view">
            <Route>
              <DashboardView />
            </Route>
          </PrivateRoute>

          <PrivateRoute path="/groupbuy/:id">
            <Route children={<GroupbuyView />} />
          </PrivateRoute>

          <Route path="/groupbuy">
            <Groupbuy />
          </Route>

          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
