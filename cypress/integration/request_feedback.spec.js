import faker from 'faker';

describe('request feedback', async () => {
  beforeEach(() => {
    cy.login();
    cy.deleteAllQuestions()
    cy.visit('/questions');
  });

  it('adds questions to the list', () => {
    const question1 = faker.lorem.words(10);
    const question2 = faker.lorem.words(10);
    cy.get('input[cy-data="feedback-question"]').type(question1);
    cy.get('button[cy-data="add-question"]').click();
    cy.get('input[cy-data="feedback-question"]').type(question2);
    cy.get('button[cy-data="add-question"]').click();
    cy.get('div[cy-data="question-list"]').should('contain.text', question1);
    cy.get('div[cy-data="question-list"]').should('contain.text', question2);
  });

  it('removes questions from the list', () => {
    const deleteQuestion = faker.lorem.words(10);
    const keepQuestion = faker.lorem.words(10);
    cy.get('input[cy-data="feedback-question"]').type(deleteQuestion);
    cy.get('button[cy-data="add-question"]').click();
    cy.get('input[cy-data="feedback-question"]').type(keepQuestion);
    cy.get('button[cy-data="add-question"]').click();
    cy.wait(500);
    cy.get('div.list-group-item')
      .contains(deleteQuestion)
      .children('button')
      .click();
    cy.wait(500);
    cy.get('div[cy-data="question-list"]').should(
      'not.contain.text',
      deleteQuestion,
    );
    cy.get('div[cy-data="question-list"]').should('contain.text', keepQuestion);
  });
});
