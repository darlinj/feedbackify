import faker from "faker";

describe("manage questions", async () => {
  beforeEach(() => {
    cy.login();
    cy.deleteAllQuestions();
    cy.visit("/questionnaire/123");
  });

  it("adds questions to the list", () => {
    const question1 = faker.lorem.words(10);
    const question2 = faker.lorem.words(10);
    cy.get('input[cy-data="feedback-question"]').type(question1);
    cy.get('button[cy-data="add-question"]').click();
    cy.get('input[cy-data="feedback-question"]').type(question2);
    cy.get('button[cy-data="add-question"]').click();
    cy.get('div[cy-data="question-list"]').should("contain.text", question1);
    cy.get('div[cy-data="question-list"]').should("contain.text", question2);
  });

  it("shows the questions that are linked to that questionnaire", () => {
    const question1 = faker.lorem.words(10);
    const question2 = faker.lorem.words(10);
    return cy.addQuestionnaire("Questionnaire 1").then(q => {
      console.log("IN PROMISE", q);
      cy.addQuestion({
        questionnaireid: q.id,
        question: question1
      });
      cy.addQuestion({
        questionnaireid: 1234,
        question: question2
      });
      cy.wait(500);
      cy.visit(`/questionnaire/${q.id}`);
      cy.wait(500);
      cy.get('div[cy-data="question-list"]').should("contain.text", question1);
      cy.get('div[cy-data="question-list"]').should(
        "contain.not.text",
        question2
      );
    });
    //cy.addQuestionnaire("Questionnaire 2");
  });

  it("removes questions from the list", () => {
    const deleteQuestion = faker.lorem.words(10);
    const keepQuestion = faker.lorem.words(10);
    cy.get('input[cy-data="feedback-question"]').type(deleteQuestion);
    cy.get('button[cy-data="add-question"]').click();
    cy.get('input[cy-data="feedback-question"]').type(keepQuestion);
    cy.get('button[cy-data="add-question"]').click();
    cy.wait(500);
    cy.get("div.list-group-item")
      .contains(deleteQuestion)
      .children("button")
      .click();
    cy.wait(500);
    cy.get('div[cy-data="question-list"]').should(
      "not.contain.text",
      deleteQuestion
    );
    cy.get('div[cy-data="question-list"]').should("contain.text", keepQuestion);
  });
});
