import React, {useState} from 'react';
import {FormGroup, Button, FormControl, FormLabel} from 'react-bootstrap';

const AddQuestionForm = params => {
  const [newQuestion, setNewQuestion] = useState('');

  const handleNewQuestion = event => {
    setNewQuestion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    params.handleAddingQuestion(newQuestion);
    setNewQuestion('');
  }

  return (
    <form onSubmit={handleSubmit} className="questions-form">
      <FormGroup controlId="feedback-question">
        <FormLabel>Add question</FormLabel>
        <FormControl
          autoFocus
          name="feedback-question"
          cy-data="feedback-question"
          value={newQuestion}
          onChange={handleNewQuestion}
        />
      </FormGroup>
      <Button
        name="add-question"
        type="submit"
        cy-data="add-question"
        variant="primary">
        Add question
      </Button>
    </form>
  );
};

export default AddQuestionForm;
