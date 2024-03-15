import React from 'react';
import { BindFieldFunction } from '../../../types/common';
type TouchedFields = {
    all: boolean;
} & Record<string, boolean>;

export function useMarkFieldAsTouched() {
    const [touchedFields, setTouchedFields] = React.useState<TouchedFields>({ all: false });
    const setFieldAsTouched = (event) => {
        event.persist();
        setTouchedFields((prevState) => ({
            ...prevState,
            [event.target.name]: true,
        }));
    };

    const setAllFieldsTouched = () => {
        setTouchedFields({ all: true });
    };

    const bindField: BindFieldFunction = (name: string) => ({
        'data-touched': touchedFields.all || touchedFields[name],
        onBlur: setFieldAsTouched,
    });

    return {
        bindField,
        setAllFieldsTouched,
    };
}
