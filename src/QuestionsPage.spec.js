import React from "react";
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
    const component = render(
      <QuestionsPage match={{ params: { id: "999" } }} />
    );
    const errorMessage = await component.findByTestId("error-message");

    expect(errorMessage.textContent).toContain(
      "Sorry but we couldn't find that questionnaire"
    );
  });

  it("raises an error if the connection to the API fails", async () => {
    getQuestionnaire.mockRejectedValue("some listing error");
    const component = render(
      <QuestionsPage match={{ params: { id: "999" } }} />
    );
    const errorMessage = await component.findByTestId("error-message");

    expect(errorMessage.textContent).toContain(
      "Sorry but we couldn't find that questionnaire"
    );
  });

  it("Adds questions to the question list", async () => {
    const question = "Some new question";
    addQuestion.mockResolvedValue({ id: 9999, question: question });
    const component = render(
      <QuestionsPage match={{ params: { id: "999" } }} />
    );

    await component.findByText("Some Questionnaire");

    userEvent.type(component.getByTestId("new-question-text-box"), question);

    const submitButton = component.getByTestId("submit-button");
    userEvent.click(submitButton);

    const questionList = await component.findByTestId("question-list");
    await within(questionList).findByText(question);
    const questions = await component.getAllByTestId("question");
    expect(questions[2].textContent).toContain(question);
  });

  it("Raises an error if the add fails", async () => {
    addQuestion.mockRejectedValue("some error");
    const component = render(
      <QuestionsPage match={{ params: { id: "999" } }} />
    );
    await component.findByText("Some Questionnaire");
    const submitButton = component.getByTestId("submit-button");
    userEvent.click(submitButton);
    await component.findByTestId("question-list");
    expect(toast.error.mock.calls[0][0]).toEqual(
      "Failed to save question. Check your internet connection"
    );
  });

  it("deletes questions from the list", async () => {
    removeQuestion.mockResolvedValue({ id: 1234 });
    const component = render(
      <QuestionsPage match={{ params: { id: "999" } }} />
    );
    await component.findByText("Some Questionnaire");
    const questions = component.getAllByTestId("question");
    const deleteButton = within(questions[0]).getByTestId("delete-question");
    userEvent.click(deleteButton);
    await component.findByText("Some Questionnaire");
    const newQuestions = component.getAllByTestId("question");
    expect(newQuestions.length).toBe(1);
    expect(newQuestions[0].textContent).toEqual("This is another question ");
    expect(removeQuestion.mock.calls.length).toEqual(1);
    expect(removeQuestion.mock.calls[0][0]).toEqual(1234);
  });

  it("Raises an error if the delete fails", async () => {
    removeQuestion.mockRejectedValue("some error");
    const component = render(
      <QuestionsPage match={{ params: { id: "999" } }} />
    );
    await component.findByText("Some Questionnaire");
    const questions = component.getAllByTestId("question");
    const deleteButton = within(questions[0]).getByTestId("delete-question");
    userEvent.click(deleteButton);
    await component.findByText("Some Questionnaire");
    expect(toast.error.mock.calls.length).toEqual(1);
    expect(toast.error.mock.calls[0][0]).toEqual(
      "Failed to delete question. Check your internet connection"
    );
  });
});
