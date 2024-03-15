import React from 'react';
import { Button } from '../../../components/Button/Button';
import { useMarkFieldAsTouched } from '../hooks/useMarkFieldAsTouched';
import { QuestionnaireIntro } from '../QuestionnaireIntro/QuestionnaireIntro';
import Arrow from '../../../data/images/Arrow-Down-Right.svg';
import { Checkbox } from '../../../components/Checkbox/Checkbox';
import { Date } from '../../../components/Date/Date';
import { Email } from '../../../components/Email/Email';
import { PhoneNumber } from '../../../components/PhoneNumber/PhoneNumber';
import { Radio } from '../../../components/Radio/Radio';
import { RadioWithFollowUp } from '../../../components/RadioWithFollowUp/RadioWithFollowUp';
import { Select } from '../../../components/Select/Select';
import { TextArea } from '../../../components/TextArea/TextArea';
import { TextInput } from '../../../components/TextInput/TextInput';
import { Zip } from '../../../components/Zip/Zip';

import './Questionnaire.css';
import { ComponentPropsWithAttributes } from '../../../types/ComponentWithAttributes';
import { CollectAnswerFunction } from '../../../types/common';

type Question = {
    category: string;
    required?: boolean;
    parentQuestionSlug?: string;
    answerSelections?: string;
    slug: string;
    text: string;
    questionType: FormElementName;
};
export type QuestionnaireResponse = Record<string, unknown>;
type Content = {
    required: boolean;
    optional: boolean;
    step2ProceedButton2: string;
    step2ProceedButton3: string;
    errorMessage?: string;
    step2Header: string;
    step2Title: string;
    step2Instructions: string;
    step2Tip1: string;
    step2Tip2: string;
    step2Tip4: string;
    step2Tip5: string;
    step2Tip6: string;
    step2Header2: string;
    step2ProceedButton1: string;
};
type QuestionnaireProps = {
    questions: Array<Question>;
    submitQuestionnaireResponse: (value: QuestionnaireResponse) => void;
    questionnaireResponse: QuestionnaireResponse;
    setQuestionnaireResponse: (value: QuestionnaireResponse) => void;
    content: Content;
    collectAnswer: CollectAnswerFunction;
};
const formElements = {
    checkbox: Checkbox,
    date: Date,
    email: Email,
    phoneNumber: PhoneNumber,
    radio: Radio,
    radioWithFollowUp: RadioWithFollowUp,
    dropDown: Select,
    textArea: TextArea,
    input: TextInput,
    zip: Zip,
};
type FormElementName = keyof typeof formElements;
// type FormElementComponent<TElementName extends FormElementName> = (typeof formElements)[TElementName];
// type FormElementProps<TElementName extends FormElementName> = React.ComponentProps<FormElementComponent<TElementName>>['attributes'];
// function getFormElementProps<
//     TElementName extends FormElementName
// >(
//     name: TElementName,
//     question: Question,
//     content: Content,
//     others: {
//         bindField: ReturnType<typeof useMarkFieldAsTouched>['bindField'];
//         collectAnswer: CollectAnswerFunction;
//     },
// ): FormElementProps<TElementName> {
//     const {
//         bindField,
//         collectAnswer,
//     } = others;
//     const answers = question.answerSelections?.split(',\n ').join(', ');
//     const componentName = name;
//     const commonData = {
//         bindField,
//         collectAnswer,
//         q: question,
//     };

//     if (name === 'checkbox') {
//         return {
//             ...commonData,
//             values: answers?.split(', ') ?? undefined,
//             content: {
//                 errorMessage: content.errorMessage,
//             },
//         };
//     }
//     else if (name === 'date') {
//         return {
//             ...commonData,
//             content: {
//                 errorMessage: content.errorMessage,
//             },
//         };
//     }
//     else if (name === 'dropDown') {
//         throw new Error(`Unsupported component '${componentName}'`)
//     }
//     else if (name === 'email') {
//         throw new Error(`Unsupported component '${componentName}'`)
//     }
//     else if (name === 'input') {
//         throw new Error(`Unsupported component '${componentName}'`)
//     }
//     else if (name === 'phoneNumber') {
//         throw new Error(`Unsupported component '${componentName}'`)
//     }
//     else if (name === 'radio') {
//         throw new Error(`Unsupported component '${componentName}'`)
//     }
//     else if (name === 'radioWithFollowUp') {
//         throw new Error(`Unsupported component '${componentName}'`)
//     }
//     else if (name === 'textArea') {
//         throw new Error(`Unsupported component '${componentName}'`)
//     }
//     else if (name === 'zip') {
//         throw new Error(`Unsupported component '${componentName}'`)
//     }
//     name satisfies never;
//     throw new Error(`Unsupported component '${componentName}'`)
// }

