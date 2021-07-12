import React from "react";
import QuestionnairesList from "./QuestionnairesList";
import { MemoryRouter } from "react-router-dom";
import moment from "moment";
import { render, cleanup, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Shows questionnaire list", () => {
  afterEach(() => cleanup());

  it("Shows loading when loading", async () => {
    const component = render(
      <MemoryRouter initialEntries={["/"]}>
        <QuestionnairesList isLoading={true} />
      </MemoryRouter>
    );
    expect(await component.findByText("Loading...")).toBeInTheDocument();
  });

  it("Shows the questionnaire list", async () => {
    const currerntDate = moment().utc().format();
    const questionnaires = [
      {
        id: 1234,
        name: "this is some questionnaire",
        createdAt: currerntDate,
        updatedAt: currerntDate,
      },
      {
        id: 1235,
        name: "this is another questionnaire",
        createdAt: currerntDate,
        updatedAt: currerntDate,
      },
      {
        id: 1236,
        name: "this is a third questionnaire",
        createdAt: currerntDate,
        updatedAt: currerntDate,
      },
    ];
    const component = render(
      <MemoryRouter initialEntries={["/"]}>
        <QuestionnairesList questionnaireList={questionnaires} />
      </MemoryRouter>
    );
    expect(
      component.getByText("this is some questionnaire")
    ).toBeInTheDocument();
    expect(
      component.getByText("this is another questionnaire")
    ).toBeInTheDocument();
    expect(
      component.getAllByText(moment(currerntDate).format("hh:mm Do MMM YYYY"))
        .length
    ).toBeGreaterThan(1);
  });

  it("calls the delete function if the delete button is pressed", () => {
    let foo = 0;
    const handleDelete = (questionnaireId) => {
      foo = questionnaireId;
    };
    const questionnaires = [
      { id: 1234, name: "this is some questionnaire" },
      { id: 999, name: "delete this questionnaire" },
      { id: 1236, name: "this is a third questionnaire" },
    ];
    const component = render(
      <MemoryRouter initialEntries={["/"]}>
        <QuestionnairesList
          questionnaireList={questionnaires}
          handleDelete={handleDelete}
        />
      </MemoryRouter>
    );
    const firstQuestionnaireRow = component
      .getByText("this is some questionnaire")
      .closest("tr");
    userEvent.click(
      within(firstQuestionnaireRow).getByTestId("delete-questionnaire")
    );
    expect(foo).toEqual(1234);
  });
});
