import React from "react";

const FeedbackRows = (props) => {
  return (
    <ul>
      {props.feedback.map((feedbackItem) => {
        return <li key={feedbackItem.id}>{feedbackItem.feedback}</li>;
      })}
    </ul>
  );
};

export default FeedbackRows;
