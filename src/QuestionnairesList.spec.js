import React from "react";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import QuestionnairesList from "./QuestionnairesList";
import { MemoryRouter } from "react-router-dom";

describe("Shows questionnaire list", () => {
  it("Shows the questionnaire list", async () => {
    const questionnaires = [
      {
        id: 1234,
        name: "this is some questionnaire",
        createdAt: "2020-08-01T09:00:00.000Z",
        updatedAt: "2020-08-01T09:00:00.000Z"
      },
      {
        id: 1235,
        name: "this is another questionnaire",
        createdAt: "2020-08-01T09:00:00.000Z",
        updatedAt: "2020-08-01T09:00:00.000Z"
      },
      {
        id: 1236,
        name: "this is a third questionnaire",
        createdAt: "2020-08-01T09:00:00.000Z",
        updatedAt: "2020-08-01T09:00:00.000Z"
      }
    ];
    const component = mount(
      <MemoryRouter initialEntries={["/"]}>
        <QuestionnairesList questionnaireList={questionnaires} />
      </MemoryRouter>
    );
    expect(component.find("tr.questionnaire-item").length).toEqual(3);
    expect(component.find("table.questionnaires").text()).toContain(
      "this is another questionnaire"
    );
    expect(component.find("table.questionnaires").text()).toContain(
      "10:00 1st Aug 2020"
    );
    expect(component.find("Link").length).toEqual(3);
    expect(
      component
        .find("Link")
        .first()
        .prop("to")
    ).toEqual("/questionnaire/1234");
  });

  it("calls the delete function if the delete button is pressed", () => {
    let foo = 0;
    const handleDelete = questionnaireId => {
      foo = questionnaireId;
    };
    const questionnaires = [
      { id: 1234, name: "this is some questionnaire" },
      { id: 999, name: "delete this questionnaire" },
      { id: 1236, name: "this is a third questionnaire" }
    ];
    const component = mount(
      <MemoryRouter initialEntries={["/"]}>
        <QuestionnairesList
          questionnaireList={questionnaires}
          handleDelete={handleDelete}
        />
      </MemoryRouter>
    );
    component
      .find("button[questionnaireid=999]")
      .forEach(n => console.log(n.html()));
    component.find("button[value=999]").simulate("click");
    expect(foo).toEqual(999);
  });
});
