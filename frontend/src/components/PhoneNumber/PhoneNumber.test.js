import React from 'react';
import PhoneNumber from './PhoneNumber';

import renderer from 'react-test-renderer';

it('PhoneNumber renders correctly', () => {
    const tree = renderer
        .create(
            <PhoneNumber
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
