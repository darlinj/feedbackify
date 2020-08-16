import React, { useState, useEffect } from "react";
import AddQuestionnaireForm from "./AddQuestionnaireForm";
import QuestionnairesList from "./QuestionnairesList";
import {
  getFeedbackRequests,
  addFeedbackRequest,
  removeFeedbackRequest
} from "./apiCalls";
import { toast } from "react-toastify";

const QuestionnairesPage = props => {
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    getFeedbackRequests()
      .then(response => {
        setRequestList(response);
      })
      .catch(e => {
        toast.error(
          `Failed to get feedback requests. Check your internet connection`
        );
      });
  }, []);

  const handleAddingRequest = newRequest => {
    const request = {
      userid: 1234,
      name: newRequest
    };
    addFeedbackRequest(request)
      .then(result => {
        setRequestList([...requestList, result]);
      })
      .catch(e => {
        toast.error(`Failed to save request. Check your internet connection`);
      });
  };

  const handleDelete = id => {
    removeFeedbackRequest({ id: id })
      .then(result => {
        setRequestList(requestList.filter(q => q.id !== id));
      })
      .catch(e => {
        toast.error(
          `Failed to delete feedback request. Check your internet connection`
        );
      });
  };

  return (
    <>
      <QuestionnairesList
        {...props}
        requestList={requestList}
        handleDelete={handleDelete}
      />
      <AddQuestionnaireForm
        {...props}
        handleAddingRequest={handleAddingRequest}
      />
    </>
  );
};

export default QuestionnairesPage;
