import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import { DashboardAdd, DashboardView, Groupbuy, Landing } from "./Pages";

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
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
