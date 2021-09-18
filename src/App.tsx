import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.scss";
import { DashboardAdd, DashboardView, Groupbuy } from "./Pages";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/dashboard-add">
            <DashboardAdd />
          </Route>
          <Route path="/dashboard-view">
            <DashboardView />
          </Route>
          <Route path="/groupbuy">
            <Groupbuy />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
