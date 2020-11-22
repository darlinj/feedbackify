import faker from "faker";

describe("view feedback", async () => {
  let feedbackData = {};

  beforeEach(() => {
    cy.login();
    cy.createFeedback({
      questionnaireName: "Questionaire1",
      questions: [
        {
          question: "How great am I?",
          feedback: [{ feedbackText: "You are great!" }]
        },
        {
          question: "How great am I now?",
          feedback: [{ feedbackText: "You are really great!" }]
        }
      ]
    }).then(data => {
      console.log("questionnaire data with ids", data);
      feedbackData = data;
    });
    cy.wait(500);
  });

  it("shows the feedback for the questionnaire", () => {
    cy.visit(`/feedback/${feedbackData.questionnaireId}`);
    cy.get(`Label#${feedbackData.questions[0].id}`).should(
      "contain.text",
      "How great am I?"
    );
    cy.get(
      `div[cy-data="feedback-${feedbackData.questions[0].feedback[0].id}}"`
    ).type("You are great!");
  });
});
