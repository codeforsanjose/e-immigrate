import React from 'react';
import RadioWithFollowUp from './RadioWithFollowUp';

import renderer from 'react-test-renderer';

it('RadioWithFollowUp renders correctly', () => {
    const tree = renderer
        .create(
            <RadioWithFollowUp
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
