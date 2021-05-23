import React from 'react';
import Email from './Email';

import renderer from 'react-test-renderer';

it('Email renders correctly', () => {
    const tree = renderer
        .create(
            <Email
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
