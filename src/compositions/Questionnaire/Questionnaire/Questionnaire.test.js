import React from 'react';
import Questionnaire from './Questionnaire';

import renderer from 'react-test-renderer';

it('App renders correctly', () => {
    const tree = renderer.create(<Questionnaire />).toJSON();
    expect(tree).toMatchSnapshot();
});
