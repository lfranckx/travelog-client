import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import EditArticleForm from './EditArticleForm';
import { ArticleProvider } from '../../Contexts/ArticleContext';

describe(`EditArticleForm component`, () => {
    const props = {
        handleSubmitForm: () => {}
    };

    it(`renders a form with text from baby data in context`, () => {
        const wrapper = shallow(
            <ArticleProvider>
                <EditArticleForm {...props}/>
            </ArticleProvider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});