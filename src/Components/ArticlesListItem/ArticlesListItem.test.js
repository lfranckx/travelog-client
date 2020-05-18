import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ArticlesListItem from './ArticlesListItem';
import { ArticleProvider } from '../../Contexts/ArticleContext';

describe(`ArticlesListItem`, () => {
    const props = {
        articles: {
            author: 'Sam Smith',
            body: 'And they say in truth that a man is made of desire. As his desire is, so is his faith. As his faith is, so are his works. As his works are, so he becomes. — The Supreme Teaching of the Upanishads',
            date: "Mon May 18 2020",
            description: "Favorite quotes",
            id: 1,
            image_url: 'http://placehold.it/500x500',
            profile_image: 'http://placehold.it/500x500',
            title: 'Vagabonding',
            user_id: 1,
            username: 'user1'
        },
        authors: [
            {
                about: 'This is my about me.',
                name: 'Sam Smith',
                profile_image: 'http://placehold.it/500x500',
            }
        ]
    };
    

    it(`renders an article given props`, () => {
        const wrapper = shallow(
            <ArticleProvider>
                <ArticlesListItem {...props}/>
            </ArticleProvider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});