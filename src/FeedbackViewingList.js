import React from "react";
import { Table } from "react-bootstrap";

const FeedbackViewingList = (props) => {
  const showQuestionList = () => {
    const questionList = props.questions || [];
    if (questionList.length === 0) {
      return (
        <tr>
          <td colSpan="2">There are no questions attached to this feedback</td>
        </tr>
      );
    } else {
      return (
        <>
          {questionList.map((questionObject, index) => {
            return (
              <tr className="question-item" key={index}>
                <td align="left">{questionObject.question}</td>
              </tr>
            );
          })}
        </>
      );
    }
  };

  return (
    <>
      <Table striped borderless hover>
        <thead>
          <tr>
            <th>Question</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{showQuestionList()}</tbody>
      </Table>
    </>
  );
};

export default FeedbackViewingList;
