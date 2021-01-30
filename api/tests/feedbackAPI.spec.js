import Amplify, { Auth } from "aws-amplify";
import { clearDatabase } from "./DBAdmin";
import {
  addFeedback,
  getFeedback,
  removeFeedback,
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

describe("The Feedback API", () => {
  it("Adds feedback and then checks it is there", async () => {
    let feedbackId = 0;
    const feedback = { questionId: "12345", feedback: "Some feedback" };
    await addFeedback(feedback).then((fb) => {
      feedbackId = fb.id;
    });

    await getFeedback(feedbackId).then((result) => {
      expect(result.feedback).toEqual("Some feedback");
      expect(result.questionId).toEqual("12345");
      expect(result.id.length).toBeGreaterThan(10);
    });
  });

  //  it("Can't see items that don't belong to this user", async () => {
  //    const tableName = `${process.env.REACT_APP_API_NAME}-questions-table`;
  //    await addFeedbackForAnotherUser(tableName);
  //
  //    const question = { questionnaireId: "12345", question: "Some question" };
  //    await addFeedback(question);
  //
  //    await getFeedbacks().then((result) => {
  //      expect(result.length).toEqual(1);
  //      expect(result[0].question).toEqual("Some question");
  //    });
  //  });
  //
  //  it("Can get an individual Feedback by ID", async () => {
  //    let questionId = 0;
  //    const question = { questionnaireId: "12345", question: "Some question" };
  //    await addFeedback(question).then((result) => {
  //      questionId = result.id;
  //    });
  //
  //    await getFeedback(questionId).then((result) => {
  //      expect(result).toEqual({
  //        id: questionId,
  //        question: "Some question",
  //        questionnaireId: "12345",
  //      });
  //    });
  //  });
  //
  //  it("Can delete an individual Feedback by ID", async () => {
  //    let questionId = 0;
  //    const question = { questionnaireId: "12345", question: "Some question" };
  //    await addFeedback(question).then((result) => {
  //      questionId = result.id;
  //    });
  //
  //    await getFeedback(questionId).then((result) => {
  //      expect(result.question).toEqual("Some question");
  //    });
  //
  //    await removeFeedback(questionId);
  //
  //    await getFeedback(questionId).then((result) => {
  //      expect(result).toEqual(null);
  //    });
  //  });
});
