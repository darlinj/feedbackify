import React from "react";
import { shallow } from "enzyme";
import TitleBar from "./TitleBar";

describe("The title bar", () => {
  it("Shows the title", () => {
    const component = shallow(<TitleBar title="FooBar" />);
    expect(component.text()).toContain("FooBar");
  });
});
