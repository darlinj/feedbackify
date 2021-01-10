import { API, graphqlOperation } from "aws-amplify";
import * as rawAPI from "./rawApiCalls.js";

const addQuestion = newQuestion => {
  return new Promise((resolve, reject) => {
    rawAPI
      .saveQuestion(newQuestion)
      .then(result => {
        resolve(result.data.createQuestion);
      })
      .catch(e => {
        reject({ error: e });
      });
  });
};

const addQuestionnaire = newQuestionnaire => {
  return new Promise((resolve, reject) => {
    rawAPI
      .saveQuestionnaire(newQuestionnaire)
      .then(result => {
        resolve(result.data.createQuestionnaire);
      })
      .catch(e => {
        reject({ error: e });
      });
  });
};

const addFeedback = feedback => {
  return new Promise((resolve, reject) => {
    rawAPI
      .saveQuestion(feedback) //CHANGE ME!!!
      .then(result => {
        resolve(result.data.createFeedback);
      })
      .catch(e => {
        console.log(e);
        reject({ error: e });
      });
  });
};

const getQuestions = () => {
  return new Promise((resolve, reject) => {
    rawAPI
      .getQuestions()
      .then(result => {
        resolve(result.data.listQuestions.items);
      })
      .catch(e => {
        reject({ error: e });
      });
  });
};

const retrieveQuestionnaire = id => {
  return new Promise((resolve, reject) => {
    rawAPI
      .getQuestionnaire(id)
      .then(result => {
        resolve(result.data.getQuestionnaire);
        console.log("result:", result);
      })
      .catch(e => {
        reject({ error: e });
      });
  });
};

const getQuestionnaires = () => {
  return new Promise((resolve, reject) => {
    rawAPI
      .getQuestionnaires()
      .then(result => {
        console.log("data", result.data);
        resolve(result.data.getQuestionnaires.questionnaires);
      })
      .catch(e => {
        reject({ error: e });
      });
  });
};

const removeQuestion = id => {
  return new Promise((resolve, reject) => {
    rawAPI
      .deleteQuestion(id)
      .then(result => {
        resolve(result.data.deleteQuestion);
      })
      .catch(e => {
        reject({ error: e });
      });
  });
};

const removeQuestionnaire = id => {
  return new Promise((resolve, reject) => {
    rawAPI
      .deleteQuestionnaire(id)
      .then(result => {
        resolve(result.data.deleteQuestionnaire);
      })
      .catch(e => {
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
  removeQuestionnaire
};
