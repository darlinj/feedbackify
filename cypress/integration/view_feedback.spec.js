import faker from "faker";

describe("view feedback", async () => {
  let feedbackData = {};

  beforeEach(() => {
    cy.login();
  });
  //    cy.createFeedback({
  //      questionnaireName: "Questionaire1",
  //      questions: [
  //        {
  //          question: "How great am I?",
  //          feedback: [{ feedbackText: "You are great!" }]
  //        },
  //        {
  //          question: "How great am I now?",
  //          feedback: [{ feedbackText: "You are really great!" }]
  //        }
  //      ]
  //    }).then(data => {
  //      console.log("questionnaire data with ids", data);
  //      feedbackData = data;
  //    });
  //    cy.wait(500);
  //  });
  //
  //  it("shows the feedback for the questionnaire", () => {
  //    cy.visit(`/feedback/${feedbackData.questionnaireId}`);
  //    cy.get(`Label#${feedbackData.questions[0].id}`).should(
  //      "contain.text",
  //      "How great am I?"
  //    );
  //    cy.get(
  //      `div[cy-data="feedback-${feedbackData.questions[0].feedback[0].id}}"`
  //    ).type("You are great!");
  //  });

  it("mocks the feedback calls", () => {
    cy.server();

    cy.route("/graphql", {
      data: {
        getQuestionnaire: {
          id: "questionnaire123",
          userid: "1234",
          name: "Questionaire1",
          questions: {
            items: [
              {
                id: "question123",
                questionnaireid: "ba048330-ec65-4599-b2cb-c975a009f8e5",
                question: "How great am I?",
                createdAt: "2020-11-26T09:42:10.091Z",
                updatedAt: "2020-11-26T09:42:10.091Z"
              },
              {
                id: "38fe521e-96b6-428e-bc7d-f2be137c7435",
                questionnaireid: "ba048330-ec65-4599-b2cb-c975a009f8e5",
                question: "How great am I now?",
                createdAt: "2020-11-26T09:42:10.164Z",
                updatedAt: "2020-11-26T09:42:10.164Z"
              }
            ],
            nextToken: null
          },
          createdAt: "2020-11-26T09:42:09.972Z",
          updatedAt: "2020-11-26T09:42:09.972Z"
        }
      }
    });

    // go through the UI
    cy.visit(`/feedback/questionnaire123`).then(() => {
      cy.get(`Label#question123`).should("contain.text", "How great am I?");
      cy.get(`div[cy-data="feedback-123"`).type("You are great!");
    });
  });
});
