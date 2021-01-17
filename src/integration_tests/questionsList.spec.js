import React from "react";
import {
  render,
  act,
  cleanup,
  screen,
  fireEvent
} from "@testing-library/react";
import { login } from "../authentication";
import { clearDatabase } from "../../api/tests/DBAdmin";
import { addQuestionnaire, getQuestionnaires } from "../apiCalls";

import App from "../App";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe("App", () => {
  afterEach(cleanup);

  beforeEach(async () => {
    sleep(2000);
    await clearDatabase();
    await login("pinky@example.com", "Passw0rd!");
  });

  it("When there are no questions it shows and empty list", async () => {
    await addQuestionnaire({ name: "Some Title" });
    const app = render(<App />);
    expect(await app.findByText("Some Title")).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(await app.getByRole("edit-questionnaire"));
    });
    expect(await app.findByText(/Loading/)).toBeInTheDocument();
    expect(await app.findByText(/No questions yet/)).toBeInTheDocument();
  });

  //  it("Adding a questionnaire", async () => {
  //    const app = render(<App />);
  //    expect(await app.findByText(/No questionnaires yet/)).toBeInTheDocument();
  //    fireEvent.click(await app.findByText("Add new questionnaire"));
  //    expect(
  //      await app.findByText(/Adding new questionnaire/)
  //    ).toBeInTheDocument();
  //    fireEvent.change(app.getByLabelText("Title"), {
  //      target: { value: "Some Title" }
  //    });
  //    fireEvent.click(await app.findByText("Add questionnaire"));
  //    expect(await app.findAllByText("Some Title")).toHaveLength(1);
  //  });
  //
  //  it("delete a questionnaire", async () => {
  //    await addQuestionnaire({ name: "Some Title" });
  //    const app = render(<App />);
  //    expect(await app.findByText(/Loading.../)).toBeInTheDocument();
  //    expect(await app.findByText("Some Title")).toBeInTheDocument();
  //    fireEvent.click(await app.getByRole("delete-questionnaire"));
  //    expect(await app.findByText(/No questionnaires yet/)).toBeInTheDocument();
  //  });
});
