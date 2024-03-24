import React from 'react';
import { Question } from '../../../types/Question';
import { FollowupPresenter } from './FollowupPresenter';
import { QuestionFieldset } from './QuestionFieldset';
import { FollowupMap, OtherComponentProps } from './types';

type QuestionComponentProps = {
    showFollowUp: FollowupMap;
    filteredQuestions: Array<Question>;
    parent?: Question;
    question: Question;
    others: OtherComponentProps;
};
export function QuestionComponent(props: QuestionComponentProps) {
    const {
        filteredQuestions,
        showFollowUp,
        question,
        others,
        parent,
    } = props;

    const parentSlug = question.parentQuestionSlug;
    if (!(parentSlug == null || parentSlug === '' || (showFollowUp[parentSlug] && parent?.slug === parentSlug))) return null;
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