import React, { useState, useEffect } from "react";
import AddQuestionnaireForm from "./AddQuestionnaireForm";
import QuestionnairesList from "./QuestionnairesList";
import {
  getQuestionnaires,
  addQuestionnaire,
  removeQuestionnaire
} from "./apiCalls";
import { toast } from "react-toastify";

const QuestionnairesPage = props => {
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    getQuestionnaires()
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
    addQuestionnaire(request)
      .then(result => {
        setRequestList([...requestList, result]);
      })
      .catch(e => {
        toast.error(`Failed to save request. Check your internet connection`);
      });
  };

  const handleDelete = id => {
    removeQuestionnaire({ id: id })
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
