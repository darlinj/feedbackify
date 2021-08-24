import React, { useState } from "react";
import { FormGroup, Button, FormControl, FormLabel } from "react-bootstrap";

const AddQuestionForm = (params) => {
  const [newQuestion, setNewQuestion] = useState("");

  const handleNewQuestion = (event) => {
    setNewQuestion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    params.handleAddingQuestion(newQuestion);
    setNewQuestion("");
  };

  return (
    <form onSubmit={handleSubmit} className="questions-form">
      <FormGroup controlId="feedback-question">
        <FormLabel>New question</FormLabel>
        <FormControl
          autoFocus
          name="feedback-question"
          data-testid="new-question-text-box"
          value={newQuestion}
          onChange={handleNewQuestion}
        />
      </FormGroup>
      <Button
        name="add-question"
        type="submit"
        data-testid="submit-button"
        variant="primary"
      >
        Add question
      </Button>
    </form>
  );
};

export default AddQuestionForm;
