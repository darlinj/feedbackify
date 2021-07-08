import {
  getQuestions,
  getQuestion,
  getFeedback,
  getQuestionnaires,
  getQuestionnaire,
  addQuestionnaire,
  addQuestion,
  addFeedback,
  removeQuestion,
  removeQuestionnaire,
  getQuestionnairePublic,
} from "./apiCalls";
import { API, graphqlOperation } from "aws-amplify";

jest.mock("aws-amplify");

describe("api calls", () => {
  afterEach(() => {
    API.graphql.mockClear();
    graphqlOperation.mockClear();
  });

  describe("the getQuestion operation", () => {
    it("gets a question by id", async () => {
      const question = { some: "question" };
      API.graphql.mockResolvedValue({
        data: { getQuestion: question },
      });
      const returnedQuestion = await getQuestion(123);
      expect(API.graphql.mock.calls.length).toEqual(1);
      expect(API.graphql.mock.calls[0][0].query).toContain(
        'getQuestion (id: "123")'
      );
      expect(returnedQuestion).toEqual(question);
    });

    it("propogates the errors", async () => {
      API.graphql.mockRejectedValue("some error");
      expect.assertions(1);
      return getQuestions().catch((errorMessage) => {
        expect(errorMessage).toEqual("some error");
      });
    });
  });

  describe("the getQuestions operation", () => {
    it("gets a list of questions", async () => {
      const questions = [{ some: "question" }, { someOther: "question" }];
      API.graphql.mockResolvedValue({
        data: { getQuestions: { questions: questions } },
      });
      const questionList = await getQuestions();
      expect(API.graphql.mock.calls.length).toEqual(1);
      expect(API.graphql.mock.calls[0][0].query).toContain("getQuestions");
      expect(questionList).toEqual(questions);
    });

    it("propogates the errors", async () => {
      API.graphql.mockRejectedValue("some error");
      expect.assertions(1);
      return getQuestions().catch((errorMessage) => {
        expect(errorMessage).toEqual("some error");
      });
    });
  });

  describe("the public getQuestionnaire operation", () => {
    it("gets a specific questionaire", async () => {
      const questionnaire = { some: "questionnaire" };
      API.graphql.mockResolvedValue({
        data: { getQuestionnairePublic: questionnaire },
      });
      const aQuestionnaire = await getQuestionnairePublic(1234);
      expect(API.graphql.mock.calls.length).toEqual(1);
      expect(API.graphql.mock.calls[0][0].query).toContain(
        'getQuestionnairePublic(id: "1234")'
      );
      expect(aQuestionnaire).toEqual(questionnaire);
    });
  });

  describe("the getQuestionnaire operation", () => {
    it("gets a specific questionaire", async () => {
      const questionnaire = { some: "questionnaire" };
      API.graphql.mockResolvedValue({
        data: { getQuestionnaire: questionnaire },
      });
      const aQuestionnaire = await getQuestionnaire(1234);
      expect(API.graphql.mock.calls.length).toEqual(1);
      expect(API.graphql.mock.calls[0][0].query).toContain(
        'getQuestionnaire(id: "1234")'
      );
      expect(aQuestionnaire).toEqual(questionnaire);
    });
  });

  describe("the getQuestionnaires operation", () => {
    it("gets a list of feedback questionnaires", async () => {
      const questionnaires = [
        { some: "feedback questionnaires" },
        { someOther: "feedback questionnaires as well" },
      ];
      API.graphql.mockResolvedValue({
        data: { getQuestionnaires: { questionnaires: questionnaires } },
      });
      const questionnairesList = await getQuestionnaires();
      expect(API.graphql.mock.calls.length).toEqual(1);
      expect(API.graphql.mock.calls[0][0].query).toContain("getQuestionnaires");
      expect(questionnairesList).toEqual(questionnaires);
    });

    it("propogates the errors", async () => {
      API.graphql.mockRejectedValue("some error");
      expect.assertions(1);
      return getQuestions().catch((errorMessage) => {
        expect(errorMessage).toEqual("some error");
      });
    });
  });

  describe("the getFeedback operation", () => {
    it("gets a feedback by id", async () => {
      const feedback = { some: "feedback" };
      API.graphql.mockResolvedValue({
        data: { getFeedback: feedback },
      });
      const returnedFeedback = await getFeedback(123);
      expect(API.graphql.mock.calls.length).toEqual(1);
      expect(API.graphql.mock.calls[0][0].query).toContain("getFeedback");
      expect(API.graphql.mock.calls[0][0].query).toContain('id: "123"');
      expect(returnedFeedback).toEqual(feedback);
    });

    it("propogates the errors", async () => {
      API.graphql.mockRejectedValue("some error");
      expect.assertions(1);
      return getFeedback().catch((errorMessage) => {
        expect(errorMessage).toEqual("some error");
      });
    });
  });
  describe("the createQuestionnaire operation", () => {
    it("creates a questionnaire", async () => {
      const newQuestionnaire = {
        questionnaireId: "1234",
        name: "some questionnaire",
      };
      const addedQuestionnaire = { id: 1234, name: "some feedback" };
      API.graphql.mockResolvedValue({
        data: { saveQuestionnaire: addedQuestionnaire },
      });
      const returnedQuestionnaire = await addQuestionnaire(newQuestionnaire);
      expect(API.graphql.mock.calls.length).toEqual(1);
      expect(API.graphql.mock.calls[0][0].query).toContain("saveQuestionnaire");
      expect(API.graphql.mock.calls[0][0].query).toContain(
        "some questionnaire"
      );
      expect(returnedQuestionnaire).toEqual(addedQuestionnaire);
    });

    it("propogates the errors", async () => {
      API.graphql.mockRejectedValue("some error");
      expect.assertions(1);
      return addQuestionnaire({ name: "Some Questionnaire" }).catch(
        (errorMessage) => {
          expect(errorMessage).toEqual("some error");
        }
      );
    });
  });

  describe("the createQuestion operation", () => {
    it("creates a question", async () => {
      const newQuestion = {
        questionnaireId: "1234",
        question: "some question",
      };
      const addedQuestion = {
        id: 4321,
        questionnaireId: "1234",
        question: "some question",
      };
      API.graphql.mockResolvedValue({
        data: { saveQuestion: addedQuestion },
      });
      const returnedQuestion = await addQuestion(newQuestion);
      expect(API.graphql.mock.calls.length).toEqual(1);
      expect(API.graphql.mock.calls[0][0].query).toContain("saveQuestion");
      expect(API.graphql.mock.calls[0][0].query).toContain("1234");
      expect(returnedQuestion).toEqual(addedQuestion);
    });

    it("resolves to the new question", () => {
      const newQuestion = {
        questionnaireId: "1234",
        question: "some question",
      };
      const addedQuestion = {
        id: 1234,
        questionnaireId: "1234",
        question: "some question",
      };
      API.graphql.mockResolvedValue({
        data: { saveQuestion: addedQuestion },
      });
      expect.assertions(1);
      return addQuestion(newQuestion).then((newQ) => {
        expect(newQ).toEqual(addedQuestion);
      });
    });
  });

  describe("the addFeedback operation", () => {
    it("creates feedback", async () => {
      const newFeedback = {
        questionId: "1234",
        feedback: "some feedback",
      };
      const addedFeedback = {
        id: 4321,
        questionId: "1234",
        feedback: "some feedback",
      };
      API.graphql.mockResolvedValue({
        data: { saveFeedback: addedFeedback },
      });
      const returnedFeedback = await addFeedback(newFeedback);
      expect(API.graphql.mock.calls.length).toEqual(1);
      expect(API.graphql.mock.calls[0][0].query).toContain("saveFeedback");
      expect(API.graphql.mock.calls[0][0].query).toContain("1234");
      expect(returnedFeedback).toEqual(addedFeedback);
    });

    it("resolves to the new feedback", () => {
      const newFeedback = {
        questionId: "1234",
        feedback: "some feedback",
      };
      const addedFeedback = {
        id: 1234,
        questionId: "1234",
        feedback: "some feedback",
      };
      API.graphql.mockResolvedValue({
        data: { saveFeedback: addedFeedback },
      });
      expect.assertions(1);
      return addFeedback(newFeedback).then((newFeedback) => {
        expect(newFeedback).toEqual(addedFeedback);
      });
    });

    it("propogates the errors", async () => {
      API.graphql.mockRejectedValue("some error");
      expect.assertions(1);
      return addFeedback({
        questionId: "1234",
        feedback: "Some feedback",
      }).catch((errorMessage) => {
        expect(errorMessage).toEqual("some error");
      });
    });
  });

  describe("the removeQuestion operation", () => {
    it("deletes a question", async () => {
      const deleteQuestion = 1234;
      API.graphql.mockResolvedValue({
        data: { deleteQuestion: deleteQuestion },
      });
      const deletedID = await removeQuestion(1234);
      expect(API.graphql.mock.calls.length).toEqual(1);
      expect(API.graphql.mock.calls[0][0].query).toContain("deleteQuestion");
      expect(API.graphql.mock.calls[0][0].query).toContain('id: "1234"');
      expect(deletedID).toEqual(1234);
    });

    it("delete propogates the errors", async () => {
      API.graphql.mockRejectedValue("some delete error");
      expect.assertions(1);
      return removeQuestion().catch((errorMessage) => {
        expect(errorMessage).toEqual("some delete error");
      });
    });
  });

  describe("the removeQuestionnaire operation", () => {
    it("deletes a feedback questionnaire", async () => {
      const deleteQuestionnaireId = 1234;
      API.graphql.mockResolvedValue({
        data: { deleteQuestionnaire: deleteQuestionnaireId },
      });
      const deletedID = await removeQuestionnaire(deleteQuestionnaireId);
      expect(API.graphql.mock.calls.length).toEqual(1);
      expect(API.graphql.mock.calls[0][0].query).toContain(
        "deleteQuestionnaire"
      );
      expect(API.graphql.mock.calls[0][0].query).toContain('id: "1234"');

      expect(deletedID).toEqual(deleteQuestionnaireId);
    });

    it("delete propogates the errors", async () => {
      API.graphql.mockRejectedValue("some delete error");
      expect.assertions(1);
      return removeQuestionnaire().catch((errorMessage) => {
        expect(errorMessage).toEqual("some delete error");
      });
    });
  });
});
