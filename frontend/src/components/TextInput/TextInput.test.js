import React from 'react';
import TextInput from './TextInput';

import renderer from 'react-test-renderer';

it('TextInput renders correctly', () => {
    const tree = renderer
        .create(
            <TextInput
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
