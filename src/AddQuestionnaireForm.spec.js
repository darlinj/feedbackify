import React from "react";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import AddQuestionnaireForm from "./AddQuestionnaireForm";

describe("Adding requests to the list", () => {
  it("Presents the form", () => {
    const component = shallow(<AddQuestionnaireForm />);
    expect(component.find('FormControl[name="feedback-request"]').length).toBe(
      1
    );
    expect(component.find('Button[name="add-request"]').length).toBe(1);
  });

  it("Adds requests to the request list", async () => {
    const callback = jest.fn();
    const component = mount(
      <AddQuestionnaireForm handleAddingRequest={callback} />
    );
    component.find('Button[name="add-new-request"]').simulate("click");
    component.find('FormControl[name="feedback-request"]').simulate("change", {
      target: { name: "feedback-request", value: "some request" }
    });
    component.find("form").simulate("submit", { preventDefault: () => {} });
    expect(callback).toHaveBeenCalledWith("some request");
  });
});
