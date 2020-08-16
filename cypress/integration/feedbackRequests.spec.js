import faker from "faker";

describe("feedback requests", async () => {
  beforeEach(() => {
    cy.login();
    cy.deleteAllFeedbackRequests();
    cy.visit("/");
  });

  it("adds feedback requests to the list", () => {
    const feedbackRequest1 = faker.lorem.words(10);
    const feedbackRequest2 = faker.lorem.words(10);
    cy.get('button[cy-data="add-new-request"]').click();
    cy.get('input[cy-data="feedback-request"]').type(feedbackRequest1);
    cy.get('button[cy-data="add-request"]').click();
    cy.get('button[cy-data="add-new-request"]').click();
    cy.get('input[cy-data="feedback-request"]').type(feedbackRequest2);
    cy.get('button[cy-data="add-request"]').click();
    cy.get('div[cy-data="request-list"]').should(
      "contain.text",
      feedbackRequest1
    );
    cy.get('div[cy-data="request-list"]').should(
      "contain.text",
      feedbackRequest2
    );
  });

  it.skip("adds a feedback request", () => {
    const feedbackRequest1 = faker.lorem.words(10);
    cy.get('button[cy-data="add-new-request"]').click();
    cy.get('input[cy-data="feedback-request"]').type(feedbackRequest1);
    cy.get('button[cy-data="add-request"]').click();
    cy.get('div[cy-data="request-title"]').should(
      "contain.text",
      feedbackRequest1
    );
  });

  it("removes feedback questionires from the list", () => {
    const deleteThisQuestionair = faker.lorem.words(10);
    const keepThisQuestionair = faker.lorem.words(10);
    cy.addFeedbackSurvey(deleteThisQuestionair);
    cy.addFeedbackSurvey(keepThisQuestionair);
    cy.visit("/");
    cy.wait(500);
    cy.get("a")
      .contains(deleteThisQuestionair)
      .parent()
      .children("button")
      .click();
    cy.wait(500);
    cy.get('div[cy-data="request-list"]').should(
      "not.contain.text",
      deleteThisQuestionair
    );
    cy.get('div[cy-data="request-list"]').should(
      "contain.text",
      keepThisQuestionair
    );
  });
});
