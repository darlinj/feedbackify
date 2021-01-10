import React from "react";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import QuestionsPage from "./QuestionsPage";
import { API, graphqlOperation } from "aws-amplify";
import { addQuestion, retrieveQuestionnaire, removeQuestion } from "./apiCalls";
import QuestionsList from "./QuestionsList";
import { toast } from "react-toastify";

jest.mock("./apiCalls");
jest.mock("react-toastify");

describe("Adding questions to the list", () => {
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
    toast.error.mockImplementation(() => true);
  });

  afterEach(() => {
    retrieveQuestionnaire.mockClear();
    addQuestion.mockClear();
    removeQuestion.mockClear();
    toast.error.mockClear();
  });

  it("Presents the form", () => {
    const component = shallow(
      <QuestionsPage match={{ params: { id: "999" } }} />
    );
    expect(component.find("AddQuestionForm").length).toBe(1);
    expect(component.find("QuestionsList").length).toBe(1);
    expect(component.find("TitleBar").length).toBe(1);
  });

  it("sets the title to the questionnaire name", async () => {
    let component = null;
    await act(async () => {
      component = mount(<QuestionsPage match={{ params: { id: "999" } }} />);
    });
    component.update();
    expect(component.find("TitleBar").prop("title")).toEqual(
      "Some Questionnaire"
    );
  });

  it("Gets the Questions from the database", async () => {
    let component = null;
    await act(async () => {
      component = mount(<QuestionsPage match={{ params: { id: "999" } }} />);
    });
    component.update();
    expect(retrieveQuestionnaire.mock.calls.length).toEqual(1);
    expect(component.find("QuestionsList").prop("questionList")).toEqual([
      { id: 1234, question: "This is a question" },
      { id: 4321, question: "This is another question" }
    ]);
  });

  it("if it fails to find the questionaire it put up a relevant error", async () => {
    retrieveQuestionnaire.mockResolvedValue(null);
    let component = null;
    await act(async () => {
      component = mount(<QuestionsPage match={{ params: { id: "999" } }} />);
    });
    component.update();
    expect(toast.error.mock.calls.length).toEqual(1);
    expect(toast.error.mock.calls[0][0]).toEqual(
      "We couldn't find that questionnaire.  Was it deleted?"
    );
  });

  it("raises an error if the connection to the API fails", async () => {
    retrieveQuestionnaire.mockRejectedValue("some listing error");
    let component = null;
    await act(async () => {
      component = mount(<QuestionsPage match={{ params: { id: "999" } }} />);
    });
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      expect(toast.error.mock.calls.length).toEqual(1);
      expect(toast.error.mock.calls[0][0]).toEqual(
        "Failed to get questions. Check your internet connection"
      );
    });
  });

  it("Adds questions to the question list", async () => {
    addQuestion.mockResolvedValue({ id: 9999, question: "This is a question" });
    const component = shallow(
      <QuestionsPage match={{ params: { id: "999" } }} />
    );
    await act(async () => {
      component.find("AddQuestionForm").prop("handleAddingQuestion")(
        "some question"
      );
    });
    expect(addQuestion.mock.calls.length).toEqual(1);
    expect(addQuestion.mock.calls[0][0]).toEqual({
      questionnaireId: "999",
      question: "some question"
    });
  });

  it("Raises an error if the add fails", async () => {
    addQuestion.mockRejectedValue("some error");
    const component = shallow(
      <QuestionsPage match={{ params: { id: "999" } }} />
    );
    component.find("AddQuestionForm").prop("handleAddingQuestion")(
      "some question"
    );
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      expect(toast.error.mock.calls.length).toEqual(1);
      expect(toast.error.mock.calls[0][0]).toEqual(
        "Failed to save question. Check your internet connection"
      );
    });
  });

  it("deletes questions from the list", async () => {
    removeQuestion.mockResolvedValue({ id: 1234 });
    let component = null;
    await act(async () => {
      component = mount(<QuestionsPage match={{ params: { id: "999" } }} />);
    });
    component.update();
    await act(async () => {
      component.find("QuestionsList").prop("handleDelete")(1234);
    });
    component.update();
    expect(removeQuestion.mock.calls.length).toEqual(1);
    expect(removeQuestion.mock.calls[0][0]).toEqual(1234);
    expect(component.find("QuestionsList").prop("questionList")).toEqual([
      { id: 4321, question: "This is another question" }
    ]);
  });

  it("Raises an error if the delete fails", async () => {
    removeQuestion.mockRejectedValue("some error");
    const component = shallow(
      <QuestionsPage match={{ params: { id: "999" } }} />
    );
    component.find("QuestionsList").prop("handleDelete")(1234);
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      expect(toast.error.mock.calls.length).toEqual(1);
      expect(toast.error.mock.calls[0][0]).toEqual(
        "Failed to delete question. Check your internet connection"
      );
    });
  });
});
