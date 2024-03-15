import React from 'react';
import Confirmation from './Confirmation';

import renderer from 'react-test-renderer';

const content = {
    step3Header: 'Step 3',
    step3Header2: 'Congratulations, you have completed the questionnaire!',
    step3Header3: "What's Next?",
    step3Instructions:
        'Overview of next steps to receive free legal assistance',
    step3Text2:
        'We have sent a copy of this confirmation page to the email and/or phone that you provided in the questionnaire.',
    step3Text3:
        'If it appears that you are eligible for citizenship based on the answers you provided:',
    step3Text4:
        'If you are ineligible to apply for citizenship at this time we will follow up with you by email no later than Monday, May 24th.',
    step3Text5:
        'Note: Due to limited space and COVID-19, we cannot guarantee that you will receive services. Thank you for your cooperation, patience and understanding.',
    step3Text6: 'If you want more information about immigration, please visit',
    step3Tip1:
        'Project New Citizen team members will begin to contact all eligible participants starting Monday, May 17th for a FREE follow-up consultation to verify all the information, give advice, and instuction.',
    step3Tip2:
        'If you are eligible to apply, you will be assisted by the immigration attourneys and DOJ accredited representatives. The citizenship application assisstance will be FREE of charge, and all information will be kept confidential.',
    step3Tip3:
        'You will also receive resources to help you study for the citizenship interview.',
    step3Title: 'Confirmation',
};

it('confirmation page renders correctly', () => {
    const tree = renderer.create(<Confirmation content={content} />).toJSON();
    expect(tree).toMatchSnapshot();
});
