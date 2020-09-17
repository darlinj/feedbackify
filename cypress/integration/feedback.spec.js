import faker from "faker";

describe("Provide feedback", async () => {
  beforeEach(() => {});

  it("fills in the feedback page", () => {
    cy.login();
    const question1 = faker.lorem.words(10);
    const question2 = faker.lorem.words(10);
    let question1Id = 0;
    let question2Id = 0;
    return cy.addQuestionnaire("Questionnaire 1").then(qu => {
      cy.addQuestion({
        questionnaireid: qu.id,
        question: question1
      }).then(q1 => {
        cy.addQuestion({
          questionnaireid: qu.id,
          question: question2
        }).then(q2 => {
          cy.visit(`/feedback/${qu.id}`);
          cy.get('div[cy-data="title"]').should(
            "contain.text",
            "Questionnaire 1"
          );
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
    });
  });
});
