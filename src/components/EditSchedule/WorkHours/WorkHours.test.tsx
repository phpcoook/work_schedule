import React from 'react';
import { shallow } from 'enzyme';
import WorkHours from './WorkHours';

describe('WorkHours', () => {
    test('should render comment component correctly', () => {
        let wrapper = shallow(<WorkHours />);
        expect(wrapper).toMatchSnapshot();
    });

    test('should display passed hours', () => {
        let wrapper = shallow(<WorkHours hours="2" />);
        console.log(wrapper.text());
        expect(wrapper.text()).toBe('2h');
    });
});
