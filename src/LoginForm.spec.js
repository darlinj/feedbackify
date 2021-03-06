import React from "react";
import { useHistory } from "react-router-dom";
import { shallow } from "enzyme";
import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";
import { login } from "./authentication";
import { act } from "react-dom/test-utils";

jest.mock("./authentication");

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("The login component", () => {
  beforeEach(() => {
    login.mockResolvedValue({ username: "fred", loggedIn: true });
  });

  afterEach(() => {
    cleanup();
    login.mockClear();
  });

  it("Presents the login form", () => {
    const component = shallow(<LoginForm />);
    expect(component.find('FormControl[name="email"]').length).toBe(1);
    expect(component.find('FormControl[name="password"]').length).toBe(1);
    expect(component.find('Button[name="login-button"]').length).toBe(1);
  });

  it("logs the user in when the button is pressed", () => {
    const component = shallow(<LoginForm />);
    component.find('FormControl[name="email"]').simulate("change", {
      target: { name: "email", value: "fred.flintstone@bedrock.com" },
    });
    component
      .find('FormControl[name="password"]')
      .simulate("change", { target: { name: "password", value: "B3dr0ck" } });
    component.find("form").simulate("submit", { preventDefault: () => {} });
    expect(login.mock.calls.length).toEqual(1);
    expect(login.mock.calls[0][0]).toEqual("fred.flintstone@bedrock.com");
    expect(login.mock.calls[0][1]).toEqual("B3dr0ck");
  });

  it("sets isAuthenticated to true if login is successful", (done) => {
    const setCurrentUser = (s) => {
      expect(s.loggedIn).toEqual(true);
      done();
    };
    const component = shallow(<LoginForm setCurrentUser={setCurrentUser} />);
    component.find("form").simulate("submit", { preventDefault: () => {} });
  });

  it("redirects to the referring page if there is one", () => {
    act(() => {
      const component = shallow(<LoginForm />);
      component.find('FormControl[name="email"]').simulate("change", {
        target: { name: "email", value: "fred.flintstone@bedrock.com" },
      });
      component
        .find('FormControl[name="password"]')
        .simulate("change", { target: { name: "password", value: "B3dr0ck" } });
      component.find("form").simulate("submit", { preventDefault: () => {} });
    });
    expect(useHistory().push.mock.calls.length).toEqual(1);
    expect(useHistory().push.mock.calls[0][0]).toEqual("/");
  });

  it("presents the error message if the login is unsuccessful", async () => {
    login.mockRejectedValue({
      __type: "NotAuthorizedException",
      message: "Incorrect username or password.",
    });
    const component = render(<LoginForm />);
    userEvent.type(component.getByLabelText("Email"), "bad.user@invalid.com");
    userEvent.type(component.getByLabelText("Password"), "wrongPassword");
    userEvent.click(component.getByText("Login"));
    expect(await component.findByText("Login Failed")).toBeInTheDocument();
  });
});
