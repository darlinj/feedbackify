import faker from "faker";

describe("questionnaires", async () => {
  beforeEach(() => {
    cy.login();
    cy.deleteAllQuestionnaires();
    cy.visit("/");
  });

  it("adds questionnaires to the list", () => {
    const questionnaire1 = faker.lorem.words(10);
    const questionnaire2 = faker.lorem.words(10);
    cy.get('button[cy-data="add-new-questionnaire"]').click();
    cy.get('input[cy-data="questionnaire"]').type(questionnaire1);
    cy.get('button[cy-data="add-questionnaire"]').click();
    cy.get('button[cy-data="add-new-questionnaire"]').click();
    cy.get('input[cy-data="questionnaire"]').type(questionnaire2);
    cy.get('button[cy-data="add-questionnaire"]').click();
    cy.get('div[cy-data="questionnaire-list"]').should(
      "contain.text",
      questionnaire1
    );
    cy.get('div[cy-data="questionnaire-list"]').should(
      "contain.text",
      questionnaire2
    );
  });

  it.skip("adds a questionnaire", () => {
    const questionnaire1 = faker.lorem.words(10);
    cy.get('button[cy-data="add-new-questionnaire"]').click();
    cy.get('input[cy-data="questionnaire"]').type(questionnaire1);
    cy.get('button[cy-data="add-questionnaire"]').click();
    cy.get('div[cy-data="questionnaire-title"]').should(
      "contain.text",
      questionnaire1
    );
  });

  it("removes feedback questionires from the list", () => {
    const deleteThisQuestionnaire = faker.lorem.words(10);
    const keepThisQuestionnaire = faker.lorem.words(10);
    cy.addFeedbackSurvey(deleteThisQuestionnaire);
    cy.addFeedbackSurvey(keepThisQuestionnaire);
    cy.visit("/");
    cy.wait(500);
    cy.get("a")
      .contains(deleteThisQuestionnaire)
      .parent()
      .children("button")
      .click();
    cy.wait(500);
    cy.get('div[cy-data="questionnaire-list"]').should(
      "not.contain.text",
      deleteThisQuestionnaire
    );
    cy.get('div[cy-data="questionnaire-list"]').should(
      "contain.text",
      keepThisQuestionnaire
    );
  });
});
