import React from 'react';
import { Button } from '../../../components/Button/Button';
import { QuestionnaireIntro } from '../QuestionnaireIntro/QuestionnaireIntro';

import './Questionnaire.css';

import { WithPreventDefault } from '../../../types/WithPreventDefault';
import { FollowupMap } from './types';
import { QuestionnaireContainer } from './QuestionnaireContainer';
import { QuestionWithFollowup } from './QuestionWithFollowup';
import { useContentContext } from '../../../contexts/ContentContext';
import { QuestionnaireResponse, useQuestionnaireResponseContext } from '../../../contexts/QuestionnaireResponseContext';
import { useQuestionsContext } from '../../../contexts/QuestionsContext';
import { useClosingDateHook } from '../../../hooks/useClosingDateHook';


type QuestionnaireProps = {
    submitQuestionnaireResponse: (value: QuestionnaireResponse) => void;
};

const categories = ['Basic Info', 'Waiver Flag', 'Red Flag'] as const;
export function Questionnaire(props: QuestionnaireProps) {
    const {
        submitQuestionnaireResponse,
    } = props;
    const {
        questionnaireResponse,
        setAllFieldsTouched,
    } = useQuestionnaireResponseContext();

    const { content } = useContentContext();
    const { questions } = useQuestionsContext();
    const [categoryIndex, setCategoryIndex] = React.useState(0);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [errors, setErrors] = React.useState<Record<string, unknown>>({});
    const [introPage, setIntroPage] = React.useState(true);
    const [showFollowUp, setShowFollowUp] = React.useState<FollowupMap>({});
    const category = categories[categoryIndex];

    const closingDateFromDoc = content.closingDate ?? '04/18/24'; // fallback
    const closedWorkShop = useClosingDateHook({ closingDate: closingDateFromDoc });
    // get the questions for the current stage
    const filteredQuestions = React.useMemo(() => {
        return questions.filter(q => q.category === category);
    }, [category, questions]);


    const formElementWrapperOthers = React.useMemo(() => {
        return {
            setShowFollowUp,
            setErrors,
        };
    }, []);

    const onSubmit = React.useCallback(() => {
        submitQuestionnaireResponse(questionnaireResponse);
    }, [questionnaireResponse, submitQuestionnaireResponse]);



    const nextStep = React.useCallback((e: WithPreventDefault) => {
        e.preventDefault();
        const allRequiredFieldsCompleted = filteredQuestions.every((q) => {
            // if it isnt required, ignore it
            if (!q.required) return true;
            const value = questionnaireResponse[q.slug];
            if ((q.required ?? false) && value == null) {
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
    }, [categoryIndex, filteredQuestions, onSubmit, questionnaireResponse, setAllFieldsTouched]);
    if (introPage) {
        return (
            <QuestionnaireContainer>
                <QuestionnaireIntro
                    setIntroPage={setIntroPage}
                />
            </QuestionnaireContainer>
        );
    }
    return (
        <QuestionnaireContainer>
            {filteredQuestions.map((question) => {
                return (
                    <QuestionWithFollowup
                        key={question.slug}
                        others={formElementWrapperOthers}
                        question={question}
                        filteredQuestions={filteredQuestions}
                        showFollowUp={showFollowUp}
                    />
                );
            })}
            { !closedWorkShop && <Button
                label={categoryIndex < categories.length - 1
                    ? content.step2ProceedButton2
                    : content.step2ProceedButton3}
                type="submit"
                onClick={nextStep}
            />}
            {
                closedWorkShop && <h4>{content.closedMessage}</h4>
            }
        </QuestionnaireContainer>
    );
}
