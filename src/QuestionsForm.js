import React, {useState, useEffect} from 'react';
import {
  FormGroup,
  Button,
  FormControl,
  FormLabel,
  ListGroup,
  Jumbotron,
} from 'react-bootstrap';
import {FaMinusSquare} from 'react-icons/fa';
import QuestionsList from './QuestionsList';
import {addQuestion, getQuestions} from './apiCalls';

const QuestioinsForm = () => {
  const [questionList, setQuestionList] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getQuestions().then((response)  => {
      setQuestionList(response);
    }).catch((e) => {
      console.log(e);
    });
  },[])

  const handleAddingQuestion = async event => {
    event.preventDefault();
    const question = {
      requestid: 123,
      question: newQuestion
    };
    setIsSaving(true);
    addQuestion(question).then((result) => {
      setIsSaving(false);
      setQuestionList([...questionList, result]);
    }).catch((e) => { console.log(e); });
  };

  const handleNewQuestion = event => {
    setNewQuestion(event.target.value);
  };

  const handleDelete = id => {
    console.log(id);
  }

  return (
    <div className="questions-form">
    <QuestionsList questionList={questionList} handleDelete={handleDelete} />
      <form onSubmit={handleAddingQuestion} className="questions-form">
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
