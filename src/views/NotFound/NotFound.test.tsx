import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import NotFound from ".";

let wrapper: ShallowWrapper;

beforeEach(() => {
  wrapper = shallow(<NotFound />);
});

test("should render NotFoundView correctly", () => {
  expect(wrapper).toMatchSnapshot();
});
