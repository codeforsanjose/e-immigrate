import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import renderer from 'react-test-renderer';

it('App renders correctly', () => {
    const tree = renderer
    .create(<App />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});