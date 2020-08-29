import React, { useState, useEffect } from "react";
import { retrieveQuestionnaire } from "./apiCalls";
import FeedbackForm from "./FeedbackForm";
import TitleBar from "./TitleBar";
import { toast } from "react-toastify";

const FeedbackPage = props => {
  const questionnaireId = props.match.params.id;
  const [questionnaire, setQuestionnaire] = useState({
    name: "Loading...",
    questions: { items: [] }
  });

  useEffect(() => {
    retrieveQuestionnaire(questionnaireId)
      .then(response => {
        if (response === null) {
          toast.error("We couldn't find that questionnaire.  Was it deleted?");
        } else {
          setQuestionnaire(response);
        }
      })
      .catch(e => {
        toast.error(
          `Failed to get this questionnaire. Check your internet connection`
        );
      });
  }, []);

  return (
    <>
      <TitleBar title={questionnaire.name} />
      <FeedbackForm />
    </>
  );
};

export default FeedbackPage;
