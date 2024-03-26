/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { QuestionFieldset } from './QuestionFieldset';
import { FollowupMap, OtherComponentProps } from './types';
import Arrow from '../../../data/images/Arrow-Down-Right.svg';
import { QuestionInfo } from '../../../types/ApiResults';
type FollowupPresenterProps = {
    showFollowup: FollowupMap;
    question: QuestionInfo;
    filteredQuestions: Array<QuestionInfo>;
    followUpQuestions: Array<QuestionInfo>;
    others: OtherComponentProps;
};
export function FollowupPresenter(props: FollowupPresenterProps) {
    const {
        showFollowup,
        question,
        filteredQuestions,
        followUpQuestions,
        others,
    } = props;
    const show = showFollowup[question.slug];
    if (!show) return null;
    return (
        <>
            {followUpQuestions.map(followUpQuestion => {
                return (
                    <div
                        className="FollowUp"
                        key={followUpQuestion.slug}
                    >
                        <Arrow
                            height="36px"
                            width="36px" 
                        />
                        <QuestionFieldset
                            others={others}
                            question={followUpQuestion}
                        />
                    </div>
                );
            })}
        </>
    );
}