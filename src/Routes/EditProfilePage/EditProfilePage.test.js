import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import EditProfilePage from './EditProfilePage';
import { ArticleProvider } from '../../Contexts/ArticleContext';

describe(`EditProfilePage component`, () => {
    it(`renders page without crashing`, () => {
        const wrapper = shallow(
            <ArticleProvider>
                <EditProfilePage />
            </ArticleProvider>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
    });    
})