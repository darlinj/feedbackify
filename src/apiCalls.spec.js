import React from 'react';
import {getQuestions, addQuestion} from './apiCalls';
import {API, graphqlOperation} from 'aws-amplify';
import {listQuestions} from './graphql/queries';
import {createQuestion} from './graphql/mutations';

jest.mock('aws-amplify');
jest.mock('./graphql/mutations');
jest.mock('./graphql/queries');

describe('api calls', () => {
  afterEach(() => {
    API.graphql.mockClear();
    graphqlOperation.mockClear();
  });

  it('gets a list of questions', async () => {
    const questions = [{some: "question"}, {someOther: "question"}]
    API.graphql.mockResolvedValue({data: {listQuestions: {items: questions }}});
    graphqlOperation.mockReturnValue('the list questions query');
    const questionList = await getQuestions();
    expect(graphqlOperation.mock.calls.length).toEqual(1);
    expect(graphqlOperation.mock.calls[0][0]).toContain("listQuestions");
    expect(API.graphql.mock.calls.length).toEqual(1);
    expect(API.graphql.mock.calls[0][0]).toEqual("the list questions query");
    expect(questionList).toEqual(questions)
  });

  it('resolves to the question list', () => {
    const questions = [{some: "question"}, {someOther: "question"}]
    API.graphql.mockResolvedValue({data: {listQuestions: {items: questions }}});
    graphqlOperation.mockReturnValue('the list questions query');
    expect.assertions(1);
    return getQuestions().then((returnedQuestions) => { expect(questions).toEqual(returnedQuestions) });
  });

  it('propogates the errors', async () => {
    API.graphql.mockRejectedValue("some error");
    graphqlOperation.mockReturnValue('the list questions query');
    expect.assertions(1);
    return getQuestions().catch((errorMessage) => { expect(errorMessage).toEqual({error: "some error"}) });
  });

  it('creates a question', async () => {
    const newQuestion = { question: "some question" }
    const addedQuestion = { id: 1234, question: "some question" }
    API.graphql.mockResolvedValue({data: {createQuestion: addedQuestion  }});
    graphqlOperation.mockReturnValue('the add question mutation');
    const returnedQuestion = await addQuestion(newQuestion);
    expect(graphqlOperation.mock.calls.length).toEqual(1);
    expect(graphqlOperation.mock.calls[0][0]).toContain("CreateQuestion");
    expect(graphqlOperation.mock.calls[0][1]).toEqual({input: newQuestion});
    expect(API.graphql.mock.calls.length).toEqual(1);
    expect(API.graphql.mock.calls[0][0]).toEqual("the add question mutation");
    expect(returnedQuestion).toEqual(addedQuestion)
  });

  it('resolves to the new question', () => {
    const newQuestion = { question: "some question" }
    const addedQuestion = { id: 1234, question: "some question" }
    API.graphql.mockResolvedValue({data: {createQuestion: addedQuestion  }});
    graphqlOperation.mockReturnValue('the add question mutation');
    expect.assertions(1);
    return addQuestion().then((newQ) => { expect(newQ).toEqual(addedQuestion) });
  });

  it('propogates the errors', async () => {
    API.graphql.mockRejectedValue("some error");
    graphqlOperation.mockReturnValue('the add question mutation');
    expect.assertions(1);
    return addQuestion().catch((errorMessage) => { expect(errorMessage).toEqual({error: "some error"}) });
  });
});
