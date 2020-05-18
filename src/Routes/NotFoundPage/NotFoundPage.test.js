import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NotFoundPage from './NotFoundPage';

describe(`NotFoundPage component`, () => {
    it(`renders without exploding`, () => {
        expect(
            shallow(
                <NotFoundPage />
            ).length
        ).toEqual(1)
    })

    it(`renders create section by default`, () => {
        const wrapper = shallow(<NotFoundPage />)
        expect(toJson(wrapper)).toMatchSnapshot()
    });
})