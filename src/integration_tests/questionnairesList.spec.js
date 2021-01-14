import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import { login } from "../authentication";
import { clearDatabase } from "../../api/tests/DBAdmin";

import App from "../App";

const loggedInApp = async () => {
  await login("pinky@example.com", "Passw0rd!");
  const app = render(<App />);
  return app;
};

describe("App", () => {
  afterEach(cleanup);

  beforeEach(async () => {
    await clearDatabase(
      `${process.env.REACT_APP_API_NAME}-questionnaires-table`
    );
    await clearDatabase(`${process.env.REACT_APP_API_NAME}-questions-table`);
  });

  it("Adding a questionnaire", async () => {
    const app = await loggedInApp();
    expect(await app.findByText(/No questionnaires yet/)).toBeInTheDocument();
    fireEvent.click(await app.findByText("Add new questionnaire"));
    expect(
      await app.findByText(/Adding new questionnaire/)
    ).toBeInTheDocument();
    fireEvent.change(app.getByLabelText("Title"), {
      target: { value: "Some Title" }
    });
    fireEvent.click(await app.findByText("Add questionnaire"));
    expect(await app.findAllByText("Some Title")).toHaveLength(1);
  });

  it("delete a questionnaire", async () => {
    const app = await loggedInApp();
    expect(await app.findByText(/No questionnaires yet/)).toBeInTheDocument();
    screen.debug();
  });
});
