import React, { useState } from 'react';

function useMarkFieldAsTouched() {
    const [touchedFields, setTouchedFields] = useState({ all: false });
    const setFieldAsTouched = (event) => {
        event.persist();
        setTouchedFields((prevState) => ({
            ...prevState,
            [event.target.name]: true,
        }));
    };

    const setAllFieldsTouched = (event) => {
        setTouchedFields({ all: true });
    };

    const bindField = (name) => ({
        'data-touched': touchedFields.all || touchedFields[name],
        onBlur: setFieldAsTouched,
    });

    return [bindField, setAllFieldsTouched];
}

export default useMarkFieldAsTouched;
