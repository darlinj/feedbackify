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
  const [questionnaireList, setRequestList] = useState([]);

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
        setRequestList([...questionnaireList, result]);
      })
      .catch(e => {
        toast.error(`Failed to save request. Check your internet connection`);
      });
  };

  const handleDelete = id => {
    removeQuestionnaire({ id: id })
      .then(result => {
        setRequestList(questionnaireList.filter(q => q.id !== id));
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
        questionnaireList={questionnaireList}
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
