import React from 'react';
import { shallow, mount } from 'enzyme';
import Dropdown from './Dropdown';

describe('Dropdown', () => {
    test('should render Dropdown component correctly', () => {
        let wrapper = shallow(<Dropdown />);
        expect(wrapper).toMatchSnapshot();
    });

    test('should render default week option correctly', () => {
        let wrapper = mount(<Dropdown />);
        console.log(wrapper.debug());
        expect(wrapper.text()).toBe('This Week');
    });
});
