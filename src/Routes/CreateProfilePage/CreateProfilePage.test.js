import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CreateProfilePage from './CreateProfilePage';
import { ArticleProvider } from '../../Contexts/ArticleContext';


describe(`CreateProfilePage component`, () => {
    it(`renders page without crashing`, () => {
        const wrapper = shallow(
            <ArticleProvider>
                <CreateProfilePage />
            </ArticleProvider>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
    });    
})