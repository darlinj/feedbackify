import React from "react";
import { render, cleanup,  screen, fireEvent } from "@testing-library/react";

import App from "../App";

const loggedInApp = async() => {
    const app = render(<App />);
    expect(await app.findByText(/Please log in/)).toBeInTheDocument();
    fireEvent.change(app.getByLabelText("Email"), {
      target: { value: "pinky@example.com" }
    });
    fireEvent.change(app.getByLabelText("Password"), {
      target: { value: "Passw0rd!" }
    });
    fireEvent.click(app.getByText("Login"));
    expect(await app.findByText(/log out/)).toBeInTheDocument();
  return app
}

describe("App", () => {
  
  afterEach(cleanup);
//  beforeAll(async()=> {
//    render(<App />);
//    expect(await screen.findByText(/Please log in/)).toBeInTheDocument();
//    fireEvent.change(screen.getByLabelText("Email"), {
//      target: { value: "pinky@example.com" }
//    });
//    fireEvent.change(screen.getByLabelText("Password"), {
//      target: { value: "Passw0rd!" }
//    });
//    fireEvent.click(screen.getByText("Login"));
//    expect(await screen.findByText(/log out/)).toBeInTheDocument();
//  })

  it("logging in", async () => {
    const app = await loggedInApp();
    expect(await app.findByText(/No questionnaires yet/)).toBeInTheDocument();
    fireEvent.click(await app.findByText("Add new questionnaire"))
    expect(await app.findByText(/Adding new questionnaire/)).toBeInTheDocument();
    fireEvent.change(app.getByLabelText("Title"), {
      target: { value: "Some Title" }
    });
    fireEvent.click(await app.findByText("Add questionnaire"))
    expect(await app.findByText(/Some Title/)).toBeInTheDocument();
    fireEvent.click(await app.findByText("log out"))
  });

  it("logging in", async () => {
    const app = await loggedInApp();
    expect(await app.findByText(/No questionnaires yet/)).toBeInTheDocument();
    screen.debug()
  });
});
