import { API, graphqlOperation } from "aws-amplify";

const runGraphqlOperation = (query_string) => {
  const query = graphqlOperation(query_string);
  return API.graphql(query);
};

const addQuestion = (question) => {
  return new Promise((resolve, reject) => {
    runGraphqlOperation(`mutation MyMutation {
        saveQuestion(questionnaireId: "${question.questionnaireId}", question: "${question.question}") {
          id
          questionnaireId
          question
        }
      }`)
      .then((result) => {
        resolve(result.data.saveQuestion);
      })
      .catch((e) => {
        reject({ error: e });
      });
  });
};

const addQuestionnaire = (newQuestionnaire) => {
  return new Promise((resolve, reject) => {
    runGraphqlOperation(`mutation MyMutation {
    saveQuestionnaire(name: "${newQuestionnaire.name}") {
         id
         name
       }
     }`)
      .then((result) => {
        resolve(result.data.saveQuestionnaire);
      })
      .catch((e) => {
        reject({ error: e });
      });
  });
};

const addFeedback = (feedback) => {
  return new Promise((resolve, reject) => {
    runGraphqlOperation(`mutation MyMutation {
        saveQuestion(questionnaireId: "1234", question: "some question") {
          id
          questionnaireId
          question
        }
      }`)
      .then((result) => {
        resolve(result.data.createFeedback);
      })
      .catch((e) => {
        console.log(e);
        reject({ error: e });
      });
  });
};

const getQuestions = () => {
  return new Promise((resolve, reject) => {
    runGraphqlOperation(`query MyQuery {
       getQuestions {
         questions {
           id
           questionnaireId
           question
         }
       }
     }`)
      .then((result) => {
        resolve(result.data.getQuestions.questions);
      })
      .catch((e) => {
        reject({ error: e });
      });
  });
};

const retrieveQuestionnaire = (id) => {
  return new Promise((resolve, reject) => {
    runGraphqlOperation(`query MyQuery {
  getQuestionnaire(id: "${id}") {
    id
    questions {
      items {
        id
        question
      }
    }
  }
}`)
      .then((result) => {
        resolve(result.data.getQuestionnaire);
      })
      .catch((e) => {
        reject({ error: e });
      });
  });
};

const getQuestionnaires = () => {
  return new Promise((resolve, reject) => {
    runGraphqlOperation(`query MyQuery {
      getQuestionnaires {
        questionnaires {
          id
          name
        }
      }
    }`)
      .then((result) => {
        resolve(result.data.getQuestionnaires.questionnaires);
      })
      .catch((e) => {
        reject({ error: e });
      });
  });
};

const removeQuestion = (id) => {
  return new Promise((resolve, reject) => {
    runGraphqlOperation(`mutation MyMutation {
       deleteQuestion(id: "${id}") {
         id
       }
     }`)
      .then((result) => {
        resolve(result.data.deleteQuestion);
      })
      .catch((e) => {
        reject({ error: e });
      });
  });
};

const removeQuestionnaire = (id) => {
  return new Promise((resolve, reject) => {
    runGraphqlOperation(`mutation MyMutation {
      deleteQuestionnaire(id: "${id}") {
        id
      }
    }`)
      .then((result) => {
        resolve(result.data.deleteQuestionnaire);
      })
      .catch((e) => {
        reject({ error: e });
      });
  });
};

export {
  addQuestionnaire,
  addQuestion,
  addFeedback,
  getQuestionnaires,
  retrieveQuestionnaire,
  getQuestions,
  removeQuestion,
  removeQuestionnaire,
};
