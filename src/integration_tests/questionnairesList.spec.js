import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import App from "../App";

describe("App", () => {
  beforeAll(async()=> {
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
  })

  it("logging in", async () => {
    render(<App />);
    expect(await screen.findByText(/No questionnaires yet/)).toBeInTheDocument();
  });

  it("logging in", async () => {
    render(<App />);
    expect(await screen.findByText(/No questionnaires yet/)).toBeInTheDocument();
    screen.debug()
  });
});
