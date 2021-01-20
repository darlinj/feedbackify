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
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    getQuestionnaires()
      .then(response => {
        if (isMounted) {
          setQuestionnairesList(response);
          setIsLoading(false);
        }
      })
      .catch(e => {
        if (isMounted) {
          toast.error(
            `Failed to get feedback questionnaires. Check your internet connection`
          );
        }
      });
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleAddingQuestionnaire = newQuestionnaireName => {
    const questionnaire = {
      userid: 1234,
      name: newQuestionnaireName
    };
    addQuestionnaire(questionnaire)
      .then(result => {
        if (isMounted) {
          setQuestionnairesList([...questionnaireList, result]);
        }
      })
      .catch(e => {
        toast.error(
          `Failed to save questionnaire. Check your internet connection`
        );
      });
  };

  const handleDelete = id => {
    removeQuestionnaire(id)
      .then(result => {
        if (isMounted) {
          setQuestionnairesList(questionnaireList.filter(q => q.id !== id));
        }
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
        isLoading={isLoading}
      />
      <AddQuestionnaireForm
        {...props}
        handleAddingQuestionnaire={handleAddingQuestionnaire}
      />
    </>
  );
};

export default QuestionnairesPage;
