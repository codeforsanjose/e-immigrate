import React from 'react';
import './RadioWithFollowUp.css';
import { ReactSetter } from '../../types/common';
import { CommonComponentProps } from '../../types/CommonComponentProps';
import { RadioOption } from '../RadioOption';

type RadioWithFollowUpProps = CommonComponentProps & {
    answers?: Array<string>;
    values: Array<string>;
    setShowFollowUp: ReactSetter<Record<string, boolean>>;
};

export function RadioWithFollowUp(props: RadioWithFollowUpProps) {
    const {
        q,
        answers,
        values,
        setShowFollowUp,
    } = props;
    return (
        <div className="RadioGroup RadioGroupWithFollowup">
            {answers?.map((option, idx) => (
                <RadioOption 
                    key={`${q.slug}-${option}`}
                    q={q}
                    value={values[idx]}
                    option={option}
                    onChange={() => {
                        const state = values[idx] === 'Yes';
                        setShowFollowUp(prev => {
                            if (prev[q.slug] === state) return prev;
                            return {
                                ...prev,
                                [q.slug]: state,
                            };
                        });
                    }}
                />
            ))}
        </div>
    );
};
