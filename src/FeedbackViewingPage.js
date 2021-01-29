import React, { useEffect, useState } from "react";
import { getQuestionnaire } from "./apiCalls";
import { toast } from "react-toastify";
import FeedbackViewingList from "./FeedbackViewingList";

const FeedbackViewingPage = (props) => {
  const [questionnaire, setQuestionnaire] = useState({
    name: "Loading...",
    questions: { items: [] },
  });
  const questionnaireId = props.match.params.id;

  useEffect(() => {
    let mounted = true;
    getQuestionnaire(questionnaireId)
      .then((response) => {
        if (mounted) {
          if (response === null) {
            toast.error(
              "We couldn't find that questionnaire.  Was it deleted?"
            );
          } else {
            setQuestionnaire(response);
          }
        }
      })
      .catch((e) => {
        toast.error(
          `Failed to get questionnaire. Check your internet connection`
        );
      });
    return () => (mounted = false);
  }, [questionnaireId]);
  return (
    <div data-testid="feedback-view-page">
      Feedback for : <h1>{questionnaire.name}</h1>
      <FeedbackViewingList questions={questionnaire.questions.items} />
    </div>
  );
};

export default FeedbackViewingPage;
