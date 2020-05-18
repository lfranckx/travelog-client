import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ArticlePage from './ArticlePage';
import { ArticleProvider } from '../../Contexts/ArticleContext';

describe(`ArticlePage component`, () => {
    

    it(`renders form given props`, () => {
        const wrapper = shallow(
            <ArticleProvider>
                <ArticlePage />
            </ArticleProvider>
        )
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});