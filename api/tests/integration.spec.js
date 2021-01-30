import Amplify, { Auth } from "aws-amplify";
import { clearDatabase } from "./DBAdmin";
import {
  addQuestion,
  addQuestionnaire,
  getQuestionnaire,
} from "../../src/apiCalls.js";
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
    await addQuestionnaire(questionnaire).then((result) => {
      console.log("Added questionnaire:", result);
      questionnaireId = result.id;
    });

    const question = {
      questionnaireId: questionnaireId,
      question: "Some question",
    };
    await addQuestion(question);

    await getQuestionnaire(questionnaireId).then((questionnaire) => {
      expect(questionnaire.name).toEqual("Some name");
      expect(questionnaire.questions.items.length).toEqual(1);
      expect(questionnaire.questions.items[0].question).toEqual(
        "Some question"
      );
    });
  });
});
