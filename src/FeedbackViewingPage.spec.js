import { cleanup, render } from "@testing-library/react";
import React from "react";
import FeedbackViewingPage from "./FeedbackViewingPage";
import { getQuestionnaire } from "./apiCalls";
import { toast } from "react-toastify";

jest.mock("./apiCalls");
jest.mock("react-toastify");

describe("Viewing the feedback once it has arrived", () => {
  afterEach(() => {
    getQuestionnaire.mockClear();
    toast.error.mockClear();
    cleanup();
  });

  it("displays the questionaire name", async () => {
    getQuestionnaire.mockResolvedValue({
      name: "Some questionniare",
      questions: { items: [] },
    });
    const page = render(
      <FeedbackViewingPage match={{ params: { id: 1234 } }} />
    );
    expect(await page.findByText(/Some questionniare/)).toBeInTheDocument();
  });

  it("displays the questions", async () => {
    getQuestionnaire.mockResolvedValue({
      name: "Some questionniare",
      questions: {
        items: [
          { question: "First question" },
          { question: "Second question" },
        ],
      },
    });
    const page = render(
      <FeedbackViewingPage match={{ params: { id: 1234 } }} />
    );
    expect(await page.findByText(/First question/)).toBeInTheDocument();
    expect(await page.findByText(/Second question/)).toBeInTheDocument();
  });

  it("shows that there are no questions if there aren't", async () => {
    getQuestionnaire.mockResolvedValue({
      name: "Some questionniare",
      questions: {
        items: [],
      },
    });
    const page = render(
      <FeedbackViewingPage match={{ params: { id: 1234 } }} />
    );
    expect(
      await page.findByText(/There are no questions attached to this feedback/)
    ).toBeInTheDocument();
  });

  it("displays an error if the call to the API fails", async () => {
    getQuestionnaire.mockRejectedValue({ error: "Some error" });
    const page = render(
      <FeedbackViewingPage match={{ params: { id: 1234 } }} />
    );
    expect(await page.findByText(/Loading/)).toBeInTheDocument();
    expect(toast.error.mock.calls.length).toEqual(1);
    expect(toast.error.mock.calls[0][0]).toMatch(/Failed to get questionnaire/);
  });

  it("displays an error if the questionnaire doesn't exist", async () => {
    getQuestionnaire.mockResolvedValue(null);
    const page = render(
      <FeedbackViewingPage match={{ params: { id: 1234 } }} />
    );
    expect(await page.findByText(/Loading/)).toBeInTheDocument();
    expect(toast.error.mock.calls.length).toEqual(1);
    expect(toast.error.mock.calls[0][0]).toMatch(
      /We couldn't find that questionnaire/
    );
  });
});
