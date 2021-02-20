import Amplify, { Auth } from "aws-amplify";
import { clearDatabase, addQuestionForAnotherUser } from "./DBAdmin";
import {
  addQuestion,
  getQuestion,
  removeQuestion,
  getQuestions,
} from "../../src/apiCalls.js";
import awsConfig from "../../src/aws-exports";

Amplify.configure(awsConfig);

beforeEach(async () => {
  await login();
  await clearDatabase();
});

const login = async () => {
  await Auth.signIn(
    process.env.REACT_APP_TEST_USERNAME,
    process.env.REACT_APP_TEST_USER_PASSWORD
  );
};

describe("The Question API", () => {
  it("Returns an empty array if there are no records in the DB", async () => {
    await getQuestions().then((result) => {
      expect(result).toEqual([]);
    });
  });

  it("Adds a question and then checks it is there", async () => {
    let questionId = 0;
    const question = { questionnaireId: "12345", question: "Some question" };
    await addQuestion(question).then((result) => {
      questionId = result.id;
    });

    await getQuestion(questionId).then((result) => {
      expect(result.question).toEqual("Some question");
      expect(result.questionnaireId).toEqual("12345");
      expect(result.id.length).toBeGreaterThan(10);
    });
  });

  it("Can't see items that don't belong to this user", async () => {
    const tableName = `${process.env.REACT_APP_API_NAME}-questions-table`;
    await addQuestionForAnotherUser(tableName);

    const question = { questionnaireId: "12345", question: "Some question" };
    await addQuestion(question);

    await getQuestions().then((result) => {
      expect(result.length).toEqual(1);
      expect(result[0].question).toEqual("Some question");
    });
  });

  it("Can get an individual Question by ID", async () => {
    let questionId = 0;
    const question = { questionnaireId: "12345", question: "Some question" };
    await addQuestion(question).then((result) => {
      questionId = result.id;
    });

    await getQuestion(questionId).then((result) => {
      expect(result).toEqual({
        id: questionId,
        question: "Some question",
        questionnaireId: "12345",
      });
    });
  });

  it("Can delete an individual Question by ID", async () => {
    let questionId = 0;
    const question = { questionnaireId: "12345", question: "Some question" };
    await addQuestion(question).then((result) => {
      questionId = result.id;
    });

    await getQuestion(questionId).then((result) => {
      expect(result.question).toEqual("Some question");
    });

    await removeQuestion(questionId);

    await getQuestion(questionId).then((result) => {
      expect(result).toEqual(null);
    });
  });
});
