import React from "react";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import FeedbackForm from "./FeedbackForm";

describe("Filling in the feedback form", () => {
  it("Presents the form", () => {
    const questions = [
      {
        id: 54321,
        question: "This is a question"
      }
    ];
    const component = shallow(<FeedbackForm questionList={questions} />);
    expect(component.find('FormControl[name="54321"]').length).toBe(1);
    expect(component.find('Button[name="submit"]').length).toBe(1);
  });

  it("Submits the feedback", async () => {
    const questions = [
      {
        id: 54321,
        question: "This is a question"
      },
      {
        id: 12345,
        question: "This is another question"
      }
    ];
    const callback = jest.fn();
    const component = mount(
      <FeedbackForm questionList={questions} submitFeedback={callback} />
    );
    component.find('FormControl[name="54321"]').simulate("change", {
      target: { name: "54321", value: "some feedback for you" }
    });
    component.find('FormControl[name="12345"]').simulate("change", {
      target: { name: "54321", value: "some more feedback for you" }
    });
    component.find("form").simulate("submit", { preventDefault: () => {} });
    expect(callback).toHaveBeenCalledWith({
      "54321": "some feedback for you",
      "12345": "some more feedback for you tooooooo"
    });
  });
});
