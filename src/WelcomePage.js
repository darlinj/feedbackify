import React from 'react';
import QuestionsPage from "./QuestionsPage"

const WelcomePage = props => {
  return (
    <>
      <h1>Welcome to Feedbackify</h1>
      <QuestionsPage requestid={null}/>

    </>
  );
};
export default WelcomePage;
