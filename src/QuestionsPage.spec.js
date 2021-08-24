import React from "react";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import QuestionsPage from "./QuestionsPage";
import { addQuestion, getQuestionnaire, removeQuestion } from "./apiCalls";
import { toast } from "react-toastify";
import { render } from "@testing-library/react";
import { within } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

jest.mock("./apiCalls");
jest.mock("react-toastify");

describe("Adding questions to the list", () => {
  beforeEach(() => {
    getQuestionnaire.mockResolvedValue({
      id: "999",
      name: "Some Questionnaire",
      questions: {
        items: [
          { id: 1234, question: "This is a question" },
          { id: 4321, question: "This is another question" },
        ],
      },
    });
    toast.error.mockImplementation(() => true);
  });

  afterEach(() => {
    getQuestionnaire.mockClear();
    addQuestion.mockClear();
    removeQuestion.mockClear();
    toast.error.mockClear();
  });

  it("first loads the loading placeholder", async () => {
    const component = render(
      <QuestionsPage match={{ params: { id: "999" } }} />
    );
    const loadingComponent = await component.findByTestId("loading");
    expect(loadingComponent.textContent).toBe("Loading...");
  });

  it("sets the title to the questionnaire name", async () => {
    const component = render(
      <QuestionsPage match={{ params: { id: "999" } }} />
    );
    await component.findByText("Some Questionnaire");
    expect(component.getByTestId("title")).toHaveTextContent(
      "Some Questionnaire"
    );
  });

  it("sets sharing URL", async () => {
    const component = render(
      <QuestionsPage match={{ params: { id: "999" } }} />
    );
    await component.findByText("Some Questionnaire");
    expect(component.getByTestId("sharing-url")).toHaveTextContent(
      "http://localhost/feedback/999"
    );
  });

  it("Gets the Questions from the database", async () => {
    const component = render(
      <QuestionsPage match={{ params: { id: "999" } }} />
    );
    await component.findByText("Some Questionnaire");
    expect(component.getAllByTestId("question")[0]).toHaveTextContent(
      "This is a question"
    );
    expect(component.getAllByTestId("question")[1]).toHaveTextContent(
      "This is another question"
    );
  });

  it("if it fails to find the questionaire it put up a relevant error", async () => {
    getQuestionnaire.mockResolvedValue(null);
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
    getQuestionnaire.mockRejectedValue("some listing error");
    let component = null;
    await act(async () => {
      component = mount(<QuestionsPage match={{ params: { id: "999" } }} />);
    });
    return new Promise((resolve) => setImmediate(resolve)).then(() => {
      expect(toast.error.mock.calls.length).toEqual(1);
      expect(toast.error.mock.calls[0][0]).toEqual(
        "Failed to get questions. Check your internet connection"
      );
    });
  });

  it("Adds questions to the question list", async () => {
    const question = "Some new question";
    addQuestion.mockResolvedValue({ id: 9999, question: question });
    const component = render(
      <QuestionsPage match={{ params: { id: "999" } }} />
    );

    await component.findByText("Some Questionnaire");

    // FILL IN FORM
    userEvent.type(component.getByTestId("new-question-text-box"), question);

    const submitButton = component.getByTestId("submit-button");
    userEvent.dblClick(submitButton);

    const questionList = await component.findByTestId("question-list");
    await within(questionList).findByText(question);
    const questions = await component.getAllByTestId("question");
    expect(questions[2].textContent).toContain(question);
  });

  xit("Raises an error if the add fails", async () => {
    addQuestion.mockRejectedValue("some error");
    const component = shallow(
      <QuestionsPage match={{ params: { id: "999" } }} />
    );
    component.find("AddQuestionForm").prop("handleAddingQuestion")(
      "some question"
    );
    return new Promise((resolve) => setImmediate(resolve)).then(() => {
      expect(toast.error.mock.calls.length).toEqual(1);
      expect(toast.error.mock.calls[0][0]).toEqual(
        "Failed to save question. Check your internet connection"
      );
    });
  });

  xit("deletes questions from the list", async () => {
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
      { id: 4321, question: "This is another question" },
    ]);
  });

  xit("Raises an error if the delete fails", async () => {
    removeQuestion.mockRejectedValue("some error");
    const component = shallow(
      <QuestionsPage match={{ params: { id: "999" } }} />
    );
    component.find("QuestionsList").prop("handleDelete")(1234);
    return new Promise((resolve) => setImmediate(resolve)).then(() => {
      expect(toast.error.mock.calls.length).toEqual(1);
      expect(toast.error.mock.calls[0][0]).toEqual(
        "Failed to delete question. Check your internet connection"
      );
    });
  });
});
