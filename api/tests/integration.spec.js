import Amplify, { Auth } from "aws-amplify";
import { clearDatabase } from "./DBAdmin";
import {
  saveQuestion,
  saveQuestionnaire,
  getQuestionnaireWithQuestions
} from "../../src/rawApiCalls.js";
import awsConfig from "../../src/aws-exports";

Amplify.configure(awsConfig);

beforeAll(async () => {
  await login();
});

beforeEach(async () => {
  await clearDatabase();
});

const login = async () => {
  await Auth.signIn(
    process.env.REACT_APP_TEST_USERNAME,
    process.env.REACT_APP_TEST_USER_PASSWORD
  );
};

describe("The integrated API", () => {
  it("Adds a questionnaire and a question and then retrieves both", async () => {
    let questionnaireId = 0;
    const questionnaire = { name: "Some name" };
    await saveQuestionnaire(questionnaire).then(result => {
      questionnaireId = result.data.saveQuestionnaire.id;
    });

    const question = {
      questionnaireId: questionnaireId,
      question: "Some question"
    };
    await saveQuestion(question);

    await getQuestionnaireWithQuestions(questionnaireId).then(result => {
      const questionnaire = result.data.getQuestionnaire;
      expect(questionnaire.name).toEqual("Some name");
      expect(questionnaire.questions.items.length).toEqual(1);
      expect(questionnaire.questions.items[0].question).toEqual(
        "Some question"
      );
    });
  });
});
