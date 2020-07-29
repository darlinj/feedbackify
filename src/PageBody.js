import React from 'react';
import FeedbackRequestsPage from './FeedbackRequestsPage';
import LoginForm from './LoginForm';
import LoadingPage from './LoadingPage';

const PageBody = props => {
  const showPage = () => {
    return (
      <>
        {props.currentUser ? (
          <FeedbackRequestsPage />
        ) : (
          <LoginForm setCurrentUser={props.setCurrentUser} />
        )}
      </>
    );
  };

  const showLoadingPageIfLoading = () => {
    return <>{props.isLoading ? <LoadingPage /> : showPage()}</>;
  };

  return showLoadingPageIfLoading();
};

export default PageBody;
