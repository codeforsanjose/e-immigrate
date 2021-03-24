import React from 'react';
import AdminDashboard from './AdminDashboard';

import renderer from 'react-test-renderer';

it('AdminDashboard renders correctly', () => {
    const tree = renderer.create(<AdminDashboard />).toJSON();
    expect(tree).toMatchSnapshot();
});
