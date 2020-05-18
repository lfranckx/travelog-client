import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SearchBar from './SearchBar';
import { ArticleProvider } from '../../Contexts/ArticleContext';


describe(`Searchbar component`, () => {
    it(`renders form without crashing`, () => {
        const wrapper = shallow(
            <ArticleProvider>
                <SearchBar />
            </ArticleProvider>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
    });
});