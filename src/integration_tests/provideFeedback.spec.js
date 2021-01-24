import React from "react";
import faker from "faker";
import { render, cleanup } from "@testing-library/react";
import { login } from "../authentication";
import { MemoryRouter } from "react-router-dom";
import {
  addQuestionnaire,
  addQuestion,
  retrieveQuestionnaire,
} from "../apiCalls";
import { Route } from "react-router-dom";

import App from "../App";

let targetQuestionnaire = {};

describe("Providing feedback", () => {
  afterEach(cleanup);

  beforeEach(async () => {
    await login("pinky@example.com", "Passw0rd!");
    delete window.location;
    window.location = new URL("http://localhost/");
    const questionnaire = await addQuestionnaire({
      name: faker.lorem.words(10),
    });
    await addQuestion({
      questionnaireId: questionnaire.id,
      question: faker.lorem.words(10),
    });
    await addQuestion({
      questionnaireId: questionnaire.id,
      question: faker.lorem.words(10),
    });
    targetQuestionnaire = await retrieveQuestionnaire(questionnaire.id);
  });

  it("Accesses the feedback page", async () => {
    const app = render(
      <MemoryRouter initialEntries={[`/feedback/${targetQuestionnaire.id}`]}>
        <Route path="/feedback/:questionnaireId">
          <App />
        </Route>
      </MemoryRouter>
    );
    expect(await app.findByText(/Loading/)).toBeInTheDocument();
    expect(
      await app.findByText(targetQuestionnaire.questions.items[0].question)
    ).toBeInTheDocument();
  });
});
