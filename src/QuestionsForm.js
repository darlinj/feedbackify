import React, {useState} from 'react';
import {
  FormGroup,
  Button,
  FormControl,
  FormLabel,
  ListGroup,
  Jumbotron,
} from 'react-bootstrap';
import {API, graphqlOperation} from 'aws-amplify';
import {createQuestion} from './graphql/mutations';

const QuestioinsForm = () => {
  const [questionList, setQuestionList] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');

  const handleAddingRecipient = async event => {
    event.preventDefault();
    setQuestionList([...questionList, newQuestion]);
    const question = {
      requestid: 123,
      question: newQuestion
    };
    await API.graphql(graphqlOperation(createQuestion, {input: question}));
    setNewQuestion('');
  };

  const handleNewQuestion = event => {
    setNewQuestion(event.target.value);
  };

  const showQuestionList = () => {
    if (questionList.length === 0) {
      return <div>No questions yet. Please add questions below</div>;
    } else {
      return (
        <ListGroup
          name="questions"
          cy-data="question-list"
          className="questions">
          {questionList.map((question, index) => {
            return <ListGroup.Item key={index}>{question}</ListGroup.Item>;
          })}
        </ListGroup>
      );
    }
  };

  const showQuestions = () => {
    return (
      <Jumbotron>
        <h2>Question list</h2>
        {showQuestionList()}
      </Jumbotron>
    );
  };

  return (
    <div className="questions-form">
      <form onSubmit={handleAddingRecipient} className="questions-form">
        {showQuestions()}
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
    </div>
  );
};

export default QuestioinsForm;
