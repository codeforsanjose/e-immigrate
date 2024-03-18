import React from 'react';
import { Button } from '../../../components/Button/Button';
import { useMarkFieldAsTouched } from '../hooks/useMarkFieldAsTouched';
import { QuestionnaireIntro } from '../QuestionnaireIntro/QuestionnaireIntro';
import Arrow from '../../../data/images/Arrow-Down-Right.svg';

import './Questionnaire.css';
import { CollectAnswerFunction } from '../../../types/common';
import { ContentText } from '../../../types/ContentText';
import { Question } from '../../../types/Question';
import { FormElementWrapper } from '../../../components/FormElementWrapper';

export type QuestionnaireResponse = Record<string, unknown>;

type QuestionnaireProps = {
    questions: Array<Question>;
    submitQuestionnaireResponse: (value: QuestionnaireResponse) => void;
    questionnaireResponse: QuestionnaireResponse;
    setQuestionnaireResponse: (value: QuestionnaireResponse) => void;
    content: ContentText;
    collectAnswer: CollectAnswerFunction;
};

export function Questionnaire(props: QuestionnaireProps) {
    const {
        collectAnswer,
        content,
        questionnaireResponse,
        questions,
        submitQuestionnaireResponse,
    } = props;
    const categories = ['Basic Info', 'Waiver Flag', 'Red Flag'];
    const [categoryIndex, setCategoryIndex] = React.useState(0);
    const {
        bindField,
        setAllFieldsTouched,
    } = useMarkFieldAsTouched();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [errors, setErrors] = React.useState<Record<string, unknown>>({});
    const [introPage, setIntroPage] = React.useState(true);
    const [showFollowUp, setShowFollowUp] = React.useState<Record<string, boolean>>({});

    const filteredQuestions = questions.filter(
        (q) => q.category === categories[categoryIndex],
    );
    const formElementWrapperOthers = React.useMemo(() => {
        return {
            bindField,
            collectAnswer,
            setShowFollowUp,
            setErrors,
        };
    }, [bindField, collectAnswer]);
    const onSubmit = () => {
        submitQuestionnaireResponse(questionnaireResponse);
    };
    const nextStep = (e: {
        preventDefault: () => void;
    }) => {
        e.preventDefault();
        const allRequiredFieldsCompleted = filteredQuestions.every((q) => {
            if ((q.required ?? false) && !(Boolean(questionnaireResponse[q.slug]))) {
                if (q.parentQuestionSlug != null) {
                    if (questionnaireResponse[q.parentQuestionSlug] === 'Yes') {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                return false;
            }
            else {
                return true;
            }
        });
        setAllFieldsTouched();
        if (allRequiredFieldsCompleted) {
            if (categoryIndex < categories.length - 1) {
                setCategoryIndex((prev) => prev + 1);
            }
            else {
                onSubmit();
                return;
            }
        }
        else {
            alert(`Please complete every question`);
        }
    };
    return (
        <div className="Questionnaire">
            {introPage
                ? (
                    <QuestionnaireIntro
                        content={content}
                        setIntroPage={setIntroPage} />
                )
                : (
                    <>
                        <>
                            {filteredQuestions.map((question) => {
                                const followUpQuestions = filteredQuestions.filter(
                                    (q) => q.parentQuestionSlug === question.slug,
                                );
                                if (question.parentQuestionSlug != null) {
                                    return null;
                                }
                                return (
                                    <div key={question.slug}>
                                        <fieldset className="Question">
                                            <div className="QuestionText">
                                                {question.text}
                                                {(question.required ?? false)
                                                    ? ` (${content.required})`
                                                    : ` (${content.optional})`}
                                            </div>
                                            <FormElementWrapper
                                                elementName={question.questionType}
                                                content={content}
                                                others={formElementWrapperOthers}
                                                question={question}
                                            />
                                        
                                        </fieldset>
                                        {showFollowUp[question.slug] &&
                                        followUpQuestions.map(
                                            (followUpQuestion) => {
                                                return (
                                                    <div
                                                        className="FollowUp"
                                                        key={followUpQuestion.slug}
                                                    >
                                                        <Arrow
                                                            height="36px"
                                                            width="36px" />
                                                        <fieldset className="Question">
                                                            <div className="QuestionText">
                                                                {followUpQuestion.text}
                                                                {(followUpQuestion.required ?? false)
                                                                    ? ` (${content.required})`
                                                                    : ` (${content.optional})`}
                                                            </div>
                                                            <FormElementWrapper
                                                                elementName={followUpQuestion.questionType}
                                                                content={content}
                                                                others={formElementWrapperOthers}
                                                                question={followUpQuestion}
                                                            />
                                                        </fieldset>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>
                                );
                            })}
                        </>
                        <Button
                            label={categoryIndex < categories.length - 1
                                ? content.step2ProceedButton2
                                : content.step2ProceedButton3}
                            type="submit"
                            onClick={nextStep} />
                    </>
                )}
        </div>
    );
}
