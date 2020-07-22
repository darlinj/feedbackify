import React from 'react';
import QuestionsPage from "./QuestionsPage"

const WelcomePage = props => {
  return (
    <>
      <h1>Welcome to Feedbackify</h1>
      <QuestionsPage requestid={999}/>

    </>
  );
};
export default WelcomePage;
