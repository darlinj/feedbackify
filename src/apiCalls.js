import {API, graphqlOperation} from 'aws-amplify';
import {createQuestion} from './graphql/mutations';
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

export {addQuestion, getQuestions};
