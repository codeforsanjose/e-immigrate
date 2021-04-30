import React from 'react';
import Footer from './Footer';

import renderer from 'react-test-renderer';

const content = {
    footerText1: 'test',
    footerText2: 'test',
};

it('Footer renders correctly', () => {
    const tree = renderer.create(<Footer content={content} />).toJSON();
    expect(tree).toMatchSnapshot();
});
