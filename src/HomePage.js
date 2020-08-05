import React from 'react';
import FeedbackRequestsPage from './FeedbackRequestsPage';
import LoginForm from './LoginForm';

const HomePage = props => {
  const loggedInPage = () => {
    return <FeedbackRequestsPage {...props} />;
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
