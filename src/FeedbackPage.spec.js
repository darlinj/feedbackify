import React from "react";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import FeedbackPage from "./FeedbackPage";
import { getQuestionnaire, addFeedback } from "./apiCalls";
import { toast } from "react-toastify";

jest.mock("./apiCalls");
jest.mock("react-toastify");

describe("Providing feedback", () => {
  beforeEach(() => {
    getQuestionnaire.mockResolvedValue({
      name: "Some Questionnaire",
      questions: {
        items: [
          { id: 1234, question: "This is a question" },
          { id: 4321, question: "This is another question" },
        ],
      },
    });
    addFeedback.mockResolvedValue(true);
    toast.error.mockImplementation(() => true);
  });

  afterEach(() => {
    getQuestionnaire.mockClear();
    addFeedback.mockClear();
    toast.error.mockClear();
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

  it("Gets the Questions from the database", async () => {
    let component = null;
    await act(async () => {
      component = mount(<FeedbackPage match={{ params: { id: "999" } }} />);
    });
    component.update();
    expect(getQuestionnaire.mock.calls.length).toEqual(1);
    expect(component.find("FeedbackForm").prop("questionList")).toEqual([
      { id: 1234, question: "This is a question" },
      { id: 4321, question: "This is another question" },
    ]);
  });

  it("if it fails to find the questionaire it put up a relevant error", async () => {
    getQuestionnaire.mockResolvedValue(null);
    let component = null;
    await act(async () => {
      component = mount(<FeedbackPage match={{ params: { id: "999" } }} />);
    });
    component.update();
    expect(toast.error.mock.calls.length).toEqual(1);
    expect(toast.error.mock.calls[0][0]).toEqual(
      "We couldn't find that questionnaire.  Was it deleted?"
    );
  });

  it("raises an error if the connection to the API fails", async () => {
    getQuestionnaire.mockRejectedValue("some listing error");
    let component = null;
    await act(async () => {
      component = mount(<FeedbackPage match={{ params: { id: "999" } }} />);
    });
    return new Promise((resolve) => setImmediate(resolve)).then(() => {
      expect(toast.error.mock.calls.length).toEqual(1);
      expect(toast.error.mock.calls[0][0]).toEqual(
        "Failed to get this questionnaire. Check your internet connection"
      );
    });
  });

  it("posts the feedback to the database", async () => {
    let component = null;
    await act(async () => {
      component = shallow(<FeedbackPage match={{ params: { id: "999" } }} />);
    });
    await act(async () => {
      component.find("FeedbackForm").prop("submitFeedback")({
        12345: "Some feedback",
        54321: "Some other feedback",
      });
    });
    expect(addFeedback.mock.calls.length).toEqual(2);
    expect(addFeedback.mock.calls[0][0]).toEqual({
      questionId: "12345",
      feedback: "Some feedback",
    });
    expect(addFeedback.mock.calls[1][0]).toEqual({
      questionId: "54321",
      feedback: "Some other feedback",
    });
    expect(component.find("TitleBar").prop("title")).toEqual(
      "Thanks for your feedback"
    );
  });
});
