import React, { useState, useEffect } from "react";
import { retrieveQuestionnaire, addFeedback } from "./apiCalls";
import FeedbackForm from "./FeedbackForm";
import TitleBar from "./TitleBar";
import { toast } from "react-toastify";

const FeedbackPage = props => {
  const questionnaireId = props.match.params.id;
  const [feedbackSubmitted, setfeedbackSubmitted] = useState(false);
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
        console.log(e);
      });
  }, []);

  const submitFeedback = feedback => {
    Object.keys(feedback).forEach(questionId => {
      addFeedback({
        questionid: questionId,
        content: feedback[questionId]
      });
    });
    setfeedbackSubmitted(true);
  };

  const feedbackPage = () => {
    return (
      <>
        <TitleBar title={questionnaire.name} />
        <FeedbackForm
          questionList={questionnaire.questions.items}
          submitFeedback={submitFeedback}
        />
      </>
    );
  };

  const thankYouMessage = () => {
    return <TitleBar title="Thanks for your feedback" />;
  };

  return feedbackSubmitted ? thankYouMessage() : feedbackPage();
};

export default FeedbackPage;
