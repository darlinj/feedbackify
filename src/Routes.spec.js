import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { shallow } from "enzyme";
import { MemoryRouter, Route } from "react-router";
import Routes from "./Routes";
import LoginForm from "./LoginForm";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "./HomePage";
import FeedbackPage from "./FeedbackPage";
import NotFoundPage from "./NotFoundPage";

describe("routing", () => {
  it("shows the page to manage questionnaires when the path is / and the user is logged in", () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={["/"]}>
        <Routes currentUser={{ some: "user" }} />
      </MemoryRouter>
    );
    expect(wrapper.find(Routes).dive().find(HomePage).length).toEqual(1);
  });

  it("shows the welcome page if the use is not logged in", () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={["/"]}>
        <Routes />
      </MemoryRouter>
    );
    expect(wrapper.find(Routes).dive().find(HomePage)).toHaveLength(1);
  });

  it("shows the 404 page if the page does not exist", () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={["/doesnotexist"]}>
        <Routes />
      </MemoryRouter>
    );
    expect(wrapper.find(Routes).dive().find(NotFoundPage)).toHaveLength(1);
  });

  it("shows the login form when not logged in and trying to access a protected page", () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={["/questionnaire/123"]}>
        <Routes />
      </MemoryRouter>
    );
    expect(wrapper.find(Routes).dive().find(LoginForm)).toHaveLength(1);
  });

  it("shows the page to edit the questionnaire when the path is /questionnaire/123", () => {
    const history = createMemoryHistory();
    history.push("/questionnaire/123");
    render(
      <Router history={history}>
        <Routes currentUser={{ some: "user" }} />
      </Router>
    );
    expect(screen.getByTestId("feedback-page")).toBeInTheDocument();
  });

  it("shows the feedback page when the path is /feedback/1234", () => {
    const wrapper = shallow(<Routes />);
    const routeMap = wrapper.find(Route).reduce((pathMap, route) => {
      const pathProps = route.props();
      pathMap[pathProps.path] = pathProps.component;
      return pathMap;
    }, {});
    expect(routeMap["/feedback/:id"]).toEqual(FeedbackPage);
  });

  it("shows the feedback viewing page when the path is /questionnaire_feedback/1234", () => {
    const history = createMemoryHistory();
    history.push("/questionnaire_feedback/123");
    render(
      <Router history={history}>
        <Routes currentUser={{ some: "user" }} />
      </Router>
    );
    expect(screen.getByTestId("feedback-view-page")).toBeInTheDocument();
  });
});
