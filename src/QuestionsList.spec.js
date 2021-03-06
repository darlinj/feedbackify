import React from "react";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import QuestionsList from "./QuestionsList";

describe("Shows question list", () => {
  it("Shows the question list", async () => {
    const questions = [
      { id: 1234, question: "this is some question" },
      { id: 1235, question: "this is another question" },
      { id: 1236, question: "this is a third question" }
    ];
    const component = mount(<QuestionsList questionList={questions} />);
    expect(component.find("tr.question-item").length).toEqual(3);
    expect(component.find("table.questions").text()).toContain(
      "this is another question"
    );
  });

  it("calls the delete function if the delete button is pressed", () => {
    let foo = 0;
    const handleDelete = questionId => {
      foo = questionId;
    };
    const questions = [
      { id: 1234, question: "this is some question" },
      { id: 999, question: "delete this question" },
      { id: 1236, question: "this is a third question" }
    ];
    const component = mount(
      <QuestionsList questionList={questions} handleDelete={handleDelete} />
    );
    component
      .find("button[questionid=999]")
      .forEach(n => console.log(n.html()));
    component.find("button[value=999]").simulate("click");
    expect(foo).toEqual(999);
  });
});
