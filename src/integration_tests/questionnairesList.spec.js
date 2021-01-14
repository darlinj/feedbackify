import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import { login } from "../authentication";

import App from "../App";

const loggedInApp = async () => {
  await login("pinky@example.com", "Passw0rd!");
  const app = render(<App />);
  //  expect(await app.findByText(/Please log in/)).toBeInTheDocument();
  //  fireEvent.change(app.getByLabelText("Email"), {
  //    target: { value: "pinky@example.com" }
  //  });
  //  fireEvent.change(app.getByLabelText("Password"), {
  //    target: { value: "Passw0rd!" }
  //  });
  //  fireEvent.click(app.getByText("Login"));
  //  expect(await app.findByText(/log out/)).toBeInTheDocument();
  return app;
};

describe("App", () => {
  afterEach(cleanup);

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
    expect(await app.findByText(/Some Title/)).toBeInTheDocument();
    //    fireEvent.click(await app.findByText("log out"));
  });

  it("logging in", async () => {
    const app = await loggedInApp();
    expect(await app.findByText(/No questionnaires yet/)).toBeInTheDocument();
    screen.debug();
  });
});
