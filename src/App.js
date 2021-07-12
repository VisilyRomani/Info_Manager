import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";
import PrivateRoute from "./components/login/PrivateRoute";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Quotes from "./pages/Quotes";
import TimeSheet from "./pages/TimeSheet";
import Page404 from "./pages/Page404";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/calendar" component={Calendar} />
          <PrivateRoute exact path="/quotes" component={Quotes} />
          <PrivateRoute exact path="/timesheet" component={TimeSheet} />
          <Route component={Page404} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
