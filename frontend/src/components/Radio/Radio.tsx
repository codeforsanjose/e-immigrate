import React from 'react';
import './Radio.css';
import { CommonComponentProps } from '../../types/CommonComponentProps';
import { RadioOption } from '../RadioOption';
type RadioProps = CommonComponentProps & {
    answers?: Array<string>;
    values: Array<string>;
};
export function Radio(props: RadioProps) {
    const {
        q, 
        answers, 
        values, 
    } = props;
    return (
        <div className="RadioGroup">
            {answers?.map((option, idx) => (
                <RadioOption
                    key={`${q.slug}-${option}`}
                    q={q}
                    value={values[idx]}
                    option={option}
                />
            ))}
        </div>
    );
}
