import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Login from ".";

let wrapper: ShallowWrapper;

beforeEach(() => {
  wrapper = shallow(<Login />);
});

test("should render LoginView correctly", () => {
  expect(wrapper).toMatchSnapshot();
});
