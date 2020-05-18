import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import PostArticleForm from './PostArticleForm';
import { ArticleProvider } from '../../Contexts/ArticleContext';

describe(`PostArticleForm component`, () => {
    const props = {
        handleSubmitForm: () => {}
    };

    it(`renders form given props`, () => {
        const wrapper = shallow(
            <ArticleProvider>
                <PostArticleForm {...props}/>
            </ArticleProvider>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
    });
})