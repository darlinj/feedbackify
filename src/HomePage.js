import React from 'react';
import RequestsPage from './RequestsPage';
import LoginForm from './LoginForm';

const HomePage = props => {
  const loggedInPage = () => {
    return <RequestsPage {...props} />;
  };

  const loggedOutPage = () => {
    return (
      <>
        <h1>Welcome to Feedbackify</h1>
        Please log in
        <LoginForm {...props} />
      </>
    );
  };

  return <>{props.currentUser ? loggedInPage() : loggedOutPage()}</>;
};
export default HomePage;
