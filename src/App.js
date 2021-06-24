import React from 'react';
import Nav from './components/Nav/Nav';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import LoginPage from './components/login/LoginPage';
import PrivateRoute from './components/login/PrivateRoute';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Quotes from './pages/Quotes';
import TimeSheet from './pages/TimeSheet';
import './App.css';


function App() {

  return (
    <>
    <Router>
      <Switch>
        <Route exact path='/login' component={LoginPage}/>
        <>
        <PrivateRoute exact path='/home' component={Home}/>
        <PrivateRoute exact path='/calendar' component={Calendar}/>
        <PrivateRoute exact path='/quotes' component={Quotes}/>
        <PrivateRoute exact path='/timesheet' component={TimeSheet}/>
        <Route render={() => <Redirect to={{pathname: "/home"}} />} />
        </>

      </Switch>
    </Router>
    </>
  );
}

export default App;
