import React from 'react';
import { shallow } from 'enzyme';
import Comment from './Comment';

describe('Comment', () => {
    test('should render comment component correctly', () => {
        let wrapper = shallow(<Comment />);
        expect(wrapper).toMatchSnapshot();
    });

    test('should display passed comment', () => {
        let wrapper = shallow(<Comment comment="test" />);
        expect(wrapper.find('input').prop('value')).toBe('test');
    });
});
