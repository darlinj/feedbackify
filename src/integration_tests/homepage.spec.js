import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Route } from "react-router-dom";

import App from "../App";

describe("App", () => {
  test("renders the homepage", async () => {
    const app = render(
      <MemoryRouter initialEntries={["/"]}>
        <Route>
          <App />
        </Route>
      </MemoryRouter>
    );
    expect(await app.findByText("Feedbackify")).toBeInTheDocument();
    expect(await app.findByText(/Please log in/)).toBeInTheDocument();
  });

  test("logging in", async () => {
    const app = render(
      <MemoryRouter initialEntries={["/"]}>
        <Route>
          <App />
        </Route>
      </MemoryRouter>
    );
    expect(await app.findByText(/Please log in/)).toBeInTheDocument();
    fireEvent.change(app.getByLabelText("Email"), {
      target: { value: "pinky@example.com" },
    });
    fireEvent.change(app.getByLabelText("Password"), {
      target: { value: "Passw0rd!" },
    });
    fireEvent.click(app.getByText("Login"));
    expect(await app.findByText(/log out/)).toBeInTheDocument();
  });
});
