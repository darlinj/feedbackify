import React from 'react';
import WelcomePage from './WelcomePage';
import LoginForm from './LoginForm';

const PageBody = props => {
  return (
    <>
      {props.currentUser ? (
        <WelcomePage currentUser={props.currentUser} setCurrentUser={props.setCurrentUser} />
      ) : (
        <LoginForm setCurrentUser={props.setCurrentUser} />
      )}
    </>
  );
};

export default PageBody;
