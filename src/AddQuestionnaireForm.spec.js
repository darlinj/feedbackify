import React from "react";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import AddQuestionnaireForm from "./AddQuestionnaireForm";

describe("Adding requests to the list", () => {
  it("Presents the form", () => {
    const component = shallow(<AddQuestionnaireForm />);
    expect(component.find('FormControl[name="questionnaire"]').length).toBe(1);
    expect(component.find('Button[name="add-questionnaire"]').length).toBe(1);
  });

  it("Adds requests to the request list", async () => {
    const callback = jest.fn();
    const component = mount(
      <AddQuestionnaireForm handleAddingRequest={callback} />
    );
    component.find('Button[name="add-new-questionnaire"]').simulate("click");
    component.find('FormControl[name="questionnaire"]').simulate("change", {
      target: { name: "questionnaire", value: "some questionnaire" }
    });
    component.find("form").simulate("submit", { preventDefault: () => {} });
    expect(callback).toHaveBeenCalledWith("some questionnaire");
  });
});
