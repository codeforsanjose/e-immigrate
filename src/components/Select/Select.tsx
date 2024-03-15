import React, { useEffect } from 'react';
import './Select.css';
import { QData, BindFieldFunction, CollectAnswerFunction, ReactSetter } from '../../types/common';
type SelectProps = {
    attributes: {
        q: QData;
        selectAnswers?: Array<string>;
        values: Array<string>;
        bindField: BindFieldFunction;
        collectAnswer: CollectAnswerFunction;
        setShowFollowUp: ReactSetter<Record<string, boolean>>;
        content: {
            errorMessage: string;
        };
    }
};
export function Select(props: SelectProps) {
    const {
        attributes: { 
            q, 
            selectAnswers, 
            bindField, 
            collectAnswer, 
            content, 
            values,
        },
    } = props;
    useEffect(() => {
        if (selectAnswers == null) {
            console.error(`'selectAnswers' was null`)
            return;
        }
        collectAnswer(q.slug, selectAnswers[0]);
    }, []);
    return (
        <>
            <select
                name={q.slug}
                required={q.required}
                {...bindField(q.slug)}
                onChange={(e) => collectAnswer(q.slug, e.target.value)}
            >
                {selectAnswers &&
                    selectAnswers.map((option, idx) => {
                        return (
                            <option
                                value={values[idx - 1]}
                                key={`${q.slug}-${option}`}
                            >
                                {option}
                            </option>
                        );
                    })}
            </select>
            <div className="RequiredError">*{content.errorMessage}</div>
        </>
    );
}

