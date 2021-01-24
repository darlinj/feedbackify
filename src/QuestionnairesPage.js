import React, { useState, useEffect } from "react";
import AddQuestionnaireForm from "./AddQuestionnaireForm";
import QuestionnairesList from "./QuestionnairesList";
import {
  getQuestionnaires,
  addQuestionnaire,
  removeQuestionnaire,
} from "./apiCalls";
import { toast } from "react-toastify";

const QuestionnairesPage = (props) => {
  const [questionnaireList, setQuestionnairesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    getQuestionnaires()
      .then((response) => {
        if (mounted) {
          setQuestionnairesList(response);
          setIsLoading(false);
        }
      })
      .catch((e) => {
        if (mounted) {
          toast.error(
            `Failed to get feedback questionnaires. Check your internet connection`
          );
        }
      });
    return () => {
      setMounted(false);
    };
  }, [mounted]);

  const handleAddingQuestionnaire = (newQuestionnaireName) => {
    const questionnaire = {
      userid: 1234,
      name: newQuestionnaireName,
    };
    addQuestionnaire(questionnaire)
      .then((result) => {
        if (mounted) {
          setQuestionnairesList([...questionnaireList, result]);
        }
      })
      .catch((e) => {
        toast.error(
          `Failed to save questionnaire. Check your internet connection`
        );
      });
  };

  const handleDelete = (id) => {
    removeQuestionnaire(id)
      .then((result) => {
        if (mounted) {
          setQuestionnairesList(questionnaireList.filter((q) => q.id !== id));
        }
      })
      .catch((e) => {
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
