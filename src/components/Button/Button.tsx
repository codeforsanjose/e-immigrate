import React from 'react';

import './Button.css';

type ButtonProps = {
    label: string;
    type?: HTMLButtonElement['type'];
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    value?: string;
}
export function Button(props: ButtonProps) {
    const { 
        label, 
        onClick, 
        value,
        type: buttonType = 'button',
    } = props;
    return (
        <button className="buttonComponent" type={buttonType} onClick={onClick} value={value}>
            {label}
        </button>
    );
}
