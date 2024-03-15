import React from 'react';
import './Date.css';
import { BindFieldFunction, ContentData, QData } from '../../types/common';

type DateProps = {
    attributes: {

        q: QData;
        bindField: BindFieldFunction;
        content: ContentData;
    };
}
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
