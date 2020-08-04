import React, {useState, useEffect} from 'react';
import QuestionsList from './QuestionsList';
import AddQuestionForm from './AddQuestionForm';
import {addQuestion, getQuestions, removeQuestion} from './apiCalls';
import {toast} from 'react-toastify';

const QuestionsPage = props => {
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    getQuestions()
      .then(response => {
        setQuestionList(response);
      })
      .catch(e => {
        toast.error(`Failed to get questions. Check your internet connection`);
      });
  }, []);

  const handleAddingQuestion = async newQuestion => {
    const question = {
      requestid: props.requestid,
      question: newQuestion,
    };
    addQuestion(question)
      .then(result => {
        setQuestionList([...questionList, result]);
      })
      .catch(e => {
        toast.error(`Failed to save question. Check your internet connection`);
      });
  };

  const handleDelete = id => {
    removeQuestion({id: id})
      .then(result => {
        setQuestionList(questionList.filter(q => q.id !== id));
      })
      .catch(e => {
        toast.error(`Failed to delete question. Check your internet connection`);
      });
  };

  return (
    <div className="questions-form">
      <QuestionsList questionList={questionList} handleDelete={handleDelete} />
      <AddQuestionForm handleAddingQuestion={handleAddingQuestion} />
    </div>
  );
};

export default QuestionsPage;
