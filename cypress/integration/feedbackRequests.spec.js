import faker from 'faker';

describe('feedback requests', async () => {
  beforeEach(() => {
    cy.login();
    cy.deleteAllFeedbackRequests()
    cy.visit('/');
  });

  it.skip('adds feedback requests to the list', () => {
    const feedbackRequest1 = faker.lorem.words(10);
    const feedbackRequest2 = faker.lorem.words(10);
    cy.get('input[cy-data="feedback-request"]').type(feedbackRequest1);
    cy.get('button[cy-data="add-feedback-request"]').click();
    cy.get('input[cy-data="feedback-request"]').type(feedbackRequest2);
    cy.get('button[cy-data="add-feedback-request"]').click();
    cy.get('div[cy-data="request-list"]').should('contain.text', feedbackRequest1);
    cy.get('div[cy-data="request-list"]').should('contain.text', feedbackRequest2);
  });

  it.skip('removes questions from the list', () => {
    const deleteQuestion = faker.lorem.words(10);
    const keepQuestion = faker.lorem.words(10);
    cy.get('input[cy-data="feedback-request"]').type(deleteQuestion);
    cy.get('button[cy-data="add-feedback-request"]').click();
    cy.get('input[cy-data="feedback-request"]').type(keepQuestion);
    cy.get('button[cy-data="add-feedback-request"]').click();
    cy.wait(500);
    cy.get('div.list-group-item')
      .contains(deleteQuestion)
      .children('button')
      .click();
    cy.wait(500);
    cy.get('div[cy-data="request-list"]').should(
      'not.contain.text',
      deleteQuestion,
    );
    cy.get('div[cy-data="request-list"]').should('contain.text', keepQuestion);
  });
});
