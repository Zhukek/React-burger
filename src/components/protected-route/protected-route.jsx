import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";

const ProtectedRoute = ({children, requires, ...rest}) => {
  const location = useLocation();

  if (!requires) {
    return (
      <Redirect to={{ 
        pathname: '/login',
        state: {from: location}
       }}/>
    )
  }

  return <Route {...rest}>{children}</Route>;
}

export default ProtectedRoute