/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Question } from '../../../types/Question';
import { QuestionFieldset } from './QuestionFieldset';
import { FollowupMap, OtherComponentProps } from './types';
import Arrow from '../../../data/images/Arrow-Down-Right.svg';
type FollowupPresenterProps = {
    showFollowup: FollowupMap;
    question: Question;
    filteredQuestions: Array<Question>;
    followUpQuestions: Array<Question>;
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
                const innerFollowup = filteredQuestions.filter(x => x.parentQuestionSlug === followUpQuestion.slug);
                const canHaveFollowup = innerFollowup.length > 0;
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