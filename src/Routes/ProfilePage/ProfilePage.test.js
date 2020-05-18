import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ProfilePage from './ProfilePage';
import { ArticleProvider } from '../../Contexts/ArticleContext';

describe(`ProfilePage component`, () => {

    it(`renders form given props`, () => {
        const wrapper = shallow(
            <ArticleProvider>
                <ProfilePage />
            </ArticleProvider>
        )
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});