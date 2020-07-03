/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFeedbackRequest = /* GraphQL */ `
  mutation CreateFeedbackRequest(
    $input: CreateFeedbackRequestInput!
    $condition: ModelFeedbackRequestConditionInput
  ) {
    createFeedbackRequest(input: $input, condition: $condition) {
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
export const updateFeedbackRequest = /* GraphQL */ `
  mutation UpdateFeedbackRequest(
    $input: UpdateFeedbackRequestInput!
    $condition: ModelFeedbackRequestConditionInput
  ) {
    updateFeedbackRequest(input: $input, condition: $condition) {
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
export const deleteFeedbackRequest = /* GraphQL */ `
  mutation DeleteFeedbackRequest(
    $input: DeleteFeedbackRequestInput!
    $condition: ModelFeedbackRequestConditionInput
  ) {
    deleteFeedbackRequest(input: $input, condition: $condition) {
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
export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
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
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
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
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
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
export const createFeedback = /* GraphQL */ `
  mutation CreateFeedback(
    $input: CreateFeedbackInput!
    $condition: ModelFeedbackConditionInput
  ) {
    createFeedback(input: $input, condition: $condition) {
      id
      questionid
      content
    }
  }
`;
export const updateFeedback = /* GraphQL */ `
  mutation UpdateFeedback(
    $input: UpdateFeedbackInput!
    $condition: ModelFeedbackConditionInput
  ) {
    updateFeedback(input: $input, condition: $condition) {
      id
      questionid
      content
    }
  }
`;
export const deleteFeedback = /* GraphQL */ `
  mutation DeleteFeedback(
    $input: DeleteFeedbackInput!
    $condition: ModelFeedbackConditionInput
  ) {
    deleteFeedback(input: $input, condition: $condition) {
      id
      questionid
      content
    }
  }
`;
