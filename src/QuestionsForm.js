import React, {useState} from 'react';
import {
  FormGroup,
  Button,
  FormControl,
  FormLabel,
  ListGroup,
} from 'react-bootstrap';

const QuestioinsForm = () => {
  const [questionList, setQuestionList] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');

  const handleAddingRecipient = event => {
    event.preventDefault();
    setQuestionList([...questionList, newQuestion])
  };

  const handleNewQuestion = event => {
    setNewQuestion(event.target.value);
  }

  return (
    <div className="questions-form">
      <h2>Question list</h2>
      <ListGroup name="questions" cy-data="question-list" className="questions">
        { questionList.map((question, index) => { return <ListGroup.Item key={index}>{question}</ListGroup.Item> })}
      </ListGroup>
      <form onSubmit={handleAddingRecipient} className="questions-form">
        <FormGroup controlId="feedback-question">
          <FormLabel>Feedback question</FormLabel>
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
    </div>
  );
};

export default QuestioinsForm;
