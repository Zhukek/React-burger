import React, { FC } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";

interface IProtectedRoute {
  requires: boolean;
  path?: string;
  exact?: boolean;
}

const ProtectedRoute: FC<IProtectedRoute> = ({children, requires, ...rest}) => {
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