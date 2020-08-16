import React from "react";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import QuestionnairesPage from "./QuestionnairesPage";
import { API, graphqlOperation } from "aws-amplify";
import {
  addQuestionnaire,
  getQuestionnaires,
  removeQuestionnaire
} from "./apiCalls";
import { toast } from "react-toastify";
import { MemoryRouter, Redirect } from "react-router-dom";

jest.mock("./apiCalls");
jest.mock("react-toastify");

describe("Adding requests to the list", () => {
  beforeEach(() => {
    getQuestionnaires.mockResolvedValue([
      { id: 1234, request: "This is a request" },
      { id: 4321, request: "This is another request" }
    ]);
    toast.error.mockImplementation(() => true);
  });

  afterEach(() => {
    getQuestionnaires.mockClear();
    addQuestionnaire.mockClear();
    removeQuestionnaire.mockClear();
    toast.error.mockClear();
  });

  it("Presents the form", () => {
    const component = shallow(<QuestionnairesPage />);
    expect(component.find("AddQuestionnaireForm").length).toBe(1);
    expect(component.find("QuestionnairesList").length).toBe(1);
  });

  it("Gets the Requests from the database", async () => {
    let component = null;
    await act(async () => {
      component = mount(
        <MemoryRouter initialEntries={["/"]}>
          <QuestionnairesPage />
        </MemoryRouter>
      );
    });
    component.update();
    expect(getQuestionnaires.mock.calls.length).toEqual(1);
    expect(
      component.find("QuestionnairesList").prop("questionnaireList")
    ).toEqual([
      { id: 1234, request: "This is a request" },
      { id: 4321, request: "This is another request" }
    ]);
  });

  it("raises an error if the connection to the API fails", async () => {
    getQuestionnaires.mockRejectedValue("some listing error");
    let component = null;
    await act(async () => {
      component = mount(<QuestionnairesPage />);
    });
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      expect(toast.error.mock.calls.length).toEqual(1);
      expect(toast.error.mock.calls[0][0]).toEqual(
        "Failed to get feedback requests. Check your internet connection"
      );
    });
  });

  it("Adds requests to the request list", async () => {
    addQuestionnaire.mockResolvedValue({
      id: 9999,
      request: "This is a request"
    });
    const component = shallow(<QuestionnairesPage />);
    await act(async () => {
      component.find("AddQuestionnaireForm").prop("handleAddingRequest")(
        "some request"
      );
    });
    expect(addQuestionnaire.mock.calls.length).toEqual(1);
    expect(addQuestionnaire.mock.calls[0][0]).toEqual({
      name: "some request",
      userid: 1234
    });
  });

  it("Raises an error if the add fails", async () => {
    addQuestionnaire.mockRejectedValue("some error");
    const component = shallow(
      <QuestionnairesPage match={{ params: { id: "999" } }} />
    );
    component.find("AddQuestionnaireForm").prop("handleAddingRequest")(
      "some request"
    );
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      expect(toast.error.mock.calls.length).toEqual(1);
      expect(toast.error.mock.calls[0][0]).toEqual(
        "Failed to save request. Check your internet connection"
      );
    });
  });

  it("deletes requests from the list", async () => {
    removeQuestionnaire.mockResolvedValue({ id: 1234 });
    let component = null;
    await act(async () => {
      component = mount(
        <MemoryRouter initialEntries={["/"]}>
          <QuestionnairesPage match={{ params: { id: "999" } }} />
        </MemoryRouter>
      );
    });
    component.update();
    await act(async () => {
      component.find("QuestionnairesList").prop("handleDelete")(1234);
    });
    component.update();
    expect(removeQuestionnaire.mock.calls.length).toEqual(1);
    expect(removeQuestionnaire.mock.calls[0][0]).toEqual({
      id: 1234
    });
    expect(
      component.find("QuestionnairesList").prop("questionnaireList")
    ).toEqual([{ id: 4321, request: "This is another request" }]);
  });

  it("Raises an error if the delete fails", async () => {
    removeQuestionnaire.mockRejectedValue("some error");
    const component = shallow(
      <QuestionnairesPage match={{ params: { id: "999" } }} />
    );
    component.find("QuestionnairesList").prop("handleDelete")(1234);
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      expect(toast.error.mock.calls.length).toEqual(1);
      expect(toast.error.mock.calls[0][0]).toEqual(
        "Failed to delete feedback request. Check your internet connection"
      );
    });
  });
});
