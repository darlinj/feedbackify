import React from "react";
import faker from "faker";
import {
  render,
  cleanup,
  within,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { login } from "../authentication";
import { clearDatabase } from "../../api/tests/DBAdmin";
import { addQuestionnaire } from "../apiCalls";
import { MemoryRouter } from "react-router-dom";
import { Route } from "react-router-dom";

import App from "../App";

let app = {};

describe("App", () => {
  let questionnaireText = "Default questionnaire";
  afterEach(cleanup);

  beforeAll(async () => {
    await clearDatabase();
  });

  beforeEach(async () => {
    delete window.location;
    window.location = new URL("http://localhost/");
    questionnaireText = faker.lorem.words(10);
    await login("pinky@example.com", "Passw0rd!");
    const questionnaire = await addQuestionnaire({ name: questionnaireText });
    app = render(
      <MemoryRouter initialEntries={[`/questionnaire/${questionnaire.id}`]}>
        <Route>
          <App />
        </Route>
      </MemoryRouter>
    );
    expect(await app.findByText(/No questions yet/)).toBeInTheDocument();
  });

  it("When there are no questions it shows and empty list", async () => {
    expect(await app.findByText(/Loading/)).toBeInTheDocument();
    expect(await app.findByText(/No questions yet/)).toBeInTheDocument();
  });

  it("Adding a question", async () => {
    const questionText = faker.lorem.words(10);
    fireEvent.change(app.getByLabelText("New question"), {
      target: { value: questionText },
    });
    fireEvent.click(await app.findByText("Add question"));
    const table = await app.getByText("Title").closest("table");
    const withinTable = within(table);
    expect(await withinTable.findByText(questionText)).toBeInTheDocument();
  });

  it("delete a question", async () => {
    const questionText = faker.lorem.words(10);
    expect(await app.findByText(/Loading/)).toBeInTheDocument();
    fireEvent.change(app.getByLabelText("New question"), {
      target: { value: questionText },
    });
    fireEvent.click(await app.findByText("Add question"));
    const table = await app.getByText("Title").closest("table");
    const withinTable = within(table);
    expect(await withinTable.findByText(questionText)).toBeInTheDocument();
    const row = await withinTable.getByText(questionText).closest("tr");
    const withinRow = within(row);
    fireEvent.click(await withinRow.findByRole("delete-question"));
    await waitForElementToBeRemoved(() => app.queryByText(questionText));
  });
});
