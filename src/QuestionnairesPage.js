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
  const [questionnaireList, setQuestionnairesList] = useState([]);

  useEffect(() => {
    getQuestionnaires()
      .then(response => {
        setQuestionnairesList(response);
      })
      .catch(e => {
        toast.error(
          `Failed to get feedback questionnaires. Check your internet connection`
        );
      });
  }, []);

  const handleAddingQuestionnaire = newQuestionnaireName => {
    const questionnaire = {
      userid: 1234,
      name: newQuestionnaireName
    };
    addQuestionnaire(questionnaire)
      .then(result => {
        setQuestionnairesList([...questionnaireList, result]);
      })
      .catch(e => {
        toast.error(
          `Failed to save questionnaire. Check your internet connection`
        );
      });
  };

  const handleDelete = id => {
    removeQuestionnaire({ id: id })
      .then(result => {
        setQuestionnairesList(questionnaireList.filter(q => q.id !== id));
      })
      .catch(e => {
        toast.error(
          `Failed to delete feedback questionnaire. Check your internet connection`
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
        handleAddingQuestionnaire={handleAddingQuestionnaire}
      />
    </>
  );
};

export default QuestionnairesPage;
