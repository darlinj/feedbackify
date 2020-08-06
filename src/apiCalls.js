import {API, graphqlOperation} from 'aws-amplify';
import {createQuestion, createFeedbackRequest, deleteQuestion, deleteFeedbackRequest} from './graphql/mutations';
import {listQuestions, listFeedbackRequests} from './graphql/queries';

const addQuestion = newQuestion => {
  return new Promise((resolve, reject) => {
    API.graphql(graphqlOperation(createQuestion, {input: newQuestion}))
      .then(result => {
        resolve(result.data.createQuestion);
      })
      .catch(e => {
        reject({error: e});
      });
  });
};

const addFeedbackRequest = (newFeedbackRequest) => {
  return new Promise((resolve, reject) => {
    API.graphql(graphqlOperation(createFeedbackRequest, {input: newFeedbackRequest}))
      .then(result => {
        resolve(result.data.createFeedbackRequest);
      })
      .catch(e => {
        console.log(e);
        reject({error: e});
      });
  });
}

const getQuestions = () => {
  return new Promise((resolve, reject) => {
    API.graphql(graphqlOperation(listQuestions))
      .then(result => {
        resolve(result.data.listQuestions.items);
      })
      .catch(e => {
        reject({error: e});
      });
  });
};

const getFeedbackRequests = () => {
  return new Promise((resolve, reject) => {
    API.graphql(graphqlOperation(listFeedbackRequests))
      .then(result => {
        resolve(result.data.listFeedbackRequests.items);
      })
      .catch(e => {
        reject({error: e});
      });
  });
};

const removeQuestion = (id) => {
  return new Promise((resolve, reject) => {
    API.graphql(graphqlOperation(deleteQuestion, {input: id}))
      .then(result => {
        resolve(result.data.deleteQuestion);
      })
      .catch(e => {
        reject({error: e});
      });
  });
}

const removeFeedbackRequest = (id) => {
  return new Promise((resolve, reject) => {
    API.graphql(graphqlOperation(deleteFeedbackRequest, {input: id}))
      .then(result => {
        resolve(result.data.deleteFeedbackRequest);
      })
      .catch(e => {
        reject({error: e});
      });
  });
}
export {addFeedbackRequest, addQuestion, getFeedbackRequests, getQuestions, removeQuestion, removeFeedbackRequest};
