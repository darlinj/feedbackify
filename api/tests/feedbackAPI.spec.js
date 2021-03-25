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
});
