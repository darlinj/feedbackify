import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import Routes from "./Routes";
import LoginForm from "./LoginForm";
import HomePage from "./HomePage";
import QuestionsPage from "./QuestionsPage";
import QuestionnairesPage from "./QuestionnairesPage";

describe("routing", () => {
  it("shows the page to manage requests when the path is / and the user is logged in", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/"]}>
        <Routes currentUser={{ some: "user" }} />
      </MemoryRouter>
    );
    expect(wrapper.find(QuestionnairesPage)).toHaveLength(1);
  });

  it("shows the welcome page if the use is not logged in", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/"]}>
        <Routes />
      </MemoryRouter>
    );
    expect(wrapper.find(HomePage)).toHaveLength(1);
  });

  it("shows the login form when not logged in and trying to access a protected page", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/request/123"]}>
        <Routes />
      </MemoryRouter>
    );
    expect(wrapper.find(LoginForm)).toHaveLength(1);
  });

  it("shows the page to edit the request when the path is /request/123", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/request/123"]}>
        <Routes currentUser={{ some: "user" }} />
      </MemoryRouter>
    );
    expect(wrapper.find(QuestionsPage)).toHaveLength(1);
  });
});
