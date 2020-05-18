import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import MainPage from './MainPage';
import { ArticleProvider } from '../../Contexts/ArticleContext';

describe(`MainPage component`, () => {
    it(`renders page without crashing`, () => {
        const wrapper = mount(
            <ArticleProvider>
                <MainPage />
            </ArticleProvider>
        )
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});