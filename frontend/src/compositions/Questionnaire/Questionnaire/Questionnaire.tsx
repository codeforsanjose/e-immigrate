import React from 'react';
import { Button } from '../../../components/Button/Button';
import { QuestionnaireIntro } from '../QuestionnaireIntro/QuestionnaireIntro';

import './Questionnaire.css';

import { WithPreventDefault } from '../../../types/WithPreventDefault';
import { FollowupMap } from './types';
import { QuestionnaireContainer } from './QuestionnaireContainer';
import { QuestionComponent } from './QuestionComponent';
import { useContentContext } from '../../../contexts/ContentContext';
import { QuestionnaireResponse, useQuestionnaireResponseContent } from '../../../contexts/QuestionnaireResponseContext';
import { useQuestionsContext } from '../../../contexts/QuestionsContext';


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
    } = useQuestionnaireResponseContent();
    const { content } = useContentContext();
    const { questions } = useQuestionsContext();
    const [categoryIndex, setCategoryIndex] = React.useState(0);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [errors, setErrors] = React.useState<Record<string, unknown>>({});
    const [introPage, setIntroPage] = React.useState(true);
    const [showFollowUp, setShowFollowUp] = React.useState<FollowupMap>({});
    const category = React.useMemo(() => {
        return categories[categoryIndex];
    }, [categoryIndex]);
    
    // get the questions for the current stage
    const filteredQuestions = React.useMemo(() => {
        return questions.filter(q => q.category === category);
    }, [category, questions]);


    React.useEffect(() => {
        console.log({
            category,
            filteredQuestions: questions.filter(q => q.category === category),
        });
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
        console.log({ filteredQuestions });
        const allRequiredFieldsCompleted = filteredQuestions.every((q) => {
            // if it isnt required, ignore it
            if (!q.required) return true;

            const value = questionnaireResponse[q.slug];
            
            if ((q.required ?? false) && !(Boolean(value))) {
                if (q.parentQuestionSlug != null) {
                    if (questionnaireResponse[q.parentQuestionSlug] === 'Yes') {
                        console.log({
                            part: 'blah1',
                            slug: q.slug,
                            value,
                        });
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                console.log({
                    part: 'blah2',
                    slug: q.slug,
                    value,
                });
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
            <>
                {filteredQuestions.map((question) => {
                    return (
                        <QuestionComponent
                            key={question.slug}
                            others={formElementWrapperOthers}
                            question={question}
                            filteredQuestions={filteredQuestions}
                            showFollowUp={showFollowUp}
                        />
                    );
                })}
            </>
            <Button
                label={categoryIndex < categories.length - 1
                    ? content.step2ProceedButton2
                    : content.step2ProceedButton3}
                type="submit"
                onClick={nextStep} 
            />
        </QuestionnaireContainer>
    );
}
