import React from 'react';
import FeedbackRequestsPage from "./FeedbackRequestsPage"

const WelcomePage = props => {
  const loggedInPage = () => {
    return <FeedbackRequestsPage {...props} />
  }

  const loggedOutPage = () => {
    return (
      <>
      <h1>Welcome to Feedbackify</h1>
      Please log in
      </>
    )
  }

  return (
    <>
      { props.currentUser ? loggedInPage() : loggedOutPage() }
    </>
  );
};
export default WelcomePage;
