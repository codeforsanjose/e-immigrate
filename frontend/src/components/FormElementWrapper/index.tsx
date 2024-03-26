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
    const answers = question.answerSelections?.split(',\n ').join(', ');
    const componentName = elementName;
    const commonData = {
        q: question,
        content,
    };
    const selectAnswers = React.useMemo(() => {
        if (answers == null) return null;
        return ['--', ...answers.split(', ')]; 
    }, [answers]);
    if (elementName === 'checkbox') {
        return (
            <Checkbox
                {...commonData}
                values={answers?.split(', ') ?? []}
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
                values={answers?.split(', ') ?? []}
                setShowFollowUp={setShowFollowUp}
            />
        );
    }
    else if (elementName === 'email') {
        return (
            <Email
                {...commonData}
            />
        );
    }
    else if (elementName === 'input') {
        return (
            <TextInput
                {...commonData}
            />
        );
    }
    else if (elementName === 'phoneNumber') {
        return (
            <PhoneNumber
                {...commonData}
                setErrors={setErrors}
            />
        );
    }
    else if (elementName === 'radio') {
        return (
            <Radio
                {...commonData}
                answers={answers?.split(', ')}
                values={answers?.split(', ') ?? []}
            />
        );
    }
    else if (elementName === 'radioWithFollowUp') {
        return (
            <RadioWithFollowUp
                {...commonData}
                answers={answers?.split(', ')}
                values={answers?.split(', ') ?? []}
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
                {...commonData}
                setErrors={setErrors}
            />
        );
    }
    elementName satisfies never;
    throw new Error(`Unsupported component '${componentName}'`);
}