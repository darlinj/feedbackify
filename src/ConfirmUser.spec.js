import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Auth } from "aws-amplify";
import App from "./App";

jest.mock("aws-amplify");

describe("App", () => {
  beforeAll(() => {
    Auth.confirmSignUp.mockClear();
    Auth.currentSession.mockResolvedValue({ some: "user" });
    Auth.confirmSignUp.mockResolvedValue({ some: "result" });
  });

  test("Visit the confirmation URL with a code", async () => {
    const app = render(
      <MemoryRouter
        initialEntries={["/confirm?code=12345&username=someusername"]}
      >
        <Route>
          <App />
        </Route>
      </MemoryRouter>
    );
    expect(await app.findByText(/Verifying.../)).toBeInTheDocument();
    expect(
      await app.findByText(/Thank you for verifying your email/)
    ).toBeInTheDocument();
    expect(Auth.confirmSignUp.mock.calls[0][0]).toEqual("someusername");
    expect(Auth.confirmSignUp.mock.calls[0][1]).toEqual("12345");
  });
});
