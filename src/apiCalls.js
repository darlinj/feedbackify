import { API, graphqlOperation } from "aws-amplify";
import {
  createQuestion,
  createQuestionnaire,
  createFeedback,
  deleteQuestion,
  deleteQuestionnaire
} from "./graphql/mutations";
import {
  listQuestions,
  listQuestionnaires,
  getQuestionnaire
} from "./graphql/queries";

const addQuestion = newQuestion => {
  return new Promise((resolve, reject) => {
    API.graphql(graphqlOperation(createQuestion, { input: newQuestion }))
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
    API.graphql(
      graphqlOperation(createQuestionnaire, { input: newQuestionnaire })
    )
      .then(result => {
        resolve(result.data.createQuestionnaire);
      })
      .catch(e => {
        console.log(e);
        reject({ error: e });
      });
  });
};

const addFeedback = feedback => {
  return new Promise((resolve, reject) => {
    API.graphql(graphqlOperation(createFeedback, { input: feedback }))
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
    API.graphql(graphqlOperation(listQuestions))
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
    API.graphql(graphqlOperation(getQuestionnaire, { id: id }))
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
    API.graphql(graphqlOperation(listQuestionnaires))
      .then(result => {
        resolve(result.data.listQuestionnaires.items);
      })
      .catch(e => {
        reject({ error: e });
      });
  });
};

const removeQuestion = id => {
  return new Promise((resolve, reject) => {
    API.graphql(graphqlOperation(deleteQuestion, { input: id }))
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
    API.graphql(graphqlOperation(deleteQuestionnaire, { input: id }))
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
