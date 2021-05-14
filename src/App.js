import React, {useEffect, useState} from 'react';
// import {socket, socketAuth} from "./socket";
import Nav from './components/Nav/Nav'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import LoginPage from './components/login/LoginPage'
import Home from './pages/Home'
import Calendar from './pages/Calendar'
import Quotes from './pages/Quotes'
import TimeSheet from './pages/TimeSheet'
import useToken from './components/login/useToken'
import './App.css'

function App() {
  // const token = getToken();
  const {token, setToken} = useToken();
  // const [socketStatus, setSocketStatus] = useState(false);

  // useEffect( () => {
  //   const eventHandler = () => setSocketStatus(true);
    
  //   socket.on('connect', eventHandler);
      
  // });

  if(!token){
    return<LoginPage setToken={setToken}/>
  }


  return (
    <>
    <Router>
      <Nav/>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/calendar' exact component={Calendar}/>
        <Route path='/quotes' exact component={Quotes}/>
        <Route path='/timesheet' exact component={TimeSheet}/>
      </Switch>
    </Router>
    </>
  );
}

export default App;
