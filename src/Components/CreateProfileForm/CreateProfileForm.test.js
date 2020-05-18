import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CreateProfileForm from './CreateProfileForm';
import { ArticleProvider } from '../../Contexts/ArticleContext';

describe(`CreateProfileForm`, () => {
    const props = {
        handleSubmitForm: () => {}
    };

    it(`renders form given props`, () => {
        const wrapper = shallow(
            <ArticleProvider>
                <CreateProfileForm {...props}/>
            </ArticleProvider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});