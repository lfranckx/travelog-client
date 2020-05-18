import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Header from './Header';
import { ArticleProvider } from '../../Contexts/ArticleContext';

describe(`Header component`, () => {
    it (`renders page without crashing`, () => {
        const wrapper = shallow(
            <ArticleProvider>
                <Header />
            </ArticleProvider>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
    })
});