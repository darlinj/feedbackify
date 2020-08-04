import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import LoginForm from './LoginForm'

const ProtectedRoute = ({component: Component, currentUser, ...rest}) => {

  const renderComponentOrLogin = (props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <LoginForm {...rest} />
        );
  }

  return (
    <Route
      {...rest}
      render={renderComponentOrLogin}
    />
  );
};

export default ProtectedRoute;
