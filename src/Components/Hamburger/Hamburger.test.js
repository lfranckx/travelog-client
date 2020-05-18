import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Hamburger from './Hamburger';
import { ArticleProvider } from '../../Contexts/ArticleContext';

describe(`Hamburger component`, () => {
    const props = {
            username: 'user1',
            about: 'This is my about me.',
            name: 'Sam Smith',
            profile_image: 'http://placehold.it/500x500',
        };

    it(`renders page without crashing`, () => {
        const wrapper = shallow(
            <ArticleProvider >
                <Hamburger {...props}/>
            </ArticleProvider>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
    });
});