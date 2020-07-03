/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFeedbackRequest = /* GraphQL */ `
  query GetFeedbackRequest($id: ID!) {
    getFeedbackRequest(id: $id) {
      id
      userid
      questions {
        items {
          id
          requestid
          question
        }
        nextToken
      }
    }
  }
`;
export const listFeedbackRequests = /* GraphQL */ `
  query ListFeedbackRequests(
    $filter: ModelFeedbackRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFeedbackRequests(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userid
        questions {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
      id
      requestid
      question
      feedback {
        items {
          id
          questionid
          content
        }
        nextToken
      }
    }
  }
`;
export const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        requestid
        question
        feedback {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getFeedback = /* GraphQL */ `
  query GetFeedback($id: ID!) {
    getFeedback(id: $id) {
      id
      questionid
      content
    }
  }
`;
export const listFeedbacks = /* GraphQL */ `
  query ListFeedbacks(
    $filter: ModelFeedbackFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFeedbacks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        questionid
        content
      }
      nextToken
    }
  }
`;
