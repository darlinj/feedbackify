import faker from "faker";

describe("view feedback", async () => {
  beforeEach(() => {
    cy.login();
    cy.createFeedback();
    cy.visit("/feedback/12345/");
  });

  it("shows the feedback for the questionnaire", () => {
    cy.get(`Label#${q1.id}`).should("contain.text", question1);
    cy.get(`input[cy-data="question-${q1.id}"`).type("some answer");
    cy.get(`input[cy-data="question-${q2.id}"`).type("some other answer");
    cy.get('button[cy-data="submit"]').click();
    cy.get('div[cy-data="title"]').should(
      "contain.text",
      "Thanks for your feedback"
    );
  });
});
