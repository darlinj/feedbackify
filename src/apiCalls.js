import {API, graphqlOperation} from 'aws-amplify';
import {createQuestion, deleteQuestion} from './graphql/mutations';
import {listQuestions} from './graphql/queries';

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

export {addQuestion, getQuestions, removeQuestion};
