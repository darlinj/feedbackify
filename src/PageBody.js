import React from 'react';
import WelcomePage from './WelcomePage';
import LoginForm from './LoginForm';
import LoadingPage from './LoadingPage';

const PageBody = props => {
  const showPage = () => {
    return (
      <>
        {props.currentUser ? (
          <WelcomePage
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
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
