import faker from "faker";

describe("Provide feedback", async () => {
  let question1Id = 0;
  let question2Id = 0;
  const question1 = faker.lorem.words(10);
  const question2 = faker.lorem.words(10);

  beforeEach(() => {
    cy.login();
    return cy.addQuestionnaire("Questionnaire 1").then(qu => {
      cy.addQuestion({
        questionnaireId: qu.id,
        question: question1
      }).then(q1 => {
        cy.addQuestion({
          questionnaireid: qu.id,
          question: question2
        }).then(q2 => {
          cy.visit(`/feedback/${qu.id}`);
          question1Id = q1.id;
          question2Id = q2.id;
        });
      });
    });
  });

  it("fills in the feedback page", () => {
    cy.get('div[cy-data="title"]').should("contain.text", "Questionnaire 1");
    cy.get(`Label#${question1Id}`).should("contain.text", question1);
    cy.get(`input[cy-data="question-${question1Id}"`).type("some answer");
    cy.get(`input[cy-data="question-${question2Id}"`).type("some other answer");
    cy.get('button[cy-data="submit"]').click();
    cy.get('div[cy-data="title"]').should(
      "contain.text",
      "Thanks for your feedback"
    );
  });
});
