import React from "react";
import { Table } from "react-bootstrap";
import { FaMinusSquare, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from "moment";

const QuestionnairesList = (props) => {
  const handleDelete = (id, event) => {
    event.preventDefault();
    props.handleDelete(id);
  };

  const showQuestionnaires = () => {
    const questionnaireList = props.questionnaireList || [];
    if (questionnaireList.length === 0) {
      return (
        <tr>
          <td colSpan="2">No questionnaires yet. Please add one below</td>
        </tr>
      );
    } else {
      return (
        <>
          {questionnaireList.map((questionnaireObject, index) => {
            return (
              <tr className="questionnaire-item" key={index}>
                <td>{questionnaireObject.name}</td>
                <td>
                  <a
                    href={`${window.location.href}feedback/${questionnaireObject.id}`}
                  >
                    Feedback link
                  </a>
                </td>
                <td>
                  {moment(questionnaireObject.createdAt).format(
                    "hh:mm Do MMM YYYY"
                  )}
                </td>
                <td>
                  {moment(questionnaireObject.updatedAt).format(
                    "hh:mm Do MMM YYYY"
                  )}
                </td>
                <td style={{ display: "flex" }}>
                  <Link
                    data-testid="edit-questionnaire"
                    to={`/questionnaire/${questionnaireObject.id}`}
                    alt="Edit"
                  >
                    <FaEdit style={{ color: "red" }} />
                  </Link>
                  <button
                    id={questionnaireObject.id}
                    className="btn"
                    onClick={(e) => handleDelete(questionnaireObject.id, e)}
                    value={questionnaireObject.id}
                    data-testid="delete-questionnaire"
                    style={{
                      paddingTop: "1px",
                      paddingBottom: "1px",
                    }}
                  >
                    <FaMinusSquare style={{ color: "red" }} />
                  </button>
                </td>
                <td>
                  <Link
                    to={`/questionnaire_feedback/${questionnaireObject.id}`}
                    alt="View feedback"
                  >
                    View feedback
                  </Link>
                </td>
              </tr>
            );
          })}
        </>
      );
    }
  };

  const questionnairesTable = () => {
    return (
      <Table
        striped
        borderless
        hover
        name="questionnaires"
        cy-data="questionnaire-list"
        className="questionnaires"
      >
        <thead>
          <tr>
            <th>Title</th>
            <th></th>
            <th>Created at</th>
            <th>Updated at</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{showQuestionnaires()}</tbody>
      </Table>
    );
  };

  const questionnaireBody = () => {
    if (props.isLoading) {
      return <div data-test-id="loading-banner">Loading...</div>;
    } else {
      return questionnairesTable();
    }
  };

  return (
    <>
      <h2>Questionnaires</h2>
      {questionnaireBody()}
    </>
  );
};

export default QuestionnairesList;
