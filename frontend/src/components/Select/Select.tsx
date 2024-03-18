import React from 'react';
import './Select.css';
import { ReactSetter } from '../../types/common';
import { CommonComponentProps } from '../../types/CommonComponentProps';
type SelectProps = CommonComponentProps & {
    selectAnswers?: Array<string>;
    values: Array<string>;
    setShowFollowUp: ReactSetter<Record<string, boolean>>;
};
export function Select(props: SelectProps) {
    const {
        q, 
        selectAnswers, 
        bindField, 
        collectAnswer, 
        content, 
        values,
    } = props;
    React.useEffect(() => {
        if (selectAnswers == null) {
            console.error(`'selectAnswers' was null`);
            return;
        }
        collectAnswer(q.slug, selectAnswers[0]);
    }, [collectAnswer, q.slug, selectAnswers]);
    return (
        <>
            <select
                name={q.slug}
                required={q.required}
                {...bindField(q.slug)}
                onChange={(e) => collectAnswer(q.slug, e.target.value)}
            >
                {selectAnswers?.map((option, idx) => {
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