type FormElementWrapperProps<TElementName extends FormElementName> = {
    elementName: TElementName;
    question: Question;
    content: Content;
    others: {
        bindField: ReturnType<typeof useMarkFieldAsTouched>['bindField'];
        collectAnswer: CollectAnswerFunction;
    };
};
function FormElementWrapper<
    TElementName extends FormElementName,
>(props: FormElementWrapperProps<TElementName>) {
    const {
        content,
        others: {
            bindField,
            collectAnswer,
        },
        question,
        elementName,
    } = props;
    const answers = question.answerSelections?.split(',\n ').join(', ');
    const componentName = elementName;
    const commonData = {
        bindField,
        collectAnswer,
        q: question,
    };
    if (elementName === 'checkbox') {
        return (
            <Checkbox
                attributes={{
                    ...commonData,
                    values: answers?.split(', ') ?? [],
                    content: {
                        errorMessage: content.errorMessage,
                    },
                }}
            />
        );
    }
    else if (elementName === 'date') {
        return (
            <Date
                attributes={{
                    ...commonData,
                    content: {
                        errorMessage: content.errorMessage,
                    },
                }}
            />
        );
    }
    else if (elementName === 'dropDown') {
        throw new Error(`Unsupported component '${componentName}'`);
    }
    else if (elementName === 'email') {
        throw new Error(`Unsupported component '${componentName}'`);
    }
    else if (elementName === 'input') {
        throw new Error(`Unsupported component '${componentName}'`);
    }
    else if (elementName === 'phoneNumber') {
        throw new Error(`Unsupported component '${componentName}'`);
    }
    else if (elementName === 'radio') {
        throw new Error(`Unsupported component '${componentName}'`);
    }
    else if (elementName === 'radioWithFollowUp') {
        throw new Error(`Unsupported component '${componentName}'`);
    }
    else if (elementName === 'textArea') {
        throw new Error(`Unsupported component '${componentName}'`);
    }
    else if (elementName === 'zip') {
        throw new Error(`Unsupported component '${componentName}'`);
    }
    elementName satisfies never;
    throw new Error(`Unsupported component '${componentName}'`);
}
export function Questionnaire(props: QuestionnaireProps) {
    const {
        collectAnswer,
        content,
        questionnaireResponse,
        questions,
        setQuestionnaireResponse,
        submitQuestionnaireResponse,
    } = props;
    const categories = ['Basic Info', 'Waiver Flag', 'Red Flag'];
    const [categoryIndex, setCategoryIndex] = React.useState(0);
    const {
        bindField,
        setAllFieldsTouched,
    } = useMarkFieldAsTouched();
    const [errors, setErrors] = React.useState({});
    const [introPage, setIntroPage] = React.useState(true);
    const [showFollowUp, setShowFollowUp] = React.useState<Record<string, boolean>>({});

    const filteredQuestions = questions.filter(
        (q) => q.category === categories[categoryIndex],
    );

    // const attributes = (q: {
    //     answerSelections?: string;
    // }) => {
    //     const answers = (q.answerSelections != null)
    //         ? q.answerSelections.split(',\n ').join(', ')
    //         : null;
    //     return {
    //         q,
    //         bindField: bindField,
    //         collectAnswer: collectAnswer,
    //         content: content,
    //         answers: answers != null ? answers.split(', ') : null,
    //         selectAnswers: answers != null
    //             ? ['--', ...answers.split(', ')]
    //             : null,
    //         values: answers != null ? answers.split(', ') : null,
    //         showFollowUp: showFollowUp,
    //         setShowFollowUp: setShowFollowUp,
    //         setErrors: setErrors,
    //     };
    // };

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
                                                others={{
                                                    bindField,
                                                    collectAnswer,
                                                }}
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
                                                                others={{
                                                                    bindField,
                                                                    collectAnswer,
                                                                }}
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
