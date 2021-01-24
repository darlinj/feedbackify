import React from "react";
import { Table } from "react-bootstrap";
import { FaMinusSquare } from "react-icons/fa";

const QuestionsList = (params) => {
  const handleDelete = (id, event) => {
    event.preventDefault();
    params.handleDelete(id);
  };

  const showQuestionList = () => {
    const questionList = params.questionList || [];
    if (questionList.length === 0) {
      return (
        <tr>
          <td colSpan="2">No questions yet. Please add questions below</td>
        </tr>
      );
    } else {
      return (
        <>
          {questionList.map((questionObject, index) => {
            return (
              <tr className="question-item" key={index}>
                <td align="left">{questionObject.question}</td>
                <td>
                  <button
                    id={questionObject.id}
                    className="btn"
                    onClick={(e) => handleDelete(questionObject.id, e)}
                    value={questionObject.id}
                    data-testid="delete-question"
                    style={{
                      float: "right",
                      paddingTop: "1px",
                      paddingBottom: "1px",
                    }}
                  >
                    <FaMinusSquare style={{ color: "red" }} />
                  </button>{" "}
                </td>
              </tr>
            );
          })}
        </>
      );
    }
  };

  return (
    <>
      <h2>Question list</h2>
      <Table
        striped
        borderless
        hover
        name="questions"
        cy-data="question-list"
        className="questions"
      >
        <thead>
          <tr>
            <th>Title</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{showQuestionList()}</tbody>
      </Table>
    </>
  );
};

export default QuestionsList;
