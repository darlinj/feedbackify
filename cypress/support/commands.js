import {
  getQuestions,
  removeQuestion,
  addQuestion,
  addQuestionnaire,
  getQuestionnaires,
  removeQuestionnaire
} from "../../src/apiCalls";
//import Auth from '../../src/authentication'
import Amplify, { Auth } from "aws-amplify";
import aws_exports from "../../src/aws-exports.js";
Amplify.configure(aws_exports);
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", () => {
  return Auth.signIn("fred@bedrock.com", "password")
    .then(user => {
      let session = Auth.currentSession();
    })
    .catch(err => console.log("===> err", err));
});

Cypress.Commands.add("deleteAllQuestions", () => {
  return getQuestions().then(questions => {
    questions.forEach(question => {
      removeQuestion({ id: question.id });
    });
  });
});

Cypress.Commands.add("deleteAllQuestionnaires", () => {
  return getQuestionnaires().then(feedbackRequests => {
    feedbackRequests.forEach(feedbackRequest => {
      removeQuestionnaire({ id: feedbackRequest.id });
    });
  });
});

Cypress.Commands.add("addQuestion", question => {
  const request = {
    questionnaireid: question.questionnaireid,
    question: question.question
  };
  return addQuestion(request)
    .then(result => {
      return result;
    })
    .catch(e => {
      console.log(e);
    });
});

Cypress.Commands.add("addQuestionnaire", newRequest => {
  const request = {
    userid: 1234,
    name: newRequest
  };
  return addQuestionnaire(request)
    .then(result => {
      return result;
    })
    .catch(e => {
      console.log(e);
    });
});
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
