import React from 'react';
import { FormElementName } from '../../utilities/formElements';
import { Question } from '../../types/Question';
import { ContentText } from '../../types/ContentText';
import { BindFieldFunction, CollectAnswerFunction, ReactSetter } from '../../types/common';
import { Checkbox } from '../Checkbox/Checkbox';
import { Date } from '../Date/Date';
import { Select } from '../Select/Select';
import { Email } from '../Email/Email';
import { TextInput } from '../TextInput/TextInput';
import { PhoneNumber } from '../PhoneNumber/PhoneNumber';
import { Radio } from '../Radio/Radio';
import { RadioWithFollowUp } from '../RadioWithFollowUp/RadioWithFollowUp';
import { TextArea } from '../TextArea/TextArea';
import { Zip } from '../Zip/Zip';

type FormElementWrapperProps<TElementName extends FormElementName> = {
    elementName: TElementName;
    question: Question;
    content: ContentText;
    others: {
        setShowFollowUp: ReactSetter<Record<string, boolean>>;
        bindField: BindFieldFunction;
        collectAnswer: CollectAnswerFunction;
        setErrors: ReactSetter<Record<string, unknown>>;
    };
};

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

export function FormElementWrapper<
    TElementName extends FormElementName,
>(props: FormElementWrapperProps<TElementName>) {
    const {
        content,
        others: {
            bindField,
            collectAnswer,
            setShowFollowUp,
            setErrors,
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
        content,
    };
    if (elementName === 'checkbox') {
        return (
            <Checkbox
                attributes={{
                    ...commonData,
                    values: answers?.split(', ') ?? [],
                }}
            />
        );
    }
    else if (elementName === 'date') {
        return (
            <Date
                attributes={commonData}
            />
        );
    }
    else if (elementName === 'dropDown') {
        const selectAnswers = answers != null
            ? ['--', ...answers.split(', ')]
            : null;
        return (
            <Select
                attributes={{
                    ...commonData,
                    selectAnswers: selectAnswers ?? undefined,
                    values: answers?.split(', ') ?? [],
                    setShowFollowUp,
                }}
            />
        );
    }
    else if (elementName === 'email') {
        return (
            <Email
                attributes={commonData}
            />
        );
    }
    else if (elementName === 'input') {
        return (
            <TextInput
                attributes={commonData}
            />
        );
    }
    else if (elementName === 'phoneNumber') {
        return (
            <PhoneNumber
                attributes={{
                    ...commonData,
                    setErrors,
                }}
            />
        );
    }
    else if (elementName === 'radio') {
        return (
            <Radio
                attributes={{
                    ...commonData,
                    answers: answers?.split(', '),
                    values: answers?.split(', ') ?? [],
                }}
            />
        );
    }
    else if (elementName === 'radioWithFollowUp') {
        return (
            <RadioWithFollowUp
                attributes={{
                    ...commonData,
                    answers: answers?.split(', '),
                    values: answers?.split(', ') ?? [],
                    setShowFollowUp,
                }}
            />
        );
    }
    else if (elementName === 'textArea') {
        return (
            <TextArea
                attributes={commonData}
            />
        );
    }
    else if (elementName === 'zip') {
        return (
            <Zip
                attributes={{
                    ...commonData,
                    setErrors,
                }}
            />
        );
    }
    elementName satisfies never;
    throw new Error(`Unsupported component '${componentName}'`);
}