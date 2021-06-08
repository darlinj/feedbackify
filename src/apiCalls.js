import { API } from "aws-amplify";

const addQuestion = async (question) => {
  const query_string = `mutation MyMutation {
        saveQuestion(questionnaireId: "${question.questionnaireId}", question: "${question.question}") {
          id
          questionnaireId
          question
        }
      }`;
  const result = await API.graphql({
    query: query_string,
    variables: {},
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  return result.data.saveQuestion;
};

const addQuestionnaire = async (questionnaire) => {
  const query_string = `mutation MyMutation {
    saveQuestionnaire(name: "${questionnaire.name}") {
         id
         name
       }
     }`;
  const result = await API.graphql({
    query: query_string,
    variables: {},
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  return result.data.saveQuestionnaire;
};

const addFeedback = async (feedback) => {
  const query_string = `mutation MyMutation {
        saveFeedback(questionId: "${feedback.questionId}", feedback: "${feedback.feedback}") {
          id
          questionId
          feedback
        }
      }`;
  const result = await API.graphql({
    query: query_string,
    variables: {},
    authMode: "API_KEY",
  });
  return result.data.saveFeedback;
};

const getQuestions = async () => {
  const query_string = `query MyQuery {
       getQuestions {
         questions {
           id
           questionnaireId
           question
         }
       }
     }`;
  const result = await API.graphql({
    query: query_string,
    variables: {},
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  return result.data.getQuestions.questions;
};

const getQuestion = async (id) => {
  const query_string = `query MyQuery {
       getQuestion (id: "${id}") {
           id
           question
           questionnaireId
       }
     }`;
  const result = await API.graphql({
    query: query_string,
    variables: {},
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  return result.data.getQuestion;
};

const getFeedback = async (id) => {
  const query_string = `query MyQuery {
       getFeedback (id: "${id}") {
           id
           feedback
           questionId
       }
     }`;
  const result = await API.graphql({
    query: query_string,
    variables: {},
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  return result.data.getFeedback;
};

const getQuestionnairePublic = async (id) => {
  const query_string = `query MyQuery { 
    getQuestionnairePublic(id: "${id}") {
      id
      name
      questions {
        items {
          id
          question
        }
      }
    }
  }`;
  const result = await API.graphql({
    query: query_string,
    variables: {},
    authMode: "API_KEY",
  });
  return result.data.getQuestionnairePublic;
};

const getQuestionnaire = async (id) => {
  const query_string = `query MyQuery {
    getQuestionnaire(id: "${id}") {
      id
      name
      questions {
        items {
          id
          question
          feedback {
            items {
              id
              feedback
            }
          }
        }
      }
    }
  }`;
  const result = await API.graphql({
    query: query_string,
    variables: {},
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  return result.data.getQuestionnaire;
};

const getQuestionnaires = async () => {
  const query_string = `query MyQuery {
      getQuestionnaires {
        questionnaires {
          id
          name
        }
      }
    }`;
  const result = await API.graphql({
    query: query_string,
    variables: {},
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  return result.data.getQuestionnaires.questionnaires;
};

const removeQuestion = async (id) => {
  const query_string = `mutation MyMutation {
       deleteQuestion(id: "${id}") {
         id
       }
     }`;
  const result = await API.graphql({
    query: query_string,
    variables: {},
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  return result.data.deleteQuestion;
};

const removeQuestionnaire = async (id) => {
  const query_string = `mutation MyMutation {
      deleteQuestionnaire(id: "${id}") {
        id
      }
    }`;
  const result = await API.graphql({
    query: query_string,
    variables: {},
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  return result.data.deleteQuestionnaire;
};

export {
  addQuestionnaire,
  addQuestion,
  addFeedback,
  getQuestionnaires,
  getQuestionnaire,
  getQuestionnairePublic,
  getQuestions,
  getQuestion,
  getFeedback,
  removeQuestion,
  removeQuestionnaire,
};
