import React from 'react';
import {ListGroup, Jumbotron} from 'react-bootstrap';
import {FaMinusSquare} from 'react-icons/fa';

const QuestionsList = params => {
  const handleDelete = (id, event) => {
    event.preventDefault();
    params.handleDelete(id);
  };

  const showQuestionList = () => {
    const questionList = params.questionList || [];
    if (questionList.length === 0) {
      return <div>No questions yet. Please add questions below</div>;
    } else {
      return (
        <ListGroup
          name="questions"
          cy-data="question-list"
          className="questions">
          {questionList.map((questionObject, index) => {
            return (
              <ListGroup.Item className="question-item" key={index}>
                {questionObject.question}{' '}
                <button
                  className="btn"
                  onClick={e => handleDelete(questionObject.id, e)}
                  value={questionObject.id}
                  cy-data="delete-question"
                  style={{float: 'right'}}>
                  <FaMinusSquare style={{color: 'red'}} />
                </button>{' '}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      );
    }
  };

  return (
    <Jumbotron>
      <h2>Question list</h2>
      {showQuestionList()}
    </Jumbotron>
  );
};

export default QuestionsList;
