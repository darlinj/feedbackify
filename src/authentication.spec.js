import { login, signup } from "./authentication";
import { Auth } from "aws-amplify";

jest.mock("aws-amplify");

describe("The login component", () => {
  beforeEach(() => {
    Auth.signIn.mockResolvedValue({ user: "data" });
    Auth.signUp.mockResolvedValue(true);
  });

  afterEach(() => {
    Auth.signIn.mockClear();
    Auth.signUp.mockClear();
  });

  it("parses the credentials to the signIn function", () => {
    login("email.address@something.com", "Pa55w0rd");
    expect(Auth.signIn.mock.calls.length).toEqual(1);
    expect(Auth.signIn.mock.calls[0][0]).toEqual("email.address@something.com");
    expect(Auth.signIn.mock.calls[0][1]).toEqual("Pa55w0rd");
  });

  it("registers the user", async () => {
    const username = "fred@bedrock.com";
    const email = "fred@bedrock.com";
    const name = "Freddy";
    const password = "password";
    const signUpData = {
      username,
      password,
      attributes: {
        email,
        name,
      },
    };
    const [result, message] = await signup(email, name, password);
    expect(Auth.signUp.mock.calls.length).toEqual(1);
    expect(Auth.signUp.mock.calls[0][0]).toEqual(signUpData);
    expect(result).toEqual(true);
    expect(message).toBeUndefined();
  });

  it("fails to register the user", async () => {
    Auth.signUp.mockRejectedValue({ message: "Some failure message" });
    const username = "fred@bedrock.com";
    const email = "fred@bedrock.com";
    const name = "Freddy";
    const password = "password";
    const signUpData = {
      username,
      password,
      attributes: {
        email,
      },
    };
    const [result, message] = await signup(email, name, password);
    expect(result).toEqual(false);
    expect(message).toEqual("Some failure message");
  });
});
