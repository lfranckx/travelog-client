import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Comments from './Comments';

describe(`Comments`, () => {
    const props = {
        article_id: 1,
        author_name: "Sam Smith",
        comment: "Hey dude!",
        date: "2020-05-18T08:32:54.586Z",
        id: 1,
        profile_image: 'http://placehold.it/500x500',
    };

    it(`renders an article given props`, () => {
        const wrapper = shallow(<Comments {...props}/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});