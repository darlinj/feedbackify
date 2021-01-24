import { cleanup, fireEvent, render } from "@testing-library/react";
import faker from "faker";
import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import {
  addQuestion,
  addQuestionnaire,
  retrieveQuestionnaire,
} from "../apiCalls";
import App from "../App";
import { login } from "../authentication";

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

  it("Filling in the feedback form", async () => {
    const app = render(
      <MemoryRouter initialEntries={[`/feedback/${targetQuestionnaire.id}`]}>
        <Route path="/feedback/:questionnaireId">
          <App />
        </Route>
      </MemoryRouter>
    );
    expect(
      await app.findByText(targetQuestionnaire.questions.items[0].question)
    ).toBeInTheDocument();
    fireEvent.change(
      app.getByLabelText(targetQuestionnaire.questions.items[0].question),
      {
        target: { value: faker.lorem.words(10) },
      }
    );
    fireEvent.click(await app.findByText("Submit"));
    expect(
      await app.findByText("Thanks for your feedback")
    ).toBeInTheDocument();
  });
});
