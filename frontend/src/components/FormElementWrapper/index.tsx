import React from 'react';
import { FormElementName } from '../../utilities/formElements';

import { ReactSetter } from '../../types/common';
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
import { useContentContext } from '../../contexts/ContentContext';
import { QuestionInfo } from '../../types/ApiResults';

type FormElementWrapperProps<TElementName extends FormElementName> = {
    elementName: TElementName;
    question: QuestionInfo;
    others: {
        setShowFollowUp: ReactSetter<Record<string, boolean>>;
        setErrors: ReactSetter<Record<string, unknown>>;
    };
};

export function splitStringOfAnswersToArray(splittingString?: string | null) {
    if (splittingString == null) return [];
    return splittingString.split(',').map(splitString => splitString.trim());
}
export function FormElementWrapper<
    TElementName extends FormElementName,
>(props: FormElementWrapperProps<TElementName>) {
    const {
        others: {
            setShowFollowUp,
            setErrors,
        },
        question,
        elementName,
    } = props;
    const content = useContentContext();
    const answers = splitStringOfAnswersToArray(question.answerSelections).join(',');
    // const answers = question.answerSelections?.split(',\n ').join(', ');

    // const answerValues = question.answerSelectionsValues?.split(',\n ').join(', ');
    // console.log("answer values ------>", answerValues);
    const componentName = elementName;
    const commonData = {
        q: question,
        content,
    };
    const selectAnswers = React.useMemo(() => {
        if (answers == null) return null;
        return ['--', ...splitStringOfAnswersToArray(answers)]; 
    }, [answers]);
    if (elementName === 'checkbox') {
        return (
            <Checkbox
                {...commonData}
                values={splitStringOfAnswersToArray(answers) ?? []}
            />
        );
    }
    else if (elementName === 'date') {
        return (
            <Date
                {...commonData}
            />
        );
    }
    else if (elementName === 'dropDown') {
        return (
            <Select
                {...commonData}
                selectAnswers={selectAnswers ?? undefined}
                values={splitStringOfAnswersToArray(answers) ?? []}
                setShowFollowUp={setShowFollowUp}
            />
        );
    }
    else if (elementName === 'email') {
        return (
            <Email
                type={"email"}
                {...commonData}
            />
        );
    }
    else if (elementName === 'input') {
        return (
            <TextInput
                type={"email"}
                {...commonData}
            />
        );
    }
    else if (elementName === 'phoneNumber') {
        return (
            <PhoneNumber
                type={"tel"}
                {...commonData}
                setErrors={setErrors}
            />
        );
    }
    else if (elementName === 'radio') {
        return (
            <Radio
                {...commonData}
                answers={splitStringOfAnswersToArray(answers)}
                values={splitStringOfAnswersToArray(answers) ?? []}
            />
        );
    }
    else if (elementName === 'radioWithFollowUp') {
        return (
            <RadioWithFollowUp
                {...commonData}
                answers={splitStringOfAnswersToArray(answers)}
                values={splitStringOfAnswersToArray(answers) ?? []}
                setShowFollowUp={setShowFollowUp}
            />
        );
    }
    else if (elementName === 'textArea') {
        return (
            <TextArea
                {...commonData}
            />
        );
    }
    else if (elementName === 'zip') {
        return (
            <Zip
                type={"number"}
                {...commonData}
                setErrors={setErrors}
            />
        );
    }
    elementName satisfies never;
    throw new Error(`Unsupported component '${componentName}'`);
}