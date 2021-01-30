import Amplify, { Auth } from "aws-amplify";
import { clearDatabase } from "./DBAdmin";
import {
  addFeedback,
  addQuestion,
  addQuestionnaire,
  getQuestionnaire,
} from "../../src/apiCalls.js";
import awsConfig from "../../src/aws-exports";

Amplify.configure(awsConfig);

const login = async () => {
  await Auth.signIn(
    process.env.REACT_APP_TEST_USERNAME,
    process.env.REACT_APP_TEST_USER_PASSWORD
  );
};

describe("The integrated API", () => {
  beforeAll(async () => {
    await login();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  it("Adds a questionnaire and a question and then retrieves both", async () => {
    let questionnaireId = 0;
    let questionId = 0;
    const questionnaire = { name: "Some name" };
    await addQuestionnaire(questionnaire).then((result) => {
      questionnaireId = result.id;
    });

    const question = {
      questionnaireId: questionnaireId,
      question: "Some question",
    };
    await addQuestion(question).then((result) => {
      questionId = result.id;
    });

    const feedback = {
      questionId: questionId,
      feedback: "Some feedback",
    };
    await addFeedback(feedback);

    await getQuestionnaire(questionnaireId).then((questionnaire) => {
      expect(questionnaire.name).toEqual("Some name");
      expect(questionnaire.questions.items.length).toEqual(1);
      expect(questionnaire.questions.items[0].question).toEqual(
        "Some question"
      );
      expect(
        questionnaire.questions.items[0].feedback.items[0].feedback
      ).toEqual("Some feedback");
    });
  });
});
