import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SignUpForm from './SignUpForm';

describe(`SignUpForm component`, () => {
    const props = {
        handleSignUpSuccess: () => {}
    };

    it(`renders form given props`, () => {
        const wrapper = shallow(<SignUpForm {...props}/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});