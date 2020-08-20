import React from "react";
import { mount, shallow } from "enzyme";
import { Router, MemoryRouter, Route } from "react-router";
import TestRenderer from "react-test-renderer";
import Routes from "./Routes";
import LoginForm from "./LoginForm";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "./HomePage";
import QuestionsPage from "./QuestionsPage";
import QuestionnairesPage from "./QuestionnairesPage";

describe("routing", () => {
  it("shows the page to manage questionnaires when the path is / and the user is logged in", () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={["/"]}>
        <Routes currentUser={{ some: "user" }} />
      </MemoryRouter>
    );
    expect(
      wrapper
        .find(Routes)
        .dive()
        .find(HomePage).length
    ).toEqual(1);
  });

  it("shows the welcome page if the use is not logged in", () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={["/"]}>
        <Routes />
      </MemoryRouter>
    );
    expect(
      wrapper
        .find(Routes)
        .dive()
        .find(HomePage)
    ).toHaveLength(1);
  });

  it("shows the login form when not logged in and trying to access a protected page", () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={["/questionnaire/123"]}>
        <Routes />
      </MemoryRouter>
    );
    expect(
      wrapper
        .find(Routes)
        .dive()
        .find(LoginForm)
    ).toHaveLength(1);
  });

  it("shows the page to edit the questionnaire when the path is /questionnaire/123", () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={["/questionnaire/123"]}>
        <Routes currentUser={{ some: "user" }} />
      </MemoryRouter>
    );
    expect(
      wrapper
        .find(Routes)
        .dive()
        .find(ProtectedRoute)
    ).toHaveLength(1);
  });
});
