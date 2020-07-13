
import {API, graphqlOperation} from 'aws-amplify';
import {createQuestion} from './graphql/mutations';
import {listQuestions} from './graphql/queries';

const addQuestion = (newQuestion) => {
    return API.graphql(graphqlOperation(createQuestion, {input: newQuestion})).then((result) => {
      return result.data.createQuestion
    }).catch((e) => { console.log(e); });
}

const getQuestions = () => {
    return API.graphql(graphqlOperation(listQuestions)).then((result) => {
      return result.data.listQuestions.items
    }).catch((e) => { console.log(e); });
}


export {addQuestion, getQuestions};
