import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import PostArticlePage from './PostArticlePage';
import { ArticleProvider } from '../../Contexts/ArticleContext';


describe(`PostArticlePage component`, () => {
    it(`renders page without crashing`, () => {
        const wrapper = shallow(
            <ArticleProvider>
                <PostArticlePage />
            </ArticleProvider>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
    });    
})