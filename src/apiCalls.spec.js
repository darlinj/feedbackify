import React from "react";
import {
  getQuestions,
  getQuestionnaires,
  retrieveQuestionnaire,
  addQuestionnaire,
  addQuestion,
  addFeedback,
  removeQuestion,
  removeQuestionnaire
} from "./apiCalls";
import { API, graphqlOperation } from "aws-amplify";

jest.mock("aws-amplify");

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
      expect(graphqlOperation.mock.calls[0][0]).toMatch(/getQuestions/);
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

  describe("the getQuestionnaire operation", () => {
    it("gets a specific questionaire", async () => {
      const questionnaire = { some: "questionnaire" };
      API.graphql.mockResolvedValue({
        data: { getQuestionnaire: questionnaire }
      });
      graphqlOperation.mockReturnValue("the get questionnaire query");
      const aQuestionnaire = await retrieveQuestionnaire(1234);
      expect(graphqlOperation.mock.calls.length).toEqual(1);
      expect(graphqlOperation.mock.calls[0][0]).toContain("getQuestionnaire");
      expect(graphqlOperation.mock.calls[0][0]).toContain('id: "1234"');
      expect(API.graphql.mock.calls.length).toEqual(1);
      expect(API.graphql.mock.calls[0][0]).toEqual(
        "the get questionnaire query"
      );
      expect(aQuestionnaire).toEqual(questionnaire);
    });
  });

  describe("the getQuestionnaires operation", () => {
    it("gets a list of feedback questionnaires", async () => {
      const questionnaires = [
        { some: "feedback questionnaires" },
        { someOther: "feedback questionnaires as well" }
      ];
      API.graphql.mockResolvedValue({
        data: { getQuestionnaires: { questionnaires: questionnaires } }
      });
      graphqlOperation.mockReturnValue(
        "the list feedback questionnaires query"
      );
      const questionnairesList = await getQuestionnaires();
      expect(graphqlOperation.mock.calls.length).toEqual(1);
      expect(graphqlOperation.mock.calls[0][0]).toContain("getQuestionnaires");
      expect(API.graphql.mock.calls.length).toEqual(1);
      expect(API.graphql.mock.calls[0][0]).toEqual(
        "the list feedback questionnaires query"
      );
      expect(questionnairesList).toEqual(questionnaires);
    });

    it("propogates the errors", async () => {
      API.graphql.mockRejectedValue("some error");
      graphqlOperation.mockReturnValue(
        "the list feedback questionnaires query"
      );
      expect.assertions(1);
      return getQuestions().catch(errorMessage => {
        expect(errorMessage).toEqual({ error: "some error" });
      });
    });
  });

  describe("the createQuestionnaire operation", () => {
    it("creates a questionnaire", async () => {
      const newQuestionnaire = {
        questionnaireId: "1234",
        name: "some questionnaire"
      };
      const addedQuestionnaire = { id: 1234, name: "some feedback" };
      API.graphql.mockResolvedValue({
        data: { saveQuestionnaire: addedQuestionnaire }
      });
      graphqlOperation.mockReturnValue("the add questionnaire mutation");
      const returnedQuestionnaire = await addQuestionnaire(newQuestionnaire);
      expect(graphqlOperation.mock.calls.length).toEqual(1);
      expect(graphqlOperation.mock.calls[0][0]).toContain("saveQuestionnaire");
      expect(graphqlOperation.mock.calls[0][0]).toContain(
        'name: "some questionnaire"'
      );
      expect(API.graphql.mock.calls.length).toEqual(1);
      expect(API.graphql.mock.calls[0][0]).toEqual(
        "the add questionnaire mutation"
      );
      expect(returnedQuestionnaire).toEqual(addedQuestionnaire);
    });

    it("propogates the errors", async () => {
      API.graphql.mockRejectedValue("some error");
      graphqlOperation.mockReturnValue("the add feedback mutation");
      expect.assertions(1);
      return addQuestionnaire({ name: "Some Questionnaire" }).catch(
        errorMessage => {
          expect(errorMessage).toEqual({ error: "some error" });
        }
      );
    });
  });

  describe("the createQuestion operation", () => {
    it("creates a question", async () => {
      const newQuestion = {
        questionnaireId: "1234",
        question: "some question"
      };
      const addedQuestion = {
        id: 4321,
        questionnaireId: "1234",
        question: "some question"
      };
      API.graphql.mockResolvedValue({
        data: { saveQuestion: addedQuestion }
      });
      graphqlOperation.mockReturnValue("the save question mutation");
      const returnedQuestion = await addQuestion(newQuestion);
      expect(graphqlOperation.mock.calls.length).toEqual(1);
      expect(graphqlOperation.mock.calls[0][0]).toContain("saveQuestion");
      expect(graphqlOperation.mock.calls[0][0]).toContain(
        'questionnaireId: "1234"'
      );
      expect(graphqlOperation.mock.calls[0][0]).toContain(
        'question: "some question"'
      );
      expect(API.graphql.mock.calls.length).toEqual(1);
      expect(API.graphql.mock.calls[0][0]).toEqual(
        "the save question mutation"
      );
      expect(returnedQuestion).toEqual(addedQuestion);
    });

    it("resolves to the new question", () => {
      const newQuestion = {
        questionnaireId: "1234",
        question: "some question"
      };
      const addedQuestion = {
        id: 1234,
        questionnaireId: "1234",
        question: "some question"
      };
      API.graphql.mockResolvedValue({
        data: { saveQuestion: addedQuestion }
      });
      graphqlOperation.mockReturnValue("the add question mutation");
      expect.assertions(1);
      return addQuestion(newQuestion).then(newQ => {
        expect(newQ).toEqual(addedQuestion);
      });
    });

    it("propogates the errors", async () => {
      API.graphql.mockRejectedValue("some error");
      graphqlOperation.mockReturnValue("the add question mutation");
      expect.assertions(1);
      return addQuestion({
        questionnaireId: "1234",
        question: "Some question"
      }).catch(errorMessage => {
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
      expect(graphqlOperation.mock.calls[0][0]).toContain("deleteQuestion");
      expect(graphqlOperation.mock.calls[0][0]).toContain('id: "1234"');
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
    it("deletes a feedback questionnaire", async () => {
      const deleteQuestionnaireId = 1234;
      API.graphql.mockResolvedValue({
        data: { deleteQuestionnaire: deleteQuestionnaireId }
      });
      graphqlOperation.mockReturnValue(
        "the delete feedback questionnaire mutation"
      );
      const deletedID = await removeQuestionnaire(deleteQuestionnaireId);
      expect(graphqlOperation.mock.calls.length).toEqual(1);
      expect(graphqlOperation.mock.calls[0][0]).toContain(
        "deleteQuestionnaire"
      );
      expect(graphqlOperation.mock.calls[0][0]).toContain('id: "1234"');
      expect(API.graphql.mock.calls.length).toEqual(1);
      expect(API.graphql.mock.calls[0][0]).toEqual(
        "the delete feedback questionnaire mutation"
      );
      expect(deletedID).toEqual(deleteQuestionnaireId);
    });

    it("delete propogates the errors", async () => {
      API.graphql.mockRejectedValue("some delete error");
      graphqlOperation.mockReturnValue(
        "the delete feedback questionnaire mutation"
      );
      expect.assertions(1);
      return removeQuestionnaire().catch(errorMessage => {
        expect(errorMessage).toEqual({ error: "some delete error" });
      });
    });
  });
});
