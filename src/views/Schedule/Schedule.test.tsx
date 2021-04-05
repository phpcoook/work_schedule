import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { mockDispatch } from "react-redux";
import Schedule from ".";

describe("Schedule", () => {
  let wrapper: ShallowWrapper, useEffect: any;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f: any) => f());
  };

  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect(); //

    wrapper = shallow(<Schedule />);
  });

  test("should render Schedule correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should call dispatch with startPopulateWorkSchedules action on mount", () => {
    expect(mockDispatch).toHaveBeenCalled();
  });
});
