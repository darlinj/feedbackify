import React from "react";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import QuestionnairesList from "./QuestionnairesList";
import { MemoryRouter } from "react-router-dom";
import moment from "moment";

describe("Shows questionnaire list", () => {
  it("Shows loading when loading", () => {
    const component = mount(
      <MemoryRouter initialEntries={["/"]}>
        <QuestionnairesList isLoading={true} />
      </MemoryRouter>
    );
    expect(component.find("div[role='loading-banner']").text()).toContain(
      "Loading..."
    );
  });

  it("Shows the questionnaire list", async () => {
    const currerntDate = moment()
      .utc()
      .format();
    const questionnaires = [
      {
        id: 1234,
        name: "this is some questionnaire",
        createdAt: currerntDate,
        updatedAt: currerntDate
      },
      {
        id: 1235,
        name: "this is another questionnaire",
        createdAt: currerntDate,
        updatedAt: currerntDate
      },
      {
        id: 1236,
        name: "this is a third questionnaire",
        createdAt: currerntDate,
        updatedAt: currerntDate
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
      moment(currerntDate).format("h:mm Do MMM YYYY")
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
