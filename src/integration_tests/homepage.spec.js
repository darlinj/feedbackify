import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import App from "../App";

const login = async () => {
  expect(await screen.findByText(/Please log in/)).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "pinky@example.com" }
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "Passw0rd!" }
  });
  fireEvent.click(screen.getByText("Login"));
  expect(await screen.findByText(/log out/)).toBeInTheDocument();
};

describe("App", () => {
  test("renders the homepage", async () => {
    render(<App />);
    expect(screen.getByText("Feedbackify")).toBeInTheDocument();
    expect(await screen.findByText(/Please log in/)).toBeInTheDocument();
  });

  test("logging in", async () => {
    render(<App />);
    expect(await screen.findByText(/Please log in/)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "pinky@example.com" }
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "Passw0rd!" }
    });
    fireEvent.click(screen.getByText("Login"));
    expect(await screen.findByText(/log out/)).toBeInTheDocument();
  });
});
