import React from 'react';
import Question from './Question';

import renderer from 'react-test-renderer';

it('App renders correctly', () => {
    const tree = renderer.create(<Question />).toJSON();
    expect(tree).toMatchSnapshot();
});
