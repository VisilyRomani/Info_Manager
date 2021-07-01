import React, {useEffect, useState} from 'react'
import { Redirect, Route } from 'react-router-dom'
import authService from './authService'
import Nav from '../Nav/Nav';

const NavRoute = ({exact, path, component: Component}) => (
  <Route exact={exact} path={path} render={(props) => (
    <div>
      <Nav />
      <Component {...props}/>
    </div>
  )}/>
);


const PrivateRoute = (props) => {
    const [IsLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const { component: Component, ...rest } = props;

    useEffect(() => {
      let mounted=true
      const fetchData = async() => {
          setIsLoggedIn( await authService.checkLogin());
          if (mounted){
            setLoading(false);
          }
      };
      fetchData();
      return () => { mounted=false }
    },[]);


    return (
        <Route
          {...rest}
          render={() =>
            IsLoggedIn ? (
              <NavRoute exactly component={()=>(<Component{...props}/>)}/>
            ) : loading ? (
                <h1>loading</h1>
            ) : (
              <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            )
            
          }
        />
      )
}

export default PrivateRoute