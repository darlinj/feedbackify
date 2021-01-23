import React from "react";
import faker from "faker";
import {
  render,
  act,
  cleanup,
  screen,
  within,
  fireEvent
} from "@testing-library/react";
import { login } from "../authentication";
import { clearDatabase } from "../../api/tests/DBAdmin";
import { addQuestionnaire, getQuestionnaires } from "../apiCalls";

import App from "../App";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
    await addQuestionnaire({ name: questionnaireText });
  });

  it("When there are no questions it shows and empty list", async () => {
    app = render(<App />);
    expect(await app.findByText("Loading...")).toBeInTheDocument();
    expect(await app.findByText(questionnaireText)).toBeInTheDocument();
    const row = await app.getByText(questionnaireText).closest("tr");
    const utils = within(row);
    fireEvent.click(await utils.findByRole("edit-questionnaire"));
    expect(await app.findByText(/Loading/)).toBeInTheDocument();
    expect(await app.findByText(/No questions yet/)).toBeInTheDocument();
  });

  it("Adding a question", async () => {
    const questionText = faker.lorem.words(10);
    app = render(<App />);
    expect(await app.findByText("Loading...")).toBeInTheDocument();
    expect(await app.findByText(questionnaireText)).toBeInTheDocument();
    const row = await app.getByText(questionnaireText).closest("tr");
    const utils = within(row);
    fireEvent.click(await utils.findByRole("edit-questionnaire"));
    expect(await app.findByText(/Loading/)).toBeInTheDocument();
    fireEvent.change(app.getByLabelText("New question"), {
      target: { value: questionText }
    });
    fireEvent.click(await app.findByText("Add question"));
    const table = await app.getByText("Title").closest("table");
    const withinTable = within(table);
    expect(await withinTable.findByText(questionText)).toBeInTheDocument();
  });

  //  it("delete a questionnaire", async () => {
  //    await addQuestionnaire({ name: "Some Title" });
  //    const app = render(<App />);
  //    expect(await app.findByText(/Loading.../)).toBeInTheDocument();
  //    expect(await app.findByText("Some Title")).toBeInTheDocument();
  //    fireEvent.click(await app.getByRole("delete-questionnaire"));
  //    expect(await app.findByText(/No questionnaires yet/)).toBeInTheDocument();
  //  });
});
