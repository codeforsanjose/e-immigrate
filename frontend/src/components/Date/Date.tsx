import React from 'react';
import './Date.css';
import { ErrorMessageOnlyContentText } from '../../types/ContentText';
import { CommonComponentProps } from '../../types/CommonComponentProps';

type DateProps = CommonComponentProps<ErrorMessageOnlyContentText>;
export function Date(props: DateProps) {
    const {
        q, bindField, content,
    } = props;
    return (
        <>
            <input
                type="date"
                name={q.slug}
                required={q.required}
                className="TextInput"
                {...bindField(q.slug)} />
            <div className="RequiredError">*{content.errorMessage}</div>
        </>
    );
}
