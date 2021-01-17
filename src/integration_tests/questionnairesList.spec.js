import React from "react";
import {
  render,
  cleanup,
  act,
  screen,
  fireEvent,
  waitForElementToBeRemoved
} from "@testing-library/react";
import { login } from "../authentication";
import { clearDatabase } from "../../api/tests/DBAdmin";
import { addQuestionnaire, getQuestionnaires } from "../apiCalls";

import App from "../App";
import faker from "faker";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe("App", () => {
  afterEach(() => clearDatabase());

  beforeEach(async () => {
    sleep(2000);
    await clearDatabase();
    await login("pinky@example.com", "Passw0rd!");
  });

  it("Adding a questionnaire", async () => {
    const questionText = faker.lorem.words(10);
    const app = render(<App />);
    expect(await app.findByText("Add new questionnaire")).toBeInTheDocument();
    fireEvent.click(await app.findByText("Add new questionnaire"));
    expect(
      await app.findByText(/Adding new questionnaire/)
    ).toBeInTheDocument();
    fireEvent.change(app.getByLabelText("Title"), {
      target: { value: questionText }
    });
    fireEvent.click(await app.findByText("Add questionnaire"));
    expect(await app.findAllByText(questionText)).toHaveLength(1);
  });

  it("delete a questionnaire", async () => {
    const questionText = faker.lorem.words(10);
    await addQuestionnaire({ name: questionText });
    const app = render(<App />);
    expect(await app.findByText(/Loading.../)).toBeInTheDocument();
    expect(await app.findByText(questionText)).toBeInTheDocument();
    fireEvent.click(await app.getByRole("delete-questionnaire"));
    expect(await app.findByText(/No questionnaires yet/)).toBeInTheDocument();
  });

  it("editing a questionnaire", async () => {
    const questionText = faker.lorem.words(10);
    await addQuestionnaire({ name: questionText });
    const app = render(<App />);
    expect(await app.findByText(/Loading.../)).toBeInTheDocument();
    expect(await app.findByText(questionText)).toBeInTheDocument();
    fireEvent.click(await app.findByRole("edit-questionnaire"));
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
    expect(await app.findByText(/No questions yet/)).toBeInTheDocument();
  });
});
