import React from 'react';

import './Button.css';

const Button = ({ label, onClick, value }) => {
    return (
        <button className="buttonComponent" onClick={onClick} value={value}>
            {label}
        </button>
    );
};

export default Button;
