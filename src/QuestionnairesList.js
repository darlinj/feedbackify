import React from "react";
import { ListGroup, Jumbotron } from "react-bootstrap";
import { FaMinusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

const QuestionnairesList = params => {
  const handleDelete = (id, event) => {
    event.preventDefault();
    params.handleDelete(id);
  };

  const showQuestionnaires = () => {
    const questionnaireList = params.questionnaireList || [];
    if (questionnaireList.length === 0) {
      return <div>No feedback surveys yet. Please add one below</div>;
    } else {
      return (
        <ListGroup
          name="questionnaires"
          cy-data="questionnaire-list"
          className="questionnaires"
        >
          {questionnaireList.map((questionnaireObject, index) => {
            return (
              <ListGroup.Item className="questionnaire-item" key={index}>
                <Link to={`/questionnaire/${questionnaireObject.id}`}>
                  {questionnaireObject.name}{" "}
                </Link>
                <button
                  className="btn"
                  onClick={e => handleDelete(questionnaireObject.id, e)}
                  value={questionnaireObject.id}
                  cy-data="delete-questionnaire"
                  style={{ float: "right" }}
                >
                  <FaMinusSquare style={{ color: "red" }} />
                </button>{" "}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      );
    }
  };

  return (
    <Jumbotron>
      <h2>Feedback surveys</h2>
      {showQuestionnaires()}
    </Jumbotron>
  );
};

export default QuestionnairesList;
