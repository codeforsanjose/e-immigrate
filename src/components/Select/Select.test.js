import React from 'react';
import Select from './Select';

import renderer from 'react-test-renderer';

it('Select renders correctly', () => {
    const tree = renderer
        .create(
            <Select
                q={{}}
                answers={[]}
                values={[]}
                bindField={() => {}}
                showFollowUp={{}}
                setShowFollowUp={{}}
                collectAnswer={{}}
                content={{}}
            />
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
