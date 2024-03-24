import React from 'react';

import { FollowupPresenter } from './FollowupPresenter';
import { QuestionFieldset } from './QuestionFieldset';
import { FollowupMap, OtherComponentProps } from './types';
import { QuestionInfo } from '../../../types/ApiResults';

type QuestionWithFollowupProps = {
    showFollowUp: FollowupMap;
    filteredQuestions: Array<QuestionInfo>;
    parent?: QuestionInfo;
    question: QuestionInfo;
    others: OtherComponentProps;
};

function canRender(config: {
    showFollowUp: FollowupMap;
    question: QuestionInfo;
    parent?: QuestionInfo;
}) {
    const {
        question,
        showFollowUp,
        parent,
    } = config;

    const parentSlug = question.parentQuestionSlug;
    // if the question isnt dependent on a parent, then render
    if (parentSlug == null || parentSlug === '') return true;
    // if the dependent question isnt triggered, DONT render
    else if (!showFollowUp[parentSlug]) return false;
    // render if we are rendering as a child of the proper parent
    return parent?.slug === parentSlug;
}



export function QuestionWithFollowup(props: QuestionWithFollowupProps) {
    const {
        filteredQuestions,
        showFollowUp,
        question,
        others,
        parent,
    } = props;

    if (!canRender({
        parent,
        question,
        showFollowUp,
    })) return null;

    const followUpQuestions = filteredQuestions.filter(q => q.parentQuestionSlug === question.slug);
    return (
        <div key={question.slug}>
            <QuestionFieldset
                others={others}
                question={question}
            />
            
            <FollowupPresenter
                showFollowup={showFollowUp}
                filteredQuestions={filteredQuestions}
                question={question}
                followUpQuestions={followUpQuestions}
                others={others}
            />
        </div>
    );
}