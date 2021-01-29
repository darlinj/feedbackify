import { cleanup, within, render } from "@testing-library/react";
import faker from "faker";
import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import {
  addQuestion,
  addQuestionnaire,
  addFeedback,
  getQuestionnaire,
} from "../apiCalls";
import App from "../App";
import { login } from "../authentication";

let targetQuestionnaire = {};

describe("viewing feedback", () => {
  afterEach(cleanup);

  beforeEach(async () => {
    await login("pinky@example.com", "Passw0rd!");
    delete window.location;
    window.location = new URL("http://localhost/");
    const questionnaire = await addQuestionnaire({
      name: faker.lorem.words(10),
    });
    const question1 = await addQuestion({
      questionnaireId: questionnaire.id,
      question: faker.lorem.words(10),
    });
    const question2 = await addQuestion({
      questionnaireId: questionnaire.id,
      question: faker.lorem.words(10),
    });
    await addFeedback({
      questionId: question1.id,
      feedbackText: faker.lorem.words(10),
    });
    await addFeedback({
      questionId: question1.id,
      feedbackText: faker.lorem.words(10),
    });
    await addFeedback({
      questionId: question2.id,
      feedbackText: faker.lorem.words(10),
    });
    targetQuestionnaire = await getQuestionnaire(questionnaire.id);
  });

  it("Accesses the feedback viewing page", async () => {
    const app = render(
      <MemoryRouter
        initialEntries={[`/questionnaire_feedback/${targetQuestionnaire.id}`]}
      >
        <Route path="/questionnaire_feedback/:questionnaireId">
          <App />
        </Route>
      </MemoryRouter>
    );
    //    const questionRow = within(
    //      await app.findByText(targetQuestionnaire.questions.items[0].question)
    //    .closest("tr"));

    expect(await app.findByText(targetQuestionnaire.name)).toBeInTheDocument();

    const row = await app
      .getByText(targetQuestionnaire.questions.items[0].question)
      .closest("tr");
    const questionRow = within(row);

    expect(
      await questionRow.findByText(
        targetQuestionnaire.questions.items[0].question.feedback.items[0]
          .feedbackText
      )
    ).toBeInTheDocument();
  });
});
