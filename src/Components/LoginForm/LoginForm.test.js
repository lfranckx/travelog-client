import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import LoginForm from './LoginForm';

describe(`LoginForm component`, () => {
    const props = {
        handleLoginSuccess: () => {}
    };

    it(`renders form given props`, () => {
        const wrapper = shallow(<LoginForm {...props}/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    });
})