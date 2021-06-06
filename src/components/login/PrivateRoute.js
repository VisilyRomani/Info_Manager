import React, {useEffect, useState} from 'react'
import { Redirect, Route } from 'react-router-dom'
import authService from './authService'

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
                <Component {...props} />
            ) : loading ? (
                <h1>loading</h1>
            ) : (
              <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )
            
          }
        />
      )
}

export default PrivateRoute