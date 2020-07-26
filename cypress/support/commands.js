import {getQuestions, removeQuestion, getFeedbackRequests, removeFeedbackRequest} from '../../src/apiCalls';
//import Auth from '../../src/authentication'
import Amplify, {Auth} from 'aws-amplify';
import aws_exports from '../../src/aws-exports.js';
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
Cypress.Commands.add('login', () => {
  return Auth.signIn('fred@bedrock.com', 'password')
    .then(user => {
      console.log('===> user', user);
      let session = Auth.currentSession();
      console.log('===> session', session);
      cy.wait(500);
    })
    .catch(err => console.log('===> err', err));
});

Cypress.Commands.add('deleteAllQuestions', () => {
  return getQuestions().then((questions) => {
    questions.forEach((question) => {
      console.log(question, question.id)
      removeQuestion({id: question.id})
    });
  })
});

Cypress.Commands.add('deleteAllFeedbackRequests', () => {
  return getFeedbackRequests().then((feedbackRequests) => {
    feedbackRequests.forEach((feedbackRequest) => {
      removeFeedbackRequest({id: feedbackRequest.id})
    });
  })
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
