import React from 'react';
import Checkbox from './Checkbox';

import renderer from 'react-test-renderer';

it('Checkbox renders correctly', () => {
    const tree = renderer
        .create(
            <Checkbox
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
