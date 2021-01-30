import Amplify, { Auth } from "aws-amplify";
import { clearDatabase, addQuestionnaireForAnotherUser } from "./DBAdmin";
import {
  addQuestionnaire,
  getQuestionnaire,
  removeQuestionnaire,
  getQuestionnaires,
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

describe("The Questionnaire API", () => {
  it("Returns an empty array if there are no records in the DB", async () => {
    await getQuestionnaires().then((result) => {
      expect(result.length).toEqual(0);
    });
  });

  it("Adds a questionnaire and then checks it is there", async () => {
    let questionnaireId = 0;
    const questionnaire = { name: "Some name" };
    await addQuestionnaire(questionnaire).then((result) => {
      questionnaireId = result.id;
    });

    await getQuestionnaires().then((result) => {
      expect(result[0].name).toEqual("Some name");
      expect(result[0].id.length).toBeGreaterThan(10);
    });
  });

  it("Can't see items that don't belong to this user", async () => {
    const tableName = `${process.env.REACT_APP_API_NAME}-questionnaires-table`;
    await addQuestionnaireForAnotherUser(tableName);

    let questionnaireId = 0;
    const questionnaire = { name: "Some name" };
    await addQuestionnaire(questionnaire).then((result) => {
      questionnaireId = result.id;
    });

    await getQuestionnaires().then((result) => {
      expect(result.length).toEqual(1);
    });
  });

  it("Can get an individual Questionnaire by ID", async () => {
    let questionnaireId = 0;
    const questionnaire = { name: "Some name" };
    await addQuestionnaire(questionnaire).then((result) => {
      questionnaireId = result.id;
    });

    await getQuestionnaire(questionnaireId).then((result) => {
      expect(result.id).toEqual(questionnaireId);
      expect(result.name).toEqual("Some name");
    });
  });

  it("Can delete an individual Questionnaire by ID", async () => {
    let questionnaireId = 0;
    const questionnaire = { name: "Some name" };
    await addQuestionnaire(questionnaire).then((result) => {
      questionnaireId = result.id;
    });

    await getQuestionnaire(questionnaireId).then((result) => {
      expect(result.id).toEqual(questionnaireId);
      expect(result.name).toEqual("Some name");
    });

    await removeQuestionnaire(questionnaireId);

    await getQuestionnaire(questionnaireId).then((result) => {
      expect(result).toEqual(null);
    });
  });

  it("deleting a Questionnaire that doesn't exist", async () => {
    await removeQuestionnaire("9999").then((result) => {
      expect(result).toEqual(null);
    });
  });
});
