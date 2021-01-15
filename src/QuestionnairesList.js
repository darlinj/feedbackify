import React from "react";
import { Table } from "react-bootstrap";
import { FaMinusSquare, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from "moment";

const QuestionnairesList = props => {
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
                    href={`http://${window.location.href}feedback/${questionnaireObject.id}`}
                  >
                    Link
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
                <td>
                  <Link
                    to={`/questionnaire/${questionnaireObject.id}`}
                    alt="Edit"
                  >
                    <FaEdit style={{ color: "red" }} />
                  </Link>
                  <button
                    id={questionnaireObject.id}
                    className="btn"
                    onClick={e => handleDelete(questionnaireObject.id, e)}
                    value={questionnaireObject.id}
                    role="delete-questionnaire"
                    style={{
                      paddingTop: "1px",
                      paddingBottom: "1px"
                    }}
                  >
                    <FaMinusSquare style={{ color: "red" }} />
                  </button>
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
            <th>Send this link</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{showQuestionnaires()}</tbody>
      </Table>
    );
  };

  const questionnaireBody = () => {
    if (props.isLoading) {
      return <div role="loading-banner">Loading...</div>;
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
