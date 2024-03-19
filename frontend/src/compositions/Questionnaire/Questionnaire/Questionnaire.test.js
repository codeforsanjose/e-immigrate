import React from 'react';
import Questionnaire from './Questionnaire';

import renderer from 'react-test-renderer';

it('Questionnaire renders correctly', () => {
    const tree = renderer
        .create(
            <Questionnaire
                filteredQuestions={[]}
                bindField={() => {}}
                questions={[]}
                setAllFieldsTouched={() => {}}
                submitQuestionnaireResponse={() => {}}
                questionnaireResponse={() => {}}
                setQuestionnaireResponse={() => {}}
            />
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
