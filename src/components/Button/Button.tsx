import React from 'react';

import './Button.css';

type ButtonProps = {
    label: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    value: string;
}
export function Button(props: ButtonProps) {
    const { label, onClick, value } = props;
    return (
        <button className="buttonComponent" onClick={onClick} value={value}>
            {label}
        </button>
    );
}
