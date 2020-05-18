import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import EditProfileForm from './EditProfileForm';
import { ArticleProvider } from '../../Contexts/ArticleContext';

describe(`EditProfileForm component`, () => {
    const props = {
        handleSubmitForm: () => {}
    };

    it(`renders a form with text from baby data in context`, () => {
        const wrapper = shallow(
            <ArticleProvider>
                <EditProfileForm />
            </ArticleProvider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });


});