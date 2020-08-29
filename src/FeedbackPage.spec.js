import React from "react";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import FeedbackPage from "./FeedbackPage";
import FeedbackForm from "./FeedbackForm";
import { retrieveQuestionnaire } from "./apiCalls";
//import { toast } from "react-toastify";

jest.mock("./apiCalls");
//jest.mock("react-toastify");

describe("Providing feedback", () => {
  beforeEach(() => {
    retrieveQuestionnaire.mockResolvedValue({
      name: "Some Questionnaire",
      questions: {
        items: [
          { id: 1234, question: "This is a question" },
          { id: 4321, question: "This is another question" }
        ]
      }
    });
    //    toast.error.mockImplementation(() => true);
  });
  //
  afterEach(() => {
    retrieveQuestionnaire.mockClear();
    //    toast.error.mockClear();
  });

  it("Presents the form", () => {
    const component = shallow(
      <FeedbackPage match={{ params: { id: "999" } }} />
    );
    expect(component.find("FeedbackForm").length).toBe(1);
    expect(component.find("TitleBar").length).toBe(1);
  });

  it("sets the title to the questionnaire name", async () => {
    let component = null;
    await act(async () => {
      component = mount(<FeedbackPage match={{ params: { id: "999" } }} />);
    });
    component.update();
    expect(component.find("TitleBar").prop("title")).toEqual(
      "Some Questionnaire"
    );
  });

  //  it("Gets the Questions from the database", async () => {
  //    let component = null;
  //    await act(async () => {
  //      component = mount(<FeedbackPage match={{ params: { id: "999" } }} />);
  //    });
  //    component.update();
  //    expect(retrieveQuestionnaire.mock.calls.length).toEqual(1);
  //    expect(component.find("FeedbackForm").prop("questionList")).toEqual([
  //      { id: 1234, question: "This is a question" },
  //      { id: 4321, question: "This is another question" }
  //    ]);
  //  });
  //
  //  it("if it fails to find the questionaire it put up a relevant error", async () => {
  //    retrieveQuestionnaire.mockResolvedValue(null);
  //    let component = null;
  //    await act(async () => {
  //      component = mount(<FeedbackPage match={{ params: { id: "999" } }} />);
  //    });
  //    component.update();
  //    expect(toast.error.mock.calls.length).toEqual(1);
  //    expect(toast.error.mock.calls[0][0]).toEqual(
  //      "We couldn't find that questionnaire.  Was it deleted?"
  //    );
  //  });
  //
  //  it("raises an error if the connection to the API fails", async () => {
  //    retrieveQuestionnaire.mockRejectedValue("some listing error");
  //    let component = null;
  //    await act(async () => {
  //      component = mount(<FeedbackPage match={{ params: { id: "999" } }} />);
  //    });
  //    return new Promise(resolve => setImmediate(resolve)).then(() => {
  //      expect(toast.error.mock.calls.length).toEqual(1);
  //      expect(toast.error.mock.calls[0][0]).toEqual(
  //        "Failed to get questions. Check your internet connection"
  //      );
  //    });
  //  });
});
