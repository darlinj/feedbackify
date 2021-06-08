import { cleanup, within, render, fireEvent } from "@testing-library/react";
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

describe("viewing feedback", () => {
  let targetQuestionnaire = {};
  afterEach(cleanup);

  beforeEach(async () => {
    await login("pinky@example.com", "Passw0rd!");
    delete window.location;
    window.location = new URL("http://localhost/");
    let questionnaire = {};
    try {
      questionnaire = await addQuestionnaire({
        name: faker.lorem.words(10),
      });
    } catch (e) {
      console.log("ERROR", e);
    }
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
      feedback: faker.lorem.words(10),
    });
    await addFeedback({
      questionId: question1.id,
      feedback: faker.lorem.words(10),
    });
    await addFeedback({
      questionId: question2.id,
      feedback: faker.lorem.words(10),
    });
    targetQuestionnaire = await getQuestionnaire(questionnaire.id);
  });

  it("has a link on the questionnaire for the feedback", async () => {
    const app = render(
      <MemoryRouter initialEntries={["/"]}>
        <Route>
          <App />
        </Route>
      </MemoryRouter>
    );
    expect(
      await app.findByText(targetQuestionnaire.name, {}, { timeout: 4000 })
    ).toBeInTheDocument();
    const row = await app.getByText(targetQuestionnaire.name).closest("tr");
    const withinRow = within(row);
    fireEvent.click(await withinRow.findByText("View feedback"));
    expect(await app.findByText("Feedback for:")).toBeInTheDocument();
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

    expect(await app.findByText(targetQuestionnaire.name)).toBeInTheDocument();

    expect(
      await app.findByText(targetQuestionnaire.questions.items[0].question)
    ).toBeInTheDocument();

    expect(
      await app.findByText(
        targetQuestionnaire.questions.items[0].feedback.items[0].feedback
      )
    ).toBeInTheDocument();
  });
});
