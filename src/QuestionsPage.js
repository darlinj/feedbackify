import React, { useState, useEffect } from "react";
import QuestionsList from "./QuestionsList";
import AddQuestionForm from "./AddQuestionForm";
import TitleBar from "./TitleBar";
import { addQuestion, getQuestionnaire, removeQuestion } from "./apiCalls";
import { toast } from "react-toastify";

const QuestionsPage = (props) => {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
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
            setQuestionnaire(null);
            setLoading(false);
          } else {
            setQuestionList(response.questions.items);
            setQuestionnaire(response);
            setLoading(false);
          }
        }
      })
      .catch((e) => {
        setQuestionnaire(null);
        setLoading(false);
      });
    return () => (mounted = false);
  }, [questionnaireId]);

  const handleAddingQuestion = async (newQuestion) => {
    const question = {
      questionnaireId: questionnaireId,
      question: newQuestion,
    };
    addQuestion(question)
      .then((result) => {
        setQuestionList([...questionList, result]);
      })
      .catch((e) => {
        toast.error(`Failed to save question. Check your internet connection`);
      });
  };

  const handleDelete = (id) => {
    removeQuestion(id)
      .then((result) => {
        setQuestionList(questionList.filter((q) => q.id !== id));
      })
      .catch((e) => {
        toast.error(
          `Failed to delete question. Check your internet connection`
        );
      });
  };

  const loadingPlaceholder = () => {
    return <h1 data-testid="loading">Loading...</h1>;
  };

  const loadedPage = () => {
    if (questionnaire === null) {
      return (
        <h2 data-testid="error-message">
          "Sorry but we couldn't find that questionnaire."
        </h2>
      );
    }
    return (
      <>
        <TitleBar title={questionnaire.name} />
        <div data-testid="sharing-url">
          Sharing link:
          <a
            href={`http://${window.location.hostname}/feedback/${questionnaire.id}`}
          >
            {`http://${window.location.hostname}/feedback/${questionnaire.id}`}
          </a>
        </div>
        <QuestionsList
          questionList={questionList}
          handleDelete={handleDelete}
        />
        <AddQuestionForm handleAddingQuestion={handleAddingQuestion} />
      </>
    );
  };

  return (
    <div className="questions-form" data-testid="feedback-page">
      {loading ? loadingPlaceholder() : loadedPage()}
    </div>
  );
};

export default QuestionsPage;
