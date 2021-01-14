import React from "react";
import { shallow } from "enzyme";
import HomePage from "./HomePage";

describe("The homepage", () => {
  it("Welcomes the logged out user", () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.find("h1").text()).toContain("Welcome");
  });

  it("Shows the login component", () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.find("LoginForm").length).toEqual(1);
  });

  it("Shows the feadback requests if the user is logged in", () => {
    const wrapper = shallow(<HomePage currentUser={{ some: "user" }} />);
    expect(wrapper.find("QuestionnairesPage").length).toEqual(1);
  });
});
