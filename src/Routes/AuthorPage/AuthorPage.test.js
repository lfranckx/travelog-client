import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import AuthorPage from './AuthorPage';
import { ArticleProvider } from '../../Contexts/ArticleContext';

describe(`AuthorPage component`, () => {

    it(`renders form given props`, () => {
        const wrapper = mount(
            <ArticleProvider>
                <AuthorPage />
            </ArticleProvider>
        )
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});