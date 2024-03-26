import React from 'react';
import Radio from './Radio';

import renderer from 'react-test-renderer';

it('Radio renders correctly', () => {
    const tree = renderer
        .create(
            <Radio
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
