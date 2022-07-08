import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({children, requires, ...rest}) => {
  return (
    <Route {...rest} render={({location}) => requires ? (
      children
    ) : (
      <Redirect to={{ 
        pathname: '/login',
        state: {from: location}
       }}/>
    )} />
  )
}

export default ProtectedRoute