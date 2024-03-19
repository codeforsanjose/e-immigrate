import React from 'react';
import Zip from './Zip';

import renderer from 'react-test-renderer';

it('Zip renders correctly', () => {
    const tree = renderer
        .create(
            <Zip
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
