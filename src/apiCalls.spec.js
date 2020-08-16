import React from "react";
import {
  getQuestions,
  getQuestionnaires,
  addQuestionnaire,
  addQuestion,
  removeQuestion,
  removeQuestionnaire
} from "./apiCalls";
import { API, graphqlOperation } from "aws-amplify";
import { listQuestions } from "./graphql/queries";
import { createQuestion } from "./graphql/mutations";

jest.mock("aws-amplify");
jest.mock("./graphql/mutations");
jest.mock("./graphql/queries");

describe("api calls", () => {
  afterEach(() => {
    API.graphql.mockClear();
    graphqlOperation.mockClear();
  });

  describe("the getQuestions operation", () => {
    it("gets a list of questions", async () => {
      const questions = [{ some: "question" }, { someOther: "question" }];
      API.graphql.mockResolvedValue({
        data: { listQuestions: { items: questions } }
      });
      graphqlOperation.mockReturnValue("the list questions query");
      const questionList = await getQuestions();
      expect(graphqlOperation.mock.calls.length).toEqual(1);
      expect(graphqlOperation.mock.calls[0][0]).toContain("listQuestions");
      expect(API.graphql.mock.calls.length).toEqual(1);
      expect(API.graphql.mock.calls[0][0]).toEqual("the list questions query");
      expect(questionList).toEqual(questions);
    });

    it("propogates the errors", async () => {
      API.graphql.mockRejectedValue("some error");
      graphqlOperation.mockReturnValue("the list questions query");
      expect.assertions(1);
      return getQuestions().catch(errorMessage => {
        expect(errorMessage).toEqual({ error: "some error" });
      });
    });
  });

  describe("the getQuestionnaires operation", () => {
    it("gets a list of feedback requests", async () => {
      const feedbackRequests = [
        { some: "feedback requests" },
        { someOther: "feedback requests as well" }
      ];
      API.graphql.mockResolvedValue({
        data: { listQuestionnaires: { items: feedbackRequests } }
      });
      graphqlOperation.mockReturnValue("the list feedback requests query");
      const feedbackRequestList = await getQuestionnaires();
      expect(graphqlOperation.mock.calls.length).toEqual(1);
      expect(graphqlOperation.mock.calls[0][0]).toContain("listQuestionnaires");
      expect(API.graphql.mock.calls.length).toEqual(1);
      expect(API.graphql.mock.calls[0][0]).toEqual(
        "the list feedback requests query"
      );
      expect(feedbackRequestList).toEqual(feedbackRequests);
    });

    it("propogates the errors", async () => {
      API.graphql.mockRejectedValue("some error");
      graphqlOperation.mockReturnValue("the list feedback requests query");
      expect.assertions(1);
      return getQuestions().catch(errorMessage => {
        expect(errorMessage).toEqual({ error: "some error" });
      });
    });
  });

  describe("the createQuestionnaire operation", () => {
    it("creates a feedback", async () => {
      const newQuestionnaire = { feedback: "some feedback" };
      const addedQuestionnaire = { id: 1234, feedback: "some feedback" };
      API.graphql.mockResolvedValue({
        data: { createQuestionnaire: addedQuestionnaire }
      });
      graphqlOperation.mockReturnValue("the add feedback mutation");
      const returnedQuestionnaire = await addQuestionnaire(newQuestionnaire);
      expect(graphqlOperation.mock.calls.length).toEqual(1);
      expect(graphqlOperation.mock.calls[0][0]).toContain(
        "CreateQuestionnaire"
      );
      expect(graphqlOperation.mock.calls[0][1]).toEqual({
        input: newQuestionnaire
      });
      expect(API.graphql.mock.calls.length).toEqual(1);
      expect(API.graphql.mock.calls[0][0]).toEqual("the add feedback mutation");
      expect(returnedQuestionnaire).toEqual(addedQuestionnaire);
    });

    it("resolves to the new feedback", () => {
      const newQuestionnaire = { feedback: "some feedback" };
      const addedQuestionnaire = { id: 1234, feedback: "some feedback" };
      API.graphql.mockResolvedValue({
        data: { createQuestionnaire: addedQuestionnaire }
      });
      graphqlOperation.mockReturnValue("the add feedback mutation");
      expect.assertions(1);
      return addQuestionnaire().then(newQ => {
        expect(newQ).toEqual(addedQuestionnaire);
      });
    });

    it("propogates the errors", async () => {
      API.graphql.mockRejectedValue("some error");
      graphqlOperation.mockReturnValue("the add feedback mutation");
      expect.assertions(1);
      return addQuestionnaire().catch(errorMessage => {
        expect(errorMessage).toEqual({ error: "some error" });
      });
    });
  });

  describe("the createQuestion operation", () => {
    it("creates a question", async () => {
      const newQuestion = { question: "some question" };
      const addedQuestion = { id: 1234, question: "some question" };
      API.graphql.mockResolvedValue({
        data: { createQuestion: addedQuestion }
      });
      graphqlOperation.mockReturnValue("the add question mutation");
      const returnedQuestion = await addQuestion(newQuestion);
      expect(graphqlOperation.mock.calls.length).toEqual(1);
      expect(graphqlOperation.mock.calls[0][0]).toContain("CreateQuestion");
      expect(graphqlOperation.mock.calls[0][1]).toEqual({ input: newQuestion });
      expect(API.graphql.mock.calls.length).toEqual(1);
      expect(API.graphql.mock.calls[0][0]).toEqual("the add question mutation");
      expect(returnedQuestion).toEqual(addedQuestion);
    });

    it("resolves to the new question", () => {
      const newQuestion = { question: "some question" };
      const addedQuestion = { id: 1234, question: "some question" };
      API.graphql.mockResolvedValue({
        data: { createQuestion: addedQuestion }
      });
      graphqlOperation.mockReturnValue("the add question mutation");
      expect.assertions(1);
      return addQuestion().then(newQ => {
        expect(newQ).toEqual(addedQuestion);
      });
    });

    it("propogates the errors", async () => {
      API.graphql.mockRejectedValue("some error");
      graphqlOperation.mockReturnValue("the add question mutation");
      expect.assertions(1);
      return addQuestion().catch(errorMessage => {
        expect(errorMessage).toEqual({ error: "some error" });
      });
    });
  });

  describe("the removeQuestion operation", () => {
    it("deletes a question", async () => {
      const deleteQuestion = 1234;
      API.graphql.mockResolvedValue({
        data: { deleteQuestion: deleteQuestion }
      });
      graphqlOperation.mockReturnValue("the delete question mutation");
      const deletedID = await removeQuestion(1234);
      expect(graphqlOperation.mock.calls.length).toEqual(1);
      expect(graphqlOperation.mock.calls[0][0]).toContain("DeleteQuestion");
      expect(graphqlOperation.mock.calls[0][1]).toEqual({
        input: deleteQuestion
      });
      expect(API.graphql.mock.calls.length).toEqual(1);
      expect(API.graphql.mock.calls[0][0]).toEqual(
        "the delete question mutation"
      );
      expect(deletedID).toEqual(1234);
    });

    it("delete propogates the errors", async () => {
      API.graphql.mockRejectedValue("some delete error");
      graphqlOperation.mockReturnValue("the delete question mutation");
      expect.assertions(1);
      return removeQuestion().catch(errorMessage => {
        expect(errorMessage).toEqual({ error: "some delete error" });
      });
    });
  });

  describe("the removeQuestionnaire operation", () => {
    it("deletes a feedback request", async () => {
      const deleteQuestionnaireId = 1234;
      API.graphql.mockResolvedValue({
        data: { deleteQuestionnaire: deleteQuestionnaireId }
      });
      graphqlOperation.mockReturnValue("the delete feedback request mutation");
      const deletedID = await removeQuestionnaire(deleteQuestionnaireId);
      expect(graphqlOperation.mock.calls.length).toEqual(1);
      expect(graphqlOperation.mock.calls[0][0]).toContain(
        "DeleteQuestionnaire"
      );
      expect(graphqlOperation.mock.calls[0][1]).toEqual({
        input: deleteQuestionnaireId
      });
      expect(API.graphql.mock.calls.length).toEqual(1);
      expect(API.graphql.mock.calls[0][0]).toEqual(
        "the delete feedback request mutation"
      );
      expect(deletedID).toEqual(deleteQuestionnaireId);
    });

    it("delete propogates the errors", async () => {
      API.graphql.mockRejectedValue("some delete error");
      graphqlOperation.mockReturnValue("the delete feedback request mutation");
      expect.assertions(1);
      return removeQuestionnaire().catch(errorMessage => {
        expect(errorMessage).toEqual({ error: "some delete error" });
      });
    });
  });
});
