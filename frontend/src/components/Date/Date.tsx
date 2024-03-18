import React from 'react';
import './Date.css';
import { ErrorMessageOnlyContentText } from '../../types/ContentText';
import { CommonComponentAttributes } from '../../types/CommonComponentAttributes';

type DateProps = {
    attributes: CommonComponentAttributes<ErrorMessageOnlyContentText>;
};
export function Date(props: DateProps) {
    const {
        attributes: { q, bindField, content },
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
