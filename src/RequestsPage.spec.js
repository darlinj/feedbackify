import React from "react";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import RequestsPage from "./RequestsPage";
import { API, graphqlOperation } from "aws-amplify";
import {
  addFeedbackRequest,
  getFeedbackRequests,
  removeFeedbackRequest
} from "./apiCalls";
import { toast } from "react-toastify";
import { MemoryRouter, Redirect } from "react-router-dom";

jest.mock("./apiCalls");
jest.mock("react-toastify");

describe("Adding requests to the list", () => {
  beforeEach(() => {
    getFeedbackRequests.mockResolvedValue([
      { id: 1234, request: "This is a request" },
      { id: 4321, request: "This is another request" }
    ]);
    toast.error.mockImplementation(() => true);
  });

  afterEach(() => {
    getFeedbackRequests.mockClear();
    addFeedbackRequest.mockClear();
    removeFeedbackRequest.mockClear();
    toast.error.mockClear();
  });

  it("Presents the form", () => {
    const component = shallow(<RequestsPage />);
    expect(component.find("AddRequestForm").length).toBe(1);
    expect(component.find("RequestsList").length).toBe(1);
  });

  it("Gets the Requests from the database", async () => {
    let component = null;
    await act(async () => {
      component = mount(
        <MemoryRouter initialEntries={["/"]}>
          <RequestsPage />
        </MemoryRouter>
      );
    });
    component.update();
    expect(getFeedbackRequests.mock.calls.length).toEqual(1);
    expect(component.find("RequestsList").prop("requestList")).toEqual([
      { id: 1234, request: "This is a request" },
      { id: 4321, request: "This is another request" }
    ]);
  });

  it("raises an error if the connection to the API fails", async () => {
    getFeedbackRequests.mockRejectedValue("some listing error");
    let component = null;
    await act(async () => {
      component = mount(<RequestsPage />);
    });
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      expect(toast.error.mock.calls.length).toEqual(1);
      expect(toast.error.mock.calls[0][0]).toEqual(
        "Failed to get feedback requests. Check your internet connection"
      );
    });
  });

  it("Adds requests to the request list", async () => {
    addFeedbackRequest.mockResolvedValue({
      id: 9999,
      request: "This is a request"
    });
    const component = shallow(<RequestsPage />);
    await act(async () => {
      component.find("AddRequestForm").prop("handleAddingRequest")(
        "some request"
      );
    });
    expect(addFeedbackRequest.mock.calls.length).toEqual(1);
    expect(addFeedbackRequest.mock.calls[0][0]).toEqual({
      name: "some request",
      userid: 1234
    });
  });

  it("Raises an error if the add fails", async () => {
    addFeedbackRequest.mockRejectedValue("some error");
    const component = shallow(
      <RequestsPage match={{ params: { id: "999" } }} />
    );
    component.find("AddRequestForm").prop("handleAddingRequest")(
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
    removeFeedbackRequest.mockResolvedValue({ id: 1234 });
    let component = null;
    await act(async () => {
      component = mount(
        <MemoryRouter initialEntries={["/"]}>
          <RequestsPage match={{ params: { id: "999" } }} />
        </MemoryRouter>
      );
    });
    component.update();
    await act(async () => {
      component.find("RequestsList").prop("handleDelete")(1234);
    });
    component.update();
    expect(removeFeedbackRequest.mock.calls.length).toEqual(1);
    expect(removeFeedbackRequest.mock.calls[0][0]).toEqual({
      id: 1234
    });
    expect(component.find("RequestsList").prop("requestList")).toEqual([
      { id: 4321, request: "This is another request" }
    ]);
  });

  it("Raises an error if the delete fails", async () => {
    removeFeedbackRequest.mockRejectedValue("some error");
    const component = shallow(
      <RequestsPage match={{ params: { id: "999" } }} />
    );
    component.find("RequestsList").prop("handleDelete")(1234);
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      expect(toast.error.mock.calls.length).toEqual(1);
      expect(toast.error.mock.calls[0][0]).toEqual(
        "Failed to delete feedback request. Check your internet connection"
      );
    });
  });
});
