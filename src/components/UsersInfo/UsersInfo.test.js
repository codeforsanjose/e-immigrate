import React from 'react';
import UsersInfo from './UsersInfo';

import renderer from 'react-test-renderer';

it('UsersInfo renders correctly', () => {
    const tree = renderer.create(<UsersInfo />).toJSON();
    expect(tree).toMatchSnapshot();
});
