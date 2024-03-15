import React from 'react';
import Date from './Date';

import renderer from 'react-test-renderer';

it('Date renders correctly', () => {
    const tree = renderer
        .create(
            <Date
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
