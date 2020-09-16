import React, { useState } from "react";
import { FormGroup, FormLabel, FormControl, Button } from "react-bootstrap";

const FeedbackForm = ({ questionList, submitFeedback }) => {
  const [feedback, setFeedback] = useState({});

  const handleSubmit = event => {
    event.preventDefault();
    submitFeedback(feedback);
  };

  const handleNewFeedback = event => {
    setFeedback({ ...feedback, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="FeedbackForm">
      {questionList.map(question => {
        return (
          <FormGroup key={question.id} controlId="feedback-question">
            <FormLabel id={question.id}>{question.question}</FormLabel>
            <FormControl
              autoFocus
              name={`${question.id}`}
              cy-data={`question-${question.id}`}
              value={feedback[question.id] || ""}
              onChange={handleNewFeedback}
            />
          </FormGroup>
        );
      })}
      <Button name="submit" type="submit" cy-data="submit" variant="primary">
        Submit
      </Button>
    </form>
  );
};

export default FeedbackForm;
