import React from 'react';
import { shallow, mount } from 'enzyme';
import WorkShift from './WorkShifts';
import { TimePicker } from 'antd';
const { RangePicker } = TimePicker;

describe('Workshift', () => {
    test('should render Workshift component correctly', () => {
        let wrapper = shallow(<WorkShift />);
        expect(wrapper).toMatchSnapshot();
    });

    test('should render rangepicker component correctly', () => {
        let wrapper = shallow(<WorkShift />);
        expect(wrapper.find(RangePicker).length).toBe(1);
    });

    test('should display work shift correctly', () => {
        const FIXTURES = {
            start_time: '2021-03-21 08:00:00',
            end_time: '2021-03-21 12:00:00'
        };

        let wrapper = mount(<WorkShift {...FIXTURES} />);
        expect(wrapper.find('input').at(0).prop('value')).toBe('08:00:00');
        expect(wrapper.find('input').at(1).prop('value')).toBe('12:00:00');
    });
});
