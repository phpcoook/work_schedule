import React from "react";
import { shallow } from "enzyme";
import ScheduleControls from "./ScheduleControls";
import Dropdown from "./Dropdown/Dropdown";
import { Button } from 'antd';

describe("ScheduleControls", () => {
  test("should render ScheduleControls component correctly", () => {
    let wrapper = shallow(<ScheduleControls />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render all buttons and dropdown component correctly", () => {
    let wrapper = shallow(<ScheduleControls />);
    expect(wrapper.find(Button).length).toBe(3);
    expect(wrapper.find(Dropdown).length).toBe(1);
    expect(wrapper.text().includes("Default schedule")).toBe(true);
  });
});