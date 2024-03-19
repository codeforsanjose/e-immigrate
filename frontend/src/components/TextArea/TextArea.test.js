import React from 'react';
import TextArea from './TextArea';

import renderer from 'react-test-renderer';

it('TextArea renders correctly', () => {
    const tree = renderer
        .create(
            <TextArea
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
