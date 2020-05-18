import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import EditArticlePage from './EditArticlePage';
import { ArticleProvider } from '../../Contexts/ArticleContext';

describe(`EditArticlePage component`, () => {
    it(`renders page without crashing`, () => {
        const wrapper = shallow(
            <ArticleProvider>
                <EditArticlePage />
            </ArticleProvider>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
    });    
})