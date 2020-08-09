/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFeedbackRequest = /* GraphQL */ `
  subscription OnCreateFeedbackRequest {
    onCreateFeedbackRequest {
      id
      userid
      name
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
export const onUpdateFeedbackRequest = /* GraphQL */ `
  subscription OnUpdateFeedbackRequest {
    onUpdateFeedbackRequest {
      id
      userid
      name
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
export const onDeleteFeedbackRequest = /* GraphQL */ `
  subscription OnDeleteFeedbackRequest {
    onDeleteFeedbackRequest {
      id
      userid
      name
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
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion {
    onCreateQuestion {
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
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion {
    onUpdateQuestion {
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
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion {
    onDeleteQuestion {
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
export const onCreateFeedback = /* GraphQL */ `
  subscription OnCreateFeedback {
    onCreateFeedback {
      id
      questionid
      content
    }
  }
`;
export const onUpdateFeedback = /* GraphQL */ `
  subscription OnUpdateFeedback {
    onUpdateFeedback {
      id
      questionid
      content
    }
  }
`;
export const onDeleteFeedback = /* GraphQL */ `
  subscription OnDeleteFeedback {
    onDeleteFeedback {
      id
      questionid
      content
    }
  }
`;
