import React from 'react';
import QuestionnaireIntro from './QuestionnaireIntro';

import renderer from 'react-test-renderer';

const content = {
    step2Header: 'Step 2',
    step2Header2: 'About the Screening Questionnaire',
    step2Instructions: 'Please complete the screening questionnaire',
    step2ProceedButton1: 'Begin Questionnaire',
    step2Tip1: 'It takes about 10 minutes',
    step2Tip2: 'Answer 25-30 questions',
    step2Tip4: 'All your information will be kept confidential',
    step2Tip5: 'Please answer truthfully and as best as you can remember',
    step2Tip6: 'Please complete ALL the questions to the best of your ability',
    step2Title: 'Questionnaire',
};

it('questionnaire intro renders correctly', () => {
    const tree = renderer
        .create(<QuestionnaireIntro content={content} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
